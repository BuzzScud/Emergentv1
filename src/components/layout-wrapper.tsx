"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
// import { DebugTrigger } from "@/components/debug-panel"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  // List of pages that should NOT show the sidebar
  const authPages = [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password'
  ]
  
  // Check if current path is an auth page
  const isAuthPage = authPages.includes(pathname)
  
  // Additional check for any path starting with auth-related routes
  const isAuthRoute = pathname.startsWith('/login') || 
                     pathname.startsWith('/signup') || 
                     pathname.startsWith('/auth') ||
                     pathname === '/'

  if (isAuthPage || isAuthRoute) {
    return (
      <div className="w-full h-full">
        {children}
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 flex flex-col min-w-0">
          <SiteHeader />
          <main className="flex-1 overflow-auto hide-scrollbar">
            <div className="content-container h-full">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
      {/* Temporarily disabled debug trigger to fix performance issues */}
      {/* <DebugTrigger /> */}
    </SidebarProvider>
  )
} 