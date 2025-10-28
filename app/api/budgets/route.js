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

    const budgets = await Budgets.find({ createdBy: userEmail }).lean();
    
    const budgetsWithExpenses = await Promise.all(
      budgets.map(async (budget) => {
        const expenses = await Expenses.find({ budgetId: budget._id.toString() }).lean();
        const totalSpend = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
        const totalItem = expenses.length;
        
        return {
          ...budget,
          id: budget._id.toString(),
          totalSpend,
          totalItem,
        };
      })
    );
    
    return NextResponse.json(budgetsWithExpenses.sort((a, b) => new Date(b._id) - new Date(a._id)));
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const budget = await Budgets.create({
      name: body.name,
      amount: body.amount,
      icon: body.icon,
      createdBy: body.createdBy,
    });
    
    return NextResponse.json({ id: budget._id });
  } catch (error) {
    console.error("Error creating budget:", error);
    return NextResponse.json({ error: "Failed to create budget" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const budget = await Budgets.findByIdAndUpdate(
      body.id,
      {
        name: body.name,
        amount: body.amount,
        icon: body.icon,
      },
      { new: true }
    );
    
    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, budget });
  } catch (error) {
    console.error("Error updating budget:", error);
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const budgetId = searchParams.get("budgetId");
    
    await Budgets.findByIdAndDelete(budgetId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting budget:", error);
    return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 });
  }
}

