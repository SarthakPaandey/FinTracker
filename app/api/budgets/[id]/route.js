import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const budgetId = params.id;
    const budget = await Budgets.findById(budgetId).lean();
    
    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    // Get expenses for this budget
    const expenses = await Expenses.find({ budgetId: budgetId }).lean();
    const totalSpend = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    const totalItem = expenses.length;
    
    const budgetInfo = {
      ...budget,
      id: budget._id.toString(),
      totalSpend,
      totalItem,
    };
    
    return NextResponse.json(budgetInfo);
  } catch (error) {
    console.error("Error fetching budget:", error);
    return NextResponse.json({ error: "Failed to fetch budget" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const budgetId = params.id;
    
    // Delete all expenses for this budget
    await Expenses.deleteMany({ budgetId: budgetId });
    
    // Delete the budget
    await Budgets.findByIdAndDelete(budgetId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 });
  }
}

