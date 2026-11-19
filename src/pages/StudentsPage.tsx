import { useState } from 'react'
import {
  Users,
  Search,
  Database,
  Mail,
  UserCheck,
} from 'lucide-react'
import { SAMPLE_STUDENTS } from '../data/studentsData'
import { BADGE_STYLES } from '../theme/tokens'

export function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('All')

  const filteredStudents = SAMPLE_STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCourse =
      selectedCourse === 'All' ||
      student.enrolledCourses.some((c) => c.toLowerCase().includes(selectedCourse.toLowerCase()))

    return matchesSearch && matchesCourse
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-navy-light/40">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-canvas flex items-center gap-2">
            <Users className="w-6 h-6 text-teal" />
            Students Roster &amp; Academic Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track student performance, attendance, and coursework milestones across all 4 engineering disciplines.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal/10 border border-teal/20 text-teal text-xs font-bold">
            <UserCheck className="w-4 h-4" /> 3,420 Active Enrollees
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
          <span className="text-xs text-slate-400 font-semibold uppercase">Total Enrollment</span>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-1">3,420</div>
          <p className="text-[11px] text-teal mt-1 font-bold">+14.2% from previous semester</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
          <span className="text-xs text-slate-400 font-semibold uppercase">Avg Attendance</span>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-1">94.3%</div>
          <p className="text-[11px] text-slate-400 mt-1">Across live Google Meet sessions</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
          <span className="text-xs text-slate-400 font-semibold uppercase">Pass Benchmark Rate</span>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-1">88.6%</div>
          <p className="text-[11px] text-teal mt-1 font-bold">Above 70% diagnostic cutoff</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
          <span className="text-xs text-slate-400 font-semibold uppercase">Active Disciplines</span>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-1">4 Tracks</div>
          <p className="text-[11px] text-slate-400 mt-1">16 Modules &amp; Laboratories</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search student by name, roll number (e.g. ME-2026-084), or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light/40 text-xs sm:text-sm text-navy dark:text-canvas placeholder-slate-400 focus:outline-none focus:border-teal"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Solids', 'Vibration', 'FEA', 'Basic'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCourse(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer ${
                selectedCourse === cat
                  ? 'bg-teal text-white'
                  : 'bg-slate-100 dark:bg-navy-dark text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-card'
              }`}
            >
              {cat === 'All' ? 'All Subjects' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-navy-card/50 border-b border-slate-200 dark:border-navy-light/40 text-slate-400">
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold">Roll Number</th>
                <th className="py-3 px-4 font-semibold">Enrolled Disciplines</th>
                <th className="py-3 px-4 font-semibold">Syllabus Progress</th>
                <th className="py-3 px-4 font-semibold">Attendance</th>
                <th className="py-3 px-4 font-semibold">Grade</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-light/20">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-navy-card/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-navy dark:text-canvas">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-teal/15 text-teal text-xs font-bold flex items-center justify-center shrink-0">
                          {student.avatar}
                        </span>
                        <div>
                          <div>{student.name}</div>
                          <div className="text-[11px] text-slate-400 font-normal flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-slate-600 dark:text-slate-300">
                      {student.studentId}
                    </td>

                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {student.enrolledCourses.map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-navy-dark text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-light/30"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-navy-dark overflow-hidden">
                          <div
                            className="h-full rounded-full bg-teal"
                            style={{ width: `${student.progressPercentage}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-500">
                          {student.progressPercentage}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-200">
                      {student.attendanceRate}%
                    </td>

                    <td className="py-3 px-4 font-bold text-teal">
                      {student.overallGrade}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className={BADGE_STYLES.teal}>{student.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No students found matching "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supabase Integration Readiness Callout */}
      <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-navy-card/60 border border-slate-200 dark:border-navy-light/40 flex items-start gap-3 text-xs text-slate-500 dark:text-slate-400">
        <Database className="w-4 h-4 text-teal shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-navy dark:text-canvas">
            Backend Integration Readiness:
          </span>{' '}
          This roster is currently populated with typed sample data. Once Supabase is connected via <code className="text-teal font-mono">VITE_SUPABASE_URL</code> and <code className="text-teal font-mono">VITE_SUPABASE_ANON_KEY</code>, records will sync automatically with PostgreSQL tables.
        </div>
      </div>
    </div>
  )
}
