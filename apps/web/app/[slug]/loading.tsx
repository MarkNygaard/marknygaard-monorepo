"use client"

import { Spinner } from "@workspace/ui/spinner"
import { usePathname } from "next/navigation"
import { BlogPageSkeleton } from "@/components/Skeletons/PageSkeletons"

export default function Loading() {
  const pathname = usePathname()

  if (pathname === "/blog") {
    return <BlogPageSkeleton />
  } else {
    return (
      <div className="flex h-center w-full items-center justify-center text-xl dark:text-gray-400">
        <Spinner />
        <p>Loading...</p>
      </div>
    )
  }
}
