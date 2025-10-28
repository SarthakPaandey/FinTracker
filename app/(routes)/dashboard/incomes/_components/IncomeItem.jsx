import Link from "next/link";
import React from "react";

function IncomeItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };
  return (
    <div
      className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl
    hover:shadow-xl cursor-pointer h-[170px] bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2
            className="text-2xl p-3 px-4
              bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full transition-transform duration-300 hover:scale-110"
          >
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold text-gray-800 dark:text-gray-200">{budget.name}</h2>
            <h2 className="text-sm text-gray-500 dark:text-gray-400">{budget.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary dark:text-blue-400 text-lg"> ₹{budget.amount}</h2>
      </div>
    </div>
  );
}

export default IncomeItem;
