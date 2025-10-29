"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./ChatMessage";

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI Finance Assistant. I can help you with budgeting, investing, financial planning, and more. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again or check your internet connection."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How can I help you with your finances today?"
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Finance Assistant</h3>
              <p className="text-white/80 text-sm">Powered by Gemini AI</p>
            </div>
          </div>
          <Button
            onClick={clearChat}
            variant="ghost"
            className="text-white hover:bg-white/20"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Bot className="animate-pulse" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about budgeting, investing, or financial advice..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send size={20} />
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Session-based conversation - chat history resets on page refresh
        </p>
      </form>
    </div>
  );
}

export default ChatInterface;

