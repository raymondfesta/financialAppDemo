"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  FileText,
  Settings,
  Bot,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Briefcase,
  Search
} from "lucide-react"

interface LeftNavProps {
  isOpen: boolean
  onToggle: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: MessageSquare, label: "Financial Chat", href: "/financial-chat" },
  { icon: Bot, label: "Investment Agents", href: "/investment-agents" },
  { icon: Search, label: "Research", href: "/research" },
  { icon: Briefcase, label: "Portfolios", href: "/portfolios" },
  { icon: TrendingUp, label: "Markets", href: "/markets" },
  { icon: PieChart, label: "Analytics", href: "/analytics" },
  { icon: FileText, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export function LeftNav({ isOpen, onToggle }: LeftNavProps) {
  const pathname = usePathname()

  return (
    <aside
      className="flex flex-col h-screen shrink-0 transition-all duration-300 ease-in-out"
      style={{
        width: isOpen ? '220px' : '56px',
        borderRight: '1px solid rgba(255, 255, 255, 0.06)',
        background: '#111111',
      }}
    >
      {/* Logo area with collapse toggle */}
      <div
        className={`h-12 flex items-center shrink-0 transition-all duration-300 ${isOpen ? 'justify-between px-3' : 'justify-center px-0'}`}
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        {isOpen && (
          <Link href="/" className="flex items-center overflow-hidden">
            <Image
              src="/boosted-logo.svg"
              alt="Boosted.ai"
              width={120}
              height={29}
              className="shrink-0"
              priority
            />
          </Link>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="p-1 rounded-md text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto min-h-0">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`
                    w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-white/10 text-foreground'
                      : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                  {isOpen && (
                    <span className="text-sm whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
