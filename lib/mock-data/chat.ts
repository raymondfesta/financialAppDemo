export interface SuggestedQuery {
  id: string
  text: string
  category: "portfolio" | "market" | "research" | "risk"
}

export const suggestedQueries: SuggestedQuery[] = [
  { id: "q1", text: "What's driving NVDA today?", category: "market" },
  { id: "q2", text: "Compare our tech holdings to benchmark", category: "portfolio" },
  { id: "q3", text: "Summarize recent earnings surprises", category: "research" },
  { id: "q4", text: "What are key risks in our portfolio?", category: "risk" },
  { id: "q5", text: "Show me our sector allocation", category: "portfolio" },
  { id: "q6", text: "Which positions have highest conviction?", category: "portfolio" },
  { id: "q7", text: "What's the market sentiment on AI stocks?", category: "market" },
  { id: "q8", text: "Generate a summary for my top 5 holdings", category: "research" },
]
