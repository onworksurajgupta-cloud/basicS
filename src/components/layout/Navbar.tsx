import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  GraduationCap,
  Sun,
  Moon,
  Menu,
  X,
  User,
  BookOpen,
  Video,
  FileCheck2,
  Mail,
  Home as HomeIcon,
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { BUTTON_STYLES } from '../../theme/tokens'

export function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Online Class', path: '/online-class', icon: Video, badge: 'Live' },
    { name: 'Take Tests', path: '/take-tests', icon: FileCheck2 },
    { name: 'Contact', path: '/contact', icon: Mail },
  ]

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-navy/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-navy-light/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-navy to-navy-light dark:from-navy-card dark:to-teal-dark border border-teal/40 flex items-center justify-center text-teal-light shadow-md shadow-teal/15 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-teal" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-navy dark:text-canvas flex items-baseline">
                basic<span className="text-teal">S</span>
                <span className="w-2 h-2 rounded-full bg-gold ml-0.5 animate-pulse" />
              </span>
              <span className="text-[10px] tracking-wider uppercase font-extrabold text-slate-500 dark:text-slate-400">
                Engineering LMS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-bold text-sm">
            {navLinks.map((link) => {
              const active = isActive(link.path)
              const Icon = link.icon
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                    active
                      ? 'text-teal dark:text-teal-light bg-teal/10 dark:bg-teal/15'
                      : 'text-navy/80 dark:text-canvas/80 hover:text-teal dark:hover:text-teal-light hover:bg-slate-100 dark:hover:bg-navy-light/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white animate-pulse">
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-teal rounded-full" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Right Side Actions: Theme Toggle & Student Login */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Working Theme Switcher Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={BUTTON_STYLES.icon}
              aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
              title={`Currently in ${isDark ? 'Dark' : 'Light'} Mode. Click to toggle.`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gold animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-5 h-5 text-navy animate-in spin-in-180 duration-300" />
              )}
            </button>

            {/* Student Login Button */}
            <Link
              to="/login"
              className={`${BUTTON_STYLES.primary} px-5 py-2.5 text-sm gap-2`}
            >
              <User className="w-4 h-4" />
              <span>Student Login</span>
            </Link>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              className={BUTTON_STYLES.icon}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-navy" />}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-navy dark:text-canvas hover:bg-slate-200/50 dark:hover:bg-navy-light/50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-navy-light/60 bg-white/95 dark:bg-navy/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {navLinks.map((link) => {
            const active = isActive(link.path)
            const Icon = link.icon
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all ${
                  active
                    ? 'text-teal dark:text-teal-light bg-teal/10 dark:bg-teal/20'
                    : 'text-navy dark:text-canvas hover:bg-slate-100 dark:hover:bg-navy-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-teal" />
                  <span>{link.name}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            )
          })}

          <div className="pt-4 border-t border-slate-200 dark:border-navy-light/40">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className={`${BUTTON_STYLES.primary} w-full py-3 text-sm gap-2 font-bold`}
            >
              <User className="w-4 h-4" />
              <span>Student Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
