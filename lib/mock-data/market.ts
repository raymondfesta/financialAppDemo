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
