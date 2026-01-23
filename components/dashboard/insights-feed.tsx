import { ArrowUp, ArrowDown, Bot } from "lucide-react"

type TrendDirection = "up" | "down" | "neutral"

interface InsightItem {
  ticker: string
  date: string
  insight: string
  source: string
  trend: TrendDirection
}

interface InsightsFeedProps {
  isOpen: boolean
  onClose: () => void
}

const insights: InsightItem[] = [
  {
    ticker: "NVDA",
    date: "Jan 14, 2026",
    insight: "Blackwell GPU shipments ramping faster than expected. Institutional 13F filings show 12% increase in hedge fund positions.",
    source: "Investment Agent",
    trend: "up",
  },
  {
    ticker: "SMCI",
    date: "Jan 16, 2026",
    insight: "Unusual options activity detected. Large block trades suggest institutional accumulation ahead of earnings.",
    source: "Options Flow Agent",
    trend: "up",
  },
  {
    ticker: "AMD",
    date: "Jan 15, 2026",
    insight: "MI300X demand softening per supply chain checks. Competitor NVDA taking market share in enterprise AI.",
    source: "Research Agent",
    trend: "down",
  },
  {
    ticker: "MSFT",
    date: "Jan 14, 2026",
    insight: "Azure AI revenue run rate exceeded $10B. Copilot enterprise adoption accelerating with 40% QoQ growth.",
    source: "Earnings Agent",
    trend: "up",
  },
  {
    ticker: "GOOGL",
    date: "Jan 12, 2026",
    insight: "Gemini 2.0 API calls up 300% MoM. Cloud margins improving as AI workloads scale.",
    source: "Investment Agent",
    trend: "up",
  },
  {
    ticker: "PLTR",
    date: "Jan 18, 2026",
    insight: "AIP platform wins 3 new Fortune 100 contracts. Government segment showing renewed momentum.",
    source: "News Agent",
    trend: "neutral",
  },
  {
    ticker: "ORCL",
    date: "Jan 17, 2026",
    insight: "OCI capacity constraints easing. Multi-cloud partnerships with MSFT and GOOGL driving enterprise adoption.",
    source: "Research Agent",
    trend: "up",
  },
]

function TrendIcon({ trend }: { trend: TrendDirection }) {
  if (trend === "up") {
    return <ArrowUp className="h-3 w-3 text-emerald-500" />
  }
  if (trend === "down") {
    return <ArrowDown className="h-3 w-3 text-red-500" />
  }
  return <Bot className="h-3 w-3 text-amber-500" />
}

export function InsightsFeed({ isOpen }: InsightsFeedProps) {
  return (
    <aside 
      className={`
        flex flex-col bg-[#111111] border-l border-border h-screen
        transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? "w-72 xl:w-80" : "w-0 border-l-0"}
      `}
    >
      <div className="h-12 px-4 border-b border-border min-w-72 xl:min-w-80 shrink-0 flex items-center">
        <h2 className="text-sm font-semibold text-foreground">Agent Insights Feed</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto min-h-0 min-w-72 xl:min-w-80">
        {insights.map((item, index) => (
          <div key={index} className="px-4 py-4 border-b border-border last:border-b-0">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground">{item.ticker}</span>
                <TrendIcon trend={item.trend} />
              </div>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              {item.insight}
            </p>
            <p className="text-xs text-muted-foreground/70">
              Source: {item.source}
            </p>
          </div>
        ))}
      </div>
    </aside>
  )
}
