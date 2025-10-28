import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };
  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div
        className="p-5 border border-gray-200 dark:border-gray-700 rounded-2xl
    hover:shadow-xl cursor-pointer h-[170px] bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105"
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2
              className="text-2xl p-3 px-4
              bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full transition-transform duration-300 hover:scale-110"
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

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-gray-600 dark:text-gray-400">
              ₹{budget.totalSpend ? budget.totalSpend : 0} Spend
            </h2>
            <h2 className="text-xs text-gray-600 dark:text-gray-400">
              ₹{budget.amount - budget.totalSpend} Remaining
            </h2>
          </div>
          <div
            className="w-full
              bg-gray-200 dark:bg-gray-700 h-2 rounded-full"
          >
            <div
              className="
              bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${calculateProgressPerc()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
