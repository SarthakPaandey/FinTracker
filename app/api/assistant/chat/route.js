import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

if (!apiKey) {
  console.error("Gemini API key is not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Get the Gemini model - using the model from the SDK documentation
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build conversation context
    let conversationContext = "";
    
    // Add system prompt for finance-focused assistant
    conversationContext += `You are a professional financial advisor AI assistant. Your role is to provide helpful, accurate, and practical financial advice. Focus on:
- Budgeting and expense management
- Investment strategies and portfolio management
- Debt management and financial planning
- Saving strategies and emergency funds
- Understanding financial terms and concepts
- General financial literacy

Always:
- Provide clear, actionable advice
- Use simple explanations for complex topics
- Encourage responsible financial habits
- Consider the user's financial goals
- Be empathetic and supportive

Conversation history:\n\n`;

    // Add recent conversation history (last 5 messages for context)
    const recentHistory = history.slice(-5);
    recentHistory.forEach((msg) => {
      if (msg.role === "user") {
        conversationContext += `User: ${msg.content}\n`;
      } else {
        conversationContext += `Assistant: ${msg.content}\n`;
      }
    });

    conversationContext += `\nCurrent user message: ${message}\n\nPlease provide a helpful financial advice response:`;

    // Generate response
    const result = await model.generateContent(conversationContext);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ 
      response: text,
      success: true 
    });

  } catch (error) {
    console.error("Error generating chat response:", error);
    console.error("Error details:", error.message);
    return NextResponse.json(
      { 
        error: error.message || "Failed to generate response. Please try again.",
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // List available models
    const models = await genAI.listModels();
    return NextResponse.json({ 
      message: "AI Assistant Chat API",
      status: "operational",
      availableModels: models
    });
  } catch (error) {
    return NextResponse.json({ 
      message: "AI Assistant Chat API",
      status: "operational",
      error: error.message
    });
  }
}

