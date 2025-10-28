import React, { useEffect } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  CircleDollarSign,
  TrendingUp,
  TrendingDownIcon,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
function SideNav() {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: CircleDollarSign,
      path: "/dashboard/incomes",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    // {
    //   id: 2,
    //   name: "Investments",
    //   icon: TrendingUp,
    //   path: "/dashboard/investments",
    // },
    // {
    //   id: 2,
    //   name: "Debts",
    //   icon: TrendingDownIcon,
    //   path: "/dashboard/debts",
    // },
  ];
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);
  return (
    <div className="h-screen p-5 border-r border-gray-200 dark:border-gray-800 shadow-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-row items-center gap-2 mb-8">
        <Image src={"/logo.svg"} alt="logo" width={40} height={40} className="transition-transform duration-300 hover:scale-110" />
        <span className="text-blue-800 dark:text-blue-400 font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          FinTracker
        </span>
      </div>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center
                    text-gray-500 dark:text-gray-400 font-medium
                    mb-2
                    p-4 cursor-pointer rounded-xl
                    transition-all duration-300
                    hover:text-blue-600 dark:hover:text-blue-400 
                    hover:bg-blue-50 dark:hover:bg-gray-800
                    hover:shadow-md transform hover:translate-x-1
                    ${path == menu.path && "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800 shadow-md"}
                    `}
            >
              <menu.icon className="transition-transform duration-300" />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div
        className="fixed bottom-10 p-5 flex gap-2
            items-center transition-all duration-300"
      >
        <UserButton />
        <span className="text-gray-600 dark:text-gray-400">Profile</span>
      </div>
    </div>
  );
}

export default SideNav;
