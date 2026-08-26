'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  LayoutDashboard, PlusCircle, Clock, Settings, LogOut,
  Users, BarChart3, ShieldCheck, Bell, Gift, BookOpen,
} from 'lucide-react'
import Logo from './Logo'
import type { User } from '@/types'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: string | number
}

const employeeNav: NavItem[] = [
  { label: 'Tableau de bord',    href: '/dashboard',    icon: LayoutDashboard },
  { label: 'Nouvelle demande',   href: '/request',      icon: PlusCircle },
  { label: 'Mes demandes',       href: '/history',      icon: Clock },
  { label: 'Bons d\'achat',      href: '/gift-cards',   icon: Gift },
  { label: 'Bien-être financier',href: '/wellness',     icon: BookOpen },
  { label: 'Notifications',      href: '/notifications',icon: Bell, badge: 2 },
]

const adminNav: NavItem[] = [
  { label: 'Tableau de bord',    href: '/admin',              icon: LayoutDashboard },
  { label: 'Demandes',           href: '/admin/requests',     icon: Clock, badge: 3 },
  { label: 'Employés',           href: '/admin/employees',    icon: Users },
  { label: 'Statistiques',       href: '/admin/stats',        icon: BarChart3 },
  { label: 'Paramètres',         href: '/admin/settings',     icon: ShieldCheck },
]

interface SidebarProps {
  user: User
  mobileOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ user, mobileOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname()
  const navItems = user.role === 'admin' || user.role === 'hr' ? adminNav : employeeNav

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside className={clsx(
        'fixed top-0 left-0 z-30 h-full w-64 bg-brand-900 flex flex-col transition-transform duration-300 lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Logo size="md" variant="light" />
        </div>

        {/* User info */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/10">
            <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center text-brand-900 font-semibold text-sm shrink-0">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-sm text-white truncate">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-white/60 truncate">{user.position}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="px-3 mb-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
            {user.role === 'employee' ? 'Mon espace' : 'Administration'}
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive =
                pathname === item.href ||
                (item.href !== '/dashboard' && item.href !== '/admin' && pathname.startsWith(item.href))

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'bg-white/20 text-white shadow-sm'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <span className={clsx(
                        'inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold',
                        isActive ? 'bg-gold-400 text-brand-900' : 'bg-white/20 text-white'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="mt-6">
            <p className="px-3 mb-2 text-xs font-semibold text-white/40 uppercase tracking-wider">Compte</p>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
            >
              <Settings size={18} />
              <span className="flex-1">Paramètres</span>
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-red-300 transition"
          >
            <LogOut size={18} />
            <span>Se déconnecter</span>
          </Link>
        </div>
      </aside>
    </>
  )
}
