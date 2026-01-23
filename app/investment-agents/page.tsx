import { Search, TrendingUp, Newspaper, FileText, Calculator, Shield, ArrowUp, ArrowDown, Bot, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { agents, recentInsights, agentStats } from "@/lib/mock-data"

const iconMap: Record<string, React.ElementType> = {
  Search,
  TrendingUp,
  Newspaper,
  FileText,
  Calculator,
  Shield,
}

function StatusBadge({ status }: { status: "live" | "paused" | "error" }) {
  const styles = {
    live: "bg-emerald-500/20 text-emerald-400",
    paused: "bg-yellow-500/20 text-yellow-400",
    error: "bg-red-500/20 text-red-400",
  }

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function InsightIcon({ type }: { type: "bullish" | "bearish" | "neutral" }) {
  if (type === "bullish") return <ArrowUp className="w-3 h-3 text-emerald-400" />
  if (type === "bearish") return <ArrowDown className="w-3 h-3 text-red-400" />
  return <Bot className="w-3 h-3 text-yellow-400" />
}

export default function InvestmentAgentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Investment Agents</h1>
          <p className="text-sm text-muted-foreground mt-1">Autonomous AI agents performing research and analysis</p>
        </div>
        <Button className="bg-chart-1 text-white hover:bg-chart-1/90">
          <Plus />
          Create Agent
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="dashboard-container-flat p-4">
          <p className="text-xs text-muted-foreground mb-2">Total Agents</p>
          <p className="text-2xl font-semibold text-foreground">{agentStats.totalAgents}</p>
        </div>
        <div className="dashboard-container-flat p-4">
          <p className="text-xs text-muted-foreground mb-2">Active</p>
          <p className="text-2xl font-semibold text-emerald-400">{agentStats.activeAgents}</p>
        </div>
        <div className="dashboard-container-flat p-4">
          <p className="text-xs text-muted-foreground mb-2">Insights Today</p>
          <p className="text-2xl font-semibold text-blue-400">{agentStats.insightsToday}</p>
        </div>
        <div className="dashboard-container-flat p-4">
          <p className="text-xs text-muted-foreground mb-2">Avg Accuracy</p>
          <p className="text-2xl font-semibold text-foreground">{agentStats.avgAccuracy}%</p>
        </div>
      </div>

      {/* Agent Grid */}
      <div>
        <h2 className="text-sm font-semibold text-foreground mb-4">Agent Fleet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => {
            const IconComponent = iconMap[agent.icon] || Bot
            return (
              <div
                key={agent.id}
                className="dashboard-container-flat p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-chart-1/20">
                      <IconComponent className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                      <p className="text-xs text-muted-foreground">{agent.lastActivity}</p>
                    </div>
                  </div>
                  <StatusBadge status={agent.status} />
                </div>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{agent.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {agent.insightsGenerated.toLocaleString()} insights
                  </span>
                  <span className="text-emerald-400 font-medium">{agent.accuracy}% accuracy</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="dashboard-container-flat">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground">Recent Agent Activity</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Latest AI-generated insights</p>
        </div>
        <div className="divide-y divide-border">
          {recentInsights.map((insight) => (
            <div key={insight.id} className="px-5 py-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{insight.ticker}</span>
                  <InsightIcon type={insight.type} />
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    insight.priority === "high" ? "bg-red-500/20 text-red-400" :
                    insight.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                    "bg-white/10 text-muted-foreground"
                  }`}>
                    {insight.priority}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{insight.insight}</p>
              <p className="text-xs text-muted-foreground/70">Source: {insight.agentName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
