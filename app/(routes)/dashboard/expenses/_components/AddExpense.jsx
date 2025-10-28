import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  /**
   * Used to Add New Expense
   */
  const addNewExpense = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          amount: amount,
          budgetId: budgetId,
          createdAt: moment().format("DD/MM/yyy"),
        }),
      });

      const result = await response.json();

      setAmount("");
      setName("");
      if (result.id) {
        setLoading(false);
        refreshData();
        toast("New Expense Added!");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast("Failed to add expense");
      setLoading(false);
    }
  };
  return (
    <div className="border border-gray-200 dark:border-gray-700 p-5 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300">
      <h2 className="font-bold text-lg text-gray-800 dark:text-gray-200">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-gray-800 dark:text-gray-200 font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <div className="mt-2">
        <h2 className="text-gray-800 dark:text-gray-200 font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
