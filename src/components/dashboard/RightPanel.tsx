import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  Calendar as CalendarIcon,
  X,
  Trash2,
  Square,
  CheckSquare,
} from 'lucide-react'
import { useDashboard } from '../../context/DashboardContext'
import { BUTTON_STYLES } from '../../theme/tokens'
import { ANNOUNCEMENTS } from '../../data/announcements'
import type { CalendarEventItem } from '../../types/dashboard'

interface RightPanelProps {
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function RightPanel({ mobileOpen, onCloseMobile }: RightPanelProps) {
  const {
    selectedDate,
    setSelectedDate,
    events,
    addEvent,
    deleteEvent,
    toggleTaskComplete,
  } = useDashboard()

  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date())
  const [showAddEventModal, setShowAddEventModal] = useState(false)

  // New event form state
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState(selectedDate)
  const [newTime, setNewTime] = useState('5:00 PM – 6:00 PM')
  const [newType, setNewType] = useState<CalendarEventItem['type']>('task')
  const [newSubjectCode, setNewSubjectCode] = useState('General')

  const year = currentMonthDate.getFullYear()
  const month = currentMonthDate.getMonth()

  // Month navigation
  const prevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1))
  }

  // Days in month calculation
  const firstDayIndex = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' })

  // Format date helper
  const formatDateString = (day: number) => {
    const mm = String(month + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `${year}-${mm}-${dd}`
  }

  // Filter events for selected date
  const eventsForSelectedDate = events.filter((e) => e.date === selectedDate)

  // Filter upcoming classes and tests
  const upcomingClasses = events.filter((e) => e.type === 'class')
  const upcomingTests = events.filter((e) => e.type === 'test')
  const assignmentDeadlines = events.filter((e) => e.type === 'assignment')

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    addEvent({
      title: newTitle,
      date: newDate,
      time: newTime,
      type: newType,
      subjectCode: newSubjectCode,
      locationOrUrl: newType === 'class' ? 'https://meet.google.com/bsc-live' : undefined,
    })

    setNewTitle('')
    setShowAddEventModal(false)
  }

  return (
    <>
      {/* Slide-over Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-xs transition-opacity cursor-pointer"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Right Panel Drawer */}
      <aside
        className={`fixed top-0 bottom-0 right-0 z-50 w-80 sm:w-96 bg-white dark:bg-navy border-l border-slate-200 dark:border-navy-light/60 transition-transform duration-300 overflow-y-auto p-5 space-y-6 shadow-2xl ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/40">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-teal" />
            <span className="text-sm font-bold text-navy dark:text-canvas">
              Calendar &amp; Schedule
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              to="/calendar"
              className="text-[11px] font-bold text-teal hover:underline mr-1"
              title="Open Full Real-Time Calendar"
            >
              Full Arena &rarr;
            </Link>

            <button
              type="button"
              onClick={() => {
                setNewDate(selectedDate)
                setShowAddEventModal(true)
              }}
              className="p-1.5 rounded-lg bg-teal text-white hover:bg-teal-dark transition-colors cursor-pointer"
              title="Add Scheduled Event or Task"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-canvas cursor-pointer"
              title="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= INTERACTIVE CALENDAR ================= */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-card/60 border border-slate-200/80 dark:border-navy-light/40 space-y-3">
          {/* Month & View Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-navy dark:text-canvas">
                {monthName} {year}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded text-slate-500 hover:bg-white dark:hover:bg-navy transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded text-slate-500 hover:bg-white dark:hover:bg-navy transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Blank leading days */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-7" />
            ))}

            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const dateStr = formatDateString(day)
              const nowObj = new Date()
              const todayStr = `${nowObj.getFullYear()}-${String(nowObj.getMonth() + 1).padStart(2, '0')}-${String(
                nowObj.getDate()
              ).padStart(2, '0')}`
              const isToday = dateStr === todayStr
              const isSelected = dateStr === selectedDate
              const dayEvents = events.filter((e) => e.date === dateStr)
              const hasClass = dayEvents.some((e) => e.type === 'class')
              const hasTest = dayEvents.some((e) => e.type === 'test')
              const hasAssignment = dayEvents.some((e) => e.type === 'assignment')
              const hasTask = dayEvents.some((e) => e.type === 'task')

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-7 w-7 mx-auto rounded-lg font-semibold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal text-white shadow-xs font-bold'
                      : isToday
                      ? 'border border-teal text-teal dark:text-teal-light font-bold bg-teal/10'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-navy'
                  }`}
                >
                  <span className="text-[11px] leading-none">{day}</span>
                  {/* Event indicator dots */}
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {hasClass && <span className="w-1 h-1 rounded-full bg-teal shrink-0" />}
                      {hasTest && <span className="w-1 h-1 rounded-full bg-gold shrink-0" />}
                      {hasAssignment && <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />}
                      {hasTask && <span className="w-1 h-1 rounded-full bg-purple-500 shrink-0" />}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Activities on Selected Date */}
          <div className="pt-2 border-t border-slate-200/60 dark:border-navy-light/30 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
              <span>Selected: {selectedDate}</span>
              <span className="text-teal">{eventsForSelectedDate.length} Event(s)</span>
            </div>

            {eventsForSelectedDate.length > 0 ? (
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {eventsForSelectedDate.map((evt) => (
                  <div
                    key={evt.id}
                    className={`p-2 rounded-lg bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/40 text-xs flex items-center justify-between gap-2 ${
                      evt.completed ? 'opacity-60 line-through' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden min-w-0">
                      <button
                        type="button"
                        onClick={() => toggleTaskComplete(evt.id)}
                        className="text-slate-400 hover:text-teal shrink-0 cursor-pointer"
                        title={evt.completed ? 'Mark pending' : 'Mark completed'}
                      >
                        {evt.completed ? (
                          <CheckSquare className="w-3.5 h-3.5 text-teal" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <div className="overflow-hidden">
                        <div className="font-bold text-navy dark:text-canvas truncate">
                          {evt.title}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {evt.time} {evt.subjectCode ? `• ${evt.subjectCode}` : ''}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteEvent(evt.id)}
                      className="text-slate-400 hover:text-rose-500 p-1 shrink-0 cursor-pointer"
                      title="Delete event"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400 italic">No events scheduled for this date.</p>
            )}
          </div>
        </div>

        {/* ================= UPCOMING LIVE CLASSES ================= */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy dark:text-canvas">Upcoming Classes</span>
            <Link to="/online-class" className="text-[11px] font-semibold text-teal hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            {upcomingClasses.slice(0, 2).map((cls) => (
              <div
                key={cls.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-navy-card/50 border border-slate-200/80 dark:border-navy-light/40 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-teal">{cls.subjectCode}</span>
                  <span className="text-[10px] text-slate-400">{cls.date}</span>
                </div>
                <div className="font-bold text-navy dark:text-canvas leading-snug">
                  {cls.title}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>{cls.time}</span>
                  {cls.locationOrUrl && (
                    <a
                      href={cls.locationOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <Video className="w-3 h-3" />
                      <span>Join Meet</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= UPCOMING TESTS ================= */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy dark:text-canvas">Scheduled Tests</span>
            <Link to="/take-tests" className="text-[11px] font-semibold text-teal hover:underline">
              All Tests &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            {upcomingTests.slice(0, 2).map((test) => (
              <div
                key={test.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-navy-card/50 border border-slate-200/80 dark:border-navy-light/40 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gold">{test.subjectCode}</span>
                  <span className="text-[10px] text-slate-400">{test.date}</span>
                </div>
                <div className="font-bold text-navy dark:text-canvas leading-snug">
                  {test.title}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>{test.time}</span>
                  <Link to="/take-tests" className="text-teal font-bold hover:underline">
                    Prepare &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ASSIGNMENT DEADLINES ================= */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy dark:text-canvas">Assignment Deadlines</span>
            <Link to="/assignments" className="text-[11px] font-semibold text-teal hover:underline">
              View All &rarr;
            </Link>
          </div>

          <div className="space-y-2">
            {assignmentDeadlines.slice(0, 2).map((asg) => (
              <div
                key={asg.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-navy-card/50 border border-slate-200/80 dark:border-navy-light/40 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-teal">{asg.subjectCode}</span>
                  <span className="text-[10px] text-rose-500 font-bold">Due {asg.date}</span>
                </div>
                <div className="font-bold text-navy dark:text-canvas truncate">
                  {asg.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ANNOUNCEMENTS ================= */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-navy dark:text-canvas">Announcements</span>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/5 dark:bg-navy-card/50 border border-gold/30 text-xs space-y-1">
            <div className="font-bold text-navy dark:text-canvas">
              {ANNOUNCEMENTS[0].title}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {ANNOUNCEMENTS[0].summary}
            </p>
          </div>
        </div>
      </aside>

      {/* ================= ADMIN ADD EVENT MODAL ================= */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-navy-light/40">
              <span className="text-sm font-bold text-navy dark:text-canvas">
                Add Calendar Event
              </span>
              <button
                type="button"
                onClick={() => setShowAddEventModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SDOF Vibration Problem Solving"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-50 dark:bg-navy-card border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Event Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2 rounded-lg bg-slate-50 dark:bg-navy-card border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  >
                    <option value="task">Task / To-Do</option>
                    <option value="class">Live Class</option>
                    <option value="test">Exam / Test</option>
                    <option value="assignment">Assignment</option>
                    <option value="meeting">Meeting</option>
                    <option value="reminder">Reminder</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Subject Tag
                  </label>
                  <select
                    value={newSubjectCode}
                    onChange={(e) => setNewSubjectCode(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-50 dark:bg-navy-card border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  >
                    <option value="General">General / Personal</option>
                    <option value="ME-201">ME-201 (Solids)</option>
                    <option value="ME-305">ME-305 (Vibration)</option>
                    <option value="ME-402">ME-402 (FEA)</option>
                    <option value="ME-101">ME-101 (BME)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Date (YYYY-MM-DD)
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-50 dark:bg-navy-card border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-600 dark:text-slate-300 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="4:00 PM – 5:00 PM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full p-2 rounded-lg bg-slate-50 dark:bg-navy-card border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className={`${BUTTON_STYLES.secondary} px-3 py-1.5 text-xs`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${BUTTON_STYLES.primary} px-4 py-1.5 text-xs font-bold`}
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
