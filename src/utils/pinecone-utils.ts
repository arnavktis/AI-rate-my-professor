import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
  throw new Error("GOOGLE_API_KEY is not set");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function chatbotResponse(userQuery: string) {
  try {
    console.log("Fetching data from Pinecone...");
    const response = await fetch('/api/query-pinecone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: userQuery, topK: 3 }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Pinecone API error:", response.status, response.statusText, errorText);
      throw new Error(`Failed to fetch from Pinecone: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      console.error("Unexpected response type:", contentType, "Response body:", text);
      throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const relevantReviews = await response.json();
    console.log("Received data from Pinecone:", relevantReviews);

    if (!Array.isArray(relevantReviews) || relevantReviews.length === 0) {
      console.warn("No relevant reviews found");
      return "I'm sorry, but I couldn't find any relevant information to answer your question.";
    }

    let resultString = relevantReviews.map((review, index) => `
      Result ${index + 1}:
      Professor: ${review.metadata?.professor || 'Unknown'}
      Review: ${review.pageContent}
      Subject: ${review.metadata?.subject || 'Unknown'}
      Stars: ${review.metadata?.stars || 'Unknown'}
    `).join('\n');

    console.log("Generating AI response...");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `You are a rate my professor agent. Use the following context to answer the user's question:

${resultString}

User Query: ${userQuery}

Response:`;

    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    
    return aiResponse.text();
  } catch (error: unknown) {
    console.error("Error in chatbotResponse:", error);
    if (error instanceof Error) {
      return `I'm sorry, but I encountered an error while processing your request: ${error.message}`;
    } else {
      return "I'm sorry, but I encountered an unknown error while processing your request.";
    }
  }
}