import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Disable sign-up page (redirect to sign-in)
  if (pathname.startsWith("/sign-up")) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // Public routes that don't require authentication
  const publicRoutes = ["/sign-in", "/api/auth"]

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check for session using Better Auth
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  // Redirect to sign-in if no session
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // Check admin routes - require admin role
  if (pathname.startsWith("/admin")) {
    const user = session.user
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/conversations", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
