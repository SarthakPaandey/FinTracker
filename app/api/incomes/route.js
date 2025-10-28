import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";

export async function GET(request) {
  try {
    await dbConnect();
    
    const incomes = await Incomes.find().lean();
    
    const formattedIncomes = incomes.map(income => ({
      ...income,
      id: income._id.toString(),
      totalAmount: parseFloat(income.amount) || 0,
    }));
    
    return NextResponse.json(formattedIncomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    return NextResponse.json({ error: "Failed to fetch incomes" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    
    const income = await Incomes.create({
      name: body.name,
      amount: body.amount,
      icon: body.icon,
      createdBy: body.createdBy,
    });
    
    return NextResponse.json({ id: income._id });
  } catch (error) {
    console.error("Error creating income:", error);
    return NextResponse.json({ error: "Failed to create income" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const incomeId = searchParams.get("incomeId");
    
    await Incomes.findByIdAndDelete(incomeId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting income:", error);
    return NextResponse.json({ error: "Failed to delete income" }, { status: 500 });
  }
}

