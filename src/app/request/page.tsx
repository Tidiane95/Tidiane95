'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Smartphone,
  Building2,
  Banknote,
  Info,
  AlertTriangle,
} from 'lucide-react'
import clsx from 'clsx'
import AppShell from '@/components/AppShell'
import { CURRENT_USER, MOCK_REQUESTS, REASONS_LIST, formatCurrency } from '@/lib/mockData'
import type { PaymentMethod } from '@/types'

const STEPS = ['Montant', 'Motif', 'Paiement', 'Confirmation']

const FEES_RATE = 0.01 // 1%

type FormData = {
  amount: string
  reason: string
  customReason: string
  paymentMethod: PaymentMethod
  paymentDetails: string
}

export default function RequestPage() {
  const router = useRouter()
  const user = CURRENT_USER
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const eligibleAmount = Math.floor(user.monthlySalary * (user.advanceEligibilityPercent / 100))
  const usedAmount = MOCK_REQUESTS
    .filter((r) => ['approved', 'disbursed'].includes(r.status))
    .reduce((sum, r) => sum + r.amount, 0)
  const available = Math.max(0, eligibleAmount - usedAmount)

  const [form, setForm] = useState<FormData>({
    amount: '',
    reason: '',
    customReason: '',
    paymentMethod: 'mobile_money',
    paymentDetails: '',
  })

  const amount = parseFloat(form.amount) || 0
  const fees = Math.round(amount * FEES_RATE)
  const netAmount = amount - fees

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function canProceed() {
    if (step === 0) return amount >= 10000 && amount <= available
    if (step === 1) return form.reason !== '' && (form.reason !== 'Autre motif' || form.customReason.trim().length > 5)
    if (step === 2) return form.paymentDetails.trim().length > 3
    return true
  }

  async function handleSubmit() {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSuccess(true)
    setSubmitting(false)
  }

  if (success) {
    return (
      <AppShell user={user} title="Demande envoyée" breadcrumb={['Mon espace', 'Nouvelle demande']}>
        <div className="max-w-lg mx-auto mt-8">
          <div className="card p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h2>
            <p className="text-gray-500 mb-2">
              Votre demande d&apos;acompte de{' '}
              <strong className="text-brand-600">{formatCurrency(amount)}</strong> a été soumise
              avec succès.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Vous recevrez une notification dès qu&apos;elle sera traitée par votre service RH.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/history" className="btn-primary">
                Suivre ma demande
              </Link>
              <Link href="/dashboard" className="btn-secondary">
                Retour au tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell
      user={user}
      title="Nouvelle demande d'acompte"
      breadcrumb={['Mon espace', 'Nouvelle demande']}
    >
      <div className="max-w-2xl mx-auto">
        {/* Step indicator */}
        <div className="flex items-center mb-8">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all',
                  i < step ? 'bg-brand-600 text-white' :
                  i === step ? 'bg-brand-600 text-white ring-4 ring-brand-100' :
                  'bg-gray-100 text-gray-400'
                )}>
                  {i < step ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={clsx(
                  'text-xs font-medium hidden sm:block',
                  i === step ? 'text-brand-600' : i < step ? 'text-gray-500' : 'text-gray-400'
                )}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={clsx(
                  'flex-1 h-0.5 mx-2 rounded transition-all',
                  i < step ? 'bg-brand-600' : 'bg-gray-200'
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="card p-6 lg:p-8 animate-slide-up">
          {/* Step 0: Amount */}
          {step === 0 && (
            <div>
              <h2 className="section-title mb-1">Quel montant souhaitez-vous ?</h2>
              <p className="text-sm text-gray-500 mb-6">
                Montant disponible: <strong className="text-brand-600">{formatCurrency(available)}</strong>
              </p>

              {/* Quick amounts */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[50000, 100000, 150000, 200000, 250000, 300000].map((preset) => (
                  <button
                    key={preset}
                    disabled={preset > available}
                    onClick={() => update('amount', String(preset))}
                    className={clsx(
                      'py-3 px-2 rounded-xl text-sm font-medium border transition-all',
                      form.amount === String(preset)
                        ? 'bg-brand-600 text-white border-brand-600'
                        : preset > available
                        ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-brand-300 hover:bg-brand-50'
                    )}
                  >
                    {formatCurrency(preset)}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-500 text-center mb-3">— ou saisir un montant personnalisé —</p>

              <div>
                <label className="label" htmlFor="amount">Montant (FCFA)</label>
                <input
                  id="amount"
                  type="number"
                  min={10000}
                  max={available}
                  step={5000}
                  value={form.amount}
                  onChange={(e) => update('amount', e.target.value)}
                  className="input-field text-lg font-semibold"
                  placeholder="Ex: 150 000"
                />
                {amount > 0 && amount < 10000 && (
                  <p className="text-xs text-red-600 mt-1">Montant minimum: {formatCurrency(10000)}</p>
                )}
                {amount > available && (
                  <p className="text-xs text-red-600 mt-1">
                    Dépasse votre disponible de {formatCurrency(available)}
                  </p>
                )}
              </div>

              {amount >= 10000 && amount <= available && (
                <div className="mt-5 p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Montant demandé</span>
                    <span className="font-semibold">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frais de service (1%)</span>
                    <span className="text-gray-600">- {formatCurrency(fees)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2">
                    <span>Montant reçu</span>
                    <span className="text-brand-600">{formatCurrency(netAmount)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Reason */}
          {step === 1 && (
            <div>
              <h2 className="section-title mb-1">Quel est le motif ?</h2>
              <p className="text-sm text-gray-500 mb-6">
                Choisissez un motif pour votre demande d&apos;acompte.
              </p>

              <div className="space-y-2 mb-5">
                {REASONS_LIST.map((reason) => (
                  <button
                    key={reason}
                    onClick={() => update('reason', reason)}
                    className={clsx(
                      'w-full text-left px-4 py-3 rounded-xl text-sm font-medium border transition-all flex items-center gap-3',
                      form.reason === reason
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-300 hover:bg-brand-50'
                    )}
                  >
                    <span className={clsx(
                      'w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center',
                      form.reason === reason ? 'border-white bg-white' : 'border-gray-300'
                    )}>
                      {form.reason === reason && (
                        <span className="w-2 h-2 rounded-full bg-brand-600 block" />
                      )}
                    </span>
                    {reason}
                  </button>
                ))}
              </div>

              {form.reason === 'Autre motif' && (
                <div>
                  <label className="label" htmlFor="customReason">Précisez le motif</label>
                  <textarea
                    id="customReason"
                    rows={3}
                    value={form.customReason}
                    onChange={(e) => update('customReason', e.target.value)}
                    className="input-field resize-none"
                    placeholder="Décrivez brièvement votre besoin..."
                    maxLength={200}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div>
              <h2 className="section-title mb-1">Mode de réception</h2>
              <p className="text-sm text-gray-500 mb-6">
                Comment souhaitez-vous recevoir votre acompte ?
              </p>

              {/* Method selector */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { method: 'mobile_money' as PaymentMethod, icon: Smartphone, label: 'Mobile Money' },
                  { method: 'bank_transfer' as PaymentMethod, icon: Building2, label: 'Virement bancaire' },
                  { method: 'cash' as PaymentMethod, icon: Banknote, label: 'Espèces' },
                ].map(({ method, icon: Icon, label }) => (
                  <button
                    key={method}
                    onClick={() => { update('paymentMethod', method); update('paymentDetails', '') }}
                    className={clsx(
                      'p-4 rounded-xl border text-sm font-medium flex flex-col items-center gap-2 transition-all',
                      form.paymentMethod === method
                        ? 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-300'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </button>
                ))}
              </div>

              {/* Payment details */}
              {form.paymentMethod === 'mobile_money' && (
                <div>
                  <label className="label">Opérateur et numéro</label>
                  <select
                    value={form.paymentDetails.split(' - ')[0] || ''}
                    onChange={(e) => update('paymentDetails', e.target.value ? `${e.target.value} - ` : '')}
                    className="input-field mb-3"
                  >
                    <option value="">Sélectionner un opérateur</option>
                    <option>Orange Money</option>
                    <option>Wave</option>
                    <option>Free Money</option>
                    <option>Expresso</option>
                  </select>
                  <input
                    type="tel"
                    value={form.paymentDetails.split(' - ')[1] || ''}
                    onChange={(e) => {
                      const op = form.paymentDetails.split(' - ')[0] || ''
                      update('paymentDetails', `${op} - ${e.target.value}`)
                    }}
                    className="input-field"
                    placeholder="Ex: 77 456 78 90"
                  />
                </div>
              )}

              {form.paymentMethod === 'bank_transfer' && (
                <div className="space-y-3">
                  <div>
                    <label className="label">Banque</label>
                    <select
                      value={form.paymentDetails.split(' - ')[0] || ''}
                      onChange={(e) => update('paymentDetails', e.target.value ? `${e.target.value} - ` : '')}
                      className="input-field"
                    >
                      <option value="">Sélectionner une banque</option>
                      <option>UBA Sénégal</option>
                      <option>BICIS</option>
                      <option>Ecobank</option>
                      <option>BDK</option>
                      <option>SGBS</option>
                      <option>Orabank</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Numéro de compte (IBAN/RIB)</label>
                    <input
                      type="text"
                      value={form.paymentDetails.split(' - ')[1] || ''}
                      onChange={(e) => {
                        const bank = form.paymentDetails.split(' - ')[0] || ''
                        update('paymentDetails', `${bank} - ${e.target.value}`)
                      }}
                      className="input-field"
                      placeholder="SN012 3456 7890 1234"
                    />
                  </div>
                </div>
              )}

              {form.paymentMethod === 'cash' && (
                <div>
                  <label className="label">Point de retrait</label>
                  <select
                    value={form.paymentDetails}
                    onChange={(e) => update('paymentDetails', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Sélectionner un point de retrait</option>
                    <option>Caisse principale — Siège</option>
                    <option>Caisse secondaire — Agence Plateau</option>
                    <option>Caisse — Agence Almadies</option>
                  </select>
                </div>
              )}

              <div className="mt-4 flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Les fonds seront transférés dans un délai de 24h après approbation par votre service RH.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div>
              <h2 className="section-title mb-1">Récapitulatif</h2>
              <p className="text-sm text-gray-500 mb-6">
                Vérifiez les informations avant de soumettre votre demande.
              </p>

              <div className="space-y-4">
                <div className="p-5 bg-brand-50 border border-brand-100 rounded-xl">
                  <p className="text-xs font-medium text-brand-700 mb-1">Montant de l&apos;acompte</p>
                  <p className="text-3xl font-bold text-brand-700">{formatCurrency(amount)}</p>
                  <p className="text-xs text-brand-600 mt-1">
                    Vous recevrez {formatCurrency(netAmount)} après frais ({formatCurrency(fees)})
                  </p>
                </div>

                <dl className="space-y-3">
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                    <dt className="text-gray-500">Motif</dt>
                    <dd className="font-medium text-gray-900 text-right max-w-xs">
                      {form.reason === 'Autre motif' ? form.customReason : form.reason}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                    <dt className="text-gray-500">Mode de paiement</dt>
                    <dd className="font-medium text-gray-900">
                      {form.paymentMethod === 'mobile_money' ? 'Mobile Money' : form.paymentMethod === 'bank_transfer' ? 'Virement bancaire' : 'Espèces'}
                    </dd>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                    <dt className="text-gray-500">Détails paiement</dt>
                    <dd className="font-medium text-gray-900">{form.paymentDetails}</dd>
                  </div>
                  <div className="flex justify-between py-2.5 text-sm">
                    <dt className="text-gray-500">Remboursement prévu</dt>
                    <dd className="font-medium text-gray-900">
                      {new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleDateString('fr-SN', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </dd>
                  </div>
                </dl>

                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">
                    En soumettant cette demande, vous acceptez que le montant de{' '}
                    <strong>{formatCurrency(amount)}</strong> soit déduit de votre prochain salaire.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 0 ? (
              <button onClick={() => setStep((s) => s - 1)} className="btn-secondary">
                <ChevronLeft className="w-4 h-4" /> Précédent
              </button>
            ) : (
              <Link href="/dashboard" className="btn-secondary">
                Annuler
              </Link>
            )}

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="btn-primary"
              >
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Soumettre la demande
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
