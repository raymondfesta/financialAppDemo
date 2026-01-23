"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from "recharts"
import {
  performanceHistory,
  returnStats,
  riskMetrics,
  factorExposures,
  attribution,
  drawdownHistory,
  rollingReturns,
  strategyPerformance,
  positionAnalytics,
  correlationMatrix,
  riskContribution
} from "@/lib/mock-data"

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${value.toLocaleString()}`
}

function getCorrelationColor(value: number): string {
  if (value >= 0.7) return "bg-emerald-500/60"
  if (value >= 0.3) return "bg-emerald-500/30"
  if (value >= -0.3) return "bg-white/10"
  if (value >= -0.7) return "bg-red-500/30"
  return "bg-red-500/60"
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance attribution, risk analysis, and strategy metrics</p>
      </div>

      {/* Performance & Drawdown Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Performance Chart */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Performance vs Benchmark</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceHistory} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: '#a1a1a1', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#a1a1a1', fontSize: 10 }} axisLine={false} tickLine={false} domain={[95, 125]} />
                <Tooltip contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} labelStyle={{ color: '#fafafa' }} />
                <Line type="monotone" dataKey="portfolio" stroke="#3b82f6" strokeWidth={2} dot={false} name="Portfolio" />
                <Line type="monotone" dataKey="benchmark" stroke="#6b7280" strokeWidth={2} dot={false} strokeDasharray="4 4" name="Benchmark" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-blue-500 rounded" />
              <span className="text-xs text-muted-foreground">Portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-gray-500 rounded" />
              <span className="text-xs text-muted-foreground">Benchmark</span>
            </div>
          </div>
        </div>

        {/* Drawdown Chart */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Drawdown Analysis</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={drawdownHistory} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: '#a1a1a1', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#a1a1a1', fontSize: 10 }} axisLine={false} tickLine={false} domain={[-10, 0]} />
                <Tooltip contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} labelStyle={{ color: '#fafafa' }} formatter={(value: number) => [`${value.toFixed(1)}%`, 'Drawdown']} />
                <Area type="monotone" dataKey="drawdown" stroke="#ef4444" fill="#ef4444" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-muted-foreground">Max Drawdown</span>
            <span className="text-red-400 font-medium">{riskMetrics.maxDrawdown.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Rolling Returns & Return Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Rolling Returns */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Rolling Returns</h3>
          <div className="space-y-3">
            {rollingReturns.map((r) => (
              <div key={r.period} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{r.period}</span>
                  <div className="flex items-center gap-3">
                    <span className={r.portfolio >= 0 ? 'text-emerald-400' : 'text-red-400'}>{formatPercent(r.portfolio)}</span>
                    <span className="text-muted-foreground text-[10px]">{r.percentile}th %ile</span>
                  </div>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-chart-1 rounded-full" style={{ width: `${r.percentile}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Stats */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Return Statistics</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2">Period</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2">Return</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2">Alpha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {returnStats.map((stat) => (
                  <tr key={stat.period}>
                    <td className="py-2 text-sm text-foreground">{stat.period}</td>
                    <td className={`py-2 text-sm text-right ${stat.return >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(stat.return)}
                    </td>
                    <td className={`py-2 text-sm text-right font-medium ${stat.alpha >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(stat.alpha)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Risk Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Sharpe", value: riskMetrics.sharpe.toFixed(2) },
              { label: "Sortino", value: riskMetrics.sortino.toFixed(2) },
              { label: "Max DD", value: `${riskMetrics.maxDrawdown.toFixed(1)}%`, negative: true },
              { label: "Beta", value: riskMetrics.beta.toFixed(2) },
              { label: "Volatility", value: `${riskMetrics.volatility.toFixed(1)}%` },
              { label: "VaR 95%", value: `${(riskMetrics.var95 * 100).toFixed(2)}%` },
            ].map((metric) => (
              <div key={metric.label} className="dashboard-container-nested p-2">
                <p className="text-[10px] text-muted-foreground mb-1">{metric.label}</p>
                <p className={`text-sm font-semibold ${metric.negative ? 'text-red-400' : 'text-foreground'}`}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategy Performance */}
      <div className="dashboard-container p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Strategy Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground py-2 px-2">Strategy</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">AUM</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">MTD</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">YTD</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Sharpe</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Sortino</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Max DD</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {strategyPerformance.map((s) => (
                <tr key={s.name} className="hover:bg-white/[0.02]">
                  <td className="py-2 px-2 text-sm font-medium text-foreground">{s.name}</td>
                  <td className="py-2 px-2 text-sm text-foreground text-right">{formatCurrency(s.aum)}</td>
                  <td className={`py-2 px-2 text-sm text-right ${s.mtd >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatPercent(s.mtd)}</td>
                  <td className={`py-2 px-2 text-sm text-right ${s.ytd >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatPercent(s.ytd)}</td>
                  <td className="py-2 px-2 text-sm text-foreground text-right">{s.sharpe.toFixed(2)}</td>
                  <td className="py-2 px-2 text-sm text-foreground text-right">{s.sortino.toFixed(2)}</td>
                  <td className="py-2 px-2 text-sm text-red-400 text-right">{s.maxDrawdown.toFixed(1)}%</td>
                  <td className="py-2 px-2 text-sm text-foreground text-right">{s.winRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Factor Exposures, Attribution, Risk Contribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Factor Exposures */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Factor Exposures</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={factorExposures} layout="vertical" margin={{ top: 5, right: 10, bottom: 5, left: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: '#a1a1a1', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="factor" type="category" tick={{ fill: '#a1a1a1', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} labelStyle={{ color: '#fafafa' }} />
                <Bar dataKey="exposure" radius={[0, 4, 4, 0]}>
                  {factorExposures.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.exposure >= 0 ? '#3b82f6' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attribution */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Performance Attribution (YTD)</h3>
          <div className="space-y-2">
            {attribution.map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <div className="w-28 text-xs text-muted-foreground truncate">{item.category}</div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.abs(item.contribution) / 5 * 100}%`, backgroundColor: item.color }} />
                </div>
                <div className={`w-12 text-xs text-right font-medium ${item.contribution >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatPercent(item.contribution)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-border flex justify-between">
            <span className="text-xs text-muted-foreground">Total Alpha</span>
            <span className="text-xs font-semibold text-emerald-400">{formatPercent(attribution.reduce((sum, a) => sum + a.contribution, 0))}</span>
          </div>
        </div>

        {/* Risk Contribution */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Risk Contribution</h3>
          <div className="space-y-2">
            {riskContribution.map((r) => (
              <div key={r.strategy} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{r.strategy}</span>
                  <span className="text-foreground">{r.varContribution}% VaR</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="h-full bg-chart-1" style={{ width: `${r.varContribution}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Position Analytics & Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Position Analytics */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Top Position Analytics</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2 px-2">Ticker</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Weight</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Contrib</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Sharpe</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Beta</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2 px-2">Corr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {positionAnalytics.slice(0, 6).map((p) => (
                  <tr key={p.ticker} className="hover:bg-white/[0.02]">
                    <td className="py-2 px-2">
                      <span className="text-sm font-medium text-foreground">{p.ticker}</span>
                      <span className="text-[10px] text-muted-foreground ml-1">{p.strategy}</span>
                    </td>
                    <td className="py-2 px-2 text-sm text-muted-foreground text-right">{p.weight.toFixed(1)}%</td>
                    <td className={`py-2 px-2 text-sm text-right ${p.contribution >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{formatPercent(p.contribution)}</td>
                    <td className="py-2 px-2 text-sm text-foreground text-right">{p.sharpe.toFixed(2)}</td>
                    <td className="py-2 px-2 text-sm text-foreground text-right">{p.beta.toFixed(2)}</td>
                    <td className="py-2 px-2 text-sm text-muted-foreground text-right">{p.correlation.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Correlation Matrix */}
        <div className="dashboard-container p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Correlation Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-[10px] font-medium text-muted-foreground py-1 px-1"></th>
                  {correlationMatrix.assets.map((asset) => (
                    <th key={asset} className="text-center text-[10px] font-medium text-muted-foreground py-1 px-1 truncate">{asset.slice(0, 6)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.assets.map((asset, i) => (
                  <tr key={asset}>
                    <td className="text-[10px] text-muted-foreground py-1 px-1 truncate">{asset.slice(0, 8)}</td>
                    {correlationMatrix.data[i].map((value, j) => (
                      <td key={j} className="py-1 px-1">
                        <div className={`w-8 h-8 flex items-center justify-center text-[10px] rounded ${getCorrelationColor(value)}`}>
                          {value.toFixed(2)}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
