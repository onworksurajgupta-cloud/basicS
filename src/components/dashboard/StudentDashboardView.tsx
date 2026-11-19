import { Link } from 'react-router-dom'
import {
  BookOpen,
  ArrowRight,
  PlayCircle,
  Calendar,
  Video,
  CheckSquare,
  Square,
  Plus,
  FileCheck2,
  Download,
} from 'lucide-react'
import { COURSES, type Subject } from '../../data/curriculum'
import { useDashboard } from '../../context/DashboardContext'

export function StudentDashboardView() {
  const { events, toggleTaskComplete } = useDashboard()
  const studentName = 'Alex Mercer'
  const studentRoll = 'ME-2026-084'

  // Alex is enrolled in 3 core engineering subjects
  const enrolledCourses = COURSES.filter((c: Subject) =>
    ['mos', 'mech-vib', 'fea'].includes(c.id)
  )

  // Today's activities & tasks
  const todayEvents = events.slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Calm & Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-navy-light/40">
        <div>
          <span className="text-xs font-semibold text-teal tracking-wide uppercase">
            Mechanical Engineering • Term 2026-II
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-canvas tracking-tight mt-1">
            Welcome back, {studentName}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Roll No: <span className="font-mono font-semibold">{studentRoll}</span> • You are 86% through your semester goals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/calendar"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal/10 hover:bg-teal text-teal hover:text-white font-semibold text-xs transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Open Calendar Arena</span>
          </Link>
        </div>
      </div>

      {/* 3 Simple, Spacious Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Enrolled Subjects
          </span>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-2">
            3 Active Tracks
          </div>
          <p className="text-xs text-slate-500 mt-1">Solids, Vibration &amp; FEA</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Overall Progress
          </span>
          <div className="text-2xl font-black text-teal mt-2">
            86%
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-navy-dark mt-2 overflow-hidden">
            <div className="h-full rounded-full bg-teal" style={{ width: '86%' }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Next Live Session
          </span>
          <div className="text-lg font-bold text-navy dark:text-canvas mt-2 truncate">
            Today at 5:00 PM
          </div>
          <p className="text-xs text-teal font-medium mt-1">Mohr's Circle Workshop (Google Meet)</p>
        </div>
      </div>

      {/* 2-Column Balanced Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols): Active Courses */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-navy-light/30">
            <h2 className="text-base font-bold text-navy dark:text-canvas flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal" />
              <span>In-Progress Subjects</span>
            </h2>
            <Link to="/courses" className="text-xs font-semibold text-teal hover:underline flex items-center gap-1">
              All Courses <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {enrolledCourses.map((course: Subject) => {
              const progress = course.id === 'mos' ? 90 : course.id === 'mech-vib' ? 84 : 78

              return (
                <div
                  key={course.id}
                  className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 hover:border-teal/60 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal/10 text-teal border border-teal/20">
                        {course.code}
                      </span>
                      <span className="text-xs text-slate-400">{course.level} Level</span>
                    </div>

                    <h3 className="text-sm font-bold text-navy dark:text-canvas group-hover:text-teal transition-colors">
                      {course.name}
                    </h3>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 pt-1 max-w-md">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-navy-dark overflow-hidden">
                        <div
                          className="h-full rounded-full bg-teal"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {progress}%
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal text-white hover:bg-teal-dark font-semibold text-xs shrink-0 transition-colors cursor-pointer"
                  >
                    <span>Resume</span>
                    <PlayCircle className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column (1 col): Today's Schedule & Tasks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-navy-light/30">
            <h2 className="text-base font-bold text-navy dark:text-canvas flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal" />
              <span>Today's Schedule</span>
            </h2>
            <Link to="/calendar" className="text-xs font-semibold text-teal hover:underline">
              Full Agenda &rarr;
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs space-y-3">
            {todayEvents.map((evt) => (
              <div
                key={evt.id}
                className={`p-3 rounded-xl border border-slate-100 dark:border-navy-light/30 bg-slate-50/60 dark:bg-navy-card/40 space-y-1.5 transition-all ${
                  evt.completed ? 'opacity-50 line-through' : ''
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleTaskComplete(evt.id)}
                      className="text-slate-400 hover:text-teal cursor-pointer shrink-0"
                    >
                      {evt.completed ? (
                        <CheckSquare className="w-4 h-4 text-teal" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-xs font-bold text-navy dark:text-canvas truncate">
                      {evt.title}
                    </span>
                  </div>

                  {evt.subjectCode && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-navy text-slate-500 shrink-0">
                      {evt.subjectCode}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pl-6">
                  <span>{evt.time}</span>
                  {evt.locationOrUrl && (
                    <a
                      href={evt.locationOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-teal hover:underline inline-flex items-center gap-1"
                    >
                      <Video className="w-3 h-3" /> Join Class
                    </a>
                  )}
                </div>
              </div>
            ))}

            <Link
              to="/calendar"
              className="w-full py-2 rounded-xl border border-dashed border-teal/50 hover:bg-teal/5 text-teal text-xs font-bold flex items-center justify-center gap-1.5 transition-colors block text-center"
            >
              <Plus className="w-3.5 h-3.5" /> + Add Task or Event
            </Link>
          </div>
        </div>
      </div>

      {/* Clean Quick Action Bar */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
        <Link
          to="/take-tests"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 text-navy dark:text-canvas hover:border-teal font-semibold transition-colors shadow-xs"
        >
          <FileCheck2 className="w-3.5 h-3.5 text-gold" />
          <span>Take Diagnostic Tests</span>
        </Link>
        <Link
          to="/study-materials"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 text-navy dark:text-canvas hover:border-teal font-semibold transition-colors shadow-xs"
        >
          <Download className="w-3.5 h-3.5 text-teal" />
          <span>Formula Sheets &amp; Notes</span>
        </Link>
        <Link
          to="/online-class"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 text-navy dark:text-canvas hover:border-teal font-semibold transition-colors shadow-xs"
        >
          <Video className="w-3.5 h-3.5 text-blue-500" />
          <span>Google Meet Class Schedule</span>
        </Link>
      </div>
    </div>
  )
}
