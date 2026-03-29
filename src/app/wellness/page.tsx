import Link from 'next/link'
import clsx from 'clsx'
import { BookOpen, CheckCircle2, Lock, TrendingUp, Target, AlertTriangle, Zap } from 'lucide-react'
import AppShell from '@/components/AppShell'
import {
  CURRENT_USER, FINANCIAL_COURSES, WELLNESS_ALERTS,
  formatCurrency, getWellnessLabel, getWellnessColor, getWellnessBg,
} from '@/lib/mockData'

const levelLabels = { beginner: 'Débutant', intermediate: 'Intermédiaire', advanced: 'Avancé' }
const levelColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-blue-100 text-blue-700',
  advanced: 'bg-purple-100 text-purple-700',
}

const wellnessFactors = [
  { label: 'Épargne de précaution', score: 37, tip: 'Moins de 3 mois de dépenses épargnés. Objectif : 3-6 mois.' },
  { label: 'Stabilité des revenus', score: 90, tip: 'Excellent ! Revenus réguliers depuis plus de 4 ans.' },
  { label: 'Gestion des dettes', score: 75, tip: 'Bon niveau. Aucune dette à risque détectée.' },
  { label: 'Planification financière', score: 55, tip: 'Commencez les cours intermédiaires pour améliorer votre score.' },
  { label: 'Habitudes de dépenses', score: 62, tip: 'Quelques dépenses impulsives détectées ce mois-ci.' },
]

export default function WellnessPage() {
  const user = CURRENT_USER
  const score = user.wellnessScore
  const completedCourses = FINANCIAL_COURSES.filter((c) => c.completed).length
  const totalCourses = FINANCIAL_COURSES.length

  return (
    <AppShell user={user} title="Bien-être financier" breadcrumb={['Mon espace', 'Bien-être financier']}>
      <div className="max-w-4xl mx-auto">
        {/* Score hero */}
        <div className={clsx('card p-6 mb-6 border', getWellnessBg(score))}>
          <div className="grid sm:grid-cols-3 gap-6 items-center">
            {/* Score circle */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="40" fill="none"
                    stroke={score >= 65 ? '#16a34a' : score >= 50 ? '#2563eb' : score >= 35 ? '#d97706' : '#dc2626'}
                    strokeWidth="10"
                    strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                    strokeLinecap="round"
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className={clsx('text-3xl font-bold', getWellnessColor(score))}>{score}</p>
                  <p className="text-xs text-gray-500">/ 100</p>
                </div>
              </div>
              <p className={clsx('font-bold', getWellnessColor(score))}>{getWellnessLabel(score)}</p>
              <p className="text-xs text-gray-500">Score de bien-être</p>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Votre santé financière est <span className={getWellnessColor(score)}>{getWellnessLabel(score)}</span>
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Votre score reflète 5 dimensions clés : épargne, revenus, dettes, planification et habitudes.
                Complétez les cours et définissez des objectifs pour l&apos;améliorer.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="text-center">
                  <p className="text-xl font-bold text-gray-900">{completedCourses}/{totalCourses}</p>
                  <p className="text-xs text-gray-500">Cours complétés</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-brand-600">
                    {user.savingsGoal ? Math.round((user.savingsGoal.savedAmount / user.savingsGoal.targetAmount) * 100) : 0}%
                  </p>
                  <p className="text-xs text-gray-500">Objectif épargne</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-orange-600">{WELLNESS_ALERTS.filter((a) => !a.read).length}</p>
                  <p className="text-xs text-gray-500">Alertes actives</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: Factors + Courses */}
          <div className="lg:col-span-2 space-y-6">
            {/* Score breakdown */}
            <div className="card p-6">
              <h3 className="section-title mb-5">Détail de votre score</h3>
              <div className="space-y-4">
                {wellnessFactors.map((f) => (
                  <div key={f.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-gray-800">{f.label}</span>
                      <span className={clsx(
                        'font-bold',
                        f.score >= 70 ? 'text-green-600' : f.score >= 50 ? 'text-blue-600' : f.score >= 35 ? 'text-yellow-600' : 'text-red-500'
                      )}>
                        {f.score}/100
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                      <div
                        className={clsx(
                          'h-full rounded-full',
                          f.score >= 70 ? 'bg-green-500' : f.score >= 50 ? 'bg-blue-500' : f.score >= 35 ? 'bg-yellow-500' : 'bg-red-400'
                        )}
                        style={{ width: `${f.score}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">{f.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="section-title">Formations financières gratuites</h3>
                <span className="text-sm text-gray-500">{completedCourses}/{totalCourses} terminées</span>
              </div>
              <div className="space-y-3">
                {FINANCIAL_COURSES.map((course) => {
                  const isLocked = !course.completed && course.level === 'advanced' && completedCourses < 3
                  return (
                    <div
                      key={course.id}
                      className={clsx(
                        'flex items-center gap-4 p-4 rounded-xl border transition-all',
                        course.completed ? 'bg-green-50 border-green-100' :
                        isLocked ? 'bg-gray-50 border-gray-100 opacity-60' :
                        'bg-white border-gray-200 hover:border-brand-200 hover:shadow-sm'
                      )}
                    >
                      <div className={clsx(
                        'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                        course.completed ? 'bg-green-100' : isLocked ? 'bg-gray-100' : 'bg-blue-50'
                      )}>
                        {course.completed
                          ? <CheckCircle2 className="w-5 h-5 text-green-600" />
                          : isLocked
                          ? <Lock className="w-5 h-5 text-gray-400" />
                          : <BookOpen className="w-5 h-5 text-blue-600" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-medium text-sm text-gray-900 truncate">{course.title}</p>
                          <span className={clsx('badge text-xs px-2 py-0.5', levelColors[course.level])}>
                            {levelLabels[course.level]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{course.duration} · {course.topics.slice(0, 2).join(', ')}</p>
                        {!course.completed && course.progress > 0 && (
                          <div className="mt-1.5 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${course.progress}%` }} />
                          </div>
                        )}
                      </div>
                      <div className="shrink-0">
                        {course.completed ? (
                          <span className="text-xs text-green-600 font-semibold">Terminée</span>
                        ) : isLocked ? (
                          <span className="text-xs text-gray-400">Verrouillée</span>
                        ) : (
                          <button className="text-xs text-brand-600 font-semibold hover:underline">
                            {course.progress > 0 ? 'Continuer' : 'Commencer'} →
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right: Alerts + Goal */}
          <div className="space-y-4">
            {/* Active alerts */}
            <div className="card p-5">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                Alertes financières
              </h3>
              <div className="space-y-3">
                {WELLNESS_ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className={clsx(
                      'p-3 rounded-xl border text-sm',
                      alert.severity === 'high' ? 'bg-red-50 border-red-100' :
                      alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-100' :
                      'bg-blue-50 border-blue-100'
                    )}
                  >
                    <p className="font-semibold text-gray-900 text-xs mb-0.5">{alert.title}</p>
                    <p className="text-xs text-gray-600">{alert.message}</p>
                    {alert.actionLabel && (
                      <Link href={alert.actionHref || '#'} className="text-xs text-brand-600 font-semibold mt-1 inline-block hover:underline">
                        {alert.actionLabel} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Savings goal */}
            {user.savingsGoal && (
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-brand-600" />
                    Objectif d&apos;épargne
                  </h3>
                  <button className="text-xs text-brand-600 hover:underline">Modifier</button>
                </div>
                <div className="text-center mb-4">
                  <span className="text-3xl">{user.savingsGoal.icon}</span>
                  <p className="font-semibold text-gray-900 mt-1">{user.savingsGoal.label}</p>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-brand-600">{formatCurrency(user.savingsGoal.savedAmount)}</span>
                  <span className="text-gray-500">{formatCurrency(user.savingsGoal.targetAmount)}</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${Math.round((user.savingsGoal.savedAmount / user.savingsGoal.targetAmount) * 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  {Math.round((user.savingsGoal.savedAmount / user.savingsGoal.targetAmount) * 100)}% atteint · Objectif : {user.savingsGoal.targetDate}
                </p>
              </div>
            )}

            {/* Tips */}
            <div className="card p-5 bg-brand-50 border-brand-100">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-brand-600" />
                <p className="font-semibold text-sm text-gray-900">Conseil du jour</p>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Mettez de côté 10% de chaque acompte reçu vers votre objectif d&apos;épargne.
                Même 15 000 FCFA par mois peut faire une grande différence en un an.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
