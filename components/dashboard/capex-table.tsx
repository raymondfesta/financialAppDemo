const tableData = [
  {
    ticker: "NVDA",
    convictionScore: "92/100",
    priceTarget: "$185.00",
    currentPrice: "$142.50",
    signal: "Strong Buy",
    agentInsight: "↑ Blackwell ramp ahead of schedule",
  },
  {
    ticker: "MSFT",
    convictionScore: "78/100",
    priceTarget: "$485.00",
    currentPrice: "$428.30",
    signal: "Buy",
    agentInsight: "→ Azure AI momentum sustained",
  },
  {
    ticker: "GOOGL",
    convictionScore: "71/100",
    priceTarget: "$195.00",
    currentPrice: "$178.20",
    signal: "Buy",
    agentInsight: "↑ Gemini adoption accelerating",
  },
  {
    ticker: "AMZN",
    convictionScore: "65/100",
    priceTarget: "$225.00",
    currentPrice: "$198.40",
    signal: "Hold",
    agentInsight: "→ AWS growth stabilizing",
  },
  {
    ticker: "META",
    convictionScore: "58/100",
    priceTarget: "$580.00",
    currentPrice: "$612.30",
    signal: "Hold",
    agentInsight: "↓ Reality Labs losses widening",
  },
]

const totalRow = {
  ticker: "PORTFOLIO",
  convictionScore: "73/100",
  priceTarget: "+18.2%",
  currentPrice: "Avg Upside",
  signal: "Overweight",
  agentInsight: "Bullish tech allocation",
}

export function CapexTable() {
  return (
    <div className="dashboard-container-nested overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Ticker</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Conviction Score</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Price Target</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Current Price</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Signal</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Agent Insight</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tableData.map((row, index) => (
              <tr key={index}>
                <td className="text-foreground px-4 py-3.5 whitespace-nowrap font-medium">{row.ticker}</td>
                <td className="text-muted-foreground px-4 py-3.5">{row.convictionScore}</td>
                <td className="text-muted-foreground px-4 py-3.5">{row.priceTarget}</td>
                <td className="text-muted-foreground px-4 py-3.5">{row.currentPrice}</td>
                <td className={`px-4 py-3.5 ${row.signal === 'Strong Buy' ? 'text-emerald-400' : row.signal === 'Buy' ? 'text-blue-400' : 'text-muted-foreground'}`}>{row.signal}</td>
                <td className="text-muted-foreground px-4 py-3.5">{row.agentInsight}</td>
              </tr>
            ))}
            <tr className="border-t border-border">
              <td className="font-medium text-emerald-400 px-4 py-3.5">{totalRow.ticker}</td>
              <td className="font-medium text-foreground px-4 py-3.5">{totalRow.convictionScore}</td>
              <td className="font-medium text-foreground px-4 py-3.5">{totalRow.priceTarget}</td>
              <td className="font-medium text-foreground px-4 py-3.5">{totalRow.currentPrice}</td>
              <td className="font-medium text-blue-400 px-4 py-3.5">{totalRow.signal}</td>
              <td className="font-medium text-emerald-400 px-4 py-3.5">{totalRow.agentInsight}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
