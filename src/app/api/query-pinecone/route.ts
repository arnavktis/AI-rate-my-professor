import { NextRequest, NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from "@google/generative-ai";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

const index = pinecone.index(process.env.PINECONE_INDEX!);
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { query, topK } = await request.json();
    
    console.log("Generating embedding...");
    const model = genAI.getGenerativeModel({ model: "embedding-001" });
    const result = await model.embedContent(query);
    const queryEmbedding = result.embedding;

    if (!queryEmbedding || !Array.isArray(queryEmbedding.values)) {
      throw new Error("Invalid embedding format");
    }

    console.log("Querying Pinecone...");
    const queryResponse = await index.query({
      vector: queryEmbedding.values,
      topK,
      includeMetadata: true,
    });

    const results = queryResponse.matches?.map(match => ({
      pageContent: match.metadata?.text as string,
      metadata: match.metadata,
    })) || [];

    console.log("Pinecone query successful");
    return NextResponse.json(results);
  } catch (error: unknown) {
    console.error('Error in API route:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'An error occurred while processing your request.', details: errorMessage }, { status: 500 });
  }
}