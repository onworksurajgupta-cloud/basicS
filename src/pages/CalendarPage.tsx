import { useState, useEffect } from 'react'
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Video,
  FileCheck2,
  Clock,
  Trash2,
  CheckCircle2,
  CheckSquare,
  Square,
  ListTodo,
  Grid3X3,
  CalendarDays,
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import type { CalendarEventItem } from '../types/dashboard'

export function CalendarPage() {
  const {
    selectedDate,
    setSelectedDate,
    events,
    addEvent,
    deleteEvent,
    toggleTaskComplete,
  } = useDashboard()

  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date())
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const [viewMode, setViewMode] = useState<'month' | 'agenda'>('month')
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'class' | 'test' | 'assignment' | 'task'>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [modalSuccessMsg, setModalSuccessMsg] = useState<string | null>(null)

  // Real-time live clock ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Form State for Adding / Scheduling
  const [newTitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState(selectedDate)
  const [newTime, setNewTime] = useState('5:00 PM – 6:00 PM')
  const [newType, setNewType] = useState<CalendarEventItem['type']>('task')
  const [newSubjectCode, setNewSubjectCode] = useState('General')
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const [newLocationUrl, setNewLocationUrl] = useState('')
  const [newDescription, setNewDescription] = useState('')

  const year = currentMonthDate.getFullYear()
  const month = currentMonthDate.getMonth()
  const monthName = currentMonthDate.toLocaleString('default', { month: 'long' })

  // Today ISO string
  const todayObj = new Date()
  const todayISO = `${todayObj.getFullYear()}-${String(todayObj.getMonth() + 1).padStart(2, '0')}-${String(
    todayObj.getDate()
  ).padStart(2, '0')}`

  const firstDayIndex = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const formatDateString = (day: number) => {
    const mm = String(month + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    return `${year}-${mm}-${dd}`
  }

  const handleJumpToToday = () => {
    setCurrentMonthDate(new Date())
    setSelectedDate(todayISO)
  }

  const handleOpenAddModal = (defaultDate?: string) => {
    if (defaultDate) {
      setNewDate(defaultDate)
    } else {
      setNewDate(selectedDate || todayISO)
    }
    setShowAddModal(true)
  }

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    addEvent({
      title: newTitle.trim(),
      date: newDate,
      time: newTime.trim() || 'All Day',
      type: newType,
      subjectCode: newSubjectCode === 'None' ? undefined : newSubjectCode,
      priority: newPriority,
      locationOrUrl: newLocationUrl.trim() || undefined,
      description: newDescription.trim() || undefined,
      completed: false,
    })

    setModalSuccessMsg(`"${newTitle}" added to your real-time schedule!`)
    setTimeout(() => {
      setModalSuccessMsg(null)
      setShowAddModal(false)
      setNewTitle('')
      setNewDescription('')
      setNewLocationUrl('')
    }, 1200)
  }

  // Filter events by selected category
  const filteredEvents = events.filter((e) => {
    if (selectedFilter === 'all') return true
    return e.type === selectedFilter
  })

  // Events for selected date
  const eventsForSelectedDate = filteredEvents.filter((e) => e.date === selectedDate)

  const getTypeBadge = (type: CalendarEventItem['type']) => {
    switch (type) {
      case 'class':
        return 'bg-teal/15 text-teal border border-teal/30'
      case 'test':
        return 'bg-gold/15 text-gold-dark dark:text-gold-light border border-gold/30'
      case 'assignment':
        return 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
      case 'task':
        return 'bg-purple-500/15 text-purple-500 border border-purple-500/30'
      case 'meeting':
        return 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
      case 'reminder':
        return 'bg-rose-500/15 text-rose-500 border border-rose-500/30'
      default:
        return 'bg-slate-200 dark:bg-navy-card text-slate-600 dark:text-slate-300'
    }
  }

  const getTypeLabel = (type: CalendarEventItem['type']) => {
    switch (type) {
      case 'class':
        return 'Live Class'
      case 'test':
        return 'Exam / Test'
      case 'assignment':
        return 'Assignment'
      case 'task':
        return 'Task / To-Do'
      case 'meeting':
        return 'Meeting'
      case 'reminder':
        return 'Reminder'
      default:
        return 'Event'
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-time Header & Live Clock Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-navy via-navy-light to-teal/20 text-white p-5 sm:p-6 shadow-sm border border-slate-200/20 dark:border-navy-light/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/20 border border-teal/40 text-teal-light text-xs font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-Time Calendar &amp; Task Scheduler</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-teal-light" />
            Schedule, Classes &amp; To-Do Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Add upcoming classes, exams, assignment deadlines, or personal study tasks. Everything syncs and persists in real time.
          </p>
        </div>

        {/* Live Clock & Action Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-right">
            <div className="text-sm font-black font-mono tracking-wider text-teal-light">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-[10px] text-slate-300 font-medium">
              {currentTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleOpenAddModal(selectedDate)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal text-white hover:bg-teal-dark font-bold text-xs sm:text-sm shadow-md shadow-teal/25 transition-all cursor-pointer hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Event / Task</span>
          </button>
        </div>
      </div>

      {/* Control Bar: View Switcher, Filter Pills & Jump Today */}
      <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {[
            { id: 'all', label: 'All Items', count: events.length },
            { id: 'class', label: 'Live Classes', count: events.filter((e) => e.type === 'class').length },
            { id: 'test', label: 'Tests / Exams', count: events.filter((e) => e.type === 'test').length },
            { id: 'task', label: 'Tasks & To-Dos', count: events.filter((e) => e.type === 'task').length },
            { id: 'assignment', label: 'Assignments', count: events.filter((e) => e.type === 'assignment').length },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 ${
                selectedFilter === cat.id
                  ? 'bg-teal text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-navy-dark text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-card'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedFilter === cat.id ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-navy text-slate-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* View Mode & Jump to Today */}
        <div className="flex items-center gap-2 self-end lg:self-auto shrink-0">
          <button
            type="button"
            onClick={handleJumpToToday}
            className="px-3 py-1.5 rounded-lg border border-teal text-teal hover:bg-teal hover:text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Today ({todayISO})
          </button>

          <div className="flex items-center bg-slate-100 dark:bg-navy-dark p-1 rounded-lg border border-slate-200 dark:border-navy-light">
            <button
              type="button"
              onClick={() => setViewMode('month')}
              className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                viewMode === 'month' ? 'bg-white dark:bg-navy text-teal shadow-xs' : 'text-slate-400'
              }`}
              title="Month Grid View"
            >
              <Grid3X3 className="w-3.5 h-3.5" /> Month
            </button>
            <button
              type="button"
              onClick={() => setViewMode('agenda')}
              className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                viewMode === 'agenda' ? 'bg-white dark:bg-navy text-teal shadow-xs' : 'text-slate-400'
              }`}
              title="Task & Agenda List View"
            >
              <ListTodo className="w-3.5 h-3.5" /> Agenda
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'month' ? (
        /* Month Grid Layout: Calendar on Left, Date Detail Panel on Right */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Month Grid (2 Columns) */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 space-y-4 shadow-xs">
            {/* Navigation Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/40">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-teal" />
                <h2 className="text-base sm:text-lg font-black text-navy dark:text-canvas">
                  {monthName} {year}
                </h2>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentMonthDate(new Date(year, month - 1, 1))}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-light hover:bg-slate-100 dark:hover:bg-navy-card text-slate-500 cursor-pointer"
                  title="Previous Month"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentMonthDate(new Date(year, month + 1, 1))}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-navy-light hover:bg-slate-100 dark:hover:bg-navy-card text-slate-500 cursor-pointer"
                  title="Next Month"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-2">
                  {d}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Blank leading slots */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-20 rounded-xl bg-slate-50/40 dark:bg-navy-dark/20" />
              ))}

              {/* Days in Month */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const dateStr = formatDateString(day)
                const isToday = dateStr === todayISO
                const isSelected = dateStr === selectedDate
                const dayEvents = filteredEvents.filter((e) => e.date === dateStr)

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`min-h-20 sm:min-h-24 p-1.5 sm:p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between group relative ${
                      isSelected
                        ? 'border-teal ring-2 ring-teal/30 bg-teal/5'
                        : isToday
                        ? 'border-teal bg-teal/5 shadow-xs'
                        : 'border-slate-200/70 dark:border-navy-light/40 hover:border-teal/50 hover:bg-slate-50/50 dark:hover:bg-navy-card/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-bold ${
                          isToday
                            ? 'w-6 h-6 rounded-full bg-teal text-white flex items-center justify-center text-[11px] shadow-xs'
                            : isSelected
                            ? 'text-teal font-extrabold'
                            : 'text-navy dark:text-canvas'
                        }`}
                      >
                        {day}
                      </span>

                      {/* Quick + Add Button appears on cell hover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenAddModal(dateStr)
                        }}
                        className="opacity-0 group-hover:opacity-100 p-0.5 rounded bg-teal text-white hover:bg-teal-dark transition-opacity"
                        title={`Schedule on ${dateStr}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Day Events Pills */}
                    <div className="space-y-1 mt-1 overflow-hidden">
                      {dayEvents.slice(0, 2).map((evt) => (
                        <div
                          key={evt.id}
                          className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded truncate flex items-center gap-1 ${
                            evt.completed ? 'line-through opacity-50 ' : ''
                          }${getTypeBadge(evt.type)}`}
                          title={evt.title}
                        >
                          {evt.type === 'class' && <Video className="w-2.5 h-2.5 shrink-0" />}
                          {evt.type === 'test' && <FileCheck2 className="w-2.5 h-2.5 shrink-0" />}
                          {evt.type === 'task' && <CheckSquare className="w-2.5 h-2.5 shrink-0" />}
                          <span className="truncate">{evt.title}</span>
                        </div>
                      ))}

                      {dayEvents.length > 2 && (
                        <span className="text-[9px] font-bold text-teal pl-1 block">
                          +{dayEvents.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Date Activity & Quick Task Panel (1 Column) */}
          <div className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 space-y-4 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/40">
                <div>
                  <h3 className="text-sm font-bold text-navy dark:text-canvas flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4 text-teal" />
                    <span>Activities for {selectedDate}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {eventsForSelectedDate.length} item(s) scheduled on this day
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenAddModal(selectedDate)}
                  className="p-1.5 rounded-lg bg-teal text-white hover:bg-teal-dark transition-colors cursor-pointer"
                  title="Add activity on this date"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Event / Task List on Selected Date */}
              {eventsForSelectedDate.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {eventsForSelectedDate.map((evt) => (
                    <div
                      key={evt.id}
                      className={`p-3.5 rounded-xl border border-slate-200 dark:border-navy-light/40 bg-slate-50/70 dark:bg-navy-dark/40 space-y-2 transition-all ${
                        evt.completed ? 'opacity-60 bg-slate-100 dark:bg-navy-card/30' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {/* Task Completion Toggle */}
                          <button
                            type="button"
                            onClick={() => toggleTaskComplete(evt.id)}
                            className="text-slate-400 hover:text-teal transition-colors cursor-pointer"
                            title={evt.completed ? 'Mark pending' : 'Mark completed'}
                          >
                            {evt.completed ? (
                              <CheckSquare className="w-4 h-4 text-teal" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getTypeBadge(evt.type)}`}>
                            {getTypeLabel(evt.type)}
                          </span>

                          {evt.subjectCode && (
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-navy text-slate-600 dark:text-slate-300">
                              {evt.subjectCode}
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => deleteEvent(evt.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4
                        className={`text-xs font-bold text-navy dark:text-canvas leading-snug ${
                          evt.completed ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {evt.title}
                      </h4>

                      {evt.description && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {evt.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-navy-light/20 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {evt.time}
                        </span>

                        {evt.locationOrUrl && (
                          <a
                            href={evt.locationOrUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-teal hover:underline text-[11px]"
                          >
                            <Video className="w-3 h-3" />
                            <span>Join Class</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-navy-card flex items-center justify-center mx-auto text-slate-400">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <p>No events or tasks scheduled for {selectedDate}.</p>
                  <button
                    type="button"
                    onClick={() => handleOpenAddModal(selectedDate)}
                    className="text-teal font-bold hover:underline inline-flex items-center gap-1 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Schedule Something Now
                  </button>
                </div>
              )}
            </div>

            {/* Quick Add CTA */}
            <div className="pt-3 border-t border-slate-100 dark:border-navy-light/40">
              <button
                type="button"
                onClick={() => handleOpenAddModal(selectedDate)}
                className="w-full py-2 rounded-xl border border-dashed border-teal/60 text-teal hover:bg-teal/5 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Quick Add Task on {selectedDate}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Agenda / Task List View */
        <div className="p-6 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/40">
            <div>
              <h2 className="text-base font-bold text-navy dark:text-canvas">
                All Scheduled Events &amp; Task Agenda
              </h2>
              <p className="text-xs text-slate-400">
                Sorted chronologically with instant task completion checkboxes
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenAddModal()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal text-white hover:bg-teal-dark text-xs font-bold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add New
            </button>
          </div>

          <div className="space-y-3">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className={`p-4 rounded-xl border border-slate-200 dark:border-navy-light/40 bg-slate-50/50 dark:bg-navy-dark/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  evt.completed ? 'opacity-60 bg-slate-100 dark:bg-navy-card/30' : ''
                }`}
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={() => toggleTaskComplete(evt.id)}
                    className="mt-0.5 sm:mt-0 text-slate-400 hover:text-teal transition-colors cursor-pointer"
                  >
                    {evt.completed ? (
                      <CheckSquare className="w-5 h-5 text-teal" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${getTypeBadge(evt.type)}`}>
                        {getTypeLabel(evt.type)}
                      </span>
                      {evt.subjectCode && (
                        <span className="text-[10px] font-bold text-slate-500 font-mono">
                          {evt.subjectCode}
                        </span>
                      )}
                      <span
                        className={`text-xs sm:text-sm font-bold text-navy dark:text-canvas truncate ${
                          evt.completed ? 'line-through text-slate-400' : ''
                        }`}
                      >
                        {evt.title}
                      </span>
                    </div>

                    {evt.description && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                        {evt.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto text-xs text-slate-400">
                  <span className="font-bold text-teal">{evt.date}</span>
                  <span>{evt.time}</span>
                  {evt.locationOrUrl && (
                    <a
                      href={evt.locationOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal font-bold hover:underline"
                    >
                      Join Class
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteEvent(evt.id)}
                    className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comprehensive Add Event / Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-navy rounded-2xl border border-slate-200 dark:border-navy-light max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/40">
              <h3 className="text-base font-bold text-navy dark:text-canvas flex items-center gap-2">
                <Plus className="w-4 h-4 text-teal" />
                Schedule New Event, Class or Task
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-navy dark:hover:text-canvas text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {modalSuccessMsg ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-teal/15 text-teal flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-navy dark:text-canvas">{modalSuccessMsg}</h4>
                <p className="text-xs text-slate-400">Saved to local session and Supabase synchronization queue.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateEvent} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Event / Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohr's Circle Lecture, FEA Truss Assignment, Revise Formula Sheet"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  />
                </div>

                {/* Category / Type Grid */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                    Activity Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'task', label: '✅ Task / To-Do' },
                      { id: 'class', label: '🎓 Live Class' },
                      { id: 'test', label: '📝 Exam / Test' },
                      { id: 'assignment', label: '📚 Assignment' },
                      { id: 'meeting', label: '👥 Discussion' },
                      { id: 'reminder', label: '⏰ Reminder' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setNewType(t.id as any)}
                        className={`p-2 rounded-lg text-xs font-bold text-center border transition-all cursor-pointer ${
                          newType === t.id
                            ? 'bg-teal text-white border-teal shadow-xs'
                            : 'bg-slate-50 dark:bg-navy-dark border-slate-200 dark:border-navy-light text-slate-600 dark:text-slate-300 hover:border-teal'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Time Slot</label>
                    <input
                      type="text"
                      placeholder="e.g. 5:00 PM – 6:30 PM"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                    />
                  </div>
                </div>

                {/* Subject Code & Priority */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">
                      Subject Tag
                    </label>
                    <select
                      value={newSubjectCode}
                      onChange={(e) => setNewSubjectCode(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                    >
                      <option value="General">General / Personal</option>
                      <option value="ME-201">ME-201 (Mechanics of Solids)</option>
                      <option value="ME-305">ME-305 (Mechanical Vibration)</option>
                      <option value="ME-402">ME-402 (Finite Element Analysis)</option>
                      <option value="ME-101">ME-101 (Basic Mechanical)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">
                      Priority Level
                    </label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High / Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Location / Meeting URL (optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Meeting Link or Room (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. https://meet.google.com/xyz or CAD Laboratory"
                    value={newLocationUrl}
                    onChange={(e) => setNewLocationUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Notes / Description (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add formulas, lecture agenda or to-do notes..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light text-xs text-navy dark:text-canvas focus:outline-none focus:border-teal"
                  />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-navy-light/40">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-lg border border-slate-200 dark:border-navy-light text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-card cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-teal text-white text-xs font-bold hover:bg-teal-dark shadow-sm transition-all cursor-pointer"
                  >
                    Save to Schedule
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
