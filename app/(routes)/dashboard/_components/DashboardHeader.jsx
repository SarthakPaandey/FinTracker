import { UserButton } from '@clerk/nextjs'
import React from 'react'
import ThemeToggle from '@/components/ThemeToggle'

function DashboardHeader() {
  return (
    <div className='p-5 shadow-sm border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex justify-between transition-all duration-300'>
        <div>
          
        </div>
        <div className='flex items-center gap-3'>
            <ThemeToggle />
            <UserButton afterSignOutUrl='/'/>
        </div>
       
    </div>
  )
}

export default DashboardHeader