"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, TrendingUp, Shield, Brain, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { login, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push('/dashboard')
      } else {
        setError("Invalid email or password. Try demo@emergentfortuity.com / demo123")
      }
    } catch {
      setError("An error occurred during login. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDemoLogin = async () => {
    setEmail("demo@emergentfortuity.com")
    setPassword("demo123")
    setError("")
    setIsSubmitting(true)

    try {
      const success = await login("demo@emergentfortuity.com", "demo123")
      if (success) {
        router.push('/dashboard')
      }
    } catch {
      setError("Demo login failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
          <p className="text-sm text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-4">
      {/* Content */}
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-black">
                <Command className="size-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  Emergent Fortuity
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Private Wealth Management
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Comprehensive Investment & Wealth Solutions
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">Portfolio Management</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Professional investment management with personalized strategies tailored to your financial goals and risk tolerance.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">Wealth Preservation</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Strategic asset protection and risk management to preserve and grow your wealth across market cycles.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-100">Financial Planning</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Comprehensive financial planning including retirement, estate planning, and tax optimization strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">$850M+</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Assets Under Management</div>
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">18+ Years</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">SEC</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Registered Expert</div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex justify-center space-x-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-600 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50">
            <CardHeader className="space-y-4">
              <div className="text-center lg:hidden">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-black">
                    <Command className="size-4" />
                  </div>
                  <div>
                    <span className="text-xl font-bold text-slate-900 dark:text-slate-100">Emergent Fortuity</span>
                    <p className="text-[10px] text-slate-600 dark:text-slate-300">Private Wealth Management</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-center text-slate-900 dark:text-slate-100">Welcome Back</CardTitle>
                <CardDescription className="text-center text-slate-600 dark:text-slate-300">
                  Access your private wealth management portal
                </CardDescription>
              </div>
              <CardAction className="justify-center">
                <Link href="/signup">
                  <Button variant="link" className="text-blue-600 dark:text-blue-400">
                    Don&apos;t have an account? Sign Up
                  </Button>
                </Link>
              </CardAction>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-900 dark:text-slate-100">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@emergentfortuity.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 bg-white/90 dark:bg-slate-700/90 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-900 dark:text-slate-100">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                    className="h-12 bg-white/90 dark:bg-slate-700/90 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                    placeholder="demo123"
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-300 dark:border-slate-600" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-slate-800 px-2 text-slate-500 dark:text-slate-400">
                      OR CONTINUE WITH
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 bg-white/90 dark:bg-slate-700/90"
                  onClick={handleDemoLogin}
                  disabled={isSubmitting}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <div className="text-center pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Demo Access</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium">Email:</span> demo@emergentfortuity.com <br />
                    <span className="font-medium">Password:</span> demo123
                  </div>
                  <Button
                    type="button"
                    variant="link"
                    className="mt-2 text-blue-600 dark:text-blue-400 text-sm h-auto p-0"
                    onClick={handleDemoLogin}
                    disabled={isSubmitting}
                  >
                    Try Demo (Auto Login)
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 