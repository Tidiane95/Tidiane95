import clsx from 'clsx'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  trend?: {
    value: string
    positive: boolean
  }
  highlight?: boolean
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-brand-600',
  iconBg = 'bg-brand-50',
  trend,
  highlight = false,
}: StatCardProps) {
  return (
    <div className={clsx(
      'card p-6 transition-all duration-200 hover:shadow-md',
      highlight && 'ring-2 ring-brand-500 ring-offset-2'
    )}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 mb-1 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <span className={clsx(
              'inline-flex items-center gap-1 mt-2 text-xs font-medium px-2 py-0.5 rounded-full',
              trend.positive
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            )}>
              {trend.positive ? '+' : ''}{trend.value}
            </span>
          )}
        </div>

        <div className={clsx(
          'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0',
          iconBg
        )}>
          <Icon className={clsx('w-6 h-6', iconColor)} />
        </div>
      </div>
    </div>
  )
}
