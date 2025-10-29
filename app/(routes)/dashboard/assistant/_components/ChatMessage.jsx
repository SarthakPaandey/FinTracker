"use client";
import React from "react";
import { Bot, User } from "lucide-react";

function ChatMessage({ message }) {
  const isAssistant = message.role === "assistant";

  return (
    <div className={`flex gap-3 ${isAssistant ? "" : "flex-row-reverse"}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isAssistant
            ? "bg-blue-100 dark:bg-blue-900"
            : "bg-purple-100 dark:bg-purple-900"
        }`}
      >
        {isAssistant ? (
          <Bot className="text-blue-600 dark:text-blue-400" size={18} />
        ) : (
          <User className="text-purple-600 dark:text-purple-400" size={18} />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 ${isAssistant ? "" : "flex justify-end"}`}>
        <div
          className={`max-w-[80%] rounded-lg p-4 ${
            isAssistant
              ? "bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-gray-200 border border-blue-200 dark:border-blue-700"
              : "bg-purple-50 dark:bg-purple-900/30 text-gray-800 dark:text-gray-200 border border-purple-200 dark:border-purple-700"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm">
              {isAssistant ? "AI Assistant" : "You"}
            </span>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;

