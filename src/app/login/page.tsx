'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Lock, User, AlertCircle } from 'lucide-react'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isAdmin = searchParams.get('role') === 'admin'

  const [email, setEmail] = useState(isAdmin ? 'f.kouyate@diallo-fintech.com' : 'mamadou.diallo@techafrique.sn')
  const [password, setPassword] = useState('password123')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))

    if (password !== 'password123') {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
      return
    }

    if (isAdmin || email.includes('diallo-fintech')) {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-700 to-brand-900 flex flex-col">
      {/* Header */}
      <header className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition text-sm">
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <Logo size="lg" showTagline />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
              {isAdmin ? 'Espace RH / Admin' : 'Connexion Employé'}
            </h1>
            <p className="text-sm text-gray-500 text-center mb-8">
              {isAdmin
                ? 'Gérez les demandes d\'acompte de votre équipe'
                : 'Accédez à votre espace personnel'}
            </p>

            {/* Demo credential hint */}
            <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                <strong>Demo:</strong> Les identifiants sont pré-remplis. Mot de passe: <code>password123</code>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="label" htmlFor="email">Adresse email</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-10"
                    placeholder="votre@email.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label mb-0" htmlFor="password">Mot de passe</label>
                  <a href="#" className="text-xs text-brand-600 hover:underline">Mot de passe oublié ?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-10 pr-10"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 text-base mt-2"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Connexion en cours...
                  </span>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            {/* Switch role */}
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              {isAdmin ? (
                <Link href="/login" className="text-sm text-brand-600 hover:underline">
                  Connexion employé →
                </Link>
              ) : (
                <Link href="/login?role=admin" className="text-sm text-brand-600 hover:underline">
                  Accéder à l&apos;espace RH →
                </Link>
              )}
            </div>
          </div>

          <p className="text-center mt-6 text-xs text-white/50">
            © 2025 Di Allo Fintech · Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  )
}
