"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookMarked, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const terms = [
  {
    term: "Assets",
    definition: "Resources owned by an individual or entity that have economic value and can provide future benefit, such as cash, investments, real estate, or equipment."
  },
  {
    term: "Budget",
    definition: "A financial plan that estimates income and expenses over a specific period, helping individuals and organizations manage their money effectively."
  },
  {
    term: "Compound Interest",
    definition: "Interest calculated on the initial principal and accumulated interest from previous periods, allowing your money to grow exponentially over time."
  },
  {
    term: "Credit Score",
    definition: "A numerical representation of a person's creditworthiness, ranging from 300-850, used by lenders to assess the risk of lending money."
  },
  {
    term: "Diversification",
    definition: "The strategy of spreading investments across different asset classes, sectors, or geographic regions to reduce risk."
  },
  {
    term: "Emergency Fund",
    definition: "A savings account with enough money to cover 3-6 months of living expenses, used for unexpected financial crises."
  },
  {
    term: "Expense",
    definition: "Money spent on goods or services, including essential costs (needs) like housing and food, and discretionary spending (wants) like entertainment."
  },
  {
    term: "Investment",
    definition: "Allocating money to assets such as stocks, bonds, or real estate with the expectation of generating returns or appreciation over time."
  },
  {
    term: "Liability",
    definition: "Financial obligations or debts owed to others, such as loans, credit card balances, or mortgages."
  },
  {
    term: "Mutual Fund",
    definition: "An investment vehicle that pools money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities."
  },
  {
    term: "Net Worth",
    definition: "The difference between an individual's total assets and total liabilities, representing their overall financial position."
  },
  {
    term: "Opportunity Cost",
    definition: "The value of the best alternative forgone when choosing one option over another, representing what you give up to make a decision."
  }
];

function TermsDictionary() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = terms.filter(term =>
    term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
            <BookMarked className="text-teal-600 dark:text-teal-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">
              Financial Terms Dictionary
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn essential financial terminology and concepts
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search financial terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>

          <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900 dark:to-cyan-900 p-4 rounded-lg border border-teal-200 dark:border-teal-700 hover:shadow-md transition-shadow"
                >
                  <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-2">
                    {item.term}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {item.definition}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No terms found matching "{searchTerm}"
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TermsDictionary;

