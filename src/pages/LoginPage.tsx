import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { BUTTON_STYLES } from '../theme/tokens'

export function LoginPage() {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-navy dark:text-canvas">Student Login</h1>
        <p className="text-xs text-slate-500">
          Enter your Student ID or email to access your learning portal.
        </p>
      </div>

      <div className="p-6 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Student ID or Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                placeholder="student@basics.edu"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-slate-50 dark:bg-navy border border-slate-300 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => alert('Password recovery will connect with student email in Phase 2.')}
                className="text-xs text-teal hover:underline cursor-pointer"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 rounded-lg bg-slate-50 dark:bg-navy border border-slate-300 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-3.5 h-3.5 accent-teal rounded cursor-pointer"
            />
            <label htmlFor="remember" className="ml-2 text-xs text-slate-500 cursor-pointer">
              Remember me
            </label>
          </div>

          <p className="text-[11px] text-slate-400">
            Note: Secure interface prototype. Backend student database authentication connects in Phase 2.
          </p>

          <button
            type="submit"
            className={`${BUTTON_STYLES.primary} w-full py-2.5 text-xs font-semibold`}
          >
            Sign In
          </button>
        </form>

        {submitted && (
          <div className="p-3 rounded-lg bg-teal/10 text-xs text-teal-dark dark:text-teal-light">
            Form submitted for <strong>{studentId}</strong>. Backend authentication connects in Phase 2.
          </div>
        )}
      </div>

      <div className="text-center">
        <Link to="/" className="text-xs text-teal hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  )
}
