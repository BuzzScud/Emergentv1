"use client"

import * as React from "react"
import Link from "next/link"
import {
  BookOpen,
  Bot,
  Command,
  LayoutDashboard,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: false,
    },
    {
      title: "Investment Tools",
      url: "/playground",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "AI Models",
      url: "/models",
      icon: Bot,
    },
    {
      title: "Documentation",
      url: "/documentation",
      icon: BookOpen,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar
      variant="inset"
      className="border-r border-slate-300/60 shadow-lg"
      {...props}
    >
      <SidebarHeader className="border-b border-slate-300/60 bg-white/90">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-black">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-semibold text-slate-900 dark:text-slate-100">Emergent Fortuity</span>
                  <span className="truncate text-xs text-slate-600 dark:text-slate-400">Private Wealth Management</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-gradient-to-b from-slate-50 to-slate-100/50">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-slate-300/60 bg-white/90">
        <NavSecondary items={data.navSecondary} />
      </SidebarFooter>
    </Sidebar>
  )
}
