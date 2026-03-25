import clsx from 'clsx'
import { Calendar, CreditCard, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency, formatDate, getStatusLabel, getStatusColor } from '@/lib/mockData'
import type { SalaryAdvanceRequest } from '@/types'

interface RequestCardProps {
  request: SalaryAdvanceRequest
  href?: string
  showEmployee?: boolean
}

const paymentMethodLabels: Record<string, string> = {
  mobile_money: 'Mobile Money',
  bank_transfer: 'Virement bancaire',
  cash: 'Espèces',
}

export default function RequestCard({ request, href, showEmployee = false }: RequestCardProps) {
  const card = (
    <div className={clsx(
      'card p-5 transition-all duration-200',
      href && 'hover:shadow-md cursor-pointer'
    )}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
              {request.requestNumber}
            </span>
            <span className={clsx('badge', getStatusColor(request.status))}>
              {getStatusLabel(request.status)}
            </span>
          </div>
          {showEmployee && (
            <p className="text-sm font-semibold text-gray-900">{request.employeeName}</p>
          )}
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(request.amount)}
          </p>
        </div>
        {href && (
          <ArrowRight className="w-4 h-4 text-gray-400 shrink-0 mt-1" />
        )}
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{request.reason}</p>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          {formatDate(request.requestedAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5" />
          {paymentMethodLabels[request.paymentMethod]}
        </span>
      </div>

      {request.notes && request.status === 'rejected' && (
        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-lg">
          <p className="text-xs text-red-700">{request.notes}</p>
        </div>
      )}
    </div>
  )

  if (href) {
    return <Link href={href}>{card}</Link>
  }
  return card
}
