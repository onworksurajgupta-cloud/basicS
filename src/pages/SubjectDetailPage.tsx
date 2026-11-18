import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Download,
  PlayCircle,
  ChevronRight,
} from 'lucide-react'
import { SUBJECTS } from '../data/curriculum'
import { BUTTON_STYLES } from '../theme/tokens'

export function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>()
  const [activeTab, setActiveTab] = useState<'units' | 'materials' | 'practice' | 'tests'>('units')
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('bme-u1')

  const subject = SUBJECTS.find((s) => s.id === subjectId)

  if (!subject) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy dark:text-canvas">Subject Not Found</h2>
        <Link to="/courses" className={`${BUTTON_STYLES.primary} px-5 py-2 text-xs`}>
          Back to Courses
        </Link>
      </div>
    )
  }

  const totalLectures = subject.units.reduce((acc, u) => acc + u.lectures.length, 0)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back Link */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Courses</span>
      </Link>

      {/* Sober Subject Header */}
      <div className="p-6 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 space-y-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-teal">{subject.code}</span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-slate-500">{subject.level} Level</span>
          <span className="text-slate-400">&bull;</span>
          <span className="text-slate-500">Instructor: {subject.instructor}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-navy dark:text-canvas">
          {subject.name}
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
          {subject.description}
        </p>

        {/* Tab Controls */}
        <div className="pt-4 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-navy-light/30">
          <button
            type="button"
            onClick={() => setActiveTab('units')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'units'
                ? 'bg-teal text-white'
                : 'bg-slate-100 dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-teal'
            }`}
          >
            Units &amp; Lectures ({totalLectures})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('materials')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'materials'
                ? 'bg-teal text-white'
                : 'bg-slate-100 dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-teal'
            }`}
          >
            Study Materials ({subject.studyMaterials.length} PDFs)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-teal text-white'
                : 'bg-slate-100 dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-teal'
            }`}
          >
            Practice Sets ({subject.practiceWork.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tests')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'tests'
                ? 'bg-gold text-navy font-bold'
                : 'bg-slate-100 dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-gold'
            }`}
          >
            Tests ({subject.tests.length})
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 p-6">
        {/* ================= TAB 1: UNITS & LECTURES ================= */}
        {activeTab === 'units' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-navy dark:text-canvas">
              Course Units
            </h3>

            <div className="space-y-3">
              {subject.units.map((unit) => {
                const isExpanded = expandedUnitId === unit.id || expandedUnitId === null

                return (
                  <div
                    key={unit.id}
                    className="rounded-lg border border-slate-200 dark:border-navy-light/40 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                      className="w-full p-4 bg-slate-50 dark:bg-navy/60 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-navy transition-colors cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-teal">Unit {unit.unitNumber}</div>
                        <h4 className="text-sm font-semibold text-navy dark:text-canvas mt-0.5">
                          {unit.title}
                        </h4>
                      </div>

                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <span>{unit.lectures.length} Lectures</span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="p-4 space-y-2 bg-white dark:bg-navy-card border-t border-slate-200 dark:border-navy-light/40">
                        {unit.lectures.map((lec) => (
                          <div
                            key={lec.id}
                            className="p-3 rounded-lg bg-slate-50 dark:bg-navy/40 flex items-center justify-between text-xs hover:border-teal transition-all"
                          >
                            <div className="flex items-center gap-2.5">
                              <PlayCircle className="w-4 h-4 text-teal shrink-0" />
                              <span className="font-medium text-navy dark:text-canvas">
                                {lec.lectureNumber}. {lec.title}
                              </span>
                            </div>

                            <span className="text-slate-400 shrink-0">{lec.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 2: STUDY MATERIALS ================= */}
        {activeTab === 'materials' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-navy dark:text-canvas">
              Study Materials &amp; PDFs
            </h3>

            <div className="space-y-3">
              {subject.studyMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-navy/40 border border-slate-200 dark:border-navy-light/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-teal">{mat.type}</span>
                    <h4 className="text-sm font-bold text-navy dark:text-canvas">{mat.title}</h4>
                    <p className="text-slate-500">{mat.description}</p>
                    <span className="text-slate-400">{mat.fileSize} &bull; {mat.pages} Pages</span>
                  </div>

                  <button
                    type="button"
                    className={`${BUTTON_STYLES.primary} px-4 py-2 text-xs shrink-0 self-start sm:self-auto gap-1.5`}
                    onClick={() => alert(`Downloading "${mat.title}"`)}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: PRACTICE WORK ================= */}
        {activeTab === 'practice' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-navy dark:text-canvas">
              Practice Worksheets
            </h3>

            <div className="space-y-3">
              {subject.practiceWork.map((prac, i) => (
                <div
                  key={prac.id}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-navy/40 border border-slate-200 dark:border-navy-light/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-teal">Set {i + 1}</span>
                      <span className="text-slate-400">&bull;</span>
                      <span className="text-slate-500">{prac.difficulty}</span>
                    </div>
                    <h4 className="text-sm font-bold text-navy dark:text-canvas">{prac.title}</h4>
                    <p className="text-slate-500">{prac.description}</p>
                    <span className="text-slate-400">{prac.problemsCount} Problems &bull; Est. {prac.estimatedTime}</span>
                  </div>

                  <button
                    type="button"
                    className={`${BUTTON_STYLES.secondary} px-4 py-2 text-xs shrink-0 self-start sm:self-auto`}
                    onClick={() => alert(`Opening worksheet: ${prac.title}`)}
                  >
                    Solve Problems
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: TESTS ================= */}
        {activeTab === 'tests' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-navy dark:text-canvas">
              Tests &amp; Exams
            </h3>

            <div className="space-y-3">
              {subject.tests.map((test) => (
                <div
                  key={test.id}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-navy/40 border border-slate-200 dark:border-navy-light/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-semibold text-gold">{test.type}</span>
                    <h4 className="text-sm font-bold text-navy dark:text-canvas">{test.title}</h4>
                    <span className="text-slate-400">
                      {test.questionsCount} Questions &bull; {test.duration} &bull; Pass Mark: {test.passingScore}%
                    </span>
                  </div>

                  <Link
                    to="/take-tests"
                    className={`${BUTTON_STYLES.gold} px-5 py-2 text-xs font-semibold shrink-0 self-start sm:self-auto`}
                  >
                    Start Test
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
