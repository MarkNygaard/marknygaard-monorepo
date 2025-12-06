"use client"

import type { ConversationSession } from "@workspace/supabase/types"
import { Badge } from "@workspace/ui/badge"
import { Button } from "@workspace/ui/button"
import { Card } from "@workspace/ui/card"
import { Input } from "@workspace/ui/input"
import { Skeleton } from "@workspace/ui/skeleton"
import { format, formatDistanceToNow, isThisWeek, isToday, isYesterday } from "date-fns"
import { ArrowUpDown, ChevronLeft, ChevronRight, MessageSquare, Search } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { ErrorState } from "@/components/error-state"

type ConversationsListProps = {
  initialSessions: ConversationSession[]
  initialTotal: number
  initialPage: number
  initialSort: "newest" | "oldest"
}

function groupSessionsByDate(sessions: ConversationSession[]) {
  const groups: {
    today: ConversationSession[]
    yesterday: ConversationSession[]
    thisWeek: ConversationSession[]
    earlier: ConversationSession[]
  } = {
    today: [],
    yesterday: [],
    thisWeek: [],
    earlier: [],
  }

  for (const session of sessions) {
    const date = new Date(session.last_updated)
    if (isToday(date)) {
      groups.today.push(session)
    } else if (isYesterday(date)) {
      groups.yesterday.push(session)
    } else if (isThisWeek(date)) {
      groups.thisWeek.push(session)
    } else {
      groups.earlier.push(session)
    }
  }

  return groups
}

export function ConversationsList({
  initialSessions,
  initialTotal,
  initialPage,
  initialSort,
}: ConversationsListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sessions, setSessions] = useState(initialSessions)
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(initialPage)
  const [sort, setSort] = useState(initialSort)
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const limit = 20
  const totalPages = Math.ceil(total / limit)
  const hasMore = page < totalPages

  const fetchSessions = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
      })

      if (search) {
        params.set("search", search)
      }

      const response = await fetch(`/api/conversations?${params}`)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "Failed to fetch conversations")
      }

      const data = await response.json()
      setSessions(data.sessions)
      setTotal(data.total)
    } catch (fetchError) {
      console.error("Error fetching conversations:", fetchError)
      setError(fetchError instanceof Error ? fetchError.message : "Failed to load conversations")
    } finally {
      setIsLoading(false)
    }
  }, [page, sort, search])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (search !== searchParams.get("search")) {
        setPage(1)
        fetchSessions()
      }
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [search, fetchSessions, searchParams])

  useEffect(() => {
    fetchSessions()
    // Update URL
    const params = new URLSearchParams()
    params.set("page", page.toString())
    params.set("sort", sort)
    if (search) {
      params.set("search", search)
    }
    router.push(`/conversations?${params}`, { scroll: false })
  }, [page, sort, fetchSessions, router, search])

  const grouped = groupSessionsByDate(sessions)
  const hasNoError = !error
  const isNotLoading = !isLoading
  const hasNoSessions = sessions.length === 0

  function toggleSort() {
    setSort(sort === "newest" ? "oldest" : "newest")
    setPage(1)
  }

  function goToPage(newPage: number) {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const showLoading = hasNoError && isLoading
  const showEmpty = hasNoError && isNotLoading && hasNoSessions
  const showSessions = hasNoError && isNotLoading && !hasNoSessions

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            value={search}
          />
        </div>

        <Button className="gap-2" onClick={toggleSort} variant="outline">
          <ArrowUpDown className="h-4 w-4" />
          {sort === "newest" ? "Newest first" : "Oldest first"}
        </Button>
      </div>

      {error && (
        <ErrorState message={error} retry={fetchSessions} title="Failed to load conversations" />
      )}

      {showLoading && (
        <div className="space-y-4">
          {["loading-1", "loading-2", "loading-3", "loading-4", "loading-5"].map((id) => (
            <Skeleton className="h-32 w-full" key={id} />
          ))}
        </div>
      )}

      {showEmpty && (
        <Card className="p-12 text-center">
          <MessageSquare className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
          <h3 className="mb-2 font-semibold text-lg">No conversations found</h3>
          <p className="text-muted-foreground text-sm">
            {search ? "Try adjusting your search query" : "No conversations to display yet"}
          </p>
        </Card>
      )}

      {showSessions && <GroupedSessions grouped={grouped} />}

      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t pt-6">
          <p className="text-muted-foreground text-sm">
            Page {page} of {totalPages} • {total} total conversations
          </p>

          <div className="flex gap-2">
            <Button
              disabled={page === 1 || isLoading}
              onClick={() => goToPage(page - 1)}
              size="sm"
              variant="outline"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>
            <Button
              disabled={!hasMore || isLoading}
              onClick={() => goToPage(page + 1)}
              size="sm"
              variant="outline"
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function GroupedSessions({ grouped }: { grouped: ReturnType<typeof groupSessionsByDate> }) {
  return (
    <>
      {grouped.today.length > 0 && <SessionGroup sessions={grouped.today} title="Today" />}
      {grouped.yesterday.length > 0 && (
        <SessionGroup sessions={grouped.yesterday} title="Yesterday" />
      )}
      {grouped.thisWeek.length > 0 && (
        <SessionGroup sessions={grouped.thisWeek} title="This Week" />
      )}
      {grouped.earlier.length > 0 && <SessionGroup sessions={grouped.earlier} title="Earlier" />}
    </>
  )
}

function SessionGroup({ title, sessions }: { title: string; sessions: ConversationSession[] }) {
  return (
    <div className="space-y-3">
      <h2 className="font-semibold text-muted-foreground text-sm uppercase">{title}</h2>
      <div className="space-y-3">
        {sessions.map((session) => (
          <Link href={`/conversations/${session.session_id}`} key={session.session_id}>
            <Card className="p-4 transition-colors hover:bg-muted/50">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="mb-2 line-clamp-2 text-sm">{session.first_message}</p>
                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                    <span>
                      {formatDistanceToNow(new Date(session.last_updated), { addSuffix: true })}
                    </span>
                    <span>•</span>
                    <span>{format(new Date(session.last_updated), "MMM d, yyyy 'at' h:mm a")}</span>
                  </div>
                </div>

                <Badge className="shrink-0" variant="secondary">
                  {session.message_count} {session.message_count === 1 ? "message" : "messages"}
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
