"use client";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    user && checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    try {
      const response = await fetch(`/api/budgets?userEmail=${encodeURIComponent(user?.primaryEmailAddress?.emailAddress || "")}`);
      const result = await response.json();
      console.log(result);
      if (result?.length == 0) {
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      console.error("Error checking budgets:", error);
    }
  };
  return (
    <div>
      <div className="fixed md:w-64 hidden md:block ">
        <SideNav />
      </div>
      <div className="md:ml-64 ">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
