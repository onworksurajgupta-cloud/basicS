import { Link } from 'react-router-dom'
import {
  Users,
  BookOpen,
  FileCheck2,
  Video,
  Calendar,
  ArrowRight,
  Plus,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'
import { SAMPLE_STUDENTS } from '../../data/studentsData'
import { SAMPLE_RESULTS } from '../../data/resultsData'
import { COURSES, type Subject } from '../../data/curriculum'

export function AdminDashboardView() {
  const totalStudents = 3420
  const activeTestsCount = 12

  return (
    <div className="space-y-8">
      {/* Calm & Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/60 dark:border-navy-light/40">
        <div>
          <span className="text-xs font-semibold text-teal tracking-wide uppercase">
            Academic Director Suite
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy dark:text-canvas tracking-tight mt-1">
            Welcome back, Suraj
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Overview of 4 engineering programs and 3,420 active enrolled scholars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/calendar"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal text-white hover:bg-teal-dark font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Class or Test</span>
          </Link>
        </div>
      </div>

      {/* 3 Simple, Clean KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Total Enrolled Students
            </span>
            <Users className="w-4 h-4 text-teal" />
          </div>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-2 flex items-baseline gap-2">
            <span>{totalStudents.toLocaleString()}</span>
            <span className="text-xs font-bold text-teal flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 4 Engineering tracks</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Engineering Curriculum
            </span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-2">
            4 Core Subjects
          </div>
          <p className="text-xs text-slate-500 mt-1">16 Modules &amp; Laboratories</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Active Assessments
            </span>
            <FileCheck2 className="w-4 h-4 text-gold" />
          </div>
          <div className="text-2xl font-black text-gold mt-2">
            {activeTestsCount} Diagnostic Tests
          </div>
          <p className="text-xs text-slate-500 mt-1">88.6% Average Pass Benchmark</p>
        </div>
      </div>

      {/* 2-Column Balanced Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Academic Subject Health */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/30">
            <h2 className="text-base font-bold text-navy dark:text-canvas flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal" />
              <span>Program Performance Overview</span>
            </h2>
            <Link to="/courses" className="text-xs font-semibold text-teal hover:underline flex items-center gap-1">
              Curriculum <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 pt-1">
            {COURSES.map((course: Subject) => {
              const avgScore = course.id === 'mos' ? 88 : course.id === 'mech-vib' ? 82 : course.id === 'fea' ? 79 : 91

              return (
                <div key={course.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-navy dark:text-canvas">
                      {course.code} — {course.name}
                    </span>
                    <span className="font-bold text-teal">{avgScore}% Pass Avg</span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-navy-dark overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal"
                      style={{ width: `${avgScore}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Recent Submissions */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-navy-light/30">
            <h2 className="text-base font-bold text-navy dark:text-canvas flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-gold" />
              <span>Recent Diagnostic Evaluations</span>
            </h2>
            <Link to="/results" className="text-xs font-semibold text-teal hover:underline flex items-center gap-1">
              All Results <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            {SAMPLE_RESULTS.slice(0, 4).map((res) => (
              <div
                key={res.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-navy-light/30 bg-slate-50/60 dark:bg-navy-card/40 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="font-bold text-navy dark:text-canvas truncate">
                    {res.studentName}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {res.testTitle} • {res.subjectCode}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-teal">
                    {res.score}/{res.totalScore} ({res.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs">
        <Link
          to="/students"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 text-navy dark:text-canvas hover:border-teal font-semibold transition-colors shadow-xs"
        >
          <Users className="w-3.5 h-3.5 text-teal" />
          <span>Manage Students ({SAMPLE_STUDENTS.length})</span>
        </Link>
        <Link
          to="/online-class"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 text-navy dark:text-canvas hover:border-teal font-semibold transition-colors shadow-xs"
        >
          <Video className="w-3.5 h-3.5 text-emerald-500" />
          <span>Live Google Meet Classes</span>
        </Link>
        <Link
          to="/calendar"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-navy border border-slate-200/80 dark:border-navy-light/40 text-navy dark:text-canvas hover:border-teal font-semibold transition-colors shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5 text-gold" />
          <span>Academic Calendar</span>
        </Link>
      </div>
    </div>
  )
}
