"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, Shield } from "lucide-react";

const categories = [
  {
    name: "Food & Dining",
    tips: [
      "Plan your meals weekly and shop with a list",
      "Limit eating out to 2-3 times per week",
      "Cook in bulk and freeze leftovers",
      "Use cashback apps when dining out"
    ]
  },
  {
    name: "Shopping",
    tips: [
      "Wait 24 hours before making non-essential purchases",
      "Unsubscribe from marketing emails",
      "Use the 'one in, one out' rule for clothes",
      "Shop with a list and stick to it"
    ]
  },
  {
    name: "Entertainment",
    tips: [
      "Share streaming service accounts with family",
      "Use free library resources for books and movies",
      "Look for free community events",
      "Set a monthly entertainment budget"
    ]
  },
  {
    name: "Transportation",
    tips: [
      "Use public transport when possible",
      "Carpool to reduce fuel costs",
      "Walk or bike for short distances",
      "Plan trips efficiently to minimize driving"
    ]
  },
  {
    name: "Utilities",
    tips: [
      "Use energy-efficient appliances and LED bulbs",
      "Unplug devices when not in use",
      "Set thermostat to optimal temperatures",
      "Take shorter showers to save water"
    ]
  }
];

function OverspendingTips() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
            <Shield className="text-orange-600 dark:text-orange-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">
              Tips to Avoid Overspending
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Category-specific strategies to control your spending
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
        <div className="mt-6 animate-fade-in space-y-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900 dark:to-red-900 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="text-orange-600 dark:text-orange-400" size={20} />
              <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                Tips for {categories[selectedCategory].name}
              </h4>
            </div>
            <ul className="space-y-2">
              {categories[selectedCategory].tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default OverspendingTips;

