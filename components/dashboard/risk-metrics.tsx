import { riskMetrics } from "@/lib/mock-data/performance"

const metrics = [
  { key: "sortino", label: "Sortino", value: riskMetrics.sortino.toFixed(2) },
  { key: "maxDrawdown", label: "Max Drawdown", value: `${riskMetrics.maxDrawdown.toFixed(1)}%`, negative: true },
  { key: "volatility", label: "Volatility", value: `${riskMetrics.volatility.toFixed(1)}%` },
  { key: "trackingError", label: "Tracking Error", value: `${riskMetrics.trackingError.toFixed(1)}%` },
  { key: "informationRatio", label: "Info Ratio", value: riskMetrics.informationRatio.toFixed(2) },
  { key: "var95", label: "VaR (95%)", value: `${(riskMetrics.var95 * 100).toFixed(1)}%` },
]

export function RiskMetrics() {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((metric) => (
        <div key={metric.key} className="dashboard-container p-3">
          <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
          <p className={`text-lg font-semibold ${metric.negative ? 'text-red-400' : 'text-foreground'}`}>
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  )
}
