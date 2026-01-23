import { ArrowUp, ArrowDown, Bot } from "lucide-react"
import { recentInsights } from "@/lib/mock-data"

interface InsightsFeedProps {
  isOpen: boolean
  onClose: () => void
}

function TrendIcon({ type }: { type: "bullish" | "bearish" | "neutral" }) {
  if (type === "bullish") {
    return <ArrowUp className="h-3 w-3 text-emerald-400" />
  }
  if (type === "bearish") {
    return <ArrowDown className="h-3 w-3 text-red-400" />
  }
  return <Bot className="h-3 w-3 text-amber-400" />
}

export function InsightsFeed({ isOpen }: InsightsFeedProps) {
  return (
    <aside
      className={`
        flex flex-col bg-sidebar border-l border-border h-screen
        transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "w-72 xl:w-80" : "w-0 border-l-0"}
      `}
    >
      <div className="h-12 px-4 border-b border-border min-w-72 xl:min-w-80 shrink-0 flex items-center">
        <h2 className="text-sm font-semibold text-foreground">Agent Insights Feed</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0 min-w-72 xl:min-w-80">
        {recentInsights.map((item) => (
          <div key={item.id} className="px-4 py-4 border-b border-border last:border-b-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground">{item.ticker}</span>
                <TrendIcon type={item.type} />
              </div>
              <span className="text-xs text-muted-foreground">{item.timestamp}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {item.insight}
            </p>
            <p className="text-xs text-muted-foreground/70">
              Source: {item.agentName}
            </p>
          </div>
        ))}
      </div>
    </aside>
  )
}
