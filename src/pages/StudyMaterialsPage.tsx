import { useState } from 'react'
import {
  Award,
  Download,
  Search,
  CheckCircle2,
} from 'lucide-react'
import { COURSES, type Subject, type StudyMaterialItem } from '../data/curriculum'

export function StudyMaterialsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleDownload = (materialTitle: string) => {
    setDownloadSuccess(materialTitle)
    setTimeout(() => {
      setDownloadSuccess(null)
    }, 2500)
  }

  // Aggregate all study materials from courses
  const allMaterials = COURSES.flatMap((course: Subject) =>
    course.studyMaterials.map((mat: StudyMaterialItem) => ({
      ...mat,
      courseCode: course.code,
      courseName: course.name,
      courseId: course.id,
    }))
  ).filter(
    (mat) =>
      mat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-navy-light/40">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-canvas flex items-center gap-2">
            <Award className="w-6 h-6 text-teal" />
            Study Materials &amp; Reference Formula Sheets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Curated engineering references, formula summaries, and lecture notes across all 4 disciplines.
          </p>
        </div>

        {downloadSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal/15 text-teal text-xs font-bold border border-teal/30 animate-pulse">
            <CheckCircle2 className="w-4 h-4" /> Downloaded "{downloadSuccess}"
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search study materials by topic or subject code (e.g. Mohr, Vibration, ME-402)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light/40 text-xs sm:text-sm text-navy dark:text-canvas placeholder-slate-400 focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      {/* Materials Grid grouped by Subject */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allMaterials.map((mat) => (
          <div
            key={mat.id}
            className="p-5 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 flex flex-col justify-between shadow-xs hover:border-teal/50 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal/10 text-teal border border-teal/20">
                  {mat.courseCode}
                </span>
                <span className="text-xs text-slate-400">{mat.fileSize} • {mat.pages} pgs</span>
              </div>

              <h3 className="text-sm font-bold text-navy dark:text-canvas group-hover:text-teal transition-colors">
                {mat.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {mat.courseName}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-light/30 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                PDF Document • Verified Curriculum
              </span>
              <button
                type="button"
                onClick={() => handleDownload(mat.title)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal text-white hover:bg-teal-dark text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
