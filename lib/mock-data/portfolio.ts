export interface Holding {
  ticker: string
  name: string
  shares: number
  marketValue: number
  weight: number
  costBasis: number
  unrealizedPL: number
  dayChange: number
  sector: string
  convictionScore: number
}

export interface FundSummary {
  aum: number
  mtdReturn: number
  ytdReturn: number
  sharpeRatio: number
  grossExposure: number
  netExposure: number
  var95: number
  beta: number
}

export interface Allocation {
  name: string
  value: number
  percentage: number
  color: string
}

export const fundSummary: FundSummary = {
  aum: 10_000_000_000,
  mtdReturn: 2.4,
  ytdReturn: 18.7,
  sharpeRatio: 1.84,
  grossExposure: 145,
  netExposure: 78,
  var95: 42_500_000,
  beta: 1.12,
}

export const allocations: Allocation[] = [
  { name: "Equity", value: 6_200_000_000, percentage: 62, color: "var(--chart-1)" },
  { name: "Fixed Income", value: 1_800_000_000, percentage: 18, color: "var(--chart-2)" },
  { name: "Alternatives", value: 1_200_000_000, percentage: 12, color: "var(--chart-3)" },
  { name: "Cash", value: 800_000_000, percentage: 8, color: "var(--chart-4)" },
]

export const techGrowthHoldings: Holding[] = [
  { ticker: "NVDA", name: "NVIDIA Corp", shares: 450000, marketValue: 64_125_000, weight: 1.53, costBasis: 53_325_000, unrealizedPL: 10_800_000, dayChange: 2.3, sector: "Technology", convictionScore: 92 },
  { ticker: "MSFT", name: "Microsoft Corp", shares: 280000, marketValue: 119_924_000, weight: 2.86, costBasis: 98_000_000, unrealizedPL: 21_924_000, dayChange: 0.8, sector: "Technology", convictionScore: 88 },
  { ticker: "GOOGL", name: "Alphabet Inc", shares: 520000, marketValue: 92_664_000, weight: 2.21, costBasis: 78_000_000, unrealizedPL: 14_664_000, dayChange: 1.1, sector: "Technology", convictionScore: 85 },
  { ticker: "AMZN", name: "Amazon.com Inc", shares: 380000, marketValue: 75_012_000, weight: 1.79, costBasis: 62_000_000, unrealizedPL: 13_012_000, dayChange: 1.5, sector: "Consumer", convictionScore: 82 },
  { ticker: "META", name: "Meta Platforms", shares: 145000, marketValue: 87_435_000, weight: 2.08, costBasis: 71_000_000, unrealizedPL: 16_435_000, dayChange: 0.4, sector: "Technology", convictionScore: 79 },
  { ticker: "AAPL", name: "Apple Inc", shares: 520000, marketValue: 121_680_000, weight: 2.90, costBasis: 104_000_000, unrealizedPL: 17_680_000, dayChange: -0.3, sector: "Technology", convictionScore: 76 },
  { ticker: "TSM", name: "Taiwan Semiconductor", shares: 310000, marketValue: 58_590_000, weight: 1.40, costBasis: 48_000_000, unrealizedPL: 10_590_000, dayChange: 1.8, sector: "Technology", convictionScore: 84 },
  { ticker: "AVGO", name: "Broadcom Inc", shares: 95000, marketValue: 95_475_000, weight: 2.28, costBasis: 78_000_000, unrealizedPL: 17_475_000, dayChange: 2.1, sector: "Technology", convictionScore: 81 },
  { ticker: "CRM", name: "Salesforce Inc", shares: 180000, marketValue: 54_540_000, weight: 1.30, costBasis: 45_000_000, unrealizedPL: 9_540_000, dayChange: 0.6, sector: "Technology", convictionScore: 74 },
  { ticker: "NOW", name: "ServiceNow Inc", shares: 62000, marketValue: 55_800_000, weight: 1.33, costBasis: 46_000_000, unrealizedPL: 9_800_000, dayChange: 1.2, sector: "Technology", convictionScore: 77 },
]

export const valueHoldings: Holding[] = [
  { ticker: "BRK.B", name: "Berkshire Hathaway", shares: 145000, marketValue: 65_250_000, weight: 1.55, costBasis: 52_000_000, unrealizedPL: 13_250_000, dayChange: 0.2, sector: "Financials", convictionScore: 88 },
  { ticker: "JPM", name: "JPMorgan Chase", shares: 280000, marketValue: 67_200_000, weight: 1.60, costBasis: 54_000_000, unrealizedPL: 13_200_000, dayChange: 0.9, sector: "Financials", convictionScore: 85 },
  { ticker: "JNJ", name: "Johnson & Johnson", shares: 320000, marketValue: 49_920_000, weight: 1.19, costBasis: 44_000_000, unrealizedPL: 5_920_000, dayChange: -0.2, sector: "Healthcare", convictionScore: 72 },
  { ticker: "PG", name: "Procter & Gamble", shares: 260000, marketValue: 45_240_000, weight: 1.08, costBasis: 38_000_000, unrealizedPL: 7_240_000, dayChange: 0.3, sector: "Consumer Staples", convictionScore: 70 },
  { ticker: "XOM", name: "Exxon Mobil", shares: 410000, marketValue: 45_100_000, weight: 1.07, costBasis: 36_000_000, unrealizedPL: 9_100_000, dayChange: 1.4, sector: "Energy", convictionScore: 75 },
  { ticker: "CVX", name: "Chevron Corp", shares: 285000, marketValue: 42_750_000, weight: 1.02, costBasis: 35_000_000, unrealizedPL: 7_750_000, dayChange: 1.1, sector: "Energy", convictionScore: 73 },
  { ticker: "BAC", name: "Bank of America", shares: 920000, marketValue: 36_800_000, weight: 0.88, costBasis: 30_000_000, unrealizedPL: 6_800_000, dayChange: 0.7, sector: "Financials", convictionScore: 71 },
  { ticker: "WMT", name: "Walmart Inc", shares: 195000, marketValue: 35_100_000, weight: 0.84, costBasis: 28_000_000, unrealizedPL: 7_100_000, dayChange: 0.4, sector: "Consumer Staples", convictionScore: 74 },
]

export const macroHoldings: Holding[] = [
  { ticker: "TLT", name: "iShares 20+ Year Treasury", shares: 480000, marketValue: 45_600_000, weight: 1.09, costBasis: 48_000_000, unrealizedPL: -2_400_000, dayChange: -0.4, sector: "Fixed Income", convictionScore: 68 },
  { ticker: "GLD", name: "SPDR Gold Shares", shares: 185000, marketValue: 44_400_000, weight: 1.06, costBasis: 38_000_000, unrealizedPL: 6_400_000, dayChange: 0.8, sector: "Commodities", convictionScore: 76 },
  { ticker: "UUP", name: "Invesco DB US Dollar", shares: 620000, marketValue: 18_600_000, weight: 0.44, costBasis: 17_500_000, unrealizedPL: 1_100_000, dayChange: 0.2, sector: "Currency", convictionScore: 65 },
  { ticker: "DBC", name: "Invesco DB Commodity", shares: 410000, marketValue: 9_430_000, weight: 0.22, costBasis: 8_500_000, unrealizedPL: 930_000, dayChange: 1.2, sector: "Commodities", convictionScore: 62 },
  { ticker: "EMB", name: "iShares EM Bonds", shares: 320000, marketValue: 27_520_000, weight: 0.66, costBasis: 26_000_000, unrealizedPL: 1_520_000, dayChange: 0.3, sector: "Fixed Income", convictionScore: 64 },
]

export const optionsHoldings: Holding[] = [
  { ticker: "SPY Puts", name: "S&P 500 Put Spreads", shares: 1500, marketValue: 18_750_000, weight: 0.45, costBasis: 15_000_000, unrealizedPL: 3_750_000, dayChange: -1.2, sector: "Hedging", convictionScore: 0 },
  { ticker: "QQQ Calls", name: "Nasdaq Call Spreads", shares: 800, marketValue: 12_000_000, weight: 0.29, costBasis: 9_600_000, unrealizedPL: 2_400_000, dayChange: 2.8, sector: "Directional", convictionScore: 0 },
  { ticker: "VIX Calls", name: "VIX Call Options", shares: 2000, marketValue: 4_000_000, weight: 0.10, costBasis: 6_000_000, unrealizedPL: -2_000_000, dayChange: -3.5, sector: "Volatility", convictionScore: 0 },
  { ticker: "Covered Calls", name: "Covered Call Premium", shares: 0, marketValue: 8_500_000, weight: 0.20, costBasis: 0, unrealizedPL: 8_500_000, dayChange: 0, sector: "Income", convictionScore: 0 },
]

export const portfolioStrategies = [
  { id: "tech-growth", name: "Tech Growth", aum: 4_200_000_000, holdings: techGrowthHoldings },
  { id: "value", name: "Value", aum: 2_800_000_000, holdings: valueHoldings },
  { id: "macro", name: "Macro", aum: 1_800_000_000, holdings: macroHoldings },
  { id: "options", name: "Options Overlay", aum: 1_200_000_000, holdings: optionsHoldings },
]

export interface TopMover {
  ticker: string
  name: string
  change: number
  changePercent: number
  reason: string
}

export const topMovers: TopMover[] = [
  { ticker: "NVDA", name: "NVIDIA Corp", change: 3.20, changePercent: 2.30, reason: "Blackwell demand surge" },
  { ticker: "AVGO", name: "Broadcom Inc", change: 20.82, changePercent: 2.10, reason: "AI networking wins" },
  { ticker: "TSM", name: "Taiwan Semi", change: 3.32, changePercent: 1.80, reason: "Capacity expansion" },
  { ticker: "AMZN", name: "Amazon.com", change: 2.96, changePercent: 1.52, reason: "AWS growth reacceleration" },
  { ticker: "XOM", name: "Exxon Mobil", change: 1.54, changePercent: 1.40, reason: "OPEC+ supply cuts" },
  { ticker: "VIX Calls", name: "VIX Options", change: -0.14, changePercent: -3.50, reason: "Vol compression" },
  { ticker: "AAPL", name: "Apple Inc", change: -0.70, changePercent: -0.30, reason: "China demand concerns" },
  { ticker: "TLT", name: "Treasury 20Y+", change: -0.38, changePercent: -0.40, reason: "Rate expectations" },
]
