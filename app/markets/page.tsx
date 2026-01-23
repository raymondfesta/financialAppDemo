"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { indices, coreHoldings, watchlistItems, sectorETFs, sectorPerformance, marketNews, type WatchlistItem } from "@/lib/mock-data"

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

function MarketTable({ items }: { items: WatchlistItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Ticker</th>
            <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Name</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Last</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Change</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Change %</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Volume</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">52W High</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">52W Low</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.ticker} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 text-sm font-medium text-foreground">{item.ticker}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground">{item.name}</td>
              <td className="py-3 px-4 text-sm text-foreground text-right">${item.last.toFixed(2)}</td>
              <td className={`py-3 px-4 text-sm text-right ${item.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right">
                <span className={`inline-flex items-center gap-1 text-sm ${item.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatPercent(item.changePercent)}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">
                {(item.volume / 1_000_000).toFixed(1)}M
              </td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">${item.high52w.toFixed(2)}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">${item.low52w.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState<"core" | "watchlist" | "etfs">("core")

  const tabData = {
    core: coreHoldings,
    watchlist: watchlistItems,
    etfs: sectorETFs,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Markets</h1>
        <p className="text-sm text-muted-foreground mt-1">Market data, watchlists, and sector performance</p>
      </div>

      {/* Indices Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {indices.map((index) => (
          <div
            key={index.symbol}
            className="dashboard-container-flat p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{index.name}</span>
              <span className={`flex items-center gap-0.5 text-xs ${index.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {index.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {formatPercent(index.changePercent)}
              </span>
            </div>
            <p className="text-2xl font-semibold text-foreground">
              {index.symbol === "TNX" ? `${index.value.toFixed(2)}%` : index.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Watchlist Section */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div
            className="p-1 inline-flex gap-1 rounded-lg mb-4"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
          >
            {[
              { id: "core" as const, label: "Core Holdings" },
              { id: "watchlist" as const, label: "Watchlist" },
              { id: "etfs" as const, label: "Sector ETFs" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white/10 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table */}
          <div
            className="dashboard-container-flat"
          >
            <MarketTable items={tabData[activeTab]} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Sector Heatmap */}
          <div className="dashboard-container-flat p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Sector Performance</h3>
            <div className="grid grid-cols-2 gap-2">
              {sectorPerformance.map((sector) => (
                <div
                  key={sector.name}
                  className="p-2 rounded-md"
                  style={{
                    background: sector.change >= 0
                      ? `rgba(34, 197, 94, ${Math.min(sector.change / 5, 0.3)})`
                      : `rgba(239, 68, 68, ${Math.min(Math.abs(sector.change) / 5, 0.3)})`,
                  }}
                >
                  <p className="text-xs text-muted-foreground truncate">{sector.name}</p>
                  <p className={`text-sm font-medium ${sector.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercent(sector.change)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Market News */}
          <div className="dashboard-container-flat p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Market News</h3>
            <div className="space-y-3">
              {marketNews.map((news) => (
                <div key={news.id} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <p className="text-sm text-foreground leading-tight mb-1">{news.headline}</p>
                  <p className="text-xs text-muted-foreground">{news.time} • {news.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
