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
