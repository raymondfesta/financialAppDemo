import { Lightbulb } from "lucide-react"

export function KeyInsightCard() {
  return (
    <div className="dashboard-container-nested p-4 flex flex-col">
      <div className="flex items-center gap-1.5 mb-3">
        <h3 className="text-sm font-semibold text-foreground">Key Insight</h3>
        <Lightbulb className="h-4 w-4 text-amber-400 fill-amber-400/20" />
      </div>
    </div>
  )
}
