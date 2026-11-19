import { useState } from 'react'
import {
  Bell,
  Video,
  FileCheck2,
  FileText,
  Clock,
  Check,
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'

export function NotificationsPage() {
  const { notifications, markNotificationsAsRead } = useDashboard()
  const [filter, setFilter] = useState<'all' | 'class' | 'test' | 'assignment'>('all')

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'all') return true
    return n.type === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'class':
        return <Video className="w-4 h-4 text-teal" />
      case 'test':
        return <FileCheck2 className="w-4 h-4 text-gold" />
      case 'assignment':
        return <FileText className="w-4 h-4 text-blue-500" />
      default:
        return <Bell className="w-4 h-4 text-slate-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-navy-light/40">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-canvas flex items-center gap-2">
            <Bell className="w-6 h-6 text-teal" />
            Notifications &amp; Activity Feed
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time alerts for live classes, diagnostic evaluation results, and coursework deadlines.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markNotificationsAsRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal text-white hover:bg-teal-dark text-xs font-bold transition-colors cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" /> Mark All as Read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
        {(['all', 'class', 'test', 'assignment'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
              filter === tab
                ? 'bg-teal text-white'
                : 'bg-white dark:bg-navy border border-slate-200 dark:border-navy-light text-slate-600 dark:text-slate-300 hover:border-teal'
            }`}
          >
            {tab === 'all' ? 'All Alerts' : tab}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 divide-y divide-slate-100 dark:divide-navy-light/20 shadow-xs overflow-hidden">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                notif.read ? 'bg-transparent' : 'bg-teal/5 dark:bg-teal/10'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-navy-dark border border-slate-200 dark:border-navy-light/40 flex items-center justify-center shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-navy dark:text-canvas truncate">
                    {notif.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {notif.time}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-teal shrink-0 mt-2" title="Unread" />
              )}
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-slate-400 text-xs">
            No notifications in this category.
          </div>
        )}
      </div>
    </div>
  )
}
