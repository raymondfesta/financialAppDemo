"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"
import { performanceHistory, returnStats, riskMetrics, factorExposures, attribution } from "@/lib/mock-data"

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Performance attribution and risk analysis</p>
      </div>

      {/* Performance Chart */}
      <div className="dashboard-container-flat p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Performance vs Benchmark</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="date" tick={{ fill: '#a1a1a1', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
              <YAxis tick={{ fill: '#a1a1a1', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
              <Tooltip
                contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                labelStyle={{ color: '#fafafa' }}
              />
              <Line type="monotone" dataKey="portfolio" stroke="#3b82f6" strokeWidth={2} dot={false} name="Portfolio" />
              <Line type="monotone" dataKey="benchmark" stroke="#6b7280" strokeWidth={2} dot={false} name="S&P 500" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-blue-500 rounded" />
            <span className="text-xs text-muted-foreground">Portfolio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-gray-500 rounded" />
            <span className="text-xs text-muted-foreground">S&P 500</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Return Stats */}
        <div className="dashboard-container-flat p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Return Statistics</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground py-2">Period</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2">Return</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2">Benchmark</th>
                  <th className="text-right text-xs font-medium text-muted-foreground py-2">Alpha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {returnStats.map((stat) => (
                  <tr key={stat.period}>
                    <td className="py-2 text-sm text-foreground">{stat.period}</td>
                    <td className={`py-2 text-sm text-right ${stat.return >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatPercent(stat.return)}
                    </td>
                    <td className={`py-2 text-sm text-right ${stat.benchmark >= 0 ? 'text-muted-foreground' : 'text-red-400'}`}>
                      {formatPercent(stat.benchmark)}
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
        <div className="dashboard-container-flat p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Risk Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Sharpe Ratio", value: riskMetrics.sharpe.toFixed(2) },
              { label: "Sortino Ratio", value: riskMetrics.sortino.toFixed(2) },
              { label: "Max Drawdown", value: `${riskMetrics.maxDrawdown.toFixed(1)}%`, negative: true },
              { label: "Beta", value: riskMetrics.beta.toFixed(2) },
              { label: "Volatility", value: `${riskMetrics.volatility.toFixed(1)}%` },
              { label: "VaR (95%)", value: `${(riskMetrics.var95 * 100).toFixed(2)}%` },
              { label: "Tracking Error", value: `${riskMetrics.trackingError.toFixed(1)}%` },
              { label: "Information Ratio", value: riskMetrics.informationRatio.toFixed(2) },
            ].map((metric) => (
              <div key={metric.label} className="dashboard-container-nested p-3">
                <p className="text-xs text-muted-foreground mb-2">{metric.label}</p>
                <p className={`text-lg font-semibold ${metric.negative ? 'text-red-400' : 'text-foreground'}`}>
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Factor Exposures & Attribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Factor Exposures */}
        <div className="dashboard-container-flat p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Factor Exposures</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={factorExposures} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 70 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" tick={{ fill: '#a1a1a1', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                <YAxis dataKey="factor" type="category" tick={{ fill: '#a1a1a1', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                <Tooltip
                  contentStyle={{ background: '#171717', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  labelStyle={{ color: '#fafafa' }}
                />
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
        <div className="dashboard-container-flat p-4">
          <h3 className="text-sm font-semibold text-foreground mb-3">Performance Attribution (YTD)</h3>
          <div className="space-y-3">
            {attribution.map((item) => (
              <div key={item.category} className="flex items-center gap-3">
                <div className="w-32 text-sm text-muted-foreground">{item.category}</div>
                <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative">
                  {item.contribution >= 0 ? (
                    <div
                      className="h-full rounded-full transition-all duration-500 absolute left-0"
                      style={{ width: `${(item.contribution / 5) * 100}%`, backgroundColor: item.color }}
                    />
                  ) : (
                    <div
                      className="h-full rounded-full transition-all duration-500 absolute right-0 bg-red-500"
                      style={{ width: `${(Math.abs(item.contribution) / 5) * 100}%` }}
                    />
                  )}
                </div>
                <div className={`w-16 text-sm text-right font-medium ${item.contribution >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatPercent(item.contribution)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between">
            <span className="text-sm text-muted-foreground">Total Alpha</span>
            <span className="text-sm font-semibold text-emerald-400">
              {formatPercent(attribution.reduce((sum, a) => sum + a.contribution, 0))}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
