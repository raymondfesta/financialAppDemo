"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { portfolioStrategies, type Holding } from "@/lib/mock-data"

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  return `$${value.toLocaleString()}`
}

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Ticker</th>
            <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Name</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Shares</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Market Value</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Weight</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Cost Basis</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Unrealized P&L</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Day Change</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Conviction</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {holdings.map((holding) => (
            <tr key={holding.ticker} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 text-sm font-medium text-foreground">{holding.ticker}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground">{holding.name}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">{holding.shares.toLocaleString()}</td>
              <td className="py-3 px-4 text-sm text-foreground text-right">{formatCurrency(holding.marketValue)}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">{holding.weight.toFixed(2)}%</td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">{formatCurrency(holding.costBasis)}</td>
              <td className={`py-3 px-4 text-sm text-right ${holding.unrealizedPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(holding.unrealizedPL)}
              </td>
              <td className="py-3 px-4 text-right">
                <span className={`inline-flex items-center gap-1 text-sm ${holding.dayChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {holding.dayChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatPercent(holding.dayChange)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                {holding.convictionScore > 0 && (
                  <span className={`text-sm font-medium ${
                    holding.convictionScore >= 85 ? 'text-emerald-400' :
                    holding.convictionScore >= 70 ? 'text-blue-400' : 'text-muted-foreground'
                  }`}>
                    {holding.convictionScore}/100
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PortfoliosPage() {
  const [activeTab, setActiveTab] = useState(portfolioStrategies[0].id)
  const activeStrategy = portfolioStrategies.find(s => s.id === activeTab)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Portfolios</h1>
        <p className="text-sm text-muted-foreground mt-1">Holdings breakdown by strategy</p>
      </div>

      {/* Strategy Tabs */}
      <div
        className="p-1 inline-flex gap-1 rounded-lg"
        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
      >
        {portfolioStrategies.map((strategy) => (
          <button
            key={strategy.id}
            onClick={() => setActiveTab(strategy.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === strategy.id
                ? 'bg-white/10 text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {strategy.name}
            <span className="ml-2 text-xs text-muted-foreground">
              {formatCurrency(strategy.aum)}
            </span>
          </button>
        ))}
      </div>

      {/* Holdings Table */}
      {activeStrategy && (
        <div className="dashboard-container-flat">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">{activeStrategy.name} Holdings</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {activeStrategy.holdings.length} positions | {formatCurrency(activeStrategy.aum)} AUM
            </p>
          </div>
          <HoldingsTable holdings={activeStrategy.holdings} />
        </div>
      )}

      {/* Sector Breakdown */}
      <div className="dashboard-container-flat p-4">
        <h3 className="text-sm font-semibold text-foreground mb-4">Sector Breakdown</h3>
        <div className="space-y-2">
          {activeStrategy && (() => {
            const sectorTotals = activeStrategy.holdings.reduce((acc, h) => {
              acc[h.sector] = (acc[h.sector] || 0) + h.marketValue
              return acc
            }, {} as Record<string, number>)
            const total = Object.values(sectorTotals).reduce((a, b) => a + b, 0)
            const sectors = Object.entries(sectorTotals)
              .map(([name, value]) => ({ name, value, pct: (value / total) * 100 }))
              .sort((a, b) => b.value - a.value)

            const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))']

            return sectors.map((sector, i) => (
              <div key={sector.name} className="flex items-center gap-3">
                <div className="w-28 text-xs text-muted-foreground">{sector.name}</div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${sector.pct}%`, backgroundColor: colors[i % colors.length] }}
                  />
                </div>
                <div className="w-16 text-xs text-muted-foreground text-right">{sector.pct.toFixed(1)}%</div>
                <div className="w-20 text-xs text-foreground text-right">{formatCurrency(sector.value)}</div>
              </div>
            ))
          })()}
        </div>
      </div>
    </div>
  )
}
