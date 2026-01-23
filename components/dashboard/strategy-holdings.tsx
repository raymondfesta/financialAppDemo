"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { portfolioStrategies, type Holding } from "@/lib/mock-data/portfolio"

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${value.toLocaleString()}`
}

function formatPL(value: number): string {
  const sign = value >= 0 ? "+" : ""
  if (Math.abs(value) >= 1_000_000) return `${sign}$${(value / 1_000_000).toFixed(1)}M`
  return `${sign}$${(value / 1_000).toFixed(0)}K`
}

function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-2 text-xs text-muted-foreground font-medium">Ticker</th>
            <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">Weight</th>
            <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">Value</th>
            <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">P&L</th>
            <th className="text-right py-2 px-2 text-xs text-muted-foreground font-medium">Day</th>
          </tr>
        </thead>
        <tbody>
          {holdings.slice(0, 5).map((h) => (
            <tr key={h.ticker} className="border-b border-border/50 last:border-0">
              <td className="py-2 px-2">
                <p className="font-medium text-foreground">{h.ticker}</p>
                <p className="text-xs text-muted-foreground truncate max-w-[120px]">{h.name}</p>
              </td>
              <td className="text-right py-2 px-2 text-muted-foreground">{h.weight.toFixed(1)}%</td>
              <td className="text-right py-2 px-2 text-foreground">{formatCurrency(h.marketValue)}</td>
              <td className={`text-right py-2 px-2 ${h.unrealizedPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatPL(h.unrealizedPL)}
              </td>
              <td className="text-right py-2 px-2">
                <div className={`flex items-center justify-end gap-0.5 ${h.dayChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {h.dayChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="text-xs">{h.dayChange >= 0 ? "+" : ""}{h.dayChange.toFixed(1)}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StrategyHoldings() {
  return (
    <div className="dashboard-container p-4">
      <Tabs defaultValue={portfolioStrategies[0].id}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Strategy Holdings</h3>
          <TabsList className="h-8">
            {portfolioStrategies.map((strategy) => (
              <TabsTrigger key={strategy.id} value={strategy.id} className="text-xs px-2 py-1">
                {strategy.name}
                <span className="ml-1 text-muted-foreground">({formatCurrency(strategy.aum)})</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {portfolioStrategies.map((strategy) => (
          <TabsContent key={strategy.id} value={strategy.id} className="mt-0">
            <HoldingsTable holdings={strategy.holdings} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
