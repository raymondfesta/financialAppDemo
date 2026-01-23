"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { researchItems } from "@/lib/mock-data"

type Category = "All" | "Equity" | "Macro" | "Sector"

function ConvictionBadge({ conviction }: { conviction: string }) {
  const styles: Record<string, string> = {
    "Strong Buy": "bg-emerald-500/20 text-emerald-400",
    "Buy": "bg-blue-500/20 text-blue-400",
    "Hold": "bg-yellow-500/20 text-yellow-400",
    "Sell": "bg-red-500/20 text-red-400",
    "N/A": "bg-white/10 text-muted-foreground",
  }

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles[conviction] || styles["N/A"]}`}>
      {conviction}
    </span>
  )
}

function LabelBadge({ label }: { label: string }) {
  const styles: Record<string, string> = {
    "AI Generated": "bg-blue-500/20 text-blue-400",
    "Verified": "bg-emerald-500/20 text-emerald-400",
    "Actionable": "bg-purple-500/20 text-purple-400",
  }

  return (
    <span className={`px-2 py-0.5 rounded text-xs ${styles[label] || "bg-white/10 text-muted-foreground"}`}>
      {label}
    </span>
  )
}

export default function ResearchPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = researchItems.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory
    const matchesSearch = searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tickers.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Research</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-generated research and analysis from Investment Agents</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Tabs */}
        <div
          className="p-1 inline-flex gap-1 rounded-lg"
          style={{ background: 'rgba(255, 255, 255, 0.05)' }}
        >
          {(["All", "Equity", "Macro", "Sector"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-white/10 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by ticker, title, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm bg-white/5 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Research List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="dashboard-container-flat p-4">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                <ConvictionBadge conviction={item.conviction} />
              </div>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.summary}</p>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {item.tickers.length > 0 && (
                  <div className="flex gap-1">
                    {item.tickers.map((ticker) => (
                      <span key={ticker} className="px-2 py-0.5 rounded bg-white/10 text-xs text-foreground font-medium">
                        {ticker}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{item.author}</span>
              </div>
              <div className="flex gap-1">
                {item.labels.map((label) => (
                  <LabelBadge key={label} label={label} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No research found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
