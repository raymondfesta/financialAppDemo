export interface UserProfile {
  name: string
  email: string
  role: string
  timezone: string
  avatar: string
}

export interface Integration {
  id: string
  name: string
  status: "connected" | "disconnected" | "error"
  lastSync: string
  description: string
}

export interface NotificationSetting {
  id: string
  label: string
  description: string
  email: boolean
  push: boolean
}

export const userProfile: UserProfile = {
  name: "Ray Festa",
  email: "raymond.festa2020@gmail.com",
  role: "Portfolio Manager",
  timezone: "America/New_York",
  avatar: "RF",
}

export const integrations: Integration[] = [
  {
    id: "bloomberg",
    name: "Bloomberg Terminal",
    status: "connected",
    lastSync: "Real-time",
    description: "Market data, news, and analytics integration",
  },
  {
    id: "reuters",
    name: "Reuters Eikon",
    status: "connected",
    lastSync: "5 min ago",
    description: "Alternative data source and news feed",
  },
  {
    id: "prime-broker",
    name: "Prime Broker (Goldman Sachs)",
    status: "connected",
    lastSync: "EOD",
    description: "Position reconciliation and margin data",
  },
  {
    id: "custodian",
    name: "State Street Custody",
    status: "connected",
    lastSync: "T+1",
    description: "Asset safekeeping and settlement",
  },
  {
    id: "risk-system",
    name: "Axioma Risk",
    status: "connected",
    lastSync: "30 min ago",
    description: "Factor risk and portfolio analytics",
  },
  {
    id: "compliance",
    name: "Compliance Monitor",
    status: "error",
    lastSync: "2 days ago",
    description: "Pre-trade and post-trade compliance checks",
  },
]

export const notificationSettings: NotificationSetting[] = [
  {
    id: "high-priority-insights",
    label: "High Priority Insights",
    description: "Alerts when agents detect significant market events",
    email: true,
    push: true,
  },
  {
    id: "position-alerts",
    label: "Position Alerts",
    description: "Notifications for large P&L changes or limit breaches",
    email: true,
    push: true,
  },
  {
    id: "research-updates",
    label: "Research Updates",
    description: "New research reports from Investment Agents",
    email: true,
    push: false,
  },
  {
    id: "market-open-close",
    label: "Market Open/Close",
    description: "Daily market summary notifications",
    email: false,
    push: true,
  },
  {
    id: "report-ready",
    label: "Report Ready",
    description: "Notifications when scheduled reports are generated",
    email: true,
    push: false,
  },
  {
    id: "system-alerts",
    label: "System Alerts",
    description: "Integration errors and system status updates",
    email: true,
    push: true,
  },
]

export const timezones = [
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Hong_Kong",
  "Asia/Singapore",
]
