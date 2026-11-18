import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { SUBJECTS } from '../data/curriculum'
import { BUTTON_STYLES } from '../theme/tokens'

export function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Foundational' | 'Core' | 'Advanced'>('All')

  const filteredSubjects = SUBJECTS.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.tagline.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesLevel = selectedLevel === 'All' || sub.level === selectedLevel

    return matchesSearch && matchesLevel
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy dark:text-canvas">
          Engineering Courses
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Structured curriculum covering Units, Lectures, Study Materials, and Practice Sets.
        </p>
      </div>

      {/* Search & Level Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search subjects by name or code (e.g. ME-201)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white dark:bg-navy-card rounded-lg border border-slate-200 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas placeholder-slate-400 focus:outline-none focus:border-teal"
          />
        </div>

        <div className="flex gap-1.5">
          {(['All', 'Foundational', 'Core', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-teal text-white'
                  : 'bg-white dark:bg-navy-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-light hover:border-teal'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-4">
        {filteredSubjects.map((sub) => {
          const totalLectures = sub.units.reduce((acc, u) => acc + u.lectures.length, 0)

          return (
            <div
              key={sub.id}
              className="p-5 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 hover:border-teal transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-teal">{sub.code}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-light/40 text-slate-600 dark:text-slate-300">
                    {sub.level} Level
                  </span>
                  <span className="text-xs text-slate-400">&bull; Instructor: {sub.instructor}</span>
                </div>

                <h3 className="text-base font-bold text-navy dark:text-canvas">
                  {sub.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {sub.tagline}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                  <span>{sub.units.length} Units</span>
                  <span>&bull;</span>
                  <span>{totalLectures} Lectures</span>
                  <span>&bull;</span>
                  <span>{sub.practiceWork.length} Practice Sets</span>
                  <span>&bull;</span>
                  <span>{sub.studyMaterials.length} Study PDFs</span>
                </div>
              </div>

              <Link
                to={`/courses/${sub.id}`}
                className={`${BUTTON_STYLES.primary} px-5 py-2.5 text-xs whitespace-nowrap self-start sm:self-auto`}
              >
                View Course &rarr;
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
