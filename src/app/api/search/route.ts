// pages/api/search.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? "",
});

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: query,
    });
    const queryEmbedding = response.data[0].embedding;

    const index = pinecone.index(process.env.PINECONE_INDEX_NAME ?? "");

    const queryResponse = await index.query({
      vector: queryEmbedding,
      topK: 5,
      includeMetadata: true,
    });

    const matches = queryResponse.matches?.map((match) => ({
      id: match.id,
      score: match.score ?? 0,
      metadata: match.metadata ?? null,
    }));

    return NextResponse.json({ matches });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[ERROR in search/route.ts]", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
