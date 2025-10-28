import formatNumber from "@/utils";
import getFinancialAdvice from "@/utils/getFinancialAdvice";
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  CircleDollarSign,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice);
      };

      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  const CalculateCardInfo = () => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ = totalIncome_ + element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          <div className="p-7 border border-gray-200 dark:border-gray-700 mt-4 -mb-1 rounded-2xl flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="">
              <div className="flex mb-2 flex-row space-x-2 items-center">
                <h2 className="text-md font-semibold text-gray-700 dark:text-gray-300">FinTracker AI</h2>
                <Sparkles
                  className="rounded-full text-white w-10 h-10 p-2
    bg-gradient-to-r
    from-pink-500
    via-red-500
    to-yellow-500
    background-animate transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h2 className="font-light text-md text-gray-600 dark:text-gray-400">
                {financialAdvice || "Loading financial advice..."}
              </h2>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-7 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div>
                <h2 className="text-sm text-gray-600 dark:text-gray-400">Total Budget</h2>
                <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">
                  ₹{formatNumber(totalBudget)}
                </h2>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 h-12 w-12 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <PiggyBank className="w-full h-full" />
              </div>
            </div>
            <div className="p-7 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div>
                <h2 className="text-sm text-gray-600 dark:text-gray-400">Total Spend</h2>
                <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">
                  ₹{formatNumber(totalSpend)}
                </h2>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 h-12 w-12 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <ReceiptText className="w-full h-full" />
              </div>
            </div>
            <div className="p-7 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div>
                <h2 className="text-sm text-gray-600 dark:text-gray-400">No. Of Budget</h2>
                <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">{budgetList?.length}</h2>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 h-12 w-12 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Wallet className="w-full h-full" />
              </div>
            </div>
            <div className="p-7 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-between bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div>
                <h2 className="text-sm text-gray-600 dark:text-gray-400">Income Streams</h2>
                <h2 className="font-bold text-2xl text-gray-800 dark:text-gray-200">
                  ₹{formatNumber(totalIncome)}
                </h2>
              </div>
              <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 h-12 w-12 rounded-full text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CircleDollarSign className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 dark:bg-slate-700 animate-pulse rounded-2xl"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
