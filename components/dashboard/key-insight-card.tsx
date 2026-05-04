import { Lightbulb } from "lucide-react"

export function KeyInsightCard() {
  return (
    <div className="dashboard-container-nested p-4 flex flex-col">
      <div className="flex items-center gap-1.5 mb-3">
        <h3 className="text-sm font-semibold text-foreground">Key Insight</h3>
        <Lightbulb className="h-4 w-4 text-amber-400 fill-amber-400/20" />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        Agentic analysis detected elevated institutional accumulation in semiconductor names. NVDA shows 92/100 conviction score with unusual options flow. Smart hedge basket suggests rotating 15% from software to chip infrastructure plays ahead of Q1 earnings.
      </p>

      <p className="text-xs text-muted-foreground/70 mt-4 pt-3 border-t border-border">
        Sources: AI Investment Agents, Real-time Options Flow, SEC 13F Filings
      </p>
    </div>
  )
}
