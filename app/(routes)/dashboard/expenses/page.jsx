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
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>

        <ExpenseListTable refreshData={()=>getAllExpenses()}
        expensesList={expensesList}
        />
    </div>
  )
}

export default ExpensesScreen