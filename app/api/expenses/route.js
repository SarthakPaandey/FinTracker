import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";

export async function GET(request) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const userEmail = searchParams.get("userEmail");
    
    if (!userEmail) {
      return NextResponse.json({ error: "User email required" }, { status: 400 });
    }

    const userBudgets = await Budgets.find({ createdBy: userEmail }).select('_id').lean();
    const budgetIds = userBudgets.map(b => b._id.toString());
    
    const expenses = await Expenses.find({ budgetId: { $in: budgetIds } })
      .lean()
      .sort({ _id: -1 });
    
    const expensesWithBudgetName = await Promise.all(
      expenses.map(async (expense) => {
        const budget = await Budgets.findById(expense.budgetId).lean();
        return {
          id: expense._id.toString(),
          name: expense.name,
          amount: expense.amount,
          createdAt: expense.createdAt,
          budgetName: budget?.name || 'Unknown',
        };
      })
    );
    
    return NextResponse.json(expensesWithBudgetName);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const expense = await Expenses.create({
      name: body.name,
      amount: body.amount,
      budgetId: body.budgetId,
      createdAt: body.createdAt,
    });
    
    return NextResponse.json({ id: expense._id });
  } catch (error) {
    console.error("Error creating expense:", error);
    return NextResponse.json({ error: "Failed to create expense" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const expenseId = searchParams.get("expenseId");
    
    await Expenses.findByIdAndDelete(expenseId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting expense:", error);
    return NextResponse.json({ error: "Failed to delete expense" }, { status: 500 });
  }
}

