import { useState, type ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { TopNavbar } from './TopNavbar'
import { RightPanel } from './RightPanel'
import { useDashboard } from '../../context/DashboardContext'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarCollapsed } = useDashboard()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [mobileRightPanelOpen, setMobileRightPanelOpen] = useState(false)

  return (
    <div className="min-h-screen bg-canvas dark:bg-navy-dark text-navy dark:text-canvas transition-colors">
      {/* Left Vertical Navigation Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Center Column Wrapper with spacious breathing room */}
      <div
        className={`transition-all duration-300 min-h-screen flex flex-col ${
          sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Search & Profile Bar */}
        <TopNavbar
          onToggleSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          onToggleRightPanel={() => setMobileRightPanelOpen((prev) => !prev)}
        />

        {/* Center Main Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>

        {/* Subtle Dashboard Footer */}
        <footer className="py-5 px-6 border-t border-slate-200/50 dark:border-navy-light/20 text-center text-xs text-slate-400">
          <p>
            basic<span className="text-teal font-bold">S</span> LMS • Learn. Practice. Perform. • Demo Mode Active
          </p>
        </footer>
      </div>

      {/* Slide-over Calendar & Schedule Drawer */}
      <RightPanel
        mobileOpen={mobileRightPanelOpen}
        onCloseMobile={() => setMobileRightPanelOpen(false)}
      />
    </div>
  )
}
