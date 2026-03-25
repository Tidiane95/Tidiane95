'use client'

import { Bell, Menu, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import type { User } from '@/types'

interface TopbarProps {
  user: User
  title: string
  breadcrumb?: string[]
  onMenuClick?: () => void
  notificationCount?: number
}

export default function Topbar({
  user,
  title,
  breadcrumb,
  onMenuClick,
  notificationCount = 0,
}: TopbarProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 flex items-center gap-4">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
      >
        <Menu size={20} />
      </button>

      {/* Title & breadcrumb */}
      <div className="flex-1 min-w-0">
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex items-center gap-1 mb-0.5">
            {breadcrumb.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={12} className="text-gray-400" />}
                <span className="text-xs text-gray-500">{crumb}</span>
              </span>
            ))}
          </div>
        )}
        <h1 className="text-xl font-bold text-gray-900 truncate">{title}</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center text-white font-semibold text-sm cursor-pointer">
          {user.firstName[0]}{user.lastName[0]}
        </div>
      </div>
    </header>
  )
}
