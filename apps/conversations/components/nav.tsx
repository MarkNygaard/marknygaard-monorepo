"use client"

import { Button } from "@workspace/ui/button"
import { MessageSquare, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"

export function Nav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const isAdmin = session?.user?.role === "admin"

  // Don't show nav on auth pages
  if (pathname?.startsWith("/sign-")) {
    return null
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link className="flex items-center gap-2" href="/conversations">
            <MessageSquare className="h-6 w-6" />
            <span className="font-semibold text-lg">Conversations</span>
          </Link>

          <div className="flex gap-2">
            <Link href="/conversations">
              <Button size="sm" variant={pathname === "/conversations" ? "default" : "ghost"}>
                Conversations
              </Button>
            </Link>

            {isAdmin && (
              <Link href="/admin/users">
                <Button size="sm" variant={pathname?.startsWith("/admin") ? "default" : "ghost"}>
                  <Users className="mr-2 h-4 w-4" />
                  User Management
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {session?.user && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <span>{session.user.name}</span>
              {isAdmin && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary text-xs">
                  Admin
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
