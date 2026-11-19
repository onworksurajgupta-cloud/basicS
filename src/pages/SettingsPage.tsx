import { useState } from 'react'
import {
  Settings,
  User,
  Moon,
  Sun,
  Database,
  CheckCircle2,
  Key,
  Layers,
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import { useTheme } from '../context/ThemeContext'
import { databaseStatus } from '../services/supabaseClient'

export function SettingsPage() {
  const { role, setRole, user } = useDashboard()
  const { isDark, toggleTheme } = useTheme()

  const [savedSuccess, setSavedSuccess] = useState(false)
  const [profileName, setProfileName] = useState(user.name)
  const [profileEmail, setProfileEmail] = useState(user.email)

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => {
      setSavedSuccess(false)
    }, 2500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-navy-light/40">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-canvas flex items-center gap-2">
            <Settings className="w-6 h-6 text-teal" />
            Platform &amp; Profile Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your user credentials, view theme preferences, and inspect backend Supabase integration status.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal/15 text-teal text-xs font-bold border border-teal/30">
            <CheckCircle2 className="w-4 h-4" /> Preferences updated successfully!
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Profile & Preferences */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile Card */}
          <div className="p-6 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/40">
              <h2 className="text-sm font-bold text-navy dark:text-canvas uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-teal" /> Profile Information
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal/10 text-teal border border-teal/20">
                {role === 'admin' ? 'Academic Director' : 'Engineering Student'}
              </span>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-teal/15 text-teal font-extrabold text-xl flex items-center justify-center border border-teal/30 shrink-0">
                  {user.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-navy dark:text-canvas">{user.name}</div>
                  <div className="text-xs text-slate-400">{user.email}</div>
                  <div className="text-[11px] text-teal mt-0.5">{user.title}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              {role === 'student' && user.studentId && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Student Roll Number
                  </label>
                  <input
                    type="text"
                    disabled
                    value={user.studentId}
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-navy-card rounded-lg border border-slate-200 dark:border-navy-light text-xs text-slate-400 font-mono cursor-not-allowed"
                  />
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal text-white text-xs font-bold hover:bg-teal-dark transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>

          {/* Role & Interface Preferences */}
          <div className="p-6 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 space-y-5 shadow-xs">
            <h2 className="text-sm font-bold text-navy dark:text-canvas uppercase tracking-wider pb-3 border-b border-slate-100 dark:border-navy-light/40">
              Role &amp; Theme Controls
            </h2>

            <div className="space-y-4">
              {/* Role Switcher */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-navy-light/40 bg-slate-50/50 dark:bg-navy-dark/40">
                <div>
                  <div className="text-xs font-bold text-navy dark:text-canvas">
                    Active Portal Role
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Switch between Academic Director (Admin) and Engineering Scholar (Student)
                  </div>
                </div>

                <div className="flex items-center bg-white dark:bg-navy p-1 rounded-lg border border-slate-200 dark:border-navy-light shrink-0">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      role === 'student'
                        ? 'bg-teal text-white shadow-xs'
                        : 'text-slate-500 hover:text-navy dark:hover:text-canvas'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('admin')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer ${
                      role === 'admin'
                        ? 'bg-teal text-white shadow-xs'
                        : 'text-slate-500 hover:text-navy dark:hover:text-canvas'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-navy-light/40 bg-slate-50/50 dark:bg-navy-dark/40">
                <div>
                  <div className="text-xs font-bold text-navy dark:text-canvas">
                    Visual Appearance
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Currently using {isDark ? 'Dark Mode' : 'Light Mode'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-light bg-white dark:bg-navy text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2 hover:border-teal cursor-pointer"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-gold" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-teal" /> Dark Mode
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Supabase Backend Integration Readiness */}
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/40">
              <h2 className="text-sm font-bold text-navy dark:text-canvas uppercase tracking-wider flex items-center gap-2">
                <Database className="w-4 h-4 text-teal" /> Supabase Readiness
              </h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  databaseStatus.isConnected
                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                    : 'bg-gold/10 text-gold-dark dark:text-gold-light border border-gold/20'
                }`}
              >
                {databaseStatus.isConnected ? 'Connected' : 'Demo Active'}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-dark border border-slate-200/60 dark:border-navy-light/30">
                <div className="font-bold text-navy dark:text-canvas">Current Backend Provider:</div>
                <div className="text-teal font-mono mt-0.5">{databaseStatus.provider}</div>
              </div>

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-[11px]">
                {databaseStatus.notice}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-navy-light/30 space-y-2">
                <div className="font-bold text-navy dark:text-canvas flex items-center gap-1.5 text-xs">
                  <Key className="w-3.5 h-3.5 text-teal" /> How to Connect Supabase:
                </div>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <li>Create a project on Supabase.com</li>
                  <li>Copy your Project URL &amp; Public Anon Key</li>
                  <li>Add them to your <code className="text-teal font-mono">.env</code> file:</li>
                </ol>

                <div className="p-2.5 rounded-lg bg-navy text-teal-light font-mono text-[10px] overflow-x-auto space-y-1">
                  <div>VITE_SUPABASE_URL=https://xyz.supabase.co</div>
                  <div>VITE_SUPABASE_ANON_KEY=eyJhbGciOi...</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-navy-light/30">
                <div className="font-bold text-navy dark:text-canvas flex items-center gap-1.5 text-xs mb-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal" /> Schema Entities Prepared:
                </div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {['students', 'courses', 'modules', 'assignments', 'test_results', 'calendar_events'].map(
                    (tbl) => (
                      <span
                        key={tbl}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-dark text-slate-600 dark:text-slate-300 font-mono"
                      >
                        {tbl}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
