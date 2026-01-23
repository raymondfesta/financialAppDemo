import { TrendingUp, TrendingDown, Bot, Activity } from "lucide-react"
import { AISpendChart } from "@/components/dashboard/ai-spend-chart"
import { KeyInsightCard } from "@/components/dashboard/key-insight-card"
import { CapexTable } from "@/components/dashboard/capex-table"
import { fundSummary, allocations, topMovers } from "@/lib/mock-data"
import { agentStats } from "@/lib/mock-data/agents"

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  return `$${value.toLocaleString()}`
}

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Fund Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="dashboard-container p-4">
          <p className="text-xs text-muted-foreground mb-2">Assets Under Management</p>
          <p className="text-2xl font-semibold text-foreground">{formatCurrency(fundSummary.aum)}</p>
        </div>
        <div className="dashboard-container p-4">
          <p className="text-xs text-muted-foreground mb-2">MTD Return</p>
          <p className={`text-2xl font-semibold ${fundSummary.mtdReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatPercent(fundSummary.mtdReturn)}
          </p>
        </div>
        <div className="dashboard-container p-4">
          <p className="text-xs text-muted-foreground mb-2">YTD Return</p>
          <p className={`text-2xl font-semibold ${fundSummary.ytdReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {formatPercent(fundSummary.ytdReturn)}
          </p>
        </div>
        <div className="dashboard-container p-4">
          <p className="text-xs text-muted-foreground mb-2">Sharpe Ratio</p>
          <p className="text-2xl font-semibold text-foreground">{fundSummary.sharpeRatio.toFixed(2)}</p>
        </div>
      </div>

      {/* Agent Activity & Allocation Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Agent Activity */}
        <div className="dashboard-container p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bot className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Agent Activity</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Active Agents</p>
              <p className="text-xl font-semibold text-foreground">{agentStats.activeAgents}/{agentStats.totalAgents}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Insights Today</p>
              <p className="text-xl font-semibold text-blue-400">{agentStats.insightsToday}</p>
            </div>
          </div>
        </div>

        {/* Allocation */}
        <div className="dashboard-container lg:col-span-2 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Asset Allocation</h3>
          </div>
          <div className="flex gap-6">
            <div className="flex-1 space-y-2">
              {allocations.map((item) => (
                <div key={item.name} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-muted-foreground">{item.name}</div>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="w-12 text-xs text-muted-foreground text-right">{item.percentage}%</div>
                </div>
              ))}
            </div>
            <div className="w-px bg-border" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div>
                <p className="text-muted-foreground">Gross Exposure</p>
                <p className="text-foreground font-medium">{fundSummary.grossExposure}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Net Exposure</p>
                <p className="text-foreground font-medium">{fundSummary.netExposure}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">VaR (95%)</p>
                <p className="text-foreground font-medium">{formatCurrency(fundSummary.var95)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Beta</p>
                <p className="text-foreground font-medium">{fundSummary.beta.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Movers */}
      <div className="dashboard-container p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Top Movers Today</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {topMovers.map((mover) => (
            <div
              key={mover.ticker}
              className="dashboard-container-nested p-3"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{mover.ticker}</span>
                <div className={`flex items-center gap-0.5 ${mover.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {mover.changePercent >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-xs font-medium">{formatPercent(mover.changePercent)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground truncate">{mover.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="dashboard-container-elevated space-y-4 overflow-hidden">
        <div className="dashboard-container-header px-5 py-4">
          <h1 className="text-base font-semibold text-foreground">
            Market Structure and CapEX intelligence
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Hyperscaler AI CapEx Commitments (FY 2025-2026)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-5">
          <AISpendChart />
          <KeyInsightCard />
        </div>

        <div className="px-5 pb-5">
          <CapexTable />
        </div>
      </div>
    </div>
  )
}
