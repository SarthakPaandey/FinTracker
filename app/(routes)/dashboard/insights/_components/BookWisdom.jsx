"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Quote } from "lucide-react";

const wisdom = [
  {
    book: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    quotes: [
      "The rich don't work for money, they make money work for them.",
      "The single most powerful asset we all have is our mind.",
      "It's not how much money you make, but how much money you keep.",
      "Intelligence solves problems and produces money."
    ]
  },
  {
    book: "The Intelligent Investor",
    author: "Benjamin Graham",
    quotes: [
      "The investor's chief problem—and even his worst enemy—is likely to be himself.",
      "In the short run, the market is a voting machine but in the long run, it is a weighing machine.",
      "The intelligent investor is a realist who sells to optimists and buys from pessimists.",
      "Never count on making a good sale. Have the purchase price be so attractive that even a mediocre sale gives good results."
    ]
  },
  {
    book: "Think and Grow Rich",
    author: "Napoleon Hill",
    quotes: [
      "Desire is the starting point of all achievement.",
      "Whatever the mind can conceive and believe, it can achieve.",
      "The starting point of all achievement is desire.",
      "If you cannot do great things, do small things in a great way."
    ]
  },
  {
    book: "The Richest Man in Babylon",
    author: "George S. Clason",
    quotes: [
      "A part of all you earn is yours to keep.",
      "Advice is one thing that is freely given away, but watch that you only take what is worth having.",
      "The soul of a free man looks at life as a series of problems to be solved and solves them, while the soul of a slave whines, 'What can I do?'",
      "Where the determination is, the way can be found."
    ]
  }
];

function BookWisdom() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedBook, setSelectedBook] = useState(0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
            <BookOpen className="text-indigo-600 dark:text-indigo-400" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">
              Wisdom from Financial Books
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Inspiring quotes from legendary financial experts
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {wisdom.map((book, index) => (
              <button
                key={index}
                onClick={() => setSelectedBook(index)}
                className={`p-3 rounded-lg text-left transition-all ${
                  selectedBook === index
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <p className="font-semibold text-sm">{book.book.split(" ")[0]}...</p>
                <p className="text-xs opacity-80">{book.author.split(" ")[0]}</p>
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 p-6 rounded-lg border border-indigo-200 dark:border-indigo-700">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-indigo-600 dark:text-indigo-400" size={20} />
              <div>
                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                  {wisdom[selectedBook].book}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  by {wisdom[selectedBook].author}
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {wisdom[selectedBook].quotes.map((quote, index) => (
                <div key={index} className="flex gap-3">
                  <Quote className="text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-1" size={20} />
                  <p className="text-gray-700 dark:text-gray-300 italic">{quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookWisdom;

