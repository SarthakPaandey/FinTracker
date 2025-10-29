"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calculator, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BudgetSuggestions() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [salary, setSalary] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  const calculateBudget = () => {
    if (!salary || salary <= 0) return;
    const monthlySalary = parseFloat(salary);

    // 50/30/20 rule
    const needs = monthlySalary * 0.50;
    const wants = monthlySalary * 0.30;
    const savings = monthlySalary * 0.20;

    setSuggestions({
      needs,
      wants,
      savings,
      housing: monthlySalary * 0.30,
      transportation: monthlySalary * 0.15,
      food: monthlySalary * 0.10,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Calculator className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">
              Budget Suggestions Based on Salary
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Get personalized budget recommendations using the 50/30/20 rule
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="text-gray-400 group-hover:text-gray-600 transition-colors" size={24} />
        ) : (
          <ChevronDown className="text-gray-400 group-hover:text-gray-600 transition-colors" size={24} />
        )}
      </div>

      {isExpanded && (
        <div className="mt-6 space-y-4 animate-fade-in">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Monthly Salary (₹)
              </label>
              <Input
                type="number"
                placeholder="Enter your monthly salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full"
              />
            </div>
            <Button onClick={calculateBudget} className="bg-blue-600 hover:bg-blue-700">
              Calculate
            </Button>
          </div>

          {suggestions && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-blue-600 dark:text-blue-400" size={20} />
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Needs (50%)</h4>
                </div>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{suggestions.needs.toFixed(0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Essentials like housing, utilities, groceries
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-purple-600 dark:text-purple-400" size={20} />
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Wants (30%)</h4>
                </div>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  ₹{suggestions.wants.toFixed(0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Entertainment, dining out, hobbies
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-green-600 dark:text-green-400" size={20} />
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Savings (20%)</h4>
                </div>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ₹{suggestions.savings.toFixed(0)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Emergency fund, investments, debt payment
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BudgetSuggestions;

