// pages/api/add.ts
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY ?? "",
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    const embedding = response.data[0].embedding;
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME ?? "");

    const vectorId = uuidv4();

    await index.upsert([
      {
        id: vectorId,
        values: embedding,
        metadata: {
          text: text,
          source: "hard-coded",
        },
      },
    ]);

    return NextResponse.json({ message: `Text '${text}' added successfully!` });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[ERROR in add/route.ts]", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
