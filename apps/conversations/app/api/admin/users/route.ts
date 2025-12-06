import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function GET(request: NextRequest) {
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

    // List all users
    const result = await auth.api.listUsers({
      query: {},
      headers: request.headers,
    })

    return NextResponse.json({ users: result.users })
  } catch (error) {
    console.error("Error listing users:", error)
    const message = error instanceof Error ? error.message : "Failed to list users"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
