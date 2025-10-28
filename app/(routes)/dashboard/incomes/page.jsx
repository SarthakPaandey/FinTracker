import React from "react";
import IncomeList from "./_components/IncomeList";

function Income() {
  return (
    <div className="p-10 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      <h2 className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-6">My Income Streams</h2>
      <IncomeList />
    </div>
  );
}

export default Income;
