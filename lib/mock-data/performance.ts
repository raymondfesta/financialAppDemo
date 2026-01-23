export interface PerformancePoint {
  date: string
  portfolio: number
  benchmark: number
}

export interface ReturnStats {
  period: string
  return: number
  benchmark: number
  alpha: number
}

export interface FactorExposure {
  factor: string
  exposure: number
  contribution: number
}

export interface Attribution {
  category: string
  contribution: number
  color: string
}

export const performanceHistory: PerformancePoint[] = [
  { date: "Jan 25", portfolio: 100.0, benchmark: 100.0 },
  { date: "Feb 25", portfolio: 103.2, benchmark: 101.8 },
  { date: "Mar 25", portfolio: 101.8, benchmark: 99.2 },
  { date: "Apr 25", portfolio: 105.4, benchmark: 102.1 },
  { date: "May 25", portfolio: 108.2, benchmark: 104.5 },
  { date: "Jun 25", portfolio: 110.8, benchmark: 106.2 },
  { date: "Jul 25", portfolio: 113.5, benchmark: 108.8 },
  { date: "Aug 25", portfolio: 111.2, benchmark: 106.4 },
  { date: "Sep 25", portfolio: 114.8, benchmark: 109.2 },
  { date: "Oct 25", portfolio: 117.2, benchmark: 111.5 },
  { date: "Nov 25", portfolio: 120.5, benchmark: 114.2 },
  { date: "Dec 25", portfolio: 115.9, benchmark: 110.8 },
  { date: "Jan 26", portfolio: 118.7, benchmark: 113.4 },
]

export const returnStats: ReturnStats[] = [
  { period: "MTD", return: 2.4, benchmark: 2.3, alpha: 0.1 },
  { period: "QTD", return: 5.8, benchmark: 4.9, alpha: 0.9 },
  { period: "YTD", return: 18.7, benchmark: 13.4, alpha: 5.3 },
  { period: "1 Year", return: 32.4, benchmark: 24.8, alpha: 7.6 },
  { period: "3 Year", return: 78.2, benchmark: 52.1, alpha: 26.1 },
  { period: "Since Inception", return: 142.5, benchmark: 98.4, alpha: 44.1 },
]

export const riskMetrics = {
  sharpe: 1.84,
  sortino: 2.31,
  maxDrawdown: -8.4,
  beta: 1.12,
  volatility: 18.2,
  var95: 0.425, // as percentage
  trackingError: 4.8,
  informationRatio: 1.10,
}

export const factorExposures: FactorExposure[] = [
  { factor: "Momentum", exposure: 0.42, contribution: 3.2 },
  { factor: "Quality", exposure: 0.35, contribution: 2.1 },
  { factor: "Growth", exposure: 0.58, contribution: 4.8 },
  { factor: "Value", exposure: -0.12, contribution: -0.4 },
  { factor: "Size", exposure: -0.25, contribution: -1.2 },
  { factor: "Volatility", exposure: 0.18, contribution: 0.8 },
]

export const attribution: Attribution[] = [
  { category: "Stock Selection", contribution: 4.2, color: "var(--chart-1)" },
  { category: "Sector Allocation", contribution: 2.1, color: "var(--chart-2)" },
  { category: "Factor Timing", contribution: 1.4, color: "var(--chart-3)" },
  { category: "Currency", contribution: 0.3, color: "var(--chart-4)" },
  { category: "Residual", contribution: -0.3, color: "var(--chart-5)" },
]

export const drawdownHistory = [
  { date: "Jan 25", drawdown: 0 },
  { date: "Feb 25", drawdown: 0 },
  { date: "Mar 25", drawdown: -1.4 },
  { date: "Apr 25", drawdown: 0 },
  { date: "May 25", drawdown: 0 },
  { date: "Jun 25", drawdown: 0 },
  { date: "Jul 25", drawdown: 0 },
  { date: "Aug 25", drawdown: -2.1 },
  { date: "Sep 25", drawdown: 0 },
  { date: "Oct 25", drawdown: 0 },
  { date: "Nov 25", drawdown: 0 },
  { date: "Dec 25", drawdown: -8.4 },
  { date: "Jan 26", drawdown: -4.2 },
]

// Rolling Returns
export interface RollingReturn {
  period: string
  portfolio: number
  benchmark: number
  percentile: number
}

export const rollingReturns: RollingReturn[] = [
  { period: "30 Day", portfolio: 4.2, benchmark: 3.1, percentile: 72 },
  { period: "60 Day", portfolio: 7.8, benchmark: 5.9, percentile: 81 },
  { period: "90 Day", portfolio: 9.4, benchmark: 7.2, percentile: 78 },
  { period: "180 Day", portfolio: 14.2, benchmark: 10.8, percentile: 85 },
  { period: "1 Year", portfolio: 32.4, benchmark: 24.8, percentile: 89 },
]

// Strategy Performance Comparison
export interface StrategyPerformance {
  name: string
  aum: number
  mtd: number
  ytd: number
  sharpe: number
  sortino: number
  maxDrawdown: number
  winRate: number
}

export const strategyPerformance: StrategyPerformance[] = [
  { name: "Tech Growth", aum: 4_200_000_000, mtd: 3.2, ytd: 24.5, sharpe: 2.12, sortino: 2.85, maxDrawdown: -12.4, winRate: 68 },
  { name: "Value", aum: 2_800_000_000, mtd: 1.4, ytd: 12.8, sharpe: 1.45, sortino: 1.92, maxDrawdown: -8.2, winRate: 62 },
  { name: "Macro", aum: 1_800_000_000, mtd: 2.1, ytd: 15.2, sharpe: 1.68, sortino: 2.21, maxDrawdown: -6.8, winRate: 58 },
  { name: "Options Overlay", aum: 1_200_000_000, mtd: 1.8, ytd: 9.4, sharpe: 1.92, sortino: 2.45, maxDrawdown: -4.2, winRate: 72 },
]

// Position Analytics
export interface PositionAnalytics {
  ticker: string
  strategy: string
  weight: number
  contribution: number
  sharpe: number
  beta: number
  correlation: number
  daysHeld: number
}

export const positionAnalytics: PositionAnalytics[] = [
  { ticker: "NVDA", strategy: "Tech Growth", weight: 1.53, contribution: 2.8, sharpe: 2.45, beta: 1.82, correlation: 0.78, daysHeld: 245 },
  { ticker: "MSFT", strategy: "Tech Growth", weight: 2.86, contribution: 1.9, sharpe: 1.92, beta: 1.12, correlation: 0.85, daysHeld: 412 },
  { ticker: "GOOGL", strategy: "Tech Growth", weight: 2.21, contribution: 1.4, sharpe: 1.78, beta: 1.24, correlation: 0.82, daysHeld: 328 },
  { ticker: "BRK.B", strategy: "Value", weight: 1.55, contribution: 0.8, sharpe: 1.45, beta: 0.85, correlation: 0.72, daysHeld: 524 },
  { ticker: "JPM", strategy: "Value", weight: 1.60, contribution: 1.1, sharpe: 1.62, beta: 1.15, correlation: 0.68, daysHeld: 298 },
  { ticker: "GLD", strategy: "Macro", weight: 1.06, contribution: 0.4, sharpe: 0.92, beta: 0.12, correlation: 0.15, daysHeld: 186 },
  { ticker: "TLT", strategy: "Macro", weight: 1.09, contribution: -0.2, sharpe: 0.45, beta: -0.42, correlation: -0.28, daysHeld: 142 },
  { ticker: "SPY Puts", strategy: "Options", weight: 0.45, contribution: 0.3, sharpe: 1.12, beta: -0.85, correlation: -0.62, daysHeld: 45 },
]

// Correlation Matrix
export const correlationMatrix = {
  assets: ["Portfolio", "S&P 500", "Nasdaq", "Bonds", "Gold", "VIX"],
  data: [
    [1.00, 0.85, 0.88, -0.15, 0.12, -0.42],
    [0.85, 1.00, 0.92, -0.18, 0.08, -0.68],
    [0.88, 0.92, 1.00, -0.22, 0.05, -0.58],
    [-0.15, -0.18, -0.22, 1.00, 0.32, 0.15],
    [0.12, 0.08, 0.05, 0.32, 1.00, 0.18],
    [-0.42, -0.68, -0.58, 0.15, 0.18, 1.00],
  ],
}

// Monthly Returns Heatmap
export const monthlyReturns = [
  { year: 2024, jan: 2.1, feb: 3.4, mar: -1.2, apr: 4.2, may: 2.8, jun: 1.5, jul: 3.2, aug: -2.4, sep: 2.1, oct: 1.8, nov: 4.5, dec: -3.8 },
  { year: 2025, jan: 2.4, feb: null, mar: null, apr: null, may: null, jun: null, jul: null, aug: null, sep: null, oct: null, nov: null, dec: null },
]

// Risk Contribution by Strategy
export interface RiskContribution {
  strategy: string
  varContribution: number
  volatilityContribution: number
  marginallVaR: number
  weight: number
}

export const riskContribution: RiskContribution[] = [
  { strategy: "Tech Growth", varContribution: 52, volatilityContribution: 48, marginallVaR: 0.52, weight: 42 },
  { strategy: "Value", varContribution: 22, volatilityContribution: 24, marginallVaR: 0.28, weight: 28 },
  { strategy: "Macro", varContribution: 18, volatilityContribution: 20, marginallVaR: 0.35, weight: 18 },
  { strategy: "Options Overlay", varContribution: 8, volatilityContribution: 8, marginallVaR: 0.12, weight: 12 },
]
