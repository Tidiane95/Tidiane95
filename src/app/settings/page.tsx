import { User, Lock, Bell, Shield } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { CURRENT_USER, formatDate } from '@/lib/mockData'

export default function SettingsPage() {
  const user = CURRENT_USER

  return (
    <AppShell user={user} title="Paramètres du compte" breadcrumb={['Mon espace', 'Paramètres']}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile */}
        <div className="card p-6">
          <h2 className="section-title mb-5 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" />
            Informations personnelles
          </h2>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-bold text-xl">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-500">{user.position} · {user.department}</p>
            </div>
          </div>

          <dl className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'ID Employé', value: user.employeeId },
              { label: 'Employeur', value: user.employer.name },
              { label: 'Email professionnel', value: user.email },
              { label: 'Téléphone', value: user.phone },
              { label: 'Date d\'embauche', value: formatDate(user.hireDate) },
              { label: 'Département', value: user.department },
            ].map((item) => (
              <div key={item.label} className="p-3 bg-gray-50 rounded-xl">
                <dt className="text-xs text-gray-500 mb-0.5">{item.label}</dt>
                <dd className="text-sm font-semibold text-gray-900">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Security */}
        <div className="card p-6">
          <h2 className="section-title mb-5 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" />
            Sécurité
          </h2>
          <div className="space-y-4">
            <div>
              <label className="label">Mot de passe actuel</label>
              <input type="password" className="input-field" placeholder="••••••••" />
            </div>
            <div>
              <label className="label">Nouveau mot de passe</label>
              <input type="password" className="input-field" placeholder="••••••••" />
            </div>
            <div>
              <label className="label">Confirmer le nouveau mot de passe</label>
              <input type="password" className="input-field" placeholder="••••••••" />
            </div>
            <button className="btn-primary">Changer le mot de passe</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-6">
          <h2 className="section-title mb-5 flex items-center gap-2">
            <Bell className="w-4 h-4 text-gray-400" />
            Préférences de notifications
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Approbation / refus de demande', desc: 'Être notifié quand votre demande est traitée', defaultChecked: true },
              { label: 'Déblocage des fonds', desc: 'Confirmation quand l\'argent est transféré', defaultChecked: true },
              { label: 'Rappels de remboursement', desc: 'Rappel avant la date de déduction sur salaire', defaultChecked: true },
              { label: 'Mises à jour de la politique', desc: 'Changements des conditions d\'utilisation', defaultChecked: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input type="checkbox" className="sr-only peer" defaultChecked={item.defaultChecked} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600" />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
