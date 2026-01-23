"use client"

import { useState } from "react"
import { Send, Bot, User } from "lucide-react"
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

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-foreground">Financial Chat</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-powered conversational interface for portfolio queries</p>
      </div>

      {/* Chat Container */}
      <div className="dashboard-container-flat flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(59, 130, 246, 0.2)' }}
              >
                <Bot className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Boosted.ai Financial Chat</h2>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                Ask questions about your portfolio, market conditions, or request analysis from our Investment Agents.
              </p>

              {/* Suggested Queries */}
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {suggestedQueries.slice(0, 4).map((query) => (
                  <button
                    key={query.id}
                    onClick={() => handleSuggestedQuery(query.text)}
                    className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {query.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(59, 130, 246, 0.2)' }}
                  >
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white/5 text-foreground"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === "user" ? "text-blue-200" : "text-muted-foreground"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <User className="w-4 h-4 text-foreground" />
                  </div>
                )}
              </div>
            ))
          )}
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
              className="flex-1 px-4 py-3 rounded-xl text-sm bg-white/5 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-4 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
