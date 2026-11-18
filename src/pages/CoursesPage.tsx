import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  BookOpen,
  Filter,
  Star,
  Users,
  ChevronRight,
  PlusCircle,
  Wrench,
  Binary,
  Activity,
  Layers,
  GraduationCap,
} from 'lucide-react'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/10 text-teal-dark dark:text-teal-light text-xs font-bold uppercase tracking-wider mb-4 border border-teal/20">
          <GraduationCap className="w-4 h-4" />
          <span>Curriculum Catalog</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-navy dark:text-canvas">
          Mechanical Engineering Courses
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore structured disciplines covering Units, Concept Lectures, Study Materials, Numerical Problem Sets, and Diagnostic Exams.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 bg-white dark:bg-navy rounded-2xl border border-slate-200 dark:border-navy-light/60 shadow-md">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by subject name, code (e.g. ME-201) or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-navy dark:text-canvas placeholder-slate-400 focus:outline-none"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 ml-2 hidden sm:inline" />
          {(['All', 'Foundational', 'Core', 'Advanced'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSelectedLevel(level)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedLevel === level
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-card'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Subjects Grid */}
      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSubjects.map((sub) => {
            const isGold = sub.accentColor === 'gold'
            const totalLectures = sub.units.reduce((acc, u) => acc + u.lectures.length, 0)

            return (
              <div
                key={sub.id}
                className="group bg-white dark:bg-navy rounded-3xl border border-slate-200/90 dark:border-navy-light/60 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Banner */}
                <div
                  className={`p-6 sm:p-7 relative border-b border-slate-200 dark:border-navy-light/40 overflow-hidden ${
                    isGold
                      ? 'bg-gradient-to-r from-amber-500/10 via-gold/10 to-transparent dark:from-navy dark:via-navy-light/30 dark:to-navy'
                      : 'bg-gradient-to-r from-teal/10 via-teal-light/10 to-transparent dark:from-navy dark:via-navy-light/30 dark:to-navy'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-navy text-white dark:bg-navy-dark dark:text-teal border border-teal/40 shadow-xs">
                        {sub.code}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-white/80 dark:bg-navy-light/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-light">
                        {sub.level} Level
                      </span>
                    </div>

                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs group-hover:scale-110 transition-transform ${
                        isGold
                          ? 'bg-gold/20 text-gold-dark dark:text-gold border-gold/40'
                          : 'bg-teal/20 text-teal border-teal/40'
                      }`}
                    >
                      {sub.id === 'bme' && <Wrench className="w-6 h-6" />}
                      {sub.id === 'fea' && <Binary className="w-6 h-6" />}
                      {sub.id === 'mech-vib' && <Activity className="w-6 h-6" />}
                      {sub.id === 'mos' && <Layers className="w-6 h-6" />}
                    </div>
                  </div>

                  <h3 className="mt-5 text-2xl font-black text-navy dark:text-canvas group-hover:text-teal transition-colors">
                    {sub.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sub.tagline}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-navy-light/40 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-navy dark:text-canvas">
                      Instructor: {sub.instructor}
                    </span>
                    <div className="flex items-center gap-1 text-gold font-bold">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      <span>{sub.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Course Details Breakdown */}
                <div className="p-6 sm:p-7 space-y-5">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40 shadow-xs">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Units</div>
                      <div className="text-sm font-black text-teal mt-0.5">
                        {sub.units.length} Units
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40 shadow-xs">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lectures</div>
                      <div className="text-sm font-black text-teal mt-0.5">
                        {totalLectures} Lectures
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40 shadow-xs">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Materials</div>
                      <div className="text-sm font-black text-gold mt-0.5">
                        {sub.studyMaterials.length} PDFs
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <Users className="w-4 h-4 text-teal" />
                      <span>{sub.enrolledStudents} Students Enrolled</span>
                    </div>

                    <Link
                      to={`/courses/${sub.id}`}
                      className={`${BUTTON_STYLES.primary} px-5 py-2.5 text-xs font-bold gap-1`}
                    >
                      <span>Explore Subject</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-navy dark:text-canvas">No subjects matched your search</h3>
          <p className="mt-1 text-sm text-slate-500">
            Try adjusting your search keywords or switching your level filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setSelectedLevel('All')
            }}
            className={`${BUTTON_STYLES.primary} mt-4 px-5 py-2 text-xs`}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Extensibility Banner */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-canvas via-white to-canvas dark:from-navy-card dark:via-navy dark:to-navy-card border border-teal/40 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal-dark dark:text-teal-light text-xs font-bold uppercase tracking-wider mb-3">
            <PlusCircle className="w-4 h-4" />
            <span>Extensible Academic Architecture</span>
          </div>
          <h3 className="text-2xl font-black text-navy dark:text-canvas">
            Ready to Add Unlimited Subjects in the Future?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            basicS is designed with zero hardcoding. When you are ready to add <em>Fluid Mechanics</em>, <em>Heat &amp; Mass Transfer</em>, or <em>Dynamics of Machinery</em>,
            simply paste a new subject definition in <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy font-mono text-teal font-semibold">src/data/curriculum.ts</code> and it will dynamically appear on this page with its own standalone details view!
          </p>
        </div>

        <button
          type="button"
          className={`${BUTTON_STYLES.secondary} px-6 py-3 text-xs sm:text-sm font-bold whitespace-nowrap`}
          onClick={() =>
            alert(
              'To add a subject: Open src/data/curriculum.ts, duplicate any subject entry, update its name, units, lectures, and practice sets!'
            )
          }
        >
          View Subject Schema
        </button>
      </div>
    </div>
  )
}
