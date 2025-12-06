"use client"

import { Button } from "@workspace/ui/button"
import { Input } from "@workspace/ui/input"
import { Label } from "@workspace/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess() {
            router.push("/conversations")
          },
          onError(ctx) {
            setError(ctx.error.message || "Failed to sign in")
          },
        }
      )
    } catch (_err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="font-bold text-3xl">Sign In</h1>
          <p className="text-muted-foreground">Enter your credentials to access the admin panel</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              disabled={isLoading}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              type="email"
              value={email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              disabled={isLoading}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              type="password"
              value={password}
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-destructive text-sm">{error}</div>
          )}

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-sm">
          Don't have an account?{" "}
          <Link className="font-medium text-primary hover:underline" href="/sign-up">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
