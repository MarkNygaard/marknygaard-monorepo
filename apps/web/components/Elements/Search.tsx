"use client"

import { Button } from "@workspace/ui/components/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@workspace/ui/components/dialog"
import { CornerDownLeft, Search as SearchIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { SanityImage } from "@/components/SanityImage/SanityImage"

interface SearchResult {
  _id: string
  title: string
  slug: string
  excerpt?: string
  image?: {
    asset: {
      _ref: string
    }
  }
  score: number
}

export function Search() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchQuery }),
      })

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      setError(`Failed to perform search. Please try again. ${error}`)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (value: string) => {
    setQuery(value)

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // If query is empty, clear results immediately
    if (!value.trim()) {
      setResults([])
      setIsLoading(false)
      return
    }

    // Set loading state immediately for better UX
    setIsLoading(true)

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      handleSearch(value)
    }, 500)
  }

  const handleResultClick = () => {
    setOpen(false)
    setQuery("")
    setResults([])
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          aria-label="Search"
          variant="ghost"
          size="icon"
          className="h-12 cursor-pointer text-muted-foreground hover:text-primary-foreground dark:text-secondary-foreground/50 dark:hover:text-secondary-foreground"
        >
          <SearchIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="rounded-lg bg-white p-0 dark:bg-muted">
        <DialogTitle className="hidden">Search</DialogTitle>
        <div className="relative flex h-full w-full flex-col justify-between shadow-md xl:rounded-lg">
          <div className="flex h-16 flex-none items-center dark:border-border">
            <div className="flex h-full w-full items-center pl-14">
              <SearchIcon className="absolute top-0 left-0 mt-5 ml-4 size-6 text-gray-400 dark:text-gray-300" />
              <input
                type="text"
                placeholder="Search"
                autoFocus
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(e.target.value)
                }
                className="h-full w-full appearance-none truncate rounded-none bg-transparent text-gray-500 text-lg leading-normal shadow-none outline-none placeholder:text-gray-500 focus:text-gray-900 sm:text-2xl dark:text-gray-300 dark:placeholder:text-gray-300"
              />
            </div>
            <div className="h-8 w-[1px] flex-none bg-gray-300 dark:bg-gray-700" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-full items-center px-4 text-gray-500 hover:text-gray-800 dark:text-gray-300"
            >
              Cancel
              <span className="sr-only">Close</span>
            </button>
          </div>

          {isLoading && (
            <div className="aitems-center my-6 flex h-full w-full justify-center text-gray-500">
              Searching...
            </div>
          )}

          {error && (
            <div className="flex h-full w-full items-center justify-center p-4">
              <div className="rounded-md border border-red-500 bg-red-500/10 p-3 text-red-500 text-sm">
                {error}
              </div>
            </div>
          )}

          {!isLoading && !error && results.length > 0 && (
            <div className="h-full max-h-110 w-full grow overflow-y-scroll">
              {results.map((result) => (
                <div
                  key={result._id}
                  className="group m-1 flex rounded-lg p-1 text-base hover:bg-primary/20 md:m-2 md:p-2 dark:hover:bg-primary/10"
                >
                  <Link href={result.slug} onClick={handleResultClick} className="flex w-full">
                    {result.image && (
                      <>
                        <SanityImage
                          image={result.image}
                          alt={result.title}
                          className="mr-1 rounded-md border md:hidden dark:border-border"
                          width={80}
                          height={60}
                        />
                        <SanityImage
                          image={result.image}
                          alt={result.title}
                          className="mr-3 hidden rounded-md border shadow-sm md:flex dark:border-border"
                          width={180}
                          height={100}
                        />
                      </>
                    )}
                    <div className="flex w-full items-center truncate pr-2 md:pr-4">
                      <div className="flex w-full flex-col">
                        <p className="font-bold text-sm md:text-base">{result.title}</p>
                        {result.excerpt && (
                          <div className="line-clamp-2 w-full whitespace-normal text-gray-500 text-sm md:text-base dark:text-gray-300">
                            {result.excerpt}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="hidden h-full items-center pr-4 text-gray-500 text-xl md:flex dark:text-gray-300">
                      <CornerDownLeft className="size-5 opacity-0 group-hover:opacity-100" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !error && query && results.length === 0 && (
            <div className="flex h-full w-full items-center justify-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
