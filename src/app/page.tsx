import Link from 'next/link'
import {
  ArrowRight, CheckCircle2, Shield, Smartphone, Zap,
  TrendingUp, Users, Clock, Gift, BookOpen, Star,
  ChevronRight, BarChart3,
} from 'lucide-react'
import Logo from '@/components/Logo'

const stats = [
  { value: '12 500+', label: 'Employés accompagnés' },
  { value: '98%', label: 'Taux de satisfaction' },
  { value: '< 2h', label: 'Délai de déblocage' },
  { value: '0 FCFA', label: 'Frais cachés' },
]

const features = [
  {
    icon: Zap,
    color: 'bg-yellow-50 text-yellow-600',
    title: 'Salaire gagné en temps réel',
    description:
      'Visualisez exactement ce que vous avez gagné aujourd\'hui. Accédez jusqu\'à 50% de votre salaire net de la période en cours.',
  },
  {
    icon: Gift,
    color: 'bg-purple-50 text-purple-600',
    title: 'Bons d\'achat avec bonus',
    description:
      'Recevez jusqu\'à 25% de bonus en choisissant un bon d\'achat (Auchan, Canal+, Orange…). Zéro frais sur cette option.',
  },
  {
    icon: BookOpen,
    color: 'bg-blue-50 text-blue-600',
    title: 'Bien-être financier',
    description:
      'Cours gratuits, score financier personnel, alertes de découvert et objectifs d\'épargne pour améliorer votre santé financière.',
  },
  {
    icon: Shield,
    color: 'bg-green-50 text-green-600',
    title: 'Sécurisé & certifié',
    description:
      'Certifié par la BCEAO. Vos données sont chiffrées et jamais vendues. Aucune dette — vous accédez à ce que vous avez déjà gagné.',
  },
]

const howItWorks = [
  { num: '01', title: 'Votre employeur s\'inscrit', desc: 'Gratuit pour l\'employeur. Intégration en quelques heures avec votre logiciel de paie.' },
  { num: '02', title: 'Vous vous connectez', desc: 'Créez votre compte en 2 minutes avec votre identifiant employé.' },
  { num: '03', title: 'Demandez votre acompte', desc: 'Choisissez le montant (dans votre limite), le mode de paiement et validez.' },
  { num: '04', title: 'Recevez vos fonds', desc: 'Virement Mobile Money ou bancaire sous 2h. Bon d\'achat instantané.' },
]

const employerBenefits = [
  { icon: TrendingUp, stat: '-31%', label: 'de turnover' },
  { icon: Users, stat: '×2', label: 'de candidatures reçues' },
  { icon: Clock, stat: '-22%', label: 'd\'absentéisme' },
  { icon: BarChart3, stat: '4.7/5', label: 'satisfaction employés' },
]

const testimonials = [
  {
    name: 'Aminata D.',
    role: 'Comptable',
    company: 'Transport Express SA',
    text: 'J\'ai accédé à mon salaire le soir même pour payer les frais d\'hospitalisation de ma mère. Le bon d\'achat Auchan avec +15% de bonus, c\'est génial !',
    rating: 5,
  },
  {
    name: 'Ousmane K.',
    role: 'Technicien Senior',
    company: 'TelecomSN',
    text: 'Le score de bien-être financier m\'a aidé à comprendre où allait mon argent. J\'ai économisé 200 000 FCFA grâce aux cours intégrés.',
    rating: 5,
  },
  {
    name: 'Mariame S.',
    role: 'DRH',
    company: 'RetailAfrika',
    text: 'Depuis qu\'on a intégré Di Allo Fintech, le turnover a baissé de 28% et nos employés sont beaucoup plus sereins. Et ça ne nous coûte rien !',
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Logo size="md" />
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#fonctionnement" className="hover:text-brand-600 transition">Fonctionnement</a>
            <a href="#avantages" className="hover:text-brand-600 transition">Avantages</a>
            <a href="#employeurs" className="hover:text-brand-600 transition">Employeurs</a>
            <a href="#temoignages" className="hover:text-brand-600 transition">Témoignages</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-secondary text-sm py-2 px-4">Connexion</Link>
            <Link href="/login?role=admin" className="btn-primary text-sm py-2 px-4">Espace RH</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white pt-20 pb-28">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gold-400/10" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                Earned Wage Access · Sénégal & Afrique de l&apos;Ouest
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-6">
                Accédez à votre{' '}
                <span className="text-gold-300">salaire gagné</span>{' '}
                quand vous en avez besoin
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Di Allo Fintech vous donne accès à votre salaire déjà travaillé, 24h/24.
                Zéro intérêt, zéro dette — et jusqu'à <strong className="text-gold-300">25% de bonus</strong> sur vos bons d'achat.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-lg hover:shadow-xl"
                >
                  Accéder à mon salaire
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#fonctionnement"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition"
                >
                  Comment ça marche ?
                </a>
              </div>

              <div className="flex flex-wrap gap-5">
                {[
                  '✓ Gratuit pour l\'employeur',
                  '✓ Zéro frais caché',
                  '✓ Déblocage sous 2h',
                  '✓ Certifié BCEAO',
                ].map((t) => (
                  <span key={t} className="text-sm text-white/75 font-medium">{t}</span>
                ))}
              </div>
            </div>

            {/* Right — App mockup card */}
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-7 space-y-4">
                {/* Earned wage display */}
                <div className="bg-white rounded-2xl p-5">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Salaire gagné aujourd&apos;hui</p>
                  <p className="text-3xl font-bold text-gray-900">553 846 <span className="text-lg text-gray-400">FCFA</span></p>
                  <div className="mt-3 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: '77%' }} />
                  </div>
                  <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                    <span>77% de la période écoulée</span>
                    <span>31 mars</span>
                  </div>
                </div>

                {/* Quick access */}
                <div className="bg-brand-600 rounded-2xl p-5 text-white">
                  <p className="text-sm text-white/80 mb-1">Disponible maintenant</p>
                  <p className="text-2xl font-bold mb-3">210 000 FCFA</p>
                  <button className="w-full bg-white text-brand-700 font-semibold py-2.5 rounded-xl text-sm">
                    Accéder maintenant →
                  </button>
                </div>

                {/* Gift card bonus */}
                <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Bon Canal+ avec +20% bonus</p>
                    <p className="text-xs text-gray-500">100 000 FCFA → 120 000 FCFA de crédit</p>
                  </div>
                </div>

                {/* Score */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">68</p>
                    <p className="text-xs text-gray-500">Score financier</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-blue-600">37%</p>
                    <p className="text-xs text-gray-500">Objectif épargne</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats band */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-white">{s.value}</p>
                <p className="text-sm text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="avantages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Bien plus qu&apos;un simple acompte</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Di Allo Fintech est une plateforme complète de bien-être financier pour les employés africains.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="card p-6 hover:shadow-lg transition-all group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${f.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Gift cards highlight */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Gift className="w-4 h-4 text-yellow-300" />
                Exclusif Di Allo Fintech
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Jusqu&apos;à <span className="text-yellow-300">+25% de bonus</span>{' '}
                sur vos bons d&apos;achat
              </h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                Choisissez de recevoir votre acompte sous forme de bon d&apos;achat chez nos partenaires
                et bénéficiez d&apos;un bonus gratuit — sans frais de service.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  { retailer: 'Orange (Crédit tel.)', bonus: '+25%', icon: '📱' },
                  { retailer: 'Canal+ Afrique', bonus: '+20%', icon: '📺' },
                  { retailer: 'Auchan Sénégal', bonus: '+15%', icon: '🛒' },
                  { retailer: 'Jumia Sénégal', bonus: '+12%', icon: '📦' },
                ].map((gc) => (
                  <div key={gc.retailer} className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                    <span className="text-xl">{gc.icon}</span>
                    <span className="flex-1 font-medium">{gc.retailer}</span>
                    <span className="text-yellow-300 font-bold">{gc.bonus}</span>
                  </div>
                ))}
              </div>
              <Link href="/login" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-purple-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-lg">
                Voir tous les bons d&apos;achat
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-3xl p-6">
              <p className="text-sm text-white/70 font-medium mb-4">Exemple concret</p>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-sm text-white/70 mb-1">Vous demandez</p>
                  <p className="text-2xl font-bold">100 000 FCFA</p>
                </div>
                <div className="flex items-center justify-center text-2xl">→</div>
                <div className="bg-yellow-400/20 border border-yellow-400/30 rounded-xl p-4">
                  <p className="text-sm text-yellow-200 mb-1">Vous recevez (Canal+ +20%)</p>
                  <p className="text-2xl font-bold text-yellow-300">120 000 FCFA</p>
                  <p className="text-xs text-yellow-200 mt-1">+20 000 FCFA offerts</p>
                </div>
                <p className="text-center text-xs text-white/50">Zéro frais de service sur les bons d&apos;achat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="fonctionnement" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">4 étapes simples pour recevoir votre acompte.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((s, i) => (
              <div key={s.num} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-gray-200 -translate-x-4 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-bold text-xl flex items-center justify-center mb-4 shadow-md">
                    {s.num}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer section */}
      <section id="employeurs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Pour les employeurs · Gratuit
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Un avantage social qui change tout
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Offrez Di Allo Fintech à vos équipes sans aucun coût.
                Réduisez le turnover, améliorez la satisfaction et attirez les meilleurs talents.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Intégration en quelques heures avec votre logiciel de paie',
                  'Tableau de bord RH avec statistiques d\'adoption',
                  'Zéro risque financier pour l\'entreprise',
                  'Support dédié et ressources de communication',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/login?role=admin" className="btn-primary inline-flex">
                Devenir partenaire
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {employerBenefits.map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.label} className="card p-6 text-center hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-brand-600" />
                    </div>
                    <p className="text-3xl font-bold text-brand-600 mb-1">{b.stat}</p>
                    <p className="text-sm text-gray-600">{b.label}</p>
                  </div>
                )
              })}
              <div className="col-span-2 card p-4 bg-brand-50 border-brand-100 text-center">
                <p className="text-xs text-brand-700 font-medium">
                  Données basées sur nos 150+ entreprises partenaires au Sénégal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="temoignages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce qu&apos;ils en disent</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-6 hover:shadow-md transition-all">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-5 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center text-white font-semibold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role} · {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à transformer la paie de vos équipes ?</h2>
          <p className="text-xl text-white/80 mb-8">
            Rejoignez les 150+ entreprises qui font confiance à Di Allo Fintech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-gray-50 transition shadow-lg">
              Accéder à mon compte
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/login?role=admin" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition">
              Espace employeur
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <Logo variant="light" size="md" showTagline />
              <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
                La solution d&apos;Earned Wage Access pour les entreprises d&apos;Afrique de l&apos;Ouest.
                Simple, rapide, sécurisé.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-300">Produit</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#avantages" className="hover:text-white transition">Avantages</a></li>
                <li><a href="#fonctionnement" className="hover:text-white transition">Fonctionnement</a></li>
                <li><a href="#employeurs" className="hover:text-white transition">Pour les employeurs</a></li>
                <li><Link href="/login" className="hover:text-white transition">Se connecter</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide text-gray-300">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contact@diallo-fintech.com</li>
                <li>+221 33 800 00 00</li>
                <li>Dakar, Sénégal</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2025 Di Allo Fintech. Tous droits réservés. Certifié BCEAO.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">CGU</a>
              <a href="#" className="hover:text-white transition">Confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
