export interface MarketIndex {
  name: string
  symbol: string
  value: number
  change: number
  changePercent: number
}

export interface WatchlistItem {
  ticker: string
  name: string
  last: number
  change: number
  changePercent: number
  volume: number
  high52w: number
  low52w: number
  sector: string
}

export interface SectorPerformance {
  name: string
  change: number
  weight: number
}

export const indices: MarketIndex[] = [
  { name: "S&P 500", symbol: "SPX", value: 5892.45, change: 48.23, changePercent: 0.82 },
  { name: "Nasdaq", symbol: "NDX", value: 19234.67, change: 145.23, changePercent: 0.76 },
  { name: "Dow Jones", symbol: "DJI", value: 43521.89, change: 124.56, changePercent: 0.29 },
  { name: "VIX", symbol: "VIX", value: 14.32, change: -0.45, changePercent: -3.04 },
  { name: "10Y Yield", symbol: "TNX", value: 4.28, change: 0.02, changePercent: 0.47 },
]

export const coreHoldings: WatchlistItem[] = [
  { ticker: "NVDA", name: "NVIDIA Corp", last: 142.50, change: 3.20, changePercent: 2.30, volume: 45_200_000, high52w: 152.89, low52w: 76.23, sector: "Technology" },
  { ticker: "MSFT", name: "Microsoft Corp", last: 428.30, change: 3.42, changePercent: 0.80, volume: 18_500_000, high52w: 445.00, low52w: 362.90, sector: "Technology" },
  { ticker: "GOOGL", name: "Alphabet Inc", last: 178.20, change: 1.96, changePercent: 1.11, volume: 22_100_000, high52w: 192.50, low52w: 131.80, sector: "Technology" },
  { ticker: "AMZN", name: "Amazon.com Inc", last: 197.40, change: 2.96, changePercent: 1.52, volume: 31_400_000, high52w: 215.90, low52w: 151.61, sector: "Consumer" },
  { ticker: "META", name: "Meta Platforms", last: 602.65, change: 2.41, changePercent: 0.40, volume: 12_800_000, high52w: 638.40, low52w: 414.50, sector: "Technology" },
  { ticker: "AAPL", name: "Apple Inc", last: 234.00, change: -0.70, changePercent: -0.30, volume: 42_300_000, high52w: 260.10, low52w: 194.20, sector: "Technology" },
  { ticker: "TSM", name: "Taiwan Semiconductor", last: 189.00, change: 3.40, changePercent: 1.83, volume: 8_900_000, high52w: 205.40, low52w: 127.00, sector: "Technology" },
  { ticker: "AVGO", name: "Broadcom Inc", last: 1005.00, change: 21.10, changePercent: 2.14, volume: 2_100_000, high52w: 1089.00, low52w: 795.00, sector: "Technology" },
]

export const watchlistItems: WatchlistItem[] = [
  { ticker: "AMD", name: "AMD Inc", last: 124.80, change: 4.12, changePercent: 3.41, volume: 38_200_000, high52w: 164.00, low52w: 102.50, sector: "Technology" },
  { ticker: "SNOW", name: "Snowflake Inc", last: 168.40, change: -2.35, changePercent: -1.38, volume: 4_500_000, high52w: 237.20, low52w: 127.30, sector: "Technology" },
  { ticker: "PLTR", name: "Palantir Tech", last: 72.50, change: 1.88, changePercent: 2.66, volume: 52_100_000, high52w: 85.40, low52w: 21.30, sector: "Technology" },
  { ticker: "ARM", name: "ARM Holdings", last: 148.20, change: 5.42, changePercent: 3.80, volume: 6_200_000, high52w: 188.90, low52w: 98.50, sector: "Technology" },
  { ticker: "UBER", name: "Uber Tech", last: 68.30, change: 0.82, changePercent: 1.22, volume: 14_800_000, high52w: 82.10, low52w: 54.20, sector: "Technology" },
  { ticker: "COIN", name: "Coinbase Global", last: 285.40, change: 12.50, changePercent: 4.58, volume: 8_900_000, high52w: 342.00, low52w: 142.50, sector: "Financials" },
]

export const sectorETFs: WatchlistItem[] = [
  { ticker: "XLK", name: "Technology Select", last: 228.40, change: 3.20, changePercent: 1.42, volume: 8_200_000, high52w: 242.50, low52w: 182.30, sector: "Technology" },
  { ticker: "XLF", name: "Financial Select", last: 48.20, change: 0.38, changePercent: 0.79, volume: 32_100_000, high52w: 51.80, low52w: 38.90, sector: "Financials" },
  { ticker: "XLE", name: "Energy Select", last: 89.40, change: 1.25, changePercent: 1.42, volume: 14_500_000, high52w: 98.50, low52w: 75.20, sector: "Energy" },
  { ticker: "XLV", name: "Health Care Select", last: 148.60, change: -0.45, changePercent: -0.30, volume: 6_800_000, high52w: 158.20, low52w: 132.40, sector: "Healthcare" },
  { ticker: "XLI", name: "Industrial Select", last: 134.20, change: 0.94, changePercent: 0.71, volume: 9_100_000, high52w: 142.80, low52w: 112.50, sector: "Industrials" },
  { ticker: "XLP", name: "Consumer Staples", last: 82.30, change: 0.25, changePercent: 0.30, volume: 7_400_000, high52w: 86.40, low52w: 71.20, sector: "Consumer Staples" },
]

export const sectorPerformance: SectorPerformance[] = [
  { name: "Technology", change: 1.82, weight: 32 },
  { name: "Financials", change: 0.79, weight: 14 },
  { name: "Healthcare", change: -0.30, weight: 12 },
  { name: "Consumer Disc", change: 1.15, weight: 11 },
  { name: "Industrials", change: 0.71, weight: 9 },
  { name: "Energy", change: 1.42, weight: 8 },
  { name: "Consumer Staples", change: 0.30, weight: 6 },
  { name: "Utilities", change: -0.15, weight: 4 },
  { name: "Materials", change: 0.52, weight: 2 },
  { name: "Real Estate", change: -0.42, weight: 2 },
]

export const marketNews = [
  { id: 1, headline: "Fed officials signal patience on rate cuts amid sticky inflation", time: "10:32 AM", source: "Reuters" },
  { id: 2, headline: "NVIDIA announces next-gen Blackwell Ultra chips for Q2 2026", time: "9:45 AM", source: "Bloomberg" },
  { id: 3, headline: "China stimulus package boosts emerging market sentiment", time: "8:20 AM", source: "CNBC" },
  { id: 4, headline: "Treasury yields rise on strong jobs data", time: "7:15 AM", source: "WSJ" },
  { id: 5, headline: "Oil prices climb as OPEC+ extends production cuts", time: "6:30 AM", source: "Reuters" },
]

// Global Indices
export const globalIndices: MarketIndex[] = [
  { name: "FTSE 100", symbol: "UKX", value: 8234.56, change: 42.30, changePercent: 0.52 },
  { name: "DAX", symbol: "DAX", value: 18456.78, change: 156.23, changePercent: 0.85 },
  { name: "Nikkei 225", symbol: "NKY", value: 38942.15, change: -124.50, changePercent: -0.32 },
  { name: "Hang Seng", symbol: "HSI", value: 17823.45, change: 234.12, changePercent: 1.33 },
  { name: "Shanghai", symbol: "SHCOMP", value: 3124.67, change: 28.45, changePercent: 0.92 },
]

// Currencies
export interface Currency {
  pair: string
  rate: number
  change: number
  changePercent: number
}

export const currencies: Currency[] = [
  { pair: "EUR/USD", rate: 1.0842, change: 0.0023, changePercent: 0.21 },
  { pair: "GBP/USD", rate: 1.2634, change: -0.0018, changePercent: -0.14 },
  { pair: "USD/JPY", rate: 154.82, change: 0.45, changePercent: 0.29 },
  { pair: "USD/CHF", rate: 0.8824, change: -0.0012, changePercent: -0.14 },
  { pair: "AUD/USD", rate: 0.6542, change: 0.0034, changePercent: 0.52 },
  { pair: "USD/CAD", rate: 1.3845, change: -0.0028, changePercent: -0.20 },
]

// Commodities
export interface Commodity {
  name: string
  symbol: string
  price: number
  change: number
  changePercent: number
  unit: string
}

export const commodities: Commodity[] = [
  { name: "Gold", symbol: "GC", price: 2648.50, change: 18.20, changePercent: 0.69, unit: "/oz" },
  { name: "Silver", symbol: "SI", price: 31.24, change: 0.42, changePercent: 1.36, unit: "/oz" },
  { name: "Crude Oil", symbol: "CL", price: 78.45, change: 1.23, changePercent: 1.59, unit: "/bbl" },
  { name: "Natural Gas", symbol: "NG", price: 2.84, change: -0.08, changePercent: -2.74, unit: "/MMBtu" },
  { name: "Copper", symbol: "HG", price: 4.32, change: 0.05, changePercent: 1.17, unit: "/lb" },
  { name: "Bitcoin", symbol: "BTC", price: 98450, change: 2340, changePercent: 2.43, unit: "" },
]

// Treasury Yields
export interface TreasuryYield {
  maturity: string
  yield: number
  change: number
  priorClose: number
}

export const treasuryYields: TreasuryYield[] = [
  { maturity: "1M", yield: 4.52, change: 0.01, priorClose: 4.51 },
  { maturity: "3M", yield: 4.48, change: -0.02, priorClose: 4.50 },
  { maturity: "6M", yield: 4.42, change: -0.01, priorClose: 4.43 },
  { maturity: "1Y", yield: 4.35, change: 0.02, priorClose: 4.33 },
  { maturity: "2Y", yield: 4.28, change: 0.03, priorClose: 4.25 },
  { maturity: "5Y", yield: 4.18, change: 0.02, priorClose: 4.16 },
  { maturity: "10Y", yield: 4.28, change: 0.02, priorClose: 4.26 },
  { maturity: "30Y", yield: 4.52, change: 0.01, priorClose: 4.51 },
]

// Options Flow
export interface OptionsFlow {
  ticker: string
  type: "call" | "put"
  strike: number
  expiry: string
  premium: number
  volume: number
  openInterest: number
  sentiment: "bullish" | "bearish" | "neutral"
}

export const optionsFlow: OptionsFlow[] = [
  { ticker: "NVDA", type: "call", strike: 150, expiry: "Feb 21", premium: 4850000, volume: 12500, openInterest: 45200, sentiment: "bullish" },
  { ticker: "SPY", type: "put", strike: 580, expiry: "Jan 31", premium: 8200000, volume: 28400, openInterest: 124500, sentiment: "bearish" },
  { ticker: "TSLA", type: "call", strike: 450, expiry: "Mar 21", premium: 3200000, volume: 8900, openInterest: 32100, sentiment: "bullish" },
  { ticker: "AAPL", type: "call", strike: 240, expiry: "Feb 14", premium: 2100000, volume: 15600, openInterest: 68400, sentiment: "bullish" },
  { ticker: "QQQ", type: "put", strike: 500, expiry: "Jan 31", premium: 5400000, volume: 18200, openInterest: 89300, sentiment: "bearish" },
  { ticker: "META", type: "call", strike: 620, expiry: "Feb 21", premium: 1800000, volume: 4200, openInterest: 18900, sentiment: "bullish" },
]

// Market Breadth
export interface MarketBreadth {
  metric: string
  value: number
  signal: "bullish" | "bearish" | "neutral"
  description: string
}

export const marketBreadth: MarketBreadth[] = [
  { metric: "Advance/Decline", value: 1.42, signal: "bullish", description: "1,842 advancing vs 1,298 declining" },
  { metric: "New Highs/Lows", value: 2.8, signal: "bullish", description: "168 new highs vs 60 new lows" },
  { metric: "% Above 200 DMA", value: 58.4, signal: "neutral", description: "58% of S&P 500 above 200-day MA" },
  { metric: "% Above 50 DMA", value: 62.1, signal: "neutral", description: "62% of S&P 500 above 50-day MA" },
  { metric: "Put/Call Ratio", value: 0.72, signal: "bullish", description: "Below 0.80 indicates bullish sentiment" },
  { metric: "Fear & Greed", value: 68, signal: "neutral", description: "Greed zone (50-75 range)" },
]
