"use client"

import { useState } from "react"
import { Check, X, AlertCircle } from "lucide-react"
import { userProfile, integrations, notificationSettings, timezones } from "@/lib/mock-data"

type Tab = "profile" | "notifications" | "integrations"

function StatusIcon({ status }: { status: "connected" | "disconnected" | "error" }) {
  if (status === "connected") return <Check className="w-4 h-4 text-emerald-400" />
  if (status === "error") return <AlertCircle className="w-4 h-4 text-red-400" />
  return <X className="w-4 h-4 text-muted-foreground" />
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-10 h-6 rounded-full transition-colors relative ${
        enabled ? "bg-blue-500" : "bg-white/20"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
          enabled ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile")
  const [notifications, setNotifications] = useState(
    notificationSettings.reduce((acc, n) => {
      acc[n.id] = { email: n.email, push: n.push }
      return acc
    }, {} as Record<string, { email: boolean; push: boolean }>)
  )

  const toggleNotification = (id: string, type: "email" | "push") => {
    setNotifications((prev) => ({
      ...prev,
      [id]: { ...prev[id], [type]: !prev[id][type] },
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile, notifications, and integrations</p>
      </div>

      {/* Tabs */}
      <div
        className="p-1 inline-flex gap-1 rounded-lg"
        style={{ background: 'rgba(255, 255, 255, 0.05)' }}
      >
        {([
          { id: "profile" as const, label: "Profile" },
          { id: "notifications" as const, label: "Notifications" },
          { id: "integrations" as const, label: "Integrations" },
        ]).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white/10 text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "profile" && (
        <div className="dashboard-container-flat p-6 max-w-lg">
          <h2 className="text-sm font-semibold text-foreground mb-3">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Name</label>
              <input
                type="text"
                defaultValue={userProfile.name}
                className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                defaultValue={userProfile.email}
                className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Role</label>
              <input
                type="text"
                defaultValue={userProfile.role}
                className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-2">Timezone</label>
              <select
                defaultValue={userProfile.timezone}
                className="w-full px-3 py-2 rounded-lg text-sm bg-white/5 border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz} className="bg-[#171717]">
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            <button className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="dashboard-container-flat max-w-2xl">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Notification Preferences</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Choose how you want to be notified</p>
          </div>
          <div className="divide-y divide-border">
            <div className="px-6 py-3 grid grid-cols-3 gap-4 text-xs text-muted-foreground">
              <span></span>
              <span className="text-center">Email</span>
              <span className="text-center">Push</span>
            </div>
            {notificationSettings.map((setting) => (
              <div key={setting.id} className="px-6 py-4 grid grid-cols-3 gap-4 items-center">
                <div>
                  <p className="text-sm font-medium text-foreground">{setting.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{setting.description}</p>
                </div>
                <div className="flex justify-center">
                  <Toggle
                    enabled={notifications[setting.id]?.email ?? setting.email}
                    onChange={() => toggleNotification(setting.id, "email")}
                  />
                </div>
                <div className="flex justify-center">
                  <Toggle
                    enabled={notifications[setting.id]?.push ?? setting.push}
                    onChange={() => toggleNotification(setting.id, "push")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "integrations" && (
        <div className="space-y-4 max-w-2xl">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="dashboard-container-flat p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    integration.status === "connected" ? "bg-emerald-500/20" :
                    integration.status === "error" ? "bg-red-500/20" : "bg-white/10"
                  }`}
                >
                  <StatusIcon status={integration.status} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{integration.name}</p>
                  <p className="text-xs text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded ${
                  integration.status === "connected" ? "bg-emerald-500/20 text-emerald-400" :
                  integration.status === "error" ? "bg-red-500/20 text-red-400" :
                  "bg-white/10 text-muted-foreground"
                }`}>
                  {integration.status === "connected" ? "Connected" :
                   integration.status === "error" ? "Error" : "Disconnected"}
                </span>
                <p className="text-xs text-muted-foreground mt-1">Last sync: {integration.lastSync}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
