"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react"
import {
  indices,
  globalIndices,
  coreHoldings,
  watchlistItems,
  sectorETFs,
  sectorPerformance,
  marketNews,
  currencies,
  commodities,
  treasuryYields,
  optionsFlow,
  marketBreadth,
  type WatchlistItem
} from "@/lib/mock-data"

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

function formatVolume(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return value.toString()
}

function formatPremium(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

function MarketTable({ items }: { items: WatchlistItem[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">Ticker</th>
            <th className="text-left text-xs font-medium text-muted-foreground py-3 px-3">Name</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-3">Last</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-3">Chg %</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-3">Volume</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-3">52W H/L</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {items.map((item) => (
            <tr key={item.ticker} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-2.5 px-3 text-sm font-medium text-foreground">{item.ticker}</td>
              <td className="py-2.5 px-3 text-sm text-muted-foreground truncate max-w-[140px]">{item.name}</td>
              <td className="py-2.5 px-3 text-sm text-foreground text-right">${item.last.toFixed(2)}</td>
              <td className="py-2.5 px-3 text-right">
                <span className={`inline-flex items-center gap-0.5 text-sm ${item.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {item.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatPercent(item.changePercent)}
                </span>
              </td>
              <td className="py-2.5 px-3 text-sm text-muted-foreground text-right">{formatVolume(item.volume)}</td>
              <td className="py-2.5 px-3 text-xs text-muted-foreground text-right">
                ${item.high52w.toFixed(0)} / ${item.low52w.toFixed(0)}
              </td>
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
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Markets</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time market data and portfolio watchlists</p>
      </div>

      {/* US Indices Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {indices.map((index) => (
          <div key={index.symbol} className="dashboard-container p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">{index.name}</span>
              <span className={`flex items-center gap-0.5 text-xs ${index.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {index.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {formatPercent(index.changePercent)}
              </span>
            </div>
            <p className="text-xl font-semibold text-foreground">
              {index.symbol === "TNX" ? `${index.value.toFixed(2)}%` : index.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      {/* Global Indices */}
      <div className="dashboard-container p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Global Indices</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {globalIndices.map((index) => (
            <div key={index.symbol} className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{index.name}</p>
                <p className="text-sm font-medium text-foreground">{index.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              </div>
              <span className={`text-xs ${index.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatPercent(index.changePercent)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Currencies, Commodities, Treasury */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Currencies */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">FX Rates</h3>
          <div className="space-y-2">
            {currencies.map((fx) => (
              <div key={fx.pair} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                <span className="text-xs text-muted-foreground">{fx.pair}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{fx.rate.toFixed(4)}</span>
                  <span className={`text-xs ${fx.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercent(fx.changePercent)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commodities */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Commodities</h3>
          <div className="space-y-2">
            {commodities.map((c) => (
              <div key={c.symbol} className="flex items-center justify-between py-1 border-b border-border/50 last:border-0">
                <span className="text-xs text-muted-foreground">{c.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {c.symbol === "BTC" ? `$${c.price.toLocaleString()}` : `$${c.price.toFixed(2)}`}{c.unit}
                  </span>
                  <span className={`text-xs ${c.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercent(c.changePercent)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Treasury Yield Curve */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Treasury Yields</h3>
          <div className="flex items-end justify-between h-[140px] px-1">
            {treasuryYields.map((t) => (
              <div key={t.maturity} className="flex flex-col items-center gap-1">
                <div
                  className="w-6 bg-chart-1 rounded-t"
                  style={{ height: `${(t.yield / 5) * 100}px` }}
                />
                <span className="text-[10px] text-muted-foreground">{t.maturity}</span>
                <span className="text-xs font-medium text-foreground">{t.yield.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Watchlist Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div
            className="p-1 inline-flex gap-1 rounded-lg"
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
          <div className="dashboard-container">
            <MarketTable items={tabData[activeTab]} />
          </div>

          {/* Options Flow */}
          <div className="dashboard-container p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Unusual Options Flow</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-xs font-medium text-muted-foreground py-2 px-2">Ticker</th>
                    <th className="text-left text-xs font-medium text-muted-foreground py-2 px-2">Type</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Strike</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Expiry</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Premium</th>
                    <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Volume</th>
                    <th className="text-center text-xs font-medium text-muted-foreground py-2 px-2">Signal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {optionsFlow.map((opt, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="py-2 px-2 text-sm font-medium text-foreground">{opt.ticker}</td>
                      <td className="py-2 px-2">
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${opt.type === 'call' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {opt.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-sm text-foreground text-right">${opt.strike}</td>
                      <td className="py-2 px-2 text-sm text-muted-foreground text-right">{opt.expiry}</td>
                      <td className="py-2 px-2 text-sm text-foreground text-right">{formatPremium(opt.premium)}</td>
                      <td className="py-2 px-2 text-sm text-muted-foreground text-right">{formatVolume(opt.volume)}</td>
                      <td className="py-2 px-2 text-center">
                        <span className={`text-xs ${opt.sentiment === 'bullish' ? 'text-emerald-400' : opt.sentiment === 'bearish' ? 'text-red-400' : 'text-muted-foreground'}`}>
                          {opt.sentiment === 'bullish' ? <ArrowUp className="w-3 h-3 inline" /> : opt.sentiment === 'bearish' ? <ArrowDown className="w-3 h-3 inline" /> : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Market Breadth */}
          <div className="dashboard-container p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Market Breadth</h3>
            <div className="space-y-3">
              {marketBreadth.map((item) => (
                <div key={item.metric} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">
                        {item.metric === "Fear & Greed" || item.metric.includes("%") ? item.value : item.value.toFixed(2)}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${item.signal === 'bullish' ? 'bg-emerald-400' : item.signal === 'bearish' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Heatmap */}
          <div className="dashboard-container p-4">
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
          <div className="dashboard-container p-4">
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
