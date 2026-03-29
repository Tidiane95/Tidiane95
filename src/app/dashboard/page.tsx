import Link from 'next/link'
import {
  PlusCircle, ArrowRight, TrendingUp, Gift, BookOpen,
  AlertTriangle, CheckCircle2, Bell, CalendarDays,
  Banknote, Target, Zap,
} from 'lucide-react'
import clsx from 'clsx'
import AppShell from '@/components/AppShell'
import {
  CURRENT_USER, MOCK_REQUESTS, WELLNESS_ALERTS, EARNED_WAGE_DATA,
  GIFT_CARDS, FINANCIAL_COURSES, formatCurrency, formatDate,
  getWellnessLabel, getWellnessColor, getWellnessBg,
} from '@/lib/mockData'

const alertIcons = {
  overdraft_risk: AlertTriangle,
  bill_due: Bell,
  goal_reached: CheckCircle2,
  tip: Zap,
  achievement: CheckCircle2,
}

const alertColors = {
  high: 'bg-red-50 border-red-200',
  medium: 'bg-yellow-50 border-yellow-200',
  low: 'bg-blue-50 border-blue-200',
}

const alertIconColors = {
  high: 'text-red-500 bg-red-100',
  medium: 'text-yellow-600 bg-yellow-100',
  low: 'text-blue-500 bg-blue-100',
}

export default function DashboardPage() {
  const user = CURRENT_USER
  const ew = EARNED_WAGE_DATA
  const unreadAlerts = WELLNESS_ALERTS.filter((a) => !a.read)
  const pendingRequests = MOCK_REQUESTS.filter((r) => r.status === 'pending')
  const featuredGiftCard = GIFT_CARDS.find((g) => g.bonusPercent >= 20)!
  const nextCourse = FINANCIAL_COURSES.find((c) => !c.completed)
  const nextSalaryDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
  const periodPercent = Math.round((ew.daysWorked / ew.totalDays) * 100)

  return (
    <AppShell
      user={user}
      title="Tableau de bord"
      breadcrumb={['Mon espace', 'Tableau de bord']}
      notificationCount={unreadAlerts.length}
    >
      {/* ── Alerts ─────────────────────────────────────────────────────────── */}
      {unreadAlerts.length > 0 && (
        <div className="space-y-2 mb-6">
          {unreadAlerts.slice(0, 2).map((alert) => {
            const Icon = alertIcons[alert.type]
            return (
              <div
                key={alert.id}
                className={clsx('flex items-start gap-3 p-4 rounded-xl border', alertColors[alert.severity])}
              >
                <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', alertIconColors[alert.severity])}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{alert.message}</p>
                </div>
                {alert.actionLabel && (
                  <Link href={alert.actionHref || '/request'} className="text-xs font-semibold text-brand-600 hover:underline whitespace-nowrap shrink-0">
                    {alert.actionLabel} →
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── Earned Wage Hero ──────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        {/* Main earned wage card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-brand-700 to-brand-800 rounded-2xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-white/70 font-medium">Salaire gagné à ce jour</p>
              <p className="text-4xl font-bold mt-1">{formatCurrency(ew.netEarned)}</p>
              <p className="text-sm text-white/60 mt-1">
                Période : {formatDate(ew.periodStart)} → {formatDate(ew.periodEnd)}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/15 border border-white/20 rounded-xl px-3 py-2 text-sm">
              <CalendarDays className="w-4 h-4 text-white/80" />
              <div>
                <p className="text-white/60 text-xs">Prochaine paie</p>
                <p className="font-semibold text-xs">{formatDate(nextSalaryDate.toISOString())}</p>
              </div>
            </div>
          </div>

          {/* Period progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-white/70 mb-1.5">
              <span>{ew.daysWorked} jours travaillés sur {ew.totalDays}</span>
              <span>{periodPercent}% de la période</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${periodPercent}%` }}
              />
            </div>
          </div>

          {/* Taux journalier */}
          <div className="flex items-center gap-2 text-sm text-white/70">
            <Zap className="w-4 h-4 text-gold-300" />
            <span>Taux journalier : <strong className="text-white">{formatCurrency(ew.dailyRate)}</strong></span>
          </div>
        </div>

        {/* Available to access */}
        <div className="flex flex-col gap-4">
          <div className="card p-5 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Disponible maintenant</p>
              <p className="text-3xl font-bold text-brand-600">{formatCurrency(ew.availableToAccess)}</p>
              <p className="text-xs text-gray-500 mt-1">
                Déjà accédé : {formatCurrency(ew.alreadyAccessed)}
              </p>
            </div>
            <Link href="/request" className="btn-primary w-full justify-center mt-4">
              <PlusCircle className="w-4 h-4" />
              Accéder maintenant
            </Link>
          </div>

          <div className="card p-4 bg-gold-50 border-gold-200">
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-4 h-4 text-gold-600" />
              <p className="text-xs font-semibold text-gold-700">Bon d&apos;achat recommandé</p>
            </div>
            <p className="text-sm font-bold text-gray-900">{featuredGiftCard.retailer}</p>
            <p className="text-xs text-gray-600">+{featuredGiftCard.bonusPercent}% bonus offert</p>
            <Link href="/gift-cards" className="text-xs text-brand-600 font-semibold mt-1 inline-flex items-center gap-1 hover:underline">
              Voir le bon <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent requests */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="section-title">Dernières demandes</h2>
              <Link href="/history" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
                Voir tout <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-3">
              {MOCK_REQUESTS.slice(0, 3).map((req) => (
                <Link href={`/history/${req.id}`} key={req.id}>
                  <div className="card p-4 hover:shadow-md transition flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                      <Banknote className="w-5 h-5 text-brand-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900">{formatCurrency(req.amount)}</p>
                      <p className="text-xs text-gray-500 truncate">{req.reason}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={clsx(
                        'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
                        req.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        req.status === 'approved' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        req.status === 'disbursed' ? 'bg-green-100 text-green-800 border-green-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      )}>
                        {req.status === 'pending' ? 'En attente' :
                         req.status === 'approved' ? 'Approuvée' :
                         req.status === 'disbursed' ? 'Déboursée' : 'Refusée'}
                      </span>
                      {req.giftCardBonus && (
                        <p className="text-xs text-purple-600 font-semibold mt-0.5">+{req.giftCardBonus}% bonus</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Gift cards promo */}
          <div className="card p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Bons d&apos;achat avec bonus</h3>
              </div>
              <Link href="/gift-cards" className="text-sm text-purple-600 font-semibold hover:underline">
                Voir tout →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {GIFT_CARDS.filter((g) => g.popular).map((gc) => (
                <div key={gc.id} className="bg-white rounded-xl p-3 text-center shadow-sm border border-purple-100">
                  <span className="text-2xl block mb-1">{gc.icon}</span>
                  <p className="text-xs font-medium text-gray-700 truncate">{gc.retailer.split(' ')[0]}</p>
                  <p className="text-sm font-bold text-purple-600">+{gc.bonusPercent}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Wellness score */}
          <div className={clsx('card p-5 border', getWellnessBg(user.wellnessScore))}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Score bien-être</h3>
              <Link href="/wellness" className="text-xs text-brand-600 hover:underline">Améliorer →</Link>
            </div>
            <div className="flex items-end gap-3 mb-3">
              <p className={clsx('text-5xl font-bold', getWellnessColor(user.wellnessScore))}>
                {user.wellnessScore}
              </p>
              <div className="pb-1">
                <p className={clsx('font-semibold text-sm', getWellnessColor(user.wellnessScore))}>
                  {getWellnessLabel(user.wellnessScore)}
                </p>
                <p className="text-xs text-gray-500">sur 100</p>
              </div>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={clsx(
                  'h-full rounded-full',
                  user.wellnessScore >= 65 ? 'bg-brand-500' :
                  user.wellnessScore >= 50 ? 'bg-blue-500' :
                  user.wellnessScore >= 35 ? 'bg-yellow-500' : 'bg-red-500'
                )}
                style={{ width: `${user.wellnessScore}%` }}
              />
            </div>
          </div>

          {/* Savings goal */}
          {user.savingsGoal && (
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{user.savingsGoal.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{user.savingsGoal.label}</p>
                  <p className="text-xs text-gray-500">Objectif d&apos;épargne</p>
                </div>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-brand-600">{formatCurrency(user.savingsGoal.savedAmount)}</span>
                <span className="text-gray-500">{formatCurrency(user.savingsGoal.targetAmount)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: `${Math.round((user.savingsGoal.savedAmount / user.savingsGoal.targetAmount) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1.5">
                {Math.round((user.savingsGoal.savedAmount / user.savingsGoal.targetAmount) * 100)}% atteint
              </p>
            </div>
          )}

          {/* Next course */}
          {nextCourse && (
            <div className="card p-5 bg-blue-50 border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Formation en cours</p>
              </div>
              <p className="font-semibold text-sm text-gray-900 mb-2">{nextCourse.title}</p>
              <div className="h-1.5 bg-blue-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${nextCourse.progress}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{nextCourse.progress}% complété</span>
                <Link href="/wellness" className="text-xs font-semibold text-blue-600 hover:underline">Continuer →</Link>
              </div>
            </div>
          )}

          {/* Quick stats */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Limites de la période</h3>
            <dl className="space-y-2">
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Limite journalière</dt>
                <dd className="font-semibold">{formatCurrency(user.maxDailyAmount)}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Limite période</dt>
                <dd className="font-semibold">{formatCurrency(user.maxPerPeriodAmount)}</dd>
              </div>
              <div className="flex justify-between text-sm border-t pt-2">
                <dt className="text-gray-500">Déjà accédé</dt>
                <dd className="font-semibold text-orange-600">{formatCurrency(ew.alreadyAccessed)}</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-gray-500">Disponible</dt>
                <dd className="font-semibold text-brand-600">{formatCurrency(ew.availableToAccess)}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
