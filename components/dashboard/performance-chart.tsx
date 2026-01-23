"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { performanceHistory, returnStats } from "@/lib/mock-data/performance"

const chartConfig = {
  portfolio: {
    label: "Portfolio",
    color: "var(--chart-1)",
  },
  benchmark: {
    label: "Benchmark",
    color: "var(--chart-5)",
  },
}

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(1)}%`
}

export function PerformanceChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Chart */}
      <div className="dashboard-container lg:col-span-2 p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Performance vs Benchmark</h3>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart data={performanceHistory} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              domain={[95, 125]}
              tickFormatter={(v) => `${v}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="var(--chart-5)"
              strokeWidth={2}
              dot={false}
              strokeDasharray="4 4"
            />
          </LineChart>
        </ChartContainer>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-chart-1 rounded" />
            <span>Portfolio</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-chart-5 rounded" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--chart-5) 0 4px, transparent 4px 8px)" }} />
            <span>Benchmark</span>
          </div>
        </div>
      </div>

      {/* Return Stats */}
      <div className="dashboard-container p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Returns</h3>
        <div className="space-y-2">
          {returnStats.slice(0, 4).map((stat) => (
            <div key={stat.period} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
              <span className="text-xs text-muted-foreground">{stat.period}</span>
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${stat.return >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatPercent(stat.return)}
                </span>
                <span className={`text-xs ${stat.alpha >= 0 ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                  α {formatPercent(stat.alpha)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
