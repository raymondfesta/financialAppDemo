import { TrendingUp, TrendingDown } from "lucide-react"
import { indices } from "@/lib/mock-data/market"

function formatNumber(value: number, symbol: string): string {
  if (symbol === "TNX") return value.toFixed(2) + "%"
  if (symbol === "VIX") return value.toFixed(2)
  return value.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

export function MarketIndices() {
  return (
    <div className="dashboard-container p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Market Indices</h3>
      <div className="flex flex-wrap gap-4">
        {indices.map((index) => (
          <div key={index.symbol} className="flex items-center gap-3 pr-4 border-r border-border last:border-0 last:pr-0">
            <div>
              <p className="text-xs text-muted-foreground">{index.symbol}</p>
              <p className="text-sm font-medium text-foreground">{formatNumber(index.value, index.symbol)}</p>
            </div>
            <div className={`flex items-center gap-0.5 ${index.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {index.changePercent >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="text-xs font-medium">
                {index.changePercent >= 0 ? "+" : ""}{index.changePercent.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
