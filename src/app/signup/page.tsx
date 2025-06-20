import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-black">
              <Command className="size-4" />
            </div>
            <span className="text-xl font-bold">Emergent Fortuity</span>
          </div>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Create your account to start your financial journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <h3 className="font-semibold mb-2">Coming Soon!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Account registration is currently under development. 
              Use the demo access to explore our platform features.
            </p>
            <div className="space-y-2">
              <Link href="/dashboard" className="block">
                <Button className="w-full">
                  Try Demo Access
                </Button>
              </Link>
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 