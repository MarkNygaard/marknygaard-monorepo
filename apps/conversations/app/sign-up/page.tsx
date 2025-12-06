"use client"

import { Button } from "@workspace/ui/button"
import { Input } from "@workspace/ui/input"
import { Label } from "@workspace/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  const [name, setName] = useState("")
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
      await authClient.signUp.email(
        {
          name,
          email,
          password,
        },
        {
          onSuccess() {
            router.push("/conversations")
          },
          onError(ctx) {
            setError(ctx.error.message || "Failed to create account")
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
          <h1 className="font-bold text-3xl">Create Account</h1>
          <p className="text-muted-foreground">Sign up to access the admin panel</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              disabled={isLoading}
              id="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              type="text"
              value={name}
            />
          </div>

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
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              type="password"
              value={password}
            />
            <p className="text-muted-foreground text-xs">Must be at least 8 characters</p>
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-destructive text-sm">{error}</div>
          )}

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link className="font-medium text-primary hover:underline" href="/sign-in">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
