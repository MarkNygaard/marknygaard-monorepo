"use client"

import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

type User = {
  id: string
  email: string
  name: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      try {
        const session = await authClient.getSession()
        if (session.data) {
          setUser(session.data.user as User)
        }
      } catch (error) {
        console.error("Failed to check session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  async function signOut() {
    await authClient.signOut()
    setUser(null)
    router.push("/sign-in")
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
