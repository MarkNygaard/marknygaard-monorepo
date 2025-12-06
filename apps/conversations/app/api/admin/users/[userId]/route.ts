import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

const pool = new (await import("pg")).Pool({
  connectionString: process.env.DATABASE_URL,
})

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Check authentication and admin role
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = session.user
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden - Admin only" }, { status: 403 })
    }

    const { userId } = await params

    // Prevent deleting yourself
    if (userId === user.id) {
      return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 })
    }

    // Delete user and related data from database
    // Better Auth stores users in the "user" table
    await pool.query("DELETE FROM account WHERE userId = $1", [userId])
    await pool.query("DELETE FROM session WHERE userId = $1", [userId])
    await pool.query("DELETE FROM verification WHERE userId = $1", [userId])
    await pool.query("DELETE FROM user WHERE id = $1", [userId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user:", error)
    const message = error instanceof Error ? error.message : "Failed to delete user"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
