import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  icon: { type: String },
  createdBy: { type: String, required: true },
});

const IncomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
  icon: { type: String },
  createdBy: { type: String, required: true },
});

const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true, default: 0 },
  budgetId: { type: mongoose.Schema.Types.ObjectId, ref: "Budget" },
  createdAt: { type: String, required: true },
});

export const Budgets = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
export const Incomes = mongoose.models.Income || mongoose.model("Income", IncomeSchema);
export const Expenses = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
