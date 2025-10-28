"use client"
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';

function ExpensesScreen() {

  const [expensesList,setExpensesList]=useState([]);
    const {user}=useUser();

    useEffect(()=>{
        user&&getAllExpenses();
      },[user])
    /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses=async()=>{
    try {
      const response = await fetch(`/api/expenses?userEmail=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress || "")}`);
      const result = await response.json();
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  }
  return (
    <div className='p-10 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300'>
      <h2 className='font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6'>My Expenses</h2>

        <ExpenseListTable refreshData={()=>getAllExpenses()}
        expensesList={expensesList}
        />
    </div>
  )
}

export default ExpensesScreen