"use client"

import { useState } from "react"
import { Send, Bot, User, ArrowUp } from "lucide-react"
import { suggestedQueries } from "@/lib/mock-data"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function FinancialChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm analyzing your request. This is a mockup interface - in a production environment, I would provide detailed financial analysis, portfolio insights, and market data based on your query.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleSuggestedQuery = (query: string) => {
    setInput(query)
  }

  // Empty state - centered layout
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] max-w-2xl mx-auto w-full px-4">
        <h1 className="text-3xl font-medium text-foreground mb-8">
          How can I help you today?
        </h1>

        {/* Input */}
        <div className="w-full mb-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about your portfolio, markets, or request analysis..."
              className="w-full px-4 py-4 pr-12 rounded-2xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-chart-1 text-white hover:bg-chart-1/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suggested Queries */}
        <div className="grid grid-cols-2 gap-2 w-full">
          {suggestedQueries.slice(0, 4).map((query) => (
            <button
              key={query.id}
              onClick={() => handleSuggestedQuery(query.text)}
              className="px-4 py-2 rounded-full text-sm text-muted-foreground hover:text-foreground border border-border hover:bg-muted transition-colors"
            >
              {query.text}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // With messages - standard chat layout
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-[1280px] mx-auto w-full">
      {/* Chat Container */}
      <div className="dashboard-container-flat flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-chart-1/20">
                  <Bot className="w-4 h-4 text-chart-1" />
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-chart-1 text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-muted">
                  <User className="w-4 h-4 text-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about your portfolio, markets, or request analysis..."
              className="flex-1 px-4 py-3 rounded-xl text-sm bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-3 rounded-xl bg-chart-1 text-white hover:bg-chart-1/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
