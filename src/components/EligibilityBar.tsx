import { formatCurrency } from '@/lib/mockData'

interface EligibilityBarProps {
  eligible: number
  used: number
  available: number
}

export default function EligibilityBar({ eligible, used, available }: EligibilityBarProps) {
  const usedPct = eligible > 0 ? Math.round((used / eligible) * 100) : 0
  const availPct = eligible > 0 ? Math.round((available / eligible) * 100) : 0

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Limite d&apos;acompte</h3>
          <p className="text-sm text-gray-500">50% de votre salaire mensuel</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-brand-600">{formatCurrency(available)}</p>
          <p className="text-xs text-gray-500">disponible</p>
        </div>
      </div>

      {/* Bar */}
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-brand-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${usedPct}%`, animationName: 'progress' }}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-500 inline-block" />
            Utilisé: {formatCurrency(used)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-200 inline-block" />
            Disponible: {formatCurrency(available)}
          </span>
        </div>
        <span className="font-medium text-gray-700">{usedPct}% utilisé</span>
      </div>
    </div>
  )
}
