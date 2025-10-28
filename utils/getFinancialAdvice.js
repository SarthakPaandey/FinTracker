// utils/getFinancialAdvice.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

// Function to generate personalized financial advice
const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  console.log(totalBudget, totalIncome, totalSpend);
  try {
    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ₹${totalBudget} INR 
      - Expenses: ₹${totalSpend} INR 
      - Incomes: ₹${totalIncome} INR
      Provide detailed financial advice in 2 sentence to help the user manage their finances more effectively.
    `;

    // Get the generative model (Gemini 2.0 Flash Experimental)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Generate content
    const result = await model.generateContent(userPrompt);
    const response = result.response;

    // Process and return the response
    const advice = response.text();

    console.log(advice);
    return advice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
