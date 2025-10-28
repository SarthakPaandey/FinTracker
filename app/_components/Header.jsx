"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

function Header() {
  const { user, isSignedIn } = useUser();
  return (
    <div className="p-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-row items-center gap-2">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} className="transition-transform duration-300 hover:scale-110" />
        <span className="text-blue-800 dark:text-blue-400 font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          FinTracker
        </span>
      </div>
      <div className="flex gap-3 items-center">
        {isSignedIn ? (
          <>
            <ThemeToggle />
            <UserButton />
          </>
        ) : (
          <>
            <Link href={"/dashboard"}>
              <Button variant="outline" className="rounded-full hover:shadow-lg transition-all duration-300 border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600">
                Dashboard
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
