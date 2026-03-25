'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import type { User } from '@/types'

interface AppShellProps {
  user: User
  title: string
  breadcrumb?: string[]
  notificationCount?: number
  children: React.ReactNode
}

export default function AppShell({
  user,
  title,
  breadcrumb,
  notificationCount,
  children,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        user={user}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <Topbar
          user={user}
          title={title}
          breadcrumb={breadcrumb}
          notificationCount={notificationCount}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  )
}
