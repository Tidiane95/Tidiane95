import Link from 'next/link'
import {
  ArrowRight,
  Clock,
  Shield,
  Smartphone,
  CheckCircle2,
  Star,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
} from 'lucide-react'
import Logo from '@/components/Logo'

const features = [
  {
    icon: Zap,
    title: 'Rapide & Simple',
    description: 'Soumettez votre demande en moins de 2 minutes. Réponse garantie sous 24h.',
  },
  {
    icon: Shield,
    title: 'Sécurisé & Confidentiel',
    description: 'Vos données sont chiffrées et protégées. Votre vie privée est notre priorité.',
  },
  {
    icon: Smartphone,
    title: 'Accessible Partout',
    description: 'Depuis votre téléphone, tablette ou ordinateur, à tout moment de la journée.',
  },
  {
    icon: Clock,
    title: 'Déblocage Rapide',
    description: 'Fonds disponibles sur votre Mobile Money ou compte bancaire sous 24h.',
  },
]

const steps = [
  { step: '01', title: 'Connectez-vous', desc: 'Accédez à votre espace personnel avec vos identifiants employé.' },
  { step: '02', title: 'Faites votre demande', desc: 'Indiquez le montant souhaité et le motif de votre acompte.' },
  { step: '03', title: 'Validation RH', desc: 'Votre responsable RH traite votre demande rapidement.' },
  { step: '04', title: 'Recevez vos fonds', desc: 'L\'argent est versé sur votre compte Mobile Money ou bancaire.' },
]

const testimonials = [
  {
    name: 'Aminata D.',
    role: 'Comptable',
    company: 'Transport Express SA',
    text: 'Grâce à Di Allo Fintech, j\'ai pu payer les frais d\'hospitalisation de ma mère sans stress. La procédure est vraiment simple.',
    rating: 5,
  },
  {
    name: 'Ousmane K.',
    role: 'Technicien Senior',
    company: 'TelecomSN',
    text: 'J\'ai reçu mon acompte en moins de 2 heures sur mon Orange Money. Excellent service !',
    rating: 5,
  },
  {
    name: 'Mariame S.',
    role: 'Responsable Marketing',
    company: 'RetailAfrika',
    text: 'Le suivi des demandes en temps réel est très pratique. Je recommande fortement.',
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo size="md" />
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <a href="#fonctionnement" className="hover:text-brand-600 transition">Fonctionnement</a>
              <a href="#avantages" className="hover:text-brand-600 transition">Avantages</a>
              <a href="#temoignages" className="hover:text-brand-600 transition">Témoignages</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="btn-secondary text-sm py-2 px-4">
                Connexion
              </Link>
              <Link href="/login?role=admin" className="btn-primary text-sm py-2 px-4">
                Espace RH
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                Solution 100% digitale — Sénégal & Afrique de l&apos;Ouest
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
                Votre salaire,{' '}
                <span className="text-gold-300">quand vous</span>{' '}
                <span className="text-gold-300">en avez besoin</span>
              </h1>

              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Di Allo Fintech vous permet d&apos;accéder à votre salaire déjà gagné
                avant la date de paie. Simple, rapide et sans frais cachés.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
                >
                  Demander un acompte
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#fonctionnement"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                >
                  Voir comment ça marche
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="text-sm text-white/80">0% de frais cachés</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="text-sm text-white/80">Déblocage sous 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-300" />
                  <span className="text-sm text-white/80">100% sécurisé</span>
                </div>
              </div>
            </div>

            {/* Stats card */}
            <div className="hidden lg:flex justify-center">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-sm">
                <p className="text-white/70 text-sm mb-6 font-medium">Impact Di Allo Fintech</p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gold-400/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-gold-300" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">12 500+</p>
                      <p className="text-sm text-white/60">Employés accompagnés</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-400/20 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-brand-200" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">98%</p>
                      <p className="text-sm text-white/60">Taux de satisfaction</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-green-400/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-green-300" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-white">&lt; 2h</p>
                      <p className="text-sm text-white/60">Délai moyen de déblocage</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-xs text-white/50 text-center">
                    Certifié par la BCEAO · Partenaire de 150+ entreprises
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="avantages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pourquoi choisir Di Allo Fintech ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une solution pensée pour les employés d&apos;Afrique de l&apos;Ouest,
              avec leurs besoins au cœur de chaque fonctionnalité.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="card p-6 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-100 transition">
                    <Icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="fonctionnement" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              4 étapes simples pour recevoir votre acompte de salaire.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-full w-full h-px bg-gray-200 -translate-x-4 z-0" />
                )}
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white font-bold text-xl flex items-center justify-center mb-4 shadow-md">
                    {s.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="temoignages" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ce que disent nos utilisateurs
            </h2>
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
          <h2 className="text-3xl font-bold text-white mb-4">
            Votre entreprise n&apos;est pas encore partenaire ?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Contactez-nous pour intégrer Di Allo Fintech à votre système de paie.
            Vos employés vous remercieront.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@diallo-fintech.com"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-gray-50 transition shadow-lg"
            >
              Devenir partenaire
              <ChevronRight className="w-5 h-5" />
            </a>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 text-white font-medium rounded-xl border border-white/20 hover:bg-white/20 transition"
            >
              Accéder à mon compte
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <Logo variant="light" size="md" showTagline />
              <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                La solution d&apos;acompte de salaire pour les entreprises africaines.
                Simple, rapide et sécurisé.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#avantages" className="hover:text-white transition">Avantages</a></li>
                <li><a href="#fonctionnement" className="hover:text-white transition">Fonctionnement</a></li>
                <li><Link href="/login" className="hover:text-white transition">Connexion employé</Link></li>
                <li><Link href="/login?role=admin" className="hover:text-white transition">Espace RH</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>contact@diallo-fintech.com</li>
                <li>+221 33 800 00 00</li>
                <li>Dakar, Sénégal</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© 2025 Di Allo Fintech. Tous droits réservés.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">Conditions d&apos;utilisation</a>
              <a href="#" className="hover:text-white transition">Politique de confidentialité</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
