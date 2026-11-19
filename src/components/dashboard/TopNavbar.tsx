import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  Calendar as CalendarIcon,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react'
import { useDashboard } from '../../context/DashboardContext'
import { useTheme } from '../../context/ThemeContext'
import { BUTTON_STYLES } from '../../theme/tokens'

interface TopNavbarProps {
  onToggleSidebar: () => void
  onToggleRightPanel: () => void
}

export function TopNavbar({ onToggleSidebar, onToggleRightPanel }: TopNavbarProps) {
  const {
    role,
    setRole,
    user,
    notifications,
    markNotificationsAsRead,
    searchQuery,
    setSearchQuery,
  } = useDashboard()
  const { isDark, toggleTheme } = useTheme()

  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-navy/90 backdrop-blur-md border-b border-slate-200 dark:border-navy-light/60 px-4 sm:px-6 flex items-center justify-between gap-4 transition-colors">
      {/* Left: Mobile Sidebar Trigger + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-card lg:hidden"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder={`Search ${role === 'admin' ? 'students, courses, tests...' : 'subjects, lectures, notes...'}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-navy-card border border-slate-200 dark:border-navy-light/50 text-xs sm:text-sm text-navy dark:text-canvas placeholder-slate-400 focus:outline-none focus:border-teal transition-all"
          />
        </div>
      </div>

      {/* Right Controls: Role Switcher, Theme, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Role Switcher Pill */}
        <div className="hidden sm:inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-navy-card border border-slate-200 dark:border-navy-light/60">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              role === 'student'
                ? 'bg-teal text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-canvas'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
              role === 'admin'
                ? 'bg-navy dark:bg-navy-light text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-canvas'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Theme Switcher */}
        <button
          type="button"
          onClick={toggleTheme}
          className={BUTTON_STYLES.icon}
          aria-label="Toggle theme"
          title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        >
          {isDark ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-navy" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg border border-slate-200 dark:border-navy-light text-slate-600 dark:text-slate-300 hover:border-teal hover:text-teal transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/70 shadow-2xl z-50 p-4 space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-navy-light/40">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy dark:text-canvas">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-teal/10 text-teal">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markNotificationsAsRead}
                    className="text-[11px] font-semibold text-teal hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-2.5 rounded-xl border text-xs transition-colors ${
                      notif.read
                        ? 'bg-slate-50 dark:bg-navy-card/40 border-slate-100 dark:border-navy-light/30 text-slate-500'
                        : 'bg-teal/5 dark:bg-teal/10 border-teal/20 text-navy dark:text-canvas font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{notif.title}</span>
                      <span className="text-[10px] text-slate-400">{notif.time}</span>
                    </div>
                    <p className="mt-1 text-[11px] leading-relaxed">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Schedule Drawer Trigger */}
        <button
          type="button"
          onClick={onToggleRightPanel}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-light text-slate-700 dark:text-slate-200 hover:border-teal hover:text-teal transition-all text-xs font-semibold cursor-pointer"
          aria-label="Toggle calendar and schedule drawer"
          title="Open quick calendar & schedule"
        >
          <CalendarIcon className="w-3.5 h-3.5 text-teal" />
          <span className="hidden sm:inline">Schedule</span>
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 pl-2 rounded-xl border border-slate-200 dark:border-navy-light hover:border-teal transition-all cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-teal text-white flex items-center justify-center font-bold text-xs">
              {user.avatar}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-navy dark:text-canvas leading-none">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-400 capitalize mt-0.5">
                {user.role}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/70 shadow-2xl z-50 p-2 space-y-1 animate-in fade-in duration-150">
              <div className="p-3 border-b border-slate-100 dark:border-navy-light/40">
                <div className="text-xs font-bold text-navy dark:text-canvas">{user.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                <div className="mt-1.5 inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-teal/10 text-teal">
                  {role === 'admin' ? 'Academic Director' : 'Engineering Student'}
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setRole(role === 'admin' ? 'student' : 'admin')
                    setProfileOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-card flex items-center justify-between"
                >
                  <span>Switch Role</span>
                  <span className="text-teal font-bold capitalize">
                    {role === 'admin' ? 'To Student' : 'To Admin'}
                  </span>
                </button>

                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-card flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Profile &amp; Settings</span>
                </Link>

                <Link
                  to="/login"
                  onClick={() => setProfileOpen(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
