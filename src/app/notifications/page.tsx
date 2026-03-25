import clsx from 'clsx'
import { Bell, CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react'
import AppShell from '@/components/AppShell'
import { CURRENT_USER, MOCK_NOTIFICATIONS, formatDateTime } from '@/lib/mockData'

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
}

const colors = {
  success: 'bg-green-100 text-green-600',
  info: 'bg-blue-100 text-blue-600',
  warning: 'bg-yellow-100 text-yellow-600',
  error: 'bg-red-100 text-red-600',
}

export default function NotificationsPage() {
  const user = CURRENT_USER
  const notifications = MOCK_NOTIFICATIONS
  const unread = notifications.filter((n) => !n.read).length

  return (
    <AppShell user={user} title="Notifications" breadcrumb={['Mon espace', 'Notifications']} notificationCount={unread}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">{unread} notification(s) non lue(s)</p>
          <button className="text-sm text-brand-600 hover:underline">Tout marquer comme lu</button>
        </div>

        <div className="space-y-3">
          {notifications.map((notif) => {
            const Icon = icons[notif.type]
            return (
              <div key={notif.id} className={clsx(
                'card p-5 flex items-start gap-4 transition-all',
                !notif.read && 'ring-1 ring-brand-200 bg-brand-50/30'
              )}>
                <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', colors[notif.type])}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold text-sm text-gray-900">{notif.title}</p>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDateTime(notif.createdAt)}</p>
                </div>
              </div>
            )
          })}
        </div>

        {notifications.length === 0 && (
          <div className="card p-16 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-medium text-gray-500">Aucune notification</p>
          </div>
        )}
      </div>
    </AppShell>
  )
}
