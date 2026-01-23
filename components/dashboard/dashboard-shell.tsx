"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { LeftNav } from "@/components/dashboard/left-nav"
import { InsightsFeed } from "@/components/dashboard/insights-feed"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [leftNavOpen, setLeftNavOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const pathname = usePathname()

  // Standalone pages without navigation
  if (pathname === "/design-system") {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <LeftNav isOpen={leftNavOpen} onToggle={() => setLeftNavOpen(!leftNavOpen)} />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header sidebarOpen={rightSidebarOpen} onToggleSidebar={() => setRightSidebarOpen(!rightSidebarOpen)} />

        <main className="flex-1 p-6 lg:p-8 overflow-y-auto min-h-0">
          {children}
        </main>
      </div>

      <InsightsFeed isOpen={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />
    </div>
  )
}
