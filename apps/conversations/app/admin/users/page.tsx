import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminUsersClient } from "./users-client"

export default async function AdminUsersPage() {
  // Check authentication and admin role
  const session = await auth.api.getSession({
    headers: await import("next/headers").then((mod) => mod.headers()),
  })

  if (!session) {
    redirect("/sign-in")
  }

  // Check if user is admin
  const user = session.user
  if (user.role !== "admin") {
    redirect("/conversations")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-bold text-4xl">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions</p>
      </div>

      <AdminUsersClient />
    </div>
  )
}
