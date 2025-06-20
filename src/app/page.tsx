"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    }
  }, [isAuthenticated, isLoading, router])

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen login-gradient flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-slate-600 dark:text-slate-400" />
    </div>
  )
}
