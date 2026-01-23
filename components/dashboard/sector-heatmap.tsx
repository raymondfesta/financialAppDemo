import { sectorPerformance } from "@/lib/mock-data/market"

function getColorClass(change: number): string {
  if (change >= 1.5) return "bg-emerald-500/30 text-emerald-400"
  if (change >= 0.5) return "bg-emerald-500/20 text-emerald-400"
  if (change >= 0) return "bg-emerald-500/10 text-emerald-400/80"
  if (change >= -0.5) return "bg-red-500/10 text-red-400/80"
  return "bg-red-500/20 text-red-400"
}

export function SectorHeatmap() {
  return (
    <div className="dashboard-container p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Sector Performance</h3>
      <div className="grid grid-cols-5 gap-2">
        {sectorPerformance.map((sector) => (
          <div
            key={sector.name}
            className={`rounded-md p-2 text-center ${getColorClass(sector.change)}`}
          >
            <p className="text-[10px] font-medium truncate">{sector.name}</p>
            <p className="text-xs font-semibold">
              {sector.change >= 0 ? "+" : ""}{sector.change.toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
