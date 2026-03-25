import Link from 'next/link'
import { PlusCircle, Filter } from 'lucide-react'
import AppShell from '@/components/AppShell'
import RequestCard from '@/components/RequestCard'
import { CURRENT_USER, MOCK_REQUESTS, formatCurrency, getStatusLabel } from '@/lib/mockData'

export default function HistoryPage() {
  const user = CURRENT_USER
  const requests = MOCK_REQUESTS

  const totalDisbursed = requests
    .filter((r) => r.status === 'disbursed')
    .reduce((s, r) => s + r.amount, 0)

  const totalPending = requests
    .filter((r) => r.status === 'pending')
    .reduce((s, r) => s + r.amount, 0)

  const statusCounts: Record<string, number> = {}
  requests.forEach((r) => {
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1
  })

  return (
    <AppShell
      user={user}
      title="Mes demandes"
      breadcrumb={['Mon espace', 'Mes demandes']}
    >
      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total demandes', value: requests.length.toString(), color: 'text-gray-900' },
          { label: 'En attente', value: `${statusCounts.pending || 0}`, color: 'text-yellow-600' },
          { label: 'Approuvées', value: formatCurrency(totalDisbursed + (statusCounts.approved ? requests.filter(r=>r.status==='approved').reduce((s,r)=>s+r.amount,0) : 0)), color: 'text-brand-600' },
          { label: 'En attente (montant)', value: formatCurrency(totalPending), color: 'text-orange-600' },
        ].map((stat) => (
          <div key={stat.label} className="card p-4">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Requests list */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title">Historique des demandes</h2>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-sm py-2 px-3 gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            Filtrer
          </button>
          <Link href="/request" className="btn-primary text-sm py-2 px-3 gap-1.5">
            <PlusCircle className="w-3.5 h-3.5" />
            Nouvelle demande
          </Link>
        </div>
      </div>

      {requests.length > 0 ? (
        <div className="space-y-3">
          {requests.map((req) => (
            <RequestCard key={req.id} request={req} href={`/history/${req.id}`} />
          ))}
        </div>
      ) : (
        <div className="card p-16 text-center">
          <p className="text-gray-500 font-medium">Aucune demande trouvée</p>
          <p className="text-sm text-gray-400 mt-1">Commencez par faire une première demande d&apos;acompte</p>
          <Link href="/request" className="btn-primary mt-6 inline-flex">
            <PlusCircle className="w-4 h-4" />
            Faire une demande
          </Link>
        </div>
      )}
    </AppShell>
  )
}
