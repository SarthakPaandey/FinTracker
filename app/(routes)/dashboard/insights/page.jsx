"use client";
import React, { useState } from "react";
import BudgetSuggestions from "./_components/BudgetSuggestions";
import OverspendingTips from "./_components/OverspendingTips";
import BookWisdom from "./_components/BookWisdom";
import TermsDictionary from "./_components/TermsDictionary";

function Insights() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300">
      <div className="mb-8 animate-fade-in">
        <h2 className="font-bold text-4xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
          Financial Insights
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Expand your financial knowledge with expert advice, tips, and wisdom
        </p>
      </div>

      <div className="space-y-6">
        <BudgetSuggestions />
        <OverspendingTips />
        <BookWisdom />
        <TermsDictionary />
      </div>
    </div>
  );
}

export default Insights;

