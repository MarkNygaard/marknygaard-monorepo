import { NextResponse } from "next/server"
import { getEnvironment } from "@/lib/getEnvironment"
import { client } from "@/lib/sanity/client"
import { token } from "@/lib/sanity/token"

const { sanity } = getEnvironment()

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const indexName = "posts"
    const embeddingsUrl = `https://${sanity.projectId}.api.sanity.io/${sanity.apiVersion}/embeddings-index/query/${sanity.dataset}/${indexName}`

    const response = await fetch(embeddingsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        maxResults: 10,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Sanity API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()

    // Extract document IDs from the embeddings response
    const hits = data as Array<{
      score: number
      value: { documentId: string; type: string }
    }>

    if (!hits || hits.length === 0) {
      return NextResponse.json({ results: [] })
    }

    // Fetch the actual post documents
    const documentIds = hits.map((hit) => hit.value.documentId)
    const posts = await client.withConfig({ token }).fetch(
      `*[_id in $ids]{
        _id,
        title,
        slug,
        excerpt,
        coverImage
      }`,
      { ids: documentIds },
    )

    // Combine posts with their scores, maintaining the order from the search results
    const results = hits
      .map((hit) => {
        const post = posts.find((p: { _id: string }) => p._id === hit.value.documentId)
        if (!post) return null
        return {
          _id: post._id,
          title: post.title,
          slug: post.slug.current,
          excerpt: post.excerpt,
          image: post.coverImage,
          score: hit.score,
        }
      })
      .filter((result): result is NonNullable<typeof result> => result !== null)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Search route error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Search failed" },
      { status: 500 },
    )
  }
}
