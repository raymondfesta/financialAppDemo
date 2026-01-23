import { Download, Clock, Check, Calendar } from "lucide-react"
import { reports } from "@/lib/mock-data"

function StatusIcon({ status }: { status: "ready" | "generating" | "scheduled" }) {
  if (status === "ready") return <Check className="w-4 h-4 text-emerald-400" />
  if (status === "generating") return <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
  return <Calendar className="w-4 h-4 text-blue-400" />
}

function StatusBadge({ status }: { status: "ready" | "generating" | "scheduled" }) {
  const styles = {
    ready: "bg-emerald-500/20 text-emerald-400",
    generating: "bg-yellow-500/20 text-yellow-400",
    scheduled: "bg-blue-500/20 text-blue-400",
  }

  const labels = {
    ready: "Ready",
    generating: "Generating...",
    scheduled: "Scheduled",
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
      <StatusIcon status={status} />
      {labels[status]}
    </span>
  )
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Generated reports for investors and compliance</p>
        </div>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Generate Report
        </button>
      </div>

      {/* Reports Table */}
      <div className="dashboard-container-flat">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground py-4 px-5">Report Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-4 px-5">Period</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-4 px-5">Generated</th>
                <th className="text-left text-xs font-medium text-muted-foreground py-4 px-5">Status</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-4 px-5">Size</th>
                <th className="text-right text-xs font-medium text-muted-foreground py-4 px-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-5">
                    <div>
                      <p className="text-sm font-medium text-foreground">{report.type}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{report.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-muted-foreground">{report.period}</td>
                  <td className="py-4 px-5 text-sm text-muted-foreground">{report.generatedAt}</td>
                  <td className="py-4 px-5">
                    <StatusBadge status={report.status} />
                  </td>
                  <td className="py-4 px-5 text-sm text-muted-foreground text-right">
                    {report.size || "—"}
                  </td>
                  <td className="py-4 px-5 text-right">
                    {report.status === "ready" && (
                      <button className="p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground">
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Types Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { type: "Monthly Investor Letter", desc: "Monthly performance summary and market commentary" },
          { type: "Quarterly Performance", desc: "Comprehensive quarterly analysis with attribution" },
          { type: "Risk Report", desc: "VaR analysis, stress testing, and factor exposure" },
          { type: "Compliance Report", desc: "Regulatory compliance and trade surveillance" },
          { type: "Position Report", desc: "Daily position snapshot with P&L metrics" },
          { type: "Trade Blotter", desc: "Detailed trade log with execution analysis" },
        ].map((item) => (
          <div
            key={item.type}
            className="dashboard-container-flat p-4"
          >
            <h3 className="text-sm font-semibold text-foreground mb-2">{item.type}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
