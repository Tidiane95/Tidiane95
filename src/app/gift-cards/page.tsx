'use client'

import { useState } from 'react'
import clsx from 'clsx'
import { Gift, Star, Zap, CheckCircle2, ArrowRight, Info } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { CURRENT_USER, GIFT_CARDS, EARNED_WAGE_DATA, formatCurrency } from '@/lib/mockData'
import type { GiftCard } from '@/types'

const categories = ['Tous', 'Supermarché', 'Télécom', 'Divertissement', 'E-commerce', 'Carburant']

export default function GiftCardsPage() {
  const user = CURRENT_USER
  const ew = EARNED_WAGE_DATA
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [selected, setSelected] = useState<GiftCard | null>(null)
  const [amount, setAmount] = useState('')
  const [success, setSuccess] = useState(false)

  const filtered = selectedCategory === 'Tous'
    ? GIFT_CARDS
    : GIFT_CARDS.filter((g) => g.category === selectedCategory)

  const amountNum = parseFloat(amount) || 0
  const bonus = selected ? Math.round(amountNum * (selected.bonusPercent / 100)) : 0
  const totalValue = amountNum + bonus

  async function handleOrder() {
    await new Promise((r) => setTimeout(r, 1000))
    setSuccess(true)
  }

  if (success && selected) {
    return (
      <AppShell user={user} title="Bon d'achat commandé" breadcrumb={['Bons d\'achat', 'Confirmation']}>
        <div className="max-w-md mx-auto mt-10">
          <div className="card p-10 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-purple-500" />
            </div>
            <span className="text-4xl mb-3 block">{selected.icon}</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Bon {selected.retailer} commandé !</h2>
            <p className="text-gray-600 mb-1">
              Valeur du bon : <strong className="text-purple-600">{formatCurrency(totalValue)}</strong>
            </p>
            <p className="text-sm text-gray-500 mb-2">
              dont <strong className="text-green-600">+{formatCurrency(bonus)} offerts</strong> ({selected.bonusPercent}% de bonus)
            </p>
            <p className="text-xs text-gray-400 mb-6">Le bon sera envoyé par SMS / email dans quelques minutes.</p>
            <div className="flex flex-col gap-3">
              <button onClick={() => { setSuccess(false); setSelected(null); setAmount('') }} className="btn-primary">
                Commander un autre bon
              </button>
              <a href="/dashboard" className="btn-secondary">Retour au tableau de bord</a>
            </div>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell user={user} title="Bons d'achat" breadcrumb={['Mon espace', "Bons d'achat"]}>
      {/* Header */}
      <div className="card p-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Gift className="w-5 h-5 text-yellow-300" />
              <p className="font-bold">Bons d&apos;achat avec bonus</p>
            </div>
            <p className="text-sm text-white/80">
              Recevez jusqu&apos;à <strong className="text-yellow-300">+25% de bonus</strong> — zéro frais de service
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/70">Disponible</p>
            <p className="text-2xl font-bold">{formatCurrency(ew.availableToAccess)}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Gift card list */}
        <div className="lg:col-span-2">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  'px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((gc) => (
              <button
                key={gc.id}
                onClick={() => { setSelected(gc); setAmount('') }}
                className={clsx(
                  'card p-5 text-left transition-all hover:shadow-lg group',
                  selected?.id === gc.id && 'ring-2 ring-purple-500 ring-offset-2'
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center text-2xl', gc.color, 'bg-opacity-10')}>
                      <span>{gc.icon}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{gc.retailer}</p>
                      <p className="text-xs text-gray-500">{gc.category}</p>
                    </div>
                  </div>
                  {gc.popular && (
                    <span className="flex items-center gap-1 bg-gold-100 text-gold-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      <Star className="w-3 h-3 fill-gold-600 text-gold-600" />
                      Populaire
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-purple-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-purple-600">+{gc.bonusPercent}%</p>
                    <p className="text-xs text-gray-600">de bonus</p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-500">Jusqu&apos;à</p>
                    <p className="font-bold text-gray-900 text-sm">{formatCurrency(gc.maxAmount)}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Min : {formatCurrency(gc.minAmount)}</span>
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <Zap className="w-3 h-3" />
                    Zéro frais
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Order panel */}
        <div>
          {selected ? (
            <div className="card p-5 sticky top-4">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{selected.icon}</span>
                <div>
                  <p className="font-bold text-gray-900">{selected.retailer}</p>
                  <p className="text-sm text-purple-600 font-semibold">+{selected.bonusPercent}% de bonus</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="label">Montant (FCFA)</label>
                <input
                  type="number"
                  min={selected.minAmount}
                  max={Math.min(selected.maxAmount, ew.availableToAccess)}
                  step={5000}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-field text-lg font-semibold"
                  placeholder={`Min ${formatCurrency(selected.minAmount)}`}
                />
                {amountNum > 0 && amountNum < selected.minAmount && (
                  <p className="text-xs text-red-600 mt-1">Minimum : {formatCurrency(selected.minAmount)}</p>
                )}
                {amountNum > ew.availableToAccess && (
                  <p className="text-xs text-red-600 mt-1">Dépasse votre solde disponible</p>
                )}
              </div>

              {/* Quick amounts */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[25000, 50000, 100000].map((p) => (
                  <button
                    key={p}
                    disabled={p > ew.availableToAccess || p < selected.minAmount}
                    onClick={() => setAmount(String(p))}
                    className={clsx(
                      'py-2 px-1 rounded-xl text-xs font-medium border transition-all',
                      amount === String(p)
                        ? 'bg-purple-600 text-white border-purple-600'
                        : p > ew.availableToAccess || p < selected.minAmount
                        ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-300'
                    )}
                  >
                    {formatCurrency(p)}
                  </button>
                ))}
              </div>

              {/* Calculation */}
              {amountNum >= selected.minAmount && amountNum <= ew.availableToAccess && (
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-5 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Vous accédez</span>
                    <span className="font-semibold">{formatCurrency(amountNum)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 font-medium">Bonus {selected.bonusPercent}%</span>
                    <span className="text-green-600 font-medium">+ {formatCurrency(bonus)}</span>
                  </div>
                  <div className="flex justify-between font-bold border-t border-purple-100 pt-2">
                    <span>Valeur du bon</span>
                    <span className="text-purple-600 text-lg">{formatCurrency(totalValue)}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 mb-5 text-xs text-gray-500">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Le bon sera déboursé par SMS/email après validation RH (sous 2h)</span>
              </div>

              <button
                disabled={!(amountNum >= selected.minAmount && amountNum <= ew.availableToAccess)}
                onClick={handleOrder}
                className={clsx(
                  'w-full py-3 font-semibold rounded-xl flex items-center justify-center gap-2 transition',
                  amountNum >= selected.minAmount && amountNum <= ew.availableToAccess
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                )}
              >
                <Gift className="w-4 h-4" />
                Commander le bon
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="card p-8 text-center border-2 border-dashed border-gray-200">
              <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-medium text-gray-500 mb-1">Choisissez un bon d&apos;achat</p>
              <p className="text-sm text-gray-400">Sélectionnez un partenaire à gauche pour voir les options</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}
