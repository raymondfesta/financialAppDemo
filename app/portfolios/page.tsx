"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, AlertTriangle, Globe, DollarSign, Clock, BarChart3, Shield, Target } from "lucide-react"
import { portfolioStrategies, type Holding } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

// Strategy-specific metrics
const strategyMetrics: Record<string, {
  mtdReturn: number
  ytdReturn: number
  sharpe: number
  maxDrawdown: number
  beta: number
  alpha: number
  correlation: number
  var95: number
  informationRatio: number
  trackingError: number
}> = {
  "tech-growth": { mtdReturn: 4.2, ytdReturn: 28.4, sharpe: 2.12, maxDrawdown: -12.3, beta: 1.35, alpha: 8.2, correlation: 0.89, var95: 52_000_000, informationRatio: 1.45, trackingError: 6.8 },
  "value": { mtdReturn: 1.8, ytdReturn: 14.2, sharpe: 1.64, maxDrawdown: -8.6, beta: 0.92, alpha: 3.4, correlation: 0.78, var95: 28_000_000, informationRatio: 0.82, trackingError: 4.2 },
  "macro": { mtdReturn: -0.6, ytdReturn: 6.8, sharpe: 0.94, maxDrawdown: -5.2, beta: 0.45, alpha: 2.1, correlation: 0.32, var95: 18_000_000, informationRatio: 0.65, trackingError: 8.4 },
  "options": { mtdReturn: 2.1, ytdReturn: 12.6, sharpe: 1.38, maxDrawdown: -15.8, beta: 0.68, alpha: 5.8, correlation: 0.52, var95: 24_000_000, informationRatio: 0.94, trackingError: 12.2 },
}

// Recent trades data
const recentTrades: Array<{
  id: string
  timestamp: string
  ticker: string
  side: "BUY" | "SELL"
  shares: number
  price: number
  value: number
  strategy: string
  reason: string
}> = [
  { id: "T001", timestamp: "2025-01-23 14:32:18", ticker: "NVDA", side: "BUY", shares: 15000, price: 142.50, value: 2_137_500, strategy: "tech-growth", reason: "Blackwell ramp conviction increase" },
  { id: "T002", timestamp: "2025-01-23 13:45:22", ticker: "AVGO", side: "BUY", shares: 8500, price: 1005.25, value: 8_544_625, strategy: "tech-growth", reason: "AI ASIC revenue beat" },
  { id: "T003", timestamp: "2025-01-23 11:28:45", ticker: "TLT", side: "SELL", shares: 45000, price: 95.00, value: 4_275_000, strategy: "macro", reason: "Duration reduction - rate path reassessment" },
  { id: "T004", timestamp: "2025-01-23 10:15:33", ticker: "JPM", side: "BUY", shares: 22000, price: 240.00, value: 5_280_000, strategy: "value", reason: "NII guidance raise" },
  { id: "T005", timestamp: "2025-01-22 15:58:41", ticker: "XOM", side: "SELL", shares: 35000, price: 110.00, value: 3_850_000, strategy: "value", reason: "Trimming energy overweight" },
  { id: "T006", timestamp: "2025-01-22 14:22:17", ticker: "SPY Puts", side: "BUY", shares: 200, price: 12500.00, value: 2_500_000, strategy: "options", reason: "Tail hedge refresh" },
  { id: "T007", timestamp: "2025-01-22 11:45:09", ticker: "GOOGL", side: "BUY", shares: 18000, price: 178.20, value: 3_207_600, strategy: "tech-growth", reason: "AI monetization thesis" },
  { id: "T008", timestamp: "2025-01-22 09:32:55", ticker: "GLD", side: "BUY", shares: 12000, price: 240.00, value: 2_880_000, strategy: "macro", reason: "Geopolitical hedge" },
]

// Concentration data
const concentrationData = {
  top5Weight: 14.8,
  top10Weight: 24.2,
  top20Weight: 38.6,
  hhi: 425,
  activeShare: 78.4,
  positionCount: 42,
  avgPositionSize: 238_095_238,
}

// Liquidity data
const liquidityData: Array<{ bucket: string; value: number; pct: number; daysToLiquidate: string }> = [
  { bucket: "< 1 day", value: 4_200_000_000, pct: 42.0, daysToLiquidate: "Immediate" },
  { bucket: "1-5 days", value: 3_100_000_000, pct: 31.0, daysToLiquidate: "1-5d" },
  { bucket: "5-20 days", value: 1_800_000_000, pct: 18.0, daysToLiquidate: "1-4w" },
  { bucket: "20+ days", value: 900_000_000, pct: 9.0, daysToLiquidate: ">1m" },
]

// Geographic exposure
const geoExposure: Array<{ region: string; value: number; pct: number; change: number }> = [
  { region: "North America", value: 6_800_000_000, pct: 68.0, change: 2.4 },
  { region: "Europe", value: 1_200_000_000, pct: 12.0, change: -1.2 },
  { region: "Asia Pacific", value: 1_400_000_000, pct: 14.0, change: 0.8 },
  { region: "Emerging Markets", value: 400_000_000, pct: 4.0, change: -0.6 },
  { region: "Other", value: 200_000_000, pct: 2.0, change: 0.1 },
]

// Currency exposure
const currencyExposure: Array<{ currency: string; value: number; pct: number; hedgeRatio: number }> = [
  { currency: "USD", value: 7_200_000_000, pct: 72.0, hedgeRatio: 0 },
  { currency: "EUR", value: 1_100_000_000, pct: 11.0, hedgeRatio: 65 },
  { currency: "JPY", value: 800_000_000, pct: 8.0, hedgeRatio: 80 },
  { currency: "GBP", value: 500_000_000, pct: 5.0, hedgeRatio: 50 },
  { currency: "Other", value: 400_000_000, pct: 4.0, hedgeRatio: 40 },
]

// Factor exposures
const factorExposures: Array<{ factor: string; exposure: number; contribution: number }> = [
  { factor: "Market", exposure: 1.12, contribution: 8.4 },
  { factor: "Size", exposure: -0.24, contribution: -0.6 },
  { factor: "Value", exposure: 0.18, contribution: 0.8 },
  { factor: "Momentum", exposure: 0.42, contribution: 2.1 },
  { factor: "Quality", exposure: 0.35, contribution: 1.4 },
  { factor: "Volatility", exposure: -0.28, contribution: 1.2 },
]

function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`
  }
  return `$${value.toLocaleString()}`
}

function formatPercent(value: number): string {
  const sign = value >= 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}

function HoldingsTable({ holdings }: { holdings: Holding[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Ticker</th>
            <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Name</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Shares</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Market Value</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Weight</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Cost Basis</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Unrealized P&L</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Day Change</th>
            <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Conviction</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {holdings.map((holding) => (
            <tr key={holding.ticker} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-4 text-sm font-medium text-foreground">{holding.ticker}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground">{holding.name}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">{holding.shares.toLocaleString()}</td>
              <td className="py-3 px-4 text-sm text-foreground text-right">{formatCurrency(holding.marketValue)}</td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">{holding.weight.toFixed(2)}%</td>
              <td className="py-3 px-4 text-sm text-muted-foreground text-right">{formatCurrency(holding.costBasis)}</td>
              <td className={`py-3 px-4 text-sm text-right ${holding.unrealizedPL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {formatCurrency(holding.unrealizedPL)}
              </td>
              <td className="py-3 px-4 text-right">
                <span className={`inline-flex items-center gap-1 text-sm ${holding.dayChange >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {holding.dayChange >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {formatPercent(holding.dayChange)}
                </span>
              </td>
              <td className="py-3 px-4 text-right">
                {holding.convictionScore > 0 && (
                  <span className={`text-sm font-medium ${
                    holding.convictionScore >= 85 ? 'text-emerald-400' :
                    holding.convictionScore >= 70 ? 'text-blue-400' : 'text-muted-foreground'
                  }`}>
                    {holding.convictionScore}/100
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function PortfoliosPage() {
  const [activeTab, setActiveTab] = useState(portfolioStrategies[0].id)
  const activeStrategy = portfolioStrategies.find(s => s.id === activeTab)
  const metrics = strategyMetrics[activeTab]
  const strategyTrades = recentTrades.filter(t => t.strategy === activeTab)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Portfolio Management</h1>
        <p className="text-sm text-muted-foreground mt-1">$10B AUM across 4 strategies | 42 positions</p>
      </div>

      {/* Strategy Tabs */}
      <div
        className="p-1 inline-flex gap-1 rounded-lg"
        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
      >
        {portfolioStrategies.map((strategy) => (
          <button
            key={strategy.id}
            onClick={() => setActiveTab(strategy.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === strategy.id
                ? 'bg-white/10 text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {strategy.name}
            <span className="ml-2 text-xs text-muted-foreground">
              {formatCurrency(strategy.aum)}
            </span>
          </button>
        ))}
      </div>

      {/* Strategy Metrics Grid */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="dashboard-container p-3">
            <p className="text-xs text-muted-foreground">MTD Return</p>
            <p className={`text-lg font-semibold ${metrics.mtdReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatPercent(metrics.mtdReturn)}
            </p>
          </div>
          <div className="dashboard-container p-3">
            <p className="text-xs text-muted-foreground">YTD Return</p>
            <p className={`text-lg font-semibold ${metrics.ytdReturn >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatPercent(metrics.ytdReturn)}
            </p>
          </div>
          <div className="dashboard-container p-3">
            <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
            <p className="text-lg font-semibold text-foreground">{metrics.sharpe.toFixed(2)}</p>
          </div>
          <div className="dashboard-container p-3">
            <p className="text-xs text-muted-foreground">Max Drawdown</p>
            <p className="text-lg font-semibold text-red-400">{metrics.maxDrawdown.toFixed(1)}%</p>
          </div>
          <div className="dashboard-container p-3">
            <p className="text-xs text-muted-foreground">Beta</p>
            <p className="text-lg font-semibold text-foreground">{metrics.beta.toFixed(2)}</p>
          </div>
          <div className="dashboard-container p-3">
            <p className="text-xs text-muted-foreground">Alpha</p>
            <p className={`text-lg font-semibold ${metrics.alpha >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatPercent(metrics.alpha)}
            </p>
          </div>
          <div className="dashboard-container p-3">
            <p className="text-xs text-muted-foreground">Info Ratio</p>
            <p className="text-lg font-semibold text-foreground">{metrics.informationRatio.toFixed(2)}</p>
          </div>
          <div className="dashboard-container p-3">
            <p className="text-xs text-muted-foreground">VaR (95%)</p>
            <p className="text-lg font-semibold text-amber-400">{formatCurrency(metrics.var95)}</p>
          </div>
        </div>
      )}

      {/* Risk Alerts */}
      <div className="dashboard-container p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-foreground">Risk Alerts</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="dashboard-container-nested p-3">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-3 h-3 text-amber-400" />
              <span className="text-xs font-medium text-amber-400">VaR Breach Warning</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Tech Growth VaR at 92% of limit ($52M / $56M)
            </p>
          </div>
          <div className="dashboard-container-nested p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-3 h-3 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Concentration Note</span>
            </div>
            <p className="text-xs text-muted-foreground">
              NVDA + AVGO combined weight approaching 4% limit
            </p>
          </div>
          <div className="dashboard-container-nested p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Liquidity OK</span>
            </div>
            <p className="text-xs text-muted-foreground">
              73% of portfolio liquid within 5 days
            </p>
          </div>
          <div className="dashboard-container-nested p-3">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="w-3 h-3 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">FX Hedge Review</span>
            </div>
            <p className="text-xs text-muted-foreground">
              JPY hedge expires in 14 days - renewal recommended
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Holdings Table - spans 2 columns */}
        {activeStrategy && (
          <div className="lg:col-span-2 dashboard-container-flat">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{activeStrategy.name} Holdings</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {activeStrategy.holdings.length} positions | {formatCurrency(activeStrategy.aum)} AUM
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {metrics?.correlation.toFixed(2)} corr
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {metrics?.trackingError.toFixed(1)}% TE
                </Badge>
              </div>
            </div>
            <HoldingsTable holdings={activeStrategy.holdings} />
          </div>
        )}

        {/* Right Column - Risk & Analytics */}
        <div className="flex flex-col gap-4">
          {/* Factor Exposures */}
          <div className="dashboard-container p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Factor Exposures</h3>
            </div>
            <div className="space-y-2">
              {factorExposures.map((factor) => (
                <div key={factor.factor} className="flex items-center gap-3">
                  <div className="w-20 text-xs text-muted-foreground">{factor.factor}</div>
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden relative">
                    <div
                      className={`absolute h-full rounded-full ${factor.exposure >= 0 ? 'bg-chart-1' : 'bg-red-400'}`}
                      style={{
                        width: `${Math.min(Math.abs(factor.exposure) * 40, 100)}%`,
                        left: factor.exposure >= 0 ? '50%' : 'auto',
                        right: factor.exposure < 0 ? '50%' : 'auto',
                      }}
                    />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
                  </div>
                  <div className="w-12 text-xs text-muted-foreground text-right">{factor.exposure.toFixed(2)}</div>
                  <div className={`w-14 text-xs text-right ${factor.contribution >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercent(factor.contribution)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concentration Analysis */}
          <div className="dashboard-container p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Concentration</h3>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground">Top 5 Weight</p>
                <p className="text-foreground font-medium">{concentrationData.top5Weight}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Top 10 Weight</p>
                <p className="text-foreground font-medium">{concentrationData.top10Weight}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Active Share</p>
                <p className="text-foreground font-medium">{concentrationData.activeShare}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">HHI Index</p>
                <p className="text-foreground font-medium">{concentrationData.hhi}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Position Count</p>
                <p className="text-foreground font-medium">{concentrationData.positionCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Avg Position</p>
                <p className="text-foreground font-medium">{formatCurrency(concentrationData.avgPositionSize)}</p>
              </div>
            </div>
          </div>

          {/* Liquidity Profile */}
          <div className="dashboard-container p-4 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">Liquidity Profile</h3>
            </div>
            <div className="space-y-2">
              {liquidityData.map((bucket, i) => {
                const colors = ['#22c55e', '#3b82f6', '#eab308', '#ef4444']
                return (
                  <div key={bucket.bucket} className="flex items-center gap-3">
                    <div className="w-16 text-xs text-muted-foreground">{bucket.bucket}</div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${bucket.pct}%`, backgroundColor: colors[i % colors.length] }}
                      />
                    </div>
                    <div className="w-12 text-xs text-muted-foreground text-right">{bucket.pct}%</div>
                    <div className="w-14 text-xs text-foreground text-right">{formatCurrency(bucket.value)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sector Breakdown & Geographic/Currency Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sector Breakdown */}
        <div className="dashboard-container-flat p-4">
          <h3 className="text-sm font-semibold text-foreground mb-4">Sector Breakdown</h3>
          <div className="space-y-2">
            {activeStrategy && (() => {
              const sectorTotals = activeStrategy.holdings.reduce((acc, h) => {
                acc[h.sector] = (acc[h.sector] || 0) + h.marketValue
                return acc
              }, {} as Record<string, number>)
              const total = Object.values(sectorTotals).reduce((a, b) => a + b, 0)
              const sectors = Object.entries(sectorTotals)
                .map(([name, value]) => ({ name, value, pct: (value / total) * 100 }))
                .sort((a, b) => b.value - a.value)

              const colors = ['#e11d48', '#3b82f6', '#22c55e', '#eab308', '#8b5cf6']

              return sectors.map((sector, i) => (
                <div key={sector.name} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-muted-foreground truncate">{sector.name}</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${sector.pct}%`, backgroundColor: colors[i % colors.length] }}
                    />
                  </div>
                  <div className="w-12 text-xs text-muted-foreground text-right">{sector.pct.toFixed(1)}%</div>
                  <div className="w-16 text-xs text-foreground text-right">{formatCurrency(sector.value)}</div>
                </div>
              ))
            })()}
          </div>
        </div>

        {/* Geographic Exposure */}
        <div className="dashboard-container p-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Geographic Exposure</h3>
          </div>
          <div className="space-y-2">
            {geoExposure.map((geo, i) => {
              const colors = ['#e11d48', '#3b82f6', '#22c55e', '#eab308', '#8b5cf6']
              return (
                <div key={geo.region} className="flex items-center gap-3">
                  <div className="w-28 text-xs text-muted-foreground truncate">{geo.region}</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${geo.pct}%`, backgroundColor: colors[i % colors.length] }}
                    />
                  </div>
                  <div className="w-12 text-xs text-muted-foreground text-right">{geo.pct}%</div>
                  <div className={`w-12 text-xs text-right ${geo.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatPercent(geo.change)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Currency Exposure */}
        <div className="dashboard-container p-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Currency Exposure</h3>
          </div>
          <div className="space-y-2">
            {currencyExposure.map((ccy, i) => {
              const colors = ['#e11d48', '#3b82f6', '#22c55e', '#eab308', '#8b5cf6']
              return (
                <div key={ccy.currency} className="flex items-center gap-3">
                  <div className="w-12 text-xs font-medium text-foreground">{ccy.currency}</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${ccy.pct}%`, backgroundColor: colors[i % colors.length] }}
                    />
                  </div>
                  <div className="w-12 text-xs text-muted-foreground text-right">{ccy.pct}%</div>
                  <div className="w-16 text-xs text-muted-foreground text-right">
                    {ccy.hedgeRatio > 0 ? `${ccy.hedgeRatio}% hedged` : 'unhedged'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="dashboard-container-elevated">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">Recent Trades</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Last 48 hours across all strategies</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {recentTrades.length} trades | {formatCurrency(recentTrades.reduce((sum, t) => sum + t.value, 0))} volume
          </Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Time</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Ticker</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Side</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Shares</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Price</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-3 px-4">Value</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Strategy</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-3 px-4">Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{trade.timestamp}</td>
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{trade.ticker}</td>
                  <td className="py-3 px-4">
                    <Badge
                      variant="outline"
                      className={`text-xs ${trade.side === 'BUY' ? 'text-emerald-400 border-emerald-400/30' : 'text-red-400 border-red-400/30'}`}
                    >
                      {trade.side}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground text-right">{trade.shares.toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm text-muted-foreground text-right">${trade.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-foreground text-right">{formatCurrency(trade.value)}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground capitalize">{trade.strategy.replace('-', ' ')}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground max-w-[200px] truncate">{trade.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
