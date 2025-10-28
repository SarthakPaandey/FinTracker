import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    try {
      const response = await fetch(`/api/expenses?expenseId=${expense.id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.success) {
        toast("Expense Deleted!");
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast("Failed to delete expense");
    }
  };
  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">Latest Expenses</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-gray-200 dark:bg-gray-700 p-2 mt-3 border border-gray-200 dark:border-gray-600">
        <h2 className="font-bold text-gray-700 dark:text-gray-300">Name</h2>
        <h2 className="font-bold text-gray-700 dark:text-gray-300">Amount</h2>
        <h2 className="font-bold text-gray-700 dark:text-gray-300">Date</h2>
        <h2 className="font-bold text-gray-700 dark:text-gray-300">Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div key={index} className="grid grid-cols-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
          <h2 className="text-gray-800 dark:text-gray-200">{expenses.name}</h2>
          <h2 className="text-gray-800 dark:text-gray-200">₹{expenses.amount}</h2>
          <h2 className="text-gray-600 dark:text-gray-400">{expenses.createdAt}</h2>
          <h2
            onClick={() => deleteExpense(expenses)}
            className="text-red-500 dark:text-red-400 cursor-pointer hover:text-red-600 dark:hover:text-red-300 transition-colors duration-200"
          >
            Delete
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
