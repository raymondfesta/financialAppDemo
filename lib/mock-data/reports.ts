export interface Report {
  id: string
  type: string
  period: string
  generatedAt: string
  status: "ready" | "generating" | "scheduled"
  size: string | null
  description: string
}

export const reports: Report[] = [
  {
    id: "rpt001",
    type: "Monthly Investor Letter",
    period: "December 2025",
    generatedAt: "Jan 5, 2026",
    status: "ready",
    size: "2.4 MB",
    description: "Monthly performance summary, market commentary, and portfolio updates for investors.",
  },
  {
    id: "rpt002",
    type: "Quarterly Performance Report",
    period: "Q4 2025",
    generatedAt: "Jan 10, 2026",
    status: "ready",
    size: "4.1 MB",
    description: "Comprehensive quarterly analysis including attribution, risk metrics, and outlook.",
  },
  {
    id: "rpt003",
    type: "Risk Report",
    period: "January 2026",
    generatedAt: "Jan 15, 2026",
    status: "generating",
    size: null,
    description: "VaR analysis, stress testing results, and factor exposure breakdown.",
  },
  {
    id: "rpt004",
    type: "Compliance Report",
    period: "Q4 2025",
    generatedAt: "Jan 8, 2026",
    status: "ready",
    size: "1.8 MB",
    description: "Regulatory compliance documentation, trade surveillance, and policy adherence.",
  },
  {
    id: "rpt005",
    type: "Position Report",
    period: "Jan 17, 2026",
    generatedAt: "Jan 17, 2026",
    status: "ready",
    size: "892 KB",
    description: "Daily position snapshot with P&L, exposure, and concentration metrics.",
  },
  {
    id: "rpt006",
    type: "Trade Blotter",
    period: "Jan 17, 2026",
    generatedAt: "Jan 17, 2026",
    status: "ready",
    size: "456 KB",
    description: "Detailed trade log with execution quality analysis and TCA metrics.",
  },
  {
    id: "rpt007",
    type: "Monthly Investor Letter",
    period: "January 2026",
    generatedAt: "Feb 5, 2026",
    status: "scheduled",
    size: null,
    description: "Upcoming monthly letter for January 2026.",
  },
  {
    id: "rpt008",
    type: "ESG Impact Report",
    period: "2025 Annual",
    generatedAt: "Jan 12, 2026",
    status: "ready",
    size: "3.2 MB",
    description: "Annual ESG scoring, carbon footprint analysis, and sustainability metrics.",
  },
]

export const reportTypes = [
  "Monthly Investor Letter",
  "Quarterly Performance Report",
  "Risk Report",
  "Compliance Report",
  "Position Report",
  "Trade Blotter",
  "ESG Impact Report",
]
