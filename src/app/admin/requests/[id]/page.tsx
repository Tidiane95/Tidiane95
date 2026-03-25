'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import {
  ArrowLeft, CheckCircle2, XCircle, Banknote, User, Building,
  CreditCard, Calendar, MessageSquare, AlertTriangle,
} from 'lucide-react'
import AppShell from '@/components/AppShell'
import { ADMIN_USER, ALL_REQUESTS, formatCurrency, formatDateTime, getStatusLabel, getStatusColor } from '@/lib/mockData'

export function generateStaticParams() {
  return ALL_REQUESTS.map((r) => ({ id: r.id }))
}

export default function AdminRequestDetailPage({ params }: { params: { id: string } }) {
  const user = ADMIN_USER
  const router = useRouter()
  const request = ALL_REQUESTS.find((r) => r.id === params.id)

  const [action, setAction] = useState<'approve' | 'reject' | null>(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  if (!request) {
    return (
      <AppShell user={user} title="Demande introuvable">
        <div className="card p-12 text-center max-w-md mx-auto mt-8">
          <p className="font-medium text-gray-500">Cette demande n&apos;existe pas.</p>
          <Link href="/admin/requests" className="btn-primary mt-4 inline-flex">Retour</Link>
        </div>
      </AppShell>
    )
  }

  const isPending = request.status === 'pending'

  async function handleDecision() {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <AppShell user={user} title="Décision enregistrée" breadcrumb={['Demandes', 'Décision']}>
        <div className="max-w-md mx-auto mt-10">
          <div className="card p-10 text-center">
            <div className={clsx(
              'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6',
              action === 'approve' ? 'bg-green-100' : 'bg-red-100'
            )}>
              {action === 'approve'
                ? <CheckCircle2 className="w-10 h-10 text-green-500" />
                : <XCircle className="w-10 h-10 text-red-500" />
              }
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {action === 'approve' ? 'Demande approuvée' : 'Demande refusée'}
            </h2>
            <p className="text-gray-500 mb-8">
              La décision a été enregistrée. L&apos;employé sera notifié immédiatement.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/admin/requests" className="btn-primary">
                Retour aux demandes
              </Link>
              <Link href="/admin" className="btn-secondary">
                Tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  const paymentLabels: Record<string, string> = {
    mobile_money: 'Mobile Money',
    bank_transfer: 'Virement bancaire',
    cash: 'Espèces',
  }

  return (
    <AppShell user={user} title={`Demande ${request.requestNumber}`} breadcrumb={['Demandes', request.requestNumber]}>
      <div className="max-w-3xl mx-auto">
        <Link href="/admin/requests" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600 transition mb-6">
          <ArrowLeft className="w-4 h-4" />
          Retour aux demandes
        </Link>

        {/* Header */}
        <div className="card p-6 mb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                {request.requestNumber}
              </span>
              <p className="text-4xl font-bold text-gray-900 mt-2">{formatCurrency(request.amount)}</p>
              <p className="text-sm text-gray-500 mt-1">
                Frais: {formatCurrency(request.fees)} · Net: {formatCurrency(request.amount - request.fees)}
              </p>
            </div>
            <span className={clsx('badge text-sm px-3 py-1', getStatusColor(request.status))}>
              {getStatusLabel(request.status)}
            </span>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Motif déclaré</p>
            <p className="text-sm text-gray-800 font-medium">{request.reason}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          {/* Employee info */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              Informations employé
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Nom</dt>
                <dd className="font-medium">{request.employeeName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Département</dt>
                <dd className="font-medium">{request.department}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Demandé le</dt>
                <dd className="font-medium">{formatDateTime(request.requestedAt)}</dd>
              </div>
            </dl>
          </div>

          {/* Payment info */}
          <div className="card p-5">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              Mode de paiement
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Mode</dt>
                <dd className="font-medium">{paymentLabels[request.paymentMethod]}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Détails</dt>
                <dd className="font-medium text-xs">{request.paymentDetails}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Remboursement</dt>
                <dd className="font-medium">{request.repaymentDate}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Decision panel */}
        {isPending && (
          <div className="card p-6 border-2 border-dashed border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              Prendre une décision
            </h3>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={() => setAction('approve')}
                className={clsx(
                  'flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm border-2 transition-all',
                  action === 'approve'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:bg-green-50'
                )}
              >
                <CheckCircle2 className="w-4 h-4" />
                Approuver
              </button>
              <button
                onClick={() => setAction('reject')}
                className={clsx(
                  'flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm border-2 transition-all',
                  action === 'reject'
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-red-400 hover:bg-red-50'
                )}
              >
                <XCircle className="w-4 h-4" />
                Refuser
              </button>
            </div>

            {/* Notes */}
            <div className="mb-5">
              <label className="label" htmlFor="notes">
                {action === 'reject' ? 'Motif du refus (obligatoire)' : 'Commentaire (optionnel)'}
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="input-field resize-none"
                placeholder={
                  action === 'reject'
                    ? 'Expliquez pourquoi la demande est refusée...'
                    : 'Ajouter un commentaire visible par l\'employé...'
                }
              />
            </div>

            {action && (
              <div className="flex items-start gap-2 mb-5 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700">
                  {action === 'approve'
                    ? `En approuvant, vous autorisez le versement de ${formatCurrency(request.amount - request.fees)} sur le compte de l'employé.`
                    : 'L\'employé sera notifié du refus avec le motif indiqué.'}
                </p>
              </div>
            )}

            <button
              disabled={!action || (action === 'reject' && notes.trim().length < 5) || loading}
              onClick={handleDecision}
              className={clsx(
                'w-full py-3 font-semibold rounded-xl transition-all flex items-center justify-center gap-2',
                action === 'approve'
                  ? 'bg-green-600 hover:bg-green-700 text-white disabled:opacity-40'
                  : action === 'reject'
                  ? 'bg-red-600 hover:bg-red-700 text-white disabled:opacity-40'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              )}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Traitement en cours...
                </>
              ) : action === 'approve' ? (
                <><CheckCircle2 className="w-4 h-4" /> Confirmer l&apos;approbation</>
              ) : action === 'reject' ? (
                <><XCircle className="w-4 h-4" /> Confirmer le refus</>
              ) : (
                'Sélectionnez une action'
              )}
            </button>
          </div>
        )}

        {!isPending && (
          <div className="card p-5 bg-gray-50">
            <p className="text-sm font-medium text-gray-600">
              Cette demande a déjà été traitée ({getStatusLabel(request.status)}).
            </p>
            {request.reviewedBy && (
              <p className="text-xs text-gray-400 mt-1">
                Par {request.reviewedBy} le {request.reviewedAt ? formatDateTime(request.reviewedAt) : '—'}
              </p>
            )}
            {request.notes && (
              <p className="text-sm text-gray-700 mt-2 italic">&ldquo;{request.notes}&rdquo;</p>
            )}
          </div>
        )}
      </div>
    </AppShell>
  )
}
