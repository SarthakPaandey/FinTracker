"use client";
import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  useEffect(() => {
    user && getBudgetList();
  }, [user]);
  /**
   * used to get budget List
   */
  const getBudgetList = async () => {
    try {
      const response = await fetch(`/api/budgets?userEmail=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress || "")}`);
      const result = await response.json();
      setBudgetList(result);
      getAllExpenses();
      getIncomeList();
    } catch (error) {
      console.error("Error fetching budgets:", error);
    }
  };

  /**
   * Get Income stream list
   */
  const getIncomeList = async () => {
    try {
      const response = await fetch('/api/incomes');
      const result = await response.json();
      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    try {
      const response = await fetch(`/api/expenses?userEmail=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress || "")}`);
      const result = await response.json();
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      <div className="mb-8 animate-fade-in">
        <h2 className="font-bold text-4xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
          Hi, {user?.fullName} 👋
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Here's what happenning with your money, Lets Manage your expense
        </p>
      </div>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <BarChartDashboard budgetList={budgetList} />

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg text-gray-700 dark:text-gray-300">Latest Budgets</h2>
          {budgetList?.length > 0
            ? budgetList.map((budget, index) => (
                <BudgetItem budget={budget} key={index} />
              ))
            : [1, 2, 3, 4].map((item, index) => (
                <div
                  key={index}
                  className="h-[180px] w-full
                 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
