'use client';

import { PanelRightClose, PanelRightOpen } from "lucide-react"

interface HeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function Header({ sidebarOpen, onToggleSidebar }: HeaderProps) {
  return (
    <header className="h-12 border-b border-border bg-background flex items-center justify-end px-4">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="flex items-center p-1 rounded hover:bg-muted transition-colors"
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? (
          <PanelRightClose className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
        ) : (
          <PanelRightOpen className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
        )}
      </button>
    </header>
  )
}
