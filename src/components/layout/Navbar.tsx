import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  GraduationCap,
  Sun,
  Moon,
  Menu,
  X,
  User,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { BUTTON_STYLES } from '../../theme/tokens'

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Online Class', path: '/online-class' },
    { name: 'Take Tests', path: '/take-tests' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-navy/95 backdrop-blur-md border-b border-slate-200 dark:border-navy-light/60 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-navy dark:bg-navy-card border border-teal/40 flex items-center justify-center text-teal shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-navy dark:text-canvas">
              basic<span className="text-teal">S</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block ml-0.5" />
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs sm:text-sm font-semibold">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    active
                      ? 'text-teal font-bold bg-teal/10'
                      : 'text-slate-600 dark:text-slate-300 hover:text-teal hover:bg-slate-100 dark:hover:bg-navy-card'
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Right Controls */}
          <div className="hidden md:flex items-center space-x-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              className={BUTTON_STYLES.icon}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-gold" />
              ) : (
                <Moon className="w-4 h-4 text-navy" />
              )}
            </button>

            <Link
              to="/login"
              className={`${BUTTON_STYLES.primary} px-4 py-2 text-xs gap-1.5 font-semibold`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Student Login</span>
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center space-x-1.5 md:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className={BUTTON_STYLES.icon}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4 text-navy" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-card focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-navy-light/60 bg-white dark:bg-navy px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive(link.path)
                  ? 'text-teal bg-teal/10 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-card'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className={`${BUTTON_STYLES.primary} w-full py-2 text-xs font-semibold block text-center`}
            >
              Student Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
