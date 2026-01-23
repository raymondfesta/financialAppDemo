export interface Agent {
  id: string
  name: string
  description: string
  status: "live" | "paused" | "error"
  insightsGenerated: number
  lastActivity: string
  accuracy: number
  icon: string
}

export interface AgentInsight {
  id: string
  agentId: string
  agentName: string
  ticker: string
  insight: string
  timestamp: string
  type: "bullish" | "bearish" | "neutral"
  priority: "high" | "medium" | "low"
}

export const agents: Agent[] = [
  {
    id: "research",
    name: "Research Agent",
    description: "Deep-dive analysis, thesis generation, competitive landscape",
    status: "live",
    insightsGenerated: 847,
    lastActivity: "2 min ago",
    accuracy: 84,
    icon: "Search",
  },
  {
    id: "earnings",
    name: "Earnings Agent",
    description: "Earnings call transcripts, surprises, guidance analysis",
    status: "live",
    insightsGenerated: 312,
    lastActivity: "15 min ago",
    accuracy: 79,
    icon: "TrendingUp",
  },
  {
    id: "news",
    name: "News Agent",
    description: "Real-time news monitoring, sentiment shifts, event detection",
    status: "live",
    insightsGenerated: 1_243,
    lastActivity: "30 sec ago",
    accuracy: 76,
    icon: "Newspaper",
  },
  {
    id: "sec-filing",
    name: "SEC Filing Agent",
    description: "13F filings, insider transactions, institutional flows",
    status: "live",
    insightsGenerated: 156,
    lastActivity: "1 hr ago",
    accuracy: 91,
    icon: "FileText",
  },
  {
    id: "valuation",
    name: "Valuation Agent",
    description: "DCF models, comparable analysis, price target synthesis",
    status: "live",
    insightsGenerated: 428,
    lastActivity: "45 min ago",
    accuracy: 72,
    icon: "Calculator",
  },
  {
    id: "portfolio-monitor",
    name: "Portfolio Monitor",
    description: "Holdings surveillance, risk alerts, rebalancing signals",
    status: "live",
    insightsGenerated: 89,
    lastActivity: "5 min ago",
    accuracy: 88,
    icon: "Shield",
  },
]

export const recentInsights: AgentInsight[] = [
  {
    id: "ins-001",
    agentId: "news",
    agentName: "News Agent",
    ticker: "NVDA",
    insight: "Jensen Huang keynote at CES confirms Blackwell production ahead of schedule. Datacenter revenue guidance likely to increase.",
    timestamp: "2 min ago",
    type: "bullish",
    priority: "high",
  },
  {
    id: "ins-002",
    agentId: "sec-filing",
    agentName: "SEC Filing Agent",
    ticker: "AAPL",
    insight: "Berkshire Hathaway 13F shows continued Apple position reduction. 15M shares sold in Q4.",
    timestamp: "1 hr ago",
    type: "bearish",
    priority: "medium",
  },
  {
    id: "ins-003",
    agentId: "earnings",
    agentName: "Earnings Agent",
    ticker: "TSM",
    insight: "Q4 earnings beat estimates by 8%. Management raised 2026 capex guidance citing AI chip demand.",
    timestamp: "3 hr ago",
    type: "bullish",
    priority: "high",
  },
  {
    id: "ins-004",
    agentId: "research",
    agentName: "Research Agent",
    ticker: "MSFT",
    insight: "Azure growth reaccelerating. AI services now 12% of cloud revenue, up from 8% last quarter.",
    timestamp: "4 hr ago",
    type: "bullish",
    priority: "medium",
  },
  {
    id: "ins-005",
    agentId: "valuation",
    agentName: "Valuation Agent",
    ticker: "META",
    insight: "DCF model suggests fair value of $680. Current price implies 15% discount to intrinsic value.",
    timestamp: "6 hr ago",
    type: "bullish",
    priority: "low",
  },
  {
    id: "ins-006",
    agentId: "portfolio-monitor",
    agentName: "Portfolio Monitor",
    ticker: "PORTFOLIO",
    insight: "Tech sector weight at 32%, exceeding 30% limit. Consider rebalancing into underweight sectors.",
    timestamp: "8 hr ago",
    type: "neutral",
    priority: "medium",
  },
  {
    id: "ins-007",
    agentId: "news",
    agentName: "News Agent",
    ticker: "XOM",
    insight: "OPEC+ signals production cuts extension through Q2. Positive for energy sector margins.",
    timestamp: "12 hr ago",
    type: "bullish",
    priority: "low",
  },
  {
    id: "ins-008",
    agentId: "research",
    agentName: "Research Agent",
    ticker: "AMZN",
    insight: "AWS market share stabilizing at 32%. New Bedrock AI features driving enterprise adoption.",
    timestamp: "14 hr ago",
    type: "bullish",
    priority: "medium",
  },
  {
    id: "ins-009",
    agentId: "earnings",
    agentName: "Earnings Agent",
    ticker: "GOOGL",
    insight: "YouTube ad revenue missed expectations by 4%. Search remains strong but cloud margins compressed.",
    timestamp: "16 hr ago",
    type: "bearish",
    priority: "medium",
  },
  {
    id: "ins-010",
    agentId: "sec-filing",
    agentName: "SEC Filing Agent",
    ticker: "TSLA",
    insight: "Elon Musk exercised 2M options. No significant insider selling detected in past 30 days.",
    timestamp: "18 hr ago",
    type: "neutral",
    priority: "low",
  },
  {
    id: "ins-011",
    agentId: "valuation",
    agentName: "Valuation Agent",
    ticker: "CRM",
    insight: "Post-acquisition integration costs higher than modeled. Revising price target down 8% to $315.",
    timestamp: "20 hr ago",
    type: "bearish",
    priority: "medium",
  },
  {
    id: "ins-012",
    agentId: "news",
    agentName: "News Agent",
    ticker: "JPM",
    insight: "Fed signals potential rate cuts in H2. Net interest margin pressure may ease for major banks.",
    timestamp: "22 hr ago",
    type: "bullish",
    priority: "high",
  },
  {
    id: "ins-013",
    agentId: "portfolio-monitor",
    agentName: "Portfolio Monitor",
    ticker: "PORTFOLIO",
    insight: "Correlation spike detected between top 5 holdings. Diversification score dropped to 0.72.",
    timestamp: "1 day ago",
    type: "neutral",
    priority: "high",
  },
  {
    id: "ins-014",
    agentId: "research",
    agentName: "Research Agent",
    ticker: "AMD",
    insight: "MI300X gaining traction in inference workloads. Enterprise pipeline up 40% QoQ per channel checks.",
    timestamp: "1 day ago",
    type: "bullish",
    priority: "high",
  },
  {
    id: "ins-015",
    agentId: "earnings",
    agentName: "Earnings Agent",
    ticker: "NFLX",
    insight: "Subscriber adds beat by 2M. Ad-tier now 15% of new signups, exceeding management guidance.",
    timestamp: "1 day ago",
    type: "bullish",
    priority: "medium",
  },
  {
    id: "ins-016",
    agentId: "sec-filing",
    agentName: "SEC Filing Agent",
    ticker: "BA",
    insight: "Multiple hedge funds reduced Boeing positions in latest 13F filings. Aggregate reduction of 8%.",
    timestamp: "2 days ago",
    type: "bearish",
    priority: "low",
  },
]

export const agentStats = {
  totalAgents: 6,
  activeAgents: 6,
  insightsToday: 127,
  avgAccuracy: 82,
}
