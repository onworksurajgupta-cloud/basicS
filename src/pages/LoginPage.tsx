import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  GraduationCap,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { BUTTON_STYLES } from '../theme/tokens'

export function LoginPage() {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [submittedAttempt, setSubmittedAttempt] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedAttempt(true)
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-navy to-navy-light dark:from-navy-card dark:to-teal-dark border border-teal/40 flex items-center justify-center text-teal-light shadow-md shadow-teal/15 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 text-teal" />
            </div>
            <span className="text-2xl font-black text-navy dark:text-canvas">
              basic<span className="text-teal">S</span>
              <span className="w-2 h-2 rounded-full bg-gold ml-0.5 inline-block" />
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-navy dark:text-canvas tracking-tight">
            Student Portal Login
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Access your subjects, practice worksheets, and exam transcripts.
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-navy border border-slate-200/90 dark:border-navy-light/60 shadow-xl space-y-6">
          {/* Security Notice Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>Security Protocol Notice:</strong> This is a secure login layout. Backend authentication and database account verification will be connected in Phase 2.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student ID / Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Student ID or Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. ME-2026-084 or student@basics.edu"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-canvas dark:bg-navy-card/60 border border-slate-300 dark:border-navy-light text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password recovery flow will connect with student email in Phase 2.')}
                  className="text-xs font-semibold text-teal hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-canvas dark:bg-navy-card/60 border border-slate-300 dark:border-navy-light text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-teal rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                Remember my login credentials on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`${BUTTON_STYLES.primary} w-full py-3.5 text-sm font-bold gap-2`}
            >
              <span>Sign In to Student Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Submitted Demonstration Alert */}
          {submittedAttempt && (
            <div className="p-4 rounded-2xl bg-teal/10 border border-teal/30 text-xs text-teal-dark dark:text-teal-light space-y-1 animate-in fade-in duration-200">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Interface Validated Successfully</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                You entered credentials for <strong>{studentId}</strong>. As specified, fake logins are disabled; the live backend database authentication service will connect in Phase 2.
              </p>
            </div>
          )}

          {/* Institutional SSO */}
          <div className="pt-4 border-t border-slate-200 dark:border-navy-light/40 text-center space-y-3">
            <span className="text-xs text-slate-400">Or continue with institutional authentication</span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert('Google Workspace academic SSO connects in Phase 2.')}
                className={`${BUTTON_STYLES.secondary} py-2.5 text-xs font-bold`}
              >
                Google SSO
              </button>
              <button
                type="button"
                onClick={() => alert('University SAML/Shibboleth SSO connects in Phase 2.')}
                className={`${BUTTON_STYLES.secondary} py-2.5 text-xs font-bold`}
              >
                University ID
              </button>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link to="/" className="text-xs font-bold text-teal hover:underline">
            &larr; Return to basicS Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
