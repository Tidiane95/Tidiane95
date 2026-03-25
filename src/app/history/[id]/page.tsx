import Link from 'next/link'
import { ArrowLeft, Clock, CheckCircle2, XCircle, Banknote, RotateCcw, Calendar, User, Building, CreditCard } from 'lucide-react'
import clsx from 'clsx'
import AppShell from '@/components/AppShell'
import { CURRENT_USER, MOCK_REQUESTS, formatCurrency, formatDateTime, getStatusLabel, getStatusColor } from '@/lib/mockData'

interface TimelineStep {
  label: string
  date?: string
  done: boolean
  icon: React.ElementType
  color: string
}

export function generateStaticParams() {
  return MOCK_REQUESTS.map((r) => ({ id: r.id }))
}

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  const user = CURRENT_USER
  const request = MOCK_REQUESTS.find((r) => r.id === params.id)

  if (!request) {
    return (
      <AppShell user={user} title="Demande introuvable">
        <div className="card p-12 text-center max-w-md mx-auto mt-8">
          <p className="font-medium text-gray-500">Cette demande n&apos;existe pas.</p>
          <Link href="/history" className="btn-primary mt-4 inline-flex">Retour</Link>
        </div>
      </AppShell>
    )
  }

  const timeline: TimelineStep[] = [
    {
      label: 'Demande soumise',
      date: request.requestedAt,
      done: true,
      icon: Clock,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: request.status === 'rejected' ? 'Demande refusée' : 'Demande approuvée',
      date: request.reviewedAt,
      done: !!request.reviewedAt,
      icon: request.status === 'rejected' ? XCircle : CheckCircle2,
      color: request.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600',
    },
    {
      label: 'Fonds déboursés',
      date: request.disbursedAt,
      done: !!request.disbursedAt,
      icon: Banknote,
      color: 'bg-brand-100 text-brand-600',
    },
    {
      label: 'Remboursement',
      date: request.repaidAt || request.repaymentDate,
      done: !!request.repaidAt,
      icon: RotateCcw,
      color: 'bg-gray-100 text-gray-600',
    },
  ]

  const paymentLabels: Record<string, string> = {
    mobile_money: 'Mobile Money',
    bank_transfer: 'Virement bancaire',
    cash: 'Espèces',
  }

  return (
    <AppShell user={user} title={`Demande ${request.requestNumber}`} breadcrumb={['Mes demandes', request.requestNumber]}>
      <div className="max-w-2xl mx-auto">
        <Link href="/history" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour aux demandes
        </Link>

        {/* Header card */}
        <div className="card p-6 mb-4">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                {request.requestNumber}
              </span>
              <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(request.amount)}</p>
              <p className="text-sm text-gray-500 mt-1">
                Frais: {formatCurrency(request.fees)} · Net reçu: {formatCurrency(request.amount - request.fees)}
              </p>
            </div>
            <span className={clsx('badge text-sm px-3 py-1', getStatusColor(request.status))}>
              {getStatusLabel(request.status)}
            </span>
          </div>

          <p className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3">
            {request.reason}
          </p>

          {request.notes && (
            <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-xs font-medium text-red-700 mb-0.5">Motif du refus</p>
              <p className="text-sm text-red-700">{request.notes}</p>
            </div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {/* Details */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Détails</h3>
            <dl className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User className="w-4 h-4 text-gray-400 shrink-0" />
                <dt className="text-gray-500 w-28 shrink-0">Employé</dt>
                <dd className="font-medium">{request.employeeName}</dd>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building className="w-4 h-4 text-gray-400 shrink-0" />
                <dt className="text-gray-500 w-28 shrink-0">Département</dt>
                <dd className="font-medium">{request.department}</dd>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400 shrink-0" />
                <dt className="text-gray-500 w-28 shrink-0">Paiement</dt>
                <dd className="font-medium">{paymentLabels[request.paymentMethod]}</dd>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400 shrink-0" />
                <dt className="text-gray-500 w-28 shrink-0">Détails</dt>
                <dd className="font-medium text-xs">{request.paymentDetails}</dd>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                <dt className="text-gray-500 w-28 shrink-0">Remboursement</dt>
                <dd className="font-medium">{request.repaymentDate}</dd>
              </div>
            </dl>
          </div>

          {/* Timeline */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Suivi</h3>
            <div className="relative">
              {timeline.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={i} className="flex items-start gap-3 mb-5 last:mb-0 relative">
                    {i < timeline.length - 1 && (
                      <div className={clsx(
                        'absolute left-4 top-8 bottom-0 w-px',
                        step.done ? 'bg-brand-200' : 'bg-gray-100'
                      )} />
                    )}
                    <div className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10',
                      step.done ? step.color : 'bg-gray-100 text-gray-400'
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className={clsx('text-sm font-medium', step.done ? 'text-gray-900' : 'text-gray-400')}>
                        {step.label}
                      </p>
                      {step.date && step.done && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          {formatDateTime(step.date)}
                        </p>
                      )}
                      {!step.done && (
                        <p className="text-xs text-gray-400 mt-0.5">En attente</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {request.reviewedBy && (
          <div className="card p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center">
              <User className="w-4 h-4 text-brand-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Traitée par</p>
              <p className="text-sm font-medium text-gray-900">{request.reviewedBy}</p>
            </div>
            {request.reviewedAt && (
              <p className="text-xs text-gray-400 ml-auto">{formatDateTime(request.reviewedAt)}</p>
            )}
          </div>
        )}
      </div>
    </AppShell>
  )
}
