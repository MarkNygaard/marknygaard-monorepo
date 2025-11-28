import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("sessionId")

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId is required" }, { status: 400 })
    }

    const endpoint = process.env.NEXT_PUBLIC_N8N_HISTORY_ENDPOINT || ""
    const apiKey = process.env.N8N_API_KEY || ""

    const response = await fetch(`${endpoint}?sessionId=${sessionId}`, {
      headers: {
        "x-api-key": apiKey,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("GET /api/chat - Error response:", errorText)
      return NextResponse.json({ error: `N8N error: ${errorText}` }, { status: response.status })
    }

    const text = await response.text()

    // Handle empty response
    if (!text || text.trim() === "") {
      return NextResponse.json([])
    }

    const data = JSON.parse(text)

    // Extract messages from the n8n response format
    if (Array.isArray(data)) {
      const messages = data.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      }))
      return NextResponse.json(messages)
    }

    return NextResponse.json([])
  } catch (error) {
    console.error("GET /api/chat - Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: `Failed to fetch chat history: ${errorMessage}` },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const endpoint = process.env.NEXT_PUBLIC_N8N_CHAT_ENDPOINT || ""
    const apiKey = process.env.N8N_API_KEY || ""

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json({ error: `N8N error: ${errorText}` }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("POST /api/chat - Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: `Failed to process chat request: ${errorMessage}` },
      { status: 500 },
    )
  }
}
