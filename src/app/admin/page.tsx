import Link from 'next/link'
import {
  Users, Clock, CheckCircle2, XCircle, Banknote, TrendingUp,
  ArrowRight, AlertCircle, TrendingDown, Star, Award,
} from 'lucide-react'
import clsx from 'clsx'
import AppShell from '@/components/AppShell'
import StatCard from '@/components/StatCard'
import RequestCard from '@/components/RequestCard'
import { ADMIN_USER, ALL_REQUESTS, EMPLOYER_METRICS, formatCurrency } from '@/lib/mockData'

export default function AdminDashboardPage() {
  const user = ADMIN_USER
  const requests = ALL_REQUESTS
  const m = EMPLOYER_METRICS

  const pending   = requests.filter((r) => r.status === 'pending')
  const approved  = requests.filter((r) => r.status === 'approved')
  const disbursed = requests.filter((r) => r.status === 'disbursed')
  const rejected  = requests.filter((r) => r.status === 'rejected')

  const totalPendingAmount = pending.reduce((s, r) => s + r.amount, 0)

  return (
    <AppShell
      user={user}
      title="Tableau de bord RH"
      breadcrumb={['Administration', 'Tableau de bord']}
      notificationCount={pending.length}
    >
      {/* Urgent alert */}
      {pending.length > 0 && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-orange-600 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-orange-800">
              {pending.length} demande(s) en attente de votre décision
            </p>
            <p className="text-xs text-orange-700 mt-0.5">Montant total : {formatCurrency(totalPendingAmount)}</p>
          </div>
          <Link href="/admin/requests" className="btn-primary text-sm py-2 px-4">
            Traiter maintenant
          </Link>
        </div>
      )}

      {/* Request stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="En attente"   value={pending.length.toString()}   subtitle={formatCurrency(totalPendingAmount)} icon={Clock}         iconColor="text-orange-600" iconBg="bg-orange-50" highlight={pending.length > 0} />
        <StatCard title="Approuvées"   value={approved.length.toString()}  subtitle={formatCurrency(approved.reduce((s,r)=>s+r.amount,0))}   icon={CheckCircle2} iconColor="text-blue-600"   iconBg="bg-blue-50" />
        <StatCard title="Déboursées"   value={disbursed.length.toString()} subtitle={formatCurrency(disbursed.reduce((s,r)=>s+r.amount,0))}  icon={Banknote}     iconColor="text-brand-600" iconBg="bg-brand-50" />
        <StatCard title="Refusées"     value={rejected.length.toString()}  subtitle="Ce mois-ci"                                              icon={XCircle}      iconColor="text-red-500"   iconBg="bg-red-50" />
      </div>

      {/* Employer impact metrics — inspired by Zayzoon */}
      <div className="card p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="section-title">Impact sur votre entreprise</h2>
            <p className="text-sm text-gray-500">Résultats observés depuis l&apos;adoption de Di Allo Fintech</p>
          </div>
          <Award className="w-8 h-8 text-gold-500" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Taux d\'adoption', value: `${m.adoptionRate}%`, sub: `${m.activeUsers}/${m.totalEmployees} employés`, icon: Users, color: 'text-brand-600', bg: 'bg-brand-50', positive: true },
            { label: 'Réduction turnover', value: `-${m.turnoverReduction}%`, sub: 'vs. même période an dernier', icon: TrendingDown, color: 'text-green-600', bg: 'bg-green-50', positive: true },
            { label: 'Réduction absentéisme', value: `-${m.absenteeismReduction}%`, sub: 'heures perdues / employé', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', positive: true },
            { label: 'Satisfaction employés', value: `${m.satisfactionScore}/5`, sub: 'Score moyen NPS', icon: Star, color: 'text-gold-600', bg: 'bg-gold-50', positive: true },
          ].map((kpi) => {
            const Icon = kpi.icon
            return (
              <div key={kpi.label} className={clsx('rounded-2xl p-4 border', kpi.bg, 'border-gray-100')}>
                <div className="flex items-start justify-between mb-2">
                  <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center', kpi.bg)}>
                    <Icon className={clsx('w-4 h-4', kpi.color)} />
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                    ✓ Positif
                  </span>
                </div>
                <p className={clsx('text-2xl font-bold', kpi.color)}>{kpi.value}</p>
                <p className="text-xs font-medium text-gray-700 mt-0.5">{kpi.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{kpi.sub}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-gray-50 rounded-xl flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Total déboursé depuis le début : <strong className="text-gray-900">{formatCurrency(m.totalDisbursed)}</strong>
          </p>
          <span className="text-xs text-gray-400">Coût pour l&apos;entreprise : 0 FCFA</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Distribution chart */}
        <div className="card p-6">
          <h3 className="section-title mb-4">Répartition des demandes</h3>
          <div className="space-y-3">
            {[
              { label: 'En attente',  count: pending.length,  color: 'bg-orange-400' },
              { label: 'Approuvées', count: approved.length,  color: 'bg-blue-400' },
              { label: 'Déboursées', count: disbursed.length, color: 'bg-brand-500' },
              { label: 'Refusées',   count: rejected.length,  color: 'bg-red-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={clsx('h-full rounded-full', item.color)}
                    style={{ width: requests.length > 0 ? `${(item.count / requests.length) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xl font-bold text-brand-600">
                {requests.length > 0 ? Math.round(((approved.length + disbursed.length) / requests.filter(r => r.status !== 'pending').length) * 100) : 0}%
              </p>
              <p className="text-xs text-gray-500">Taux d&apos;approbation</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">
                {requests.length > 0 ? formatCurrency(Math.round(requests.reduce((s, r) => s + r.amount, 0) / requests.length)) : '—'}
              </p>
              <p className="text-xs text-gray-500">Montant moyen</p>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">À traiter</h2>
            <Link href="/admin/requests" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
              Tout voir <ArrowRight className="w-3.5 h-3.5" />
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
              <p className="font-medium text-gray-500">Tout est traité !</p>
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div>
          <h2 className="section-title mb-4">Activité récente</h2>
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
