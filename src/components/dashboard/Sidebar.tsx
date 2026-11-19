import { Link, useLocation } from 'react-router-dom'
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  FileCheck2,
  FileText,
  Award,
  Calendar,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react'
import { useDashboard } from '../../context/DashboardContext'

interface SidebarProps {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const { role, setRole, user, sidebarCollapsed, toggleSidebar } = useDashboard()
  const location = useLocation()

  // Links based on exact specification
  const adminLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Courses', path: '/courses', icon: BookOpen },
    { name: 'Online Classes', path: '/online-class', icon: Video, badge: 'Live' },
    { name: 'Tests', path: '/take-tests', icon: FileCheck2 },
    { name: 'Assignments', path: '/assignments', icon: FileText },
    { name: 'Study Materials', path: '/study-materials', icon: Award },
    { name: 'Results', path: '/results', icon: Award },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
  ]

  const studentLinks = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'My Courses', path: '/courses', icon: BookOpen },
    { name: 'Study Materials', path: '/study-materials', icon: Award },
    { name: 'Online Classes', path: '/online-class', icon: Video, badge: 'Live' },
    { name: 'Take Tests', path: '/take-tests', icon: FileCheck2 },
    { name: 'Assignments', path: '/assignments', icon: FileText },
    { name: 'My Results', path: '/results', icon: Award },
    { name: 'Calendar', path: '/calendar', icon: Calendar },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'My Profile', path: '/settings', icon: User },
  ]

  const links = role === 'admin' ? adminLinks : studentLinks

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 lg:z-20 bg-white dark:bg-navy border-r border-slate-200 dark:border-navy-light/60 transition-all duration-300 flex flex-col justify-between ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top Header & Branding */}
        <div>
          <div className="h-20 flex items-center justify-between px-5 border-b border-slate-100 dark:border-navy-light/40">
            <Link
              to="/"
              onClick={onCloseMobile}
              className="flex items-center gap-3 overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-navy to-navy-light dark:from-navy-card dark:to-teal-dark border border-teal/40 flex items-center justify-center text-teal-light shadow-md shadow-teal/15 shrink-0">
                <GraduationCap className="w-6 h-6 text-teal" />
              </div>

              {!sidebarCollapsed && (
                <div className="flex flex-col">
                  <div className="text-xl font-black tracking-tight text-navy dark:text-canvas flex items-baseline">
                    basic<span className="text-teal">S</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold ml-0.5 inline-block" />
                  </div>
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Learn. Practice. Perform.
                  </span>
                </div>
              )}
            </Link>

            {/* Collapse toggle button on desktop */}
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden lg:flex w-7 h-7 rounded-lg border border-slate-200 dark:border-navy-light items-center justify-center text-slate-400 hover:text-teal transition-colors"
              aria-label="Toggle sidebar collapse"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Role Indicator Banner */}
          {!sidebarCollapsed && (
            <div className="mx-4 mt-4 p-2.5 rounded-xl bg-slate-50 dark:bg-navy-card/50 border border-slate-200/80 dark:border-navy-light/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${role === 'admin' ? 'bg-gold' : 'bg-teal'}`} />
                <span className="text-xs font-bold text-navy dark:text-canvas capitalize">
                  {role} Portal
                </span>
              </div>
              <button
                type="button"
                onClick={() => setRole(role === 'admin' ? 'student' : 'admin')}
                className="text-[10px] font-bold text-teal hover:underline cursor-pointer"
              >
                Switch to {role === 'admin' ? 'Student' : 'Admin'}
              </button>
            </div>
          )}

          {/* Navigation Links List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
            {links.map((link) => {
              const active = isActive(link.path)
              const Icon = link.icon

              return (
                <Link
                  key={link.path + link.name}
                  to={link.path}
                  onClick={onCloseMobile}
                  title={sidebarCollapsed ? link.name : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    active
                      ? 'bg-teal text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-card/80 hover:text-navy dark:hover:text-canvas'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="flex-1 truncate">{link.name}</span>
                  )}
                  {!sidebarCollapsed && link.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-rose-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom User Area & Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-navy-light/40 space-y-2">
          {!sidebarCollapsed ? (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-card/60 border border-slate-200 dark:border-navy-light/40 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-teal text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {user.avatar}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-navy dark:text-canvas truncate">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-400 capitalize truncate">
                    {user.role} &bull; {user.title}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-lg bg-teal text-white flex items-center justify-center font-bold text-xs">
              {user.avatar}
            </div>
          )}

          <Link
            to="/login"
            onClick={onCloseMobile}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors ${
              sidebarCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </Link>
        </div>
      </aside>
    </>
  )
}
