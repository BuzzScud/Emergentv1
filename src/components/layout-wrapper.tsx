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
  const isLoginPage = pathname === '/login' || pathname === '/signup'

  if (isLoginPage) {
    return <>{children}</>
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