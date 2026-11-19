import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type {
  UserRole,
  UserProfile,
  CalendarEventItem,
  NotificationItem,
} from '../types/dashboard'
import { INITIAL_CALENDAR_EVENTS } from '../data/eventsData'

interface DashboardContextType {
  role: UserRole
  setRole: (role: UserRole) => void
  user: UserProfile
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  selectedDate: string
  setSelectedDate: (date: string) => void
  events: CalendarEventItem[]
  addEvent: (event: Omit<CalendarEventItem, 'id'>) => void
  updateEvent: (id: string, updated: Partial<CalendarEventItem>) => void
  deleteEvent: (id: string) => void
  toggleTaskComplete: (id: string) => void
  notifications: NotificationItem[]
  markNotificationsAsRead: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const ADMIN_USER: UserProfile = {
  id: 'usr-admin',
  name: 'Suraj',
  email: 'suraj@basics-lms.edu',
  role: 'admin',
  avatar: 'SG',
  title: 'Lead Academic Director',
  institution: 'basicS Academic Institute',
}

const STUDENT_USER: UserProfile = {
  id: 'usr-student',
  name: 'Alex Mercer',
  email: 'alex.mercer@basics.edu',
  role: 'student',
  avatar: 'AM',
  title: 'Mechanical Engineering Student',
  studentId: 'ME-2026-084',
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Live Class Starting Soon',
    message: 'Mohr’s Circle Construction Live Workshop starts at 5:00 PM on Google Meet.',
    time: '15m ago',
    read: false,
    type: 'class',
  },
  {
    id: 'notif-2',
    title: 'New Test Result Available',
    message: 'Stress & Failure Diagnostic Exam evaluated. Score: 45 / 50 (90%).',
    time: '2h ago',
    read: false,
    type: 'test',
  },
  {
    id: 'notif-3',
    title: 'Assignment Reminder',
    message: 'Mohr’s Circle Plotting assignment is due on Nov 22 at 11:59 PM.',
    time: '1d ago',
    read: true,
    type: 'assignment',
  },
]

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

const getTodayString = () => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('student')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>(getTodayString)
  const [events, setEvents] = useState<CalendarEventItem[]>(() => {
    try {
      const saved = localStorage.getItem('basics_calendar_events')
      if (saved) return JSON.parse(saved)
    } catch (err) {
      console.error('Failed to load events from localStorage', err)
    }
    return INITIAL_CALENDAR_EVENTS
  })
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS)
  const [searchQuery, setSearchQuery] = useState('')

  // Sync events to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('basics_calendar_events', JSON.stringify(events))
    } catch (err) {
      console.error('Failed to persist events to localStorage', err)
    }
  }, [events])

  const user = role === 'admin' ? ADMIN_USER : STUDENT_USER

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole)
  }

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev)
  }

  const addEvent = (eventData: Omit<CalendarEventItem, 'id'>) => {
    const newEvent: CalendarEventItem = {
      ...eventData,
      id: `evt-${Date.now()}`,
    }
    setEvents((prev) => [newEvent, ...prev])
  }

  const updateEvent = (id: string, updated: Partial<CalendarEventItem>) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updated } : e))
    )
  }

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  const toggleTaskComplete = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    )
  }

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  return (
    <DashboardContext.Provider
      value={{
        role,
        setRole,
        user,
        sidebarCollapsed,
        toggleSidebar,
        selectedDate,
        setSelectedDate,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        toggleTaskComplete,
        notifications,
        markNotificationsAsRead,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider')
  }
  return context
}
