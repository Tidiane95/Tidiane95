import Link from 'next/link'
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Banknote,
  TrendingUp,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import AppShell from '@/components/AppShell'
import StatCard from '@/components/StatCard'
import RequestCard from '@/components/RequestCard'
import { ADMIN_USER, ALL_REQUESTS, formatCurrency } from '@/lib/mockData'

export default function AdminDashboardPage() {
  const user = ADMIN_USER
  const requests = ALL_REQUESTS

  const pending = requests.filter((r) => r.status === 'pending')
  const approved = requests.filter((r) => r.status === 'approved')
  const disbursed = requests.filter((r) => r.status === 'disbursed')
  const rejected = requests.filter((r) => r.status === 'rejected')

  const totalDisbursedAmount = disbursed.reduce((s, r) => s + r.amount, 0)
  const totalPendingAmount = pending.reduce((s, r) => s + r.amount, 0)

  return (
    <AppShell
      user={user}
      title="Tableau de bord RH"
      breadcrumb={['Administration', 'Tableau de bord']}
      notificationCount={pending.length}
    >
      {/* Alert for pending */}
      {pending.length > 0 && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-orange-600 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-orange-800">
              {pending.length} demande(s) en attente de votre décision
            </p>
            <p className="text-xs text-orange-700 mt-0.5">
              Montant total: {formatCurrency(totalPendingAmount)}
            </p>
          </div>
          <Link href="/admin/requests" className="btn-primary text-sm py-2 px-4">
            Traiter maintenant
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="En attente"
          value={pending.length.toString()}
          subtitle={formatCurrency(totalPendingAmount)}
          icon={Clock}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
          highlight={pending.length > 0}
        />
        <StatCard
          title="Approuvées"
          value={approved.length.toString()}
          subtitle={formatCurrency(approved.reduce((s, r) => s + r.amount, 0))}
          icon={CheckCircle2}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="Déboursées"
          value={disbursed.length.toString()}
          subtitle={formatCurrency(totalDisbursedAmount)}
          icon={Banknote}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="Refusées"
          value={rejected.length.toString()}
          subtitle="Ce mois-ci"
          icon={XCircle}
          iconColor="text-red-500"
          iconBg="bg-red-50"
        />
      </div>

      {/* Monthly overview */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="card p-5 lg:col-span-2">
          <h3 className="section-title mb-4">Répartition des demandes</h3>
          <div className="space-y-3">
            {[
              { label: 'En attente', count: pending.length, total: requests.length, color: 'bg-orange-400' },
              { label: 'Approuvées', count: approved.length, total: requests.length, color: 'bg-blue-400' },
              { label: 'Déboursées', count: disbursed.length, total: requests.length, color: 'bg-brand-500' },
              { label: 'Refusées', count: rejected.length, total: requests.length, color: 'bg-red-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">{item.count} / {item.total}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: item.total > 0 ? `${(item.count / item.total) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="section-title mb-4">Indicateurs clés</h3>
          <dl className="space-y-3">
            <div className="flex justify-between text-sm">
              <dt className="text-gray-500">Total déboursé</dt>
              <dd className="font-bold text-brand-600">{formatCurrency(totalDisbursedAmount)}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-gray-500">En attente</dt>
              <dd className="font-bold text-orange-600">{formatCurrency(totalPendingAmount)}</dd>
            </div>
            <div className="flex justify-between text-sm">
              <dt className="text-gray-500">Taux approbation</dt>
              <dd className="font-bold text-green-600">
                {requests.length > 0
                  ? Math.round(((approved.length + disbursed.length) / (requests.length - pending.length || 1)) * 100)
                  : 0}%
              </dd>
            </div>
            <div className="border-t pt-3 flex justify-between text-sm">
              <dt className="text-gray-500">Employés actifs</dt>
              <dd className="font-bold">
                {new Set(requests.map((r) => r.employeeId)).size}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Demandes urgentes</h2>
            <Link href="/admin/requests" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          {pending.length > 0 ? (
            <div className="space-y-3">
              {pending.map((req) => (
                <RequestCard key={req.id} request={req} href={`/admin/requests/${req.id}`} showEmployee />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" />
              <p className="font-medium text-gray-500">Aucune demande en attente</p>
            </div>
          )}
        </div>

        {/* Recent all */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Activité récente</h2>
          </div>
          <div className="space-y-3">
            {ALL_REQUESTS.slice(0, 4).map((req) => (
              <RequestCard key={req.id} request={req} href={`/admin/requests/${req.id}`} showEmployee />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
