import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const budgetId = params.id;
    
    const expenses = await Expenses.find({ budgetId: budgetId })
      .lean()
      .sort({ _id: -1 });
    
    const formattedExpenses = expenses.map(expense => ({
      ...expense,
      id: expense._id.toString(),
    }));
    
    return NextResponse.json(formattedExpenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

