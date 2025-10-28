"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
      aria-label="Toggle dark mode"
    >
      <Sun className="w-5 h-5 text-yellow-500 absolute opacity-0 rotate-90 scale-0 transition-all duration-300 group-hover:scale-110 dark:opacity-0 dark:rotate-0 dark:scale-0" />
      <Moon className="w-5 h-5 text-indigo-600 absolute opacity-100 rotate-0 scale-100 transition-all duration-300 group-hover:scale-110 dark:opacity-0 dark:-rotate-90 dark:scale-0" />
      <Sun className="w-5 h-5 text-yellow-500 absolute opacity-0 rotate-90 scale-0 transition-all duration-300 group-hover:scale-110 dark:opacity-100 dark:rotate-0 dark:scale-100" />
    </button>
  );
}

export default ThemeToggle;

