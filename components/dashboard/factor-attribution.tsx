import { attribution } from "@/lib/mock-data/performance"

export function FactorAttribution() {
  const totalPositive = attribution.filter((a) => a.contribution > 0).reduce((sum, a) => sum + a.contribution, 0)

  return (
    <div className="dashboard-container-nested p-4 h-full">
      <h3 className="text-sm font-semibold text-foreground mb-3">YTD Attribution</h3>
      <div className="space-y-2">
        {attribution.map((item) => (
          <div key={item.category} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{item.category}</span>
              <span className={item.contribution >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                {item.contribution >= 0 ? "+" : ""}{item.contribution.toFixed(1)}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${Math.abs(item.contribution) / totalPositive * 100}%`,
                  backgroundColor: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total Alpha</span>
        <span className="text-emerald-400 font-medium">
          +{attribution.reduce((sum, a) => sum + a.contribution, 0).toFixed(1)}%
        </span>
      </div>
    </div>
  )
}
