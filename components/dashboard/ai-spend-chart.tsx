"use client"

const sentimentData = [
  { ticker: "NVDA", percentage: 92, score: "92", colorClass: "bg-chart-2" },
  { ticker: "MSFT", percentage: 78, score: "78", colorClass: "bg-chart-1" },
  { ticker: "GOOGL", percentage: 71, score: "71", colorClass: "bg-chart-3" },
  { ticker: "AMZN", percentage: 65, score: "65", colorClass: "bg-chart-4" },
  { ticker: "META", percentage: 58, score: "58", colorClass: "bg-chart-5" },
]

export function AISpendChart() {
  return (
    <div className="dashboard-container-nested p-4">
      <h3 className="text-sm font-semibold text-foreground mb-0.5">AI Sentiment Analysis</h3>
      <p className="text-xs text-muted-foreground mb-4">Boosted Conviction Score (Top 5 Holdings)</p>
      
      <div className="space-y-2.5">
        {sentimentData.map((item) => (
          <div key={item.ticker} className="flex items-center gap-3">
            <span className="text-xs font-medium text-foreground w-11 shrink-0">{item.ticker}</span>
            <div className="flex-1 h-3.5 bg-transparent rounded overflow-hidden">
              <div
                className={`h-full rounded transition-all duration-500 ${item.colorClass}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-16 text-right shrink-0">
              {item.score}/100
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
