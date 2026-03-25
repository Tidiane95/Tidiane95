import Link from 'next/link'
import clsx from 'clsx'
import { Filter, Search } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { ADMIN_USER, ALL_REQUESTS, formatCurrency, formatDate, getStatusLabel, getStatusColor } from '@/lib/mockData'

export default function AdminRequestsPage() {
  const user = ADMIN_USER
  const requests = ALL_REQUESTS

  return (
    <AppShell user={user} title="Gestion des demandes" breadcrumb={['Administration', 'Demandes']}>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Rechercher par nom, numéro..."
            className="input-field pl-10 w-full"
          />
        </div>
        <select className="input-field w-auto">
          <option>Tous les statuts</option>
          <option>En attente</option>
          <option>Approuvée</option>
          <option>Refusée</option>
          <option>Déboursée</option>
        </select>
        <select className="input-field w-auto">
          <option>Tous les départements</option>
          <option>Informatique</option>
          <option>Finance</option>
          <option>Marketing</option>
          <option>Commercial</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Référence</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Employé</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Département</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Montant</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statut</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                      {req.requestNumber}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xs font-bold shrink-0">
                        {req.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{req.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{req.department}</td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-bold text-gray-900">{formatCurrency(req.amount)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={clsx('badge', getStatusColor(req.status))}>
                      {getStatusLabel(req.status)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500">{formatDate(req.requestedAt)}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/requests/${req.id}`}
                      className="text-sm text-brand-600 font-medium hover:underline"
                    >
                      Voir →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
          <p>{requests.length} demande(s) au total</p>
          <div className="flex items-center gap-1">
            <button className="btn-secondary py-1.5 px-3 text-xs">Précédent</button>
            <span className="px-3 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-medium">1</span>
            <button className="btn-secondary py-1.5 px-3 text-xs">Suivant</button>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
