'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChevronLeft, ChevronRight, CheckCircle2, Smartphone,
  Building2, Gift, Info, AlertTriangle, Zap, TrendingUp,
} from 'lucide-react'
import clsx from 'clsx'
import AppShell from '@/components/AppShell'
import {
  CURRENT_USER, EARNED_WAGE_DATA, GIFT_CARDS, REASONS_LIST,
  formatCurrency,
} from '@/lib/mockData'
import type { PaymentMethod } from '@/types'

const STEPS = ['Montant', 'Motif', 'Réception', 'Confirmation']

type FormData = {
  amount: string
  reason: string
  customReason: string
  paymentMethod: PaymentMethod
  paymentDetails: string
  selectedGiftCard: string
}

export default function RequestPage() {
  const user = CURRENT_USER
  const ew = EARNED_WAGE_DATA
  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [form, setForm] = useState<FormData>({
    amount: '',
    reason: '',
    customReason: '',
    paymentMethod: 'mobile_money',
    paymentDetails: '',
    selectedGiftCard: '',
  })

  const amount = parseFloat(form.amount) || 0
  const selectedGC = GIFT_CARDS.find((g) => g.id === form.selectedGiftCard)
  const giftCardBonus = (form.paymentMethod === 'gift_card' && selectedGC)
    ? Math.round(amount * (selectedGC.bonusPercent / 100))
    : 0
  const netReceived = form.paymentMethod === 'gift_card'
    ? amount + giftCardBonus
    : amount

  const periodPercent = Math.round((ew.daysWorked / ew.totalDays) * 100)

  function update(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function canProceed() {
    if (step === 0) return amount >= 5000 && amount <= ew.availableToAccess
    if (step === 1) return form.reason !== '' && (form.reason !== 'Autre motif' || form.customReason.trim().length > 5)
    if (step === 2) {
      if (form.paymentMethod === 'gift_card') return form.selectedGiftCard !== ''
      return form.paymentDetails.trim().length > 3
    }
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
      <AppShell user={user} title="Demande envoyée">
        <div className="max-w-md mx-auto mt-10">
          <div className="card p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Demande envoyée !</h2>
            <p className="text-gray-500 mb-2">
              Votre demande de <strong className="text-brand-600">{formatCurrency(amount)}</strong>
              {giftCardBonus > 0 && (
                <span> (+ <strong className="text-purple-600">{formatCurrency(giftCardBonus)} de bonus</strong>)</span>
              )}{' '}
              a été soumise.
            </p>
            <p className="text-sm text-gray-400 mb-8">Réponse attendue sous 2 heures ouvrées.</p>
            <div className="flex flex-col gap-3">
              <Link href="/history" className="btn-primary">Suivre ma demande</Link>
              <Link href="/dashboard" className="btn-secondary">Tableau de bord</Link>
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell user={user} title="Nouvelle demande" breadcrumb={['Mon espace', 'Nouvelle demande']}>
      <div className="max-w-2xl mx-auto">
        {/* Earned wage context banner */}
        <div className="card p-4 mb-6 bg-brand-50 border-brand-100 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              Vous avez gagné <span className="text-brand-600">{formatCurrency(ew.netEarned)}</span> cette période
            </p>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex-1 h-1.5 bg-brand-200 rounded-full overflow-hidden">
                <div className="h-full bg-brand-600 rounded-full" style={{ width: `${periodPercent}%` }} />
              </div>
              <span className="text-xs text-gray-500 shrink-0">{periodPercent}%</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-500">Disponible</p>
            <p className="font-bold text-brand-600">{formatCurrency(ew.availableToAccess)}</p>
          </div>
        </div>

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
                <div className={clsx('flex-1 h-0.5 mx-2 rounded', i < step ? 'bg-brand-600' : 'bg-gray-200')} />
              )}
            </div>
          ))}
        </div>

        <div className="card p-6 lg:p-8 animate-slide-up">
          {/* Step 0: Amount */}
          {step === 0 && (
            <div>
              <h2 className="section-title mb-1">Quel montant souhaitez-vous ?</h2>
              <p className="text-sm text-gray-500 mb-5">
                Disponible : <strong className="text-brand-600">{formatCurrency(ew.availableToAccess)}</strong>
                {' · '}Limite journalière : <strong>{formatCurrency(user.maxDailyAmount)}</strong>
              </p>

              {/* Hint about gift card */}
              <div className="flex items-start gap-2 mb-4 p-3 bg-purple-50 border border-purple-100 rounded-xl">
                <Gift className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <p className="text-xs text-purple-700">
                  <strong>Astuce :</strong> Choisissez un bon d&apos;achat à l&apos;étape suivante pour obtenir jusqu&apos;à <strong>+25% de bonus</strong> sans frais.
                </p>
              </div>

              {/* Quick presets */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[25000, 50000, 75000, 100000, 150000, 200000].map((preset) => (
                  <button
                    key={preset}
                    disabled={preset > ew.availableToAccess}
                    onClick={() => update('amount', String(preset))}
                    className={clsx(
                      'py-3 rounded-xl text-sm font-medium border transition-all',
                      form.amount === String(preset)
                        ? 'bg-brand-600 text-white border-brand-600'
                        : preset > ew.availableToAccess
                        ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-brand-300 hover:bg-brand-50'
                    )}
                  >
                    {formatCurrency(preset)}
                  </button>
                ))}
              </div>

              <div>
                <label className="label" htmlFor="amount">Montant personnalisé (FCFA)</label>
                <input
                  id="amount"
                  type="number"
                  min={5000}
                  max={ew.availableToAccess}
                  step={5000}
                  value={form.amount}
                  onChange={(e) => update('amount', e.target.value)}
                  className="input-field text-lg font-semibold"
                  placeholder="Saisir un montant"
                />
                {amount > 0 && amount < 5000 && <p className="text-xs text-red-600 mt-1">Minimum : {formatCurrency(5000)}</p>}
                {amount > ew.availableToAccess && <p className="text-xs text-red-600 mt-1">Dépasse votre disponible</p>}
              </div>

              {amount >= 5000 && amount <= ew.availableToAccess && (
                <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Montant demandé</span>
                    <span className="font-semibold">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>Frais de service</span>
                    <span>0 FCFA (gratuit)</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Reason */}
          {step === 1 && (
            <div>
              <h2 className="section-title mb-1">Quel est le motif ?</h2>
              <p className="text-sm text-gray-500 mb-5">Confidentiel — visible uniquement par votre service RH.</p>
              <div className="space-y-2 mb-4">
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
                      form.reason === reason ? 'border-white' : 'border-gray-300'
                    )}>
                      {form.reason === reason && <span className="w-2 h-2 rounded-full bg-white block" />}
                    </span>
                    {reason}
                  </button>
                ))}
              </div>
              {form.reason === 'Autre motif' && (
                <textarea
                  rows={3}
                  value={form.customReason}
                  onChange={(e) => update('customReason', e.target.value)}
                  className="input-field resize-none"
                  placeholder="Décrivez votre besoin..."
                  maxLength={200}
                />
              )}
            </div>
          )}

          {/* Step 2: Payment method */}
          {step === 2 && (
            <div>
              <h2 className="section-title mb-1">Comment recevoir votre acompte ?</h2>
              <p className="text-sm text-gray-500 mb-5">Les bons d&apos;achat sont instantanés et sans frais.</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { method: 'mobile_money' as PaymentMethod, icon: Smartphone, label: 'Mobile Money', sub: 'Sous 2h' },
                  { method: 'bank_transfer' as PaymentMethod, icon: Building2, label: 'Virement', sub: 'Sous 24h' },
                  { method: 'gift_card' as PaymentMethod, icon: Gift, label: 'Bon d\'achat', sub: '+bonus' },
                ].map(({ method, icon: Icon, label, sub }) => (
                  <button
                    key={method}
                    onClick={() => { update('paymentMethod', method); update('paymentDetails', ''); update('selectedGiftCard', '') }}
                    className={clsx(
                      'p-4 rounded-xl border-2 text-sm font-medium flex flex-col items-center gap-1.5 transition-all relative',
                      form.paymentMethod === method
                        ? method === 'gift_card' ? 'bg-purple-600 text-white border-purple-600' : 'bg-brand-600 text-white border-brand-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-brand-300'
                    )}
                  >
                    {method === 'gift_card' && (
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        +bonus
                      </span>
                    )}
                    <Icon className="w-5 h-5" />
                    <span>{label}</span>
                    <span className={clsx('text-xs', form.paymentMethod === method ? 'text-white/70' : 'text-gray-400')}>{sub}</span>
                  </button>
                ))}
              </div>

              {/* Gift card selection */}
              {form.paymentMethod === 'gift_card' && (
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">Choisissez votre enseigne</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {GIFT_CARDS.map((gc) => (
                      <button
                        key={gc.id}
                        disabled={amount < gc.minAmount || amount > gc.maxAmount}
                        onClick={() => update('selectedGiftCard', gc.id)}
                        className={clsx(
                          'flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all',
                          form.selectedGiftCard === gc.id
                            ? 'border-purple-500 bg-purple-50'
                            : amount < gc.minAmount || amount > gc.maxAmount
                            ? 'border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed'
                            : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                        )}
                      >
                        <span className="text-xl">{gc.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-gray-900 truncate">{gc.retailer}</p>
                          <p className="text-xs text-purple-600 font-bold">+{gc.bonusPercent}% de bonus</p>
                        </div>
                        {form.selectedGiftCard === gc.id && <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {selectedGC && amount >= selectedGC.minAmount && (
                    <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Vous accédez</span>
                        <span className="font-semibold">{formatCurrency(amount)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-purple-600 font-semibold">
                        <span>Bonus {selectedGC.bonusPercent}% offert</span>
                        <span>+ {formatCurrency(giftCardBonus)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-purple-700 border-t border-purple-200 pt-2 mt-2">
                        <span>Valeur du bon</span>
                        <span className="text-lg">{formatCurrency(netReceived)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {form.paymentMethod === 'mobile_money' && (
                <div className="space-y-3">
                  <select
                    value={form.paymentDetails.split(' - ')[0] || ''}
                    onChange={(e) => update('paymentDetails', `${e.target.value} - `)}
                    className="input-field"
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
                    placeholder="Numéro ex: 77 456 78 90"
                  />
                </div>
              )}

              {form.paymentMethod === 'bank_transfer' && (
                <div className="space-y-3">
                  <select
                    value={form.paymentDetails.split(' - ')[0] || ''}
                    onChange={(e) => update('paymentDetails', `${e.target.value} - `)}
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
                  <input
                    type="text"
                    value={form.paymentDetails.split(' - ')[1] || ''}
                    onChange={(e) => {
                      const bank = form.paymentDetails.split(' - ')[0] || ''
                      update('paymentDetails', `${bank} - ${e.target.value}`)
                    }}
                    className="input-field"
                    placeholder="Numéro de compte (RIB/IBAN)"
                  />
                </div>
              )}

              {form.paymentMethod !== 'gift_card' && (
                <div className="mt-3 flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                  <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    Fonds disponibles dans les 2 heures suivant l&apos;approbation RH.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div>
              <h2 className="section-title mb-1">Récapitulatif</h2>
              <p className="text-sm text-gray-500 mb-5">Vérifiez avant de soumettre.</p>

              <div className={clsx(
                'p-5 rounded-xl mb-5 text-center',
                form.paymentMethod === 'gift_card' ? 'bg-purple-50 border border-purple-100' : 'bg-brand-50 border border-brand-100'
              )}>
                {form.paymentMethod === 'gift_card' && selectedGC ? (
                  <>
                    <span className="text-4xl block mb-2">{selectedGC.icon}</span>
                    <p className="text-3xl font-bold text-purple-700">{formatCurrency(netReceived)}</p>
                    <p className="text-sm text-purple-600 mt-1">
                      Bon {selectedGC.retailer} · dont <strong>+{formatCurrency(giftCardBonus)} offerts</strong>
                    </p>
                  </>
                ) : (
                  <>
                    <Zap className="w-8 h-8 text-brand-600 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-brand-700">{formatCurrency(amount)}</p>
                    <p className="text-sm text-brand-600 mt-1">Zéro frais · Zéro intérêt</p>
                  </>
                )}
              </div>

              <dl className="space-y-3 mb-5">
                {[
                  { label: 'Motif', value: form.reason === 'Autre motif' ? form.customReason : form.reason },
                  { label: 'Mode de réception', value: form.paymentMethod === 'gift_card' ? `Bon ${selectedGC?.retailer}` : form.paymentMethod === 'mobile_money' ? 'Mobile Money' : 'Virement bancaire' },
                  ...(form.paymentMethod !== 'gift_card' ? [{ label: 'Détails', value: form.paymentDetails }] : []),
                  { label: 'Remboursement', value: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toLocaleDateString('fr-SN', { day: '2-digit', month: 'long', year: 'numeric' }) },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                    <dt className="text-gray-500">{item.label}</dt>
                    <dd className="font-medium text-gray-900 text-right max-w-xs">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-700">
                  En soumettant, vous acceptez que <strong>{formatCurrency(amount)}</strong> soit déduit de votre prochain salaire.
                  Ce n&apos;est pas un prêt — vous accédez à votre salaire déjà gagné.
                </p>
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
              <Link href="/dashboard" className="btn-secondary">Annuler</Link>
            )}

            {step < STEPS.length - 1 ? (
              <button onClick={() => setStep((s) => s + 1)} disabled={!canProceed()} className="btn-primary">
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={submitting} className="btn-primary">
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Envoi...
                  </span>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" /> Soumettre</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
