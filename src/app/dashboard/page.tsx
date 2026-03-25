import Link from 'next/link'
import {
  Banknote,
  Clock,
  CheckCircle2,
  TrendingUp,
  PlusCircle,
  ArrowRight,
  CalendarDays,
  AlertCircle,
} from 'lucide-react'
import AppShell from '@/components/AppShell'
import StatCard from '@/components/StatCard'
import RequestCard from '@/components/RequestCard'
import EligibilityBar from '@/components/EligibilityBar'
import {
  CURRENT_USER,
  MOCK_REQUESTS,
  MOCK_NOTIFICATIONS,
  formatCurrency,
  formatDate,
} from '@/lib/mockData'

export default function DashboardPage() {
  const user = CURRENT_USER
  const eligibleAmount = Math.floor(user.monthlySalary * (user.advanceEligibilityPercent / 100))
  const usedAmount = MOCK_REQUESTS
    .filter((r) => ['approved', 'disbursed'].includes(r.status))
    .reduce((sum, r) => sum + r.amount, 0)
  const availableAmount = Math.max(0, eligibleAmount - usedAmount)

  const pendingRequests = MOCK_REQUESTS.filter((r) => r.status === 'pending')
  const recentRequests = MOCK_REQUESTS.slice(0, 3)
  const unreadNotifs = MOCK_NOTIFICATIONS.filter((n) => !n.read).length

  // Next salary date (end of current month)
  const today = new Date()
  const nextSalaryDate = new Date(today.getFullYear(), today.getMonth() + 1, 0)

  return (
    <AppShell
      user={user}
      title="Tableau de bord"
      breadcrumb={['Mon espace', 'Tableau de bord']}
      notificationCount={unreadNotifs}
    >
      {/* Welcome banner */}
      <div className="mb-6 p-5 bg-gradient-to-r from-brand-600 to-brand-700 rounded-2xl text-white flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">
            Bonjour, {user.firstName} !
          </h2>
          <p className="text-sm text-white/80 mt-0.5">
            ID Employé: {user.employeeId} · {user.employer.name}
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-4 py-2">
          <CalendarDays className="w-4 h-4 text-white/80" />
          <div className="text-sm">
            <p className="text-white/70 text-xs">Prochaine paie</p>
            <p className="font-semibold">{formatDate(nextSalaryDate.toISOString())}</p>
          </div>
        </div>
      </div>

      {/* Pending alert */}
      {pendingRequests.length > 0 && (
        <div className="mb-6 flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-yellow-800">
              {pendingRequests.length} demande(s) en attente de traitement
            </p>
            <p className="text-xs text-yellow-700 mt-0.5">
              Demande {pendingRequests[0].requestNumber} · {formatCurrency(pendingRequests[0].amount)}
            </p>
          </div>
          <Link href="/history" className="text-sm font-medium text-yellow-700 hover:underline whitespace-nowrap">
            Voir →
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Salaire mensuel"
          value={formatCurrency(user.monthlySalary)}
          subtitle={user.position}
          icon={Banknote}
          iconColor="text-brand-600"
          iconBg="bg-brand-50"
        />
        <StatCard
          title="Disponible"
          value={formatCurrency(availableAmount)}
          subtitle={`Sur ${formatCurrency(eligibleAmount)} éligibles`}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-50"
          highlight={availableAmount > 0}
        />
        <StatCard
          title="En cours"
          value={formatCurrency(usedAmount)}
          subtitle={`${MOCK_REQUESTS.filter(r => ['approved','disbursed'].includes(r.status)).length} demande(s)`}
          icon={CheckCircle2}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard
          title="En attente"
          value={`${pendingRequests.length}`}
          subtitle="Demande(s) à traiter"
          icon={Clock}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-50"
        />
      </div>

      {/* Eligibility bar */}
      <div className="mb-6">
        <EligibilityBar
          eligible={eligibleAmount}
          used={usedAmount}
          available={availableAmount}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent requests */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Mes dernières demandes</h2>
            <Link href="/history" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
              Voir tout <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentRequests.length > 0 ? (
            <div className="space-y-3">
              {recentRequests.map((req) => (
                <RequestCard key={req.id} request={req} href={`/history/${req.id}`} />
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium text-gray-500">Aucune demande pour le moment</p>
            </div>
          )}
        </div>

        {/* Quick actions + Info */}
        <div className="space-y-4">
          {/* New request CTA */}
          <div className="card p-6 bg-gradient-to-br from-brand-50 to-green-50 border-brand-100">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center mb-4">
              <PlusCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Faire une demande</h3>
            <p className="text-sm text-gray-600 mb-4">
              Vous avez <strong className="text-brand-600">{formatCurrency(availableAmount)}</strong> disponibles pour un acompte.
            </p>
            {availableAmount > 0 ? (
              <Link href="/request" className="btn-primary w-full justify-center">
                Demander maintenant
              </Link>
            ) : (
              <button disabled className="btn-primary w-full justify-center opacity-50 cursor-not-allowed">
                Limite atteinte
              </button>
            )}
          </div>

          {/* Salary info */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Informations salariales</h3>
            <dl className="space-y-3">
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Salaire brut</dt>
                <dd className="font-semibold">{formatCurrency(user.monthlySalary)}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Plafond acompte</dt>
                <dd className="font-semibold">{user.advanceEligibilityPercent}%</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Acompte max</dt>
                <dd className="font-semibold text-brand-600">{formatCurrency(eligibleAmount)}</dd>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-sm">
                <dt className="text-gray-500">Ancienneté</dt>
                <dd className="font-semibold">
                  {Math.floor((Date.now() - new Date(user.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} ans
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
