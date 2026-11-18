import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  BookOpen,
  FileCode,
  FileCheck2,
  Download,
  FileText,
  PlayCircle,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { SUBJECTS } from '../data/curriculum'
import { BUTTON_STYLES, BADGE_STYLES } from '../theme/tokens'

export function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>()
  const [activeTab, setActiveTab] = useState<'units' | 'materials' | 'modules' | 'practice' | 'tests'>('units')
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('bme-u1')

  const subject = SUBJECTS.find((s) => s.id === subjectId)

  if (!subject) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-black text-navy dark:text-canvas">Subject Not Found</h2>
        <p className="text-slate-500">
          The requested engineering subject does not exist or has not been published yet.
        </p>
        <Link to="/courses" className={`${BUTTON_STYLES.primary} px-6 py-2.5 text-sm`}>
          Back to Courses Catalog
        </Link>
      </div>
    )
  }

  const isGold = subject.accentColor === 'gold'
  const totalLectures = subject.units.reduce((acc, u) => acc + u.lectures.length, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back to Courses Link */}
      <div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </Link>
      </div>

      {/* Subject Header Banner */}
      <div
        className={`p-6 sm:p-10 rounded-3xl border border-slate-200/90 dark:border-navy-light/60 shadow-xl relative overflow-hidden ${
          isGold
            ? 'bg-gradient-to-br from-white via-amber-500/5 to-white dark:from-navy dark:via-navy-card dark:to-navy'
            : 'bg-gradient-to-br from-white via-teal/5 to-white dark:from-navy dark:via-navy-card dark:to-navy'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-navy text-white dark:bg-navy-dark dark:text-teal border border-teal/40">
                {subject.code}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-xl bg-white/80 dark:bg-navy-light/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-navy-light">
                {subject.level} Level
              </span>
              <div className="flex items-center gap-1 text-gold text-xs font-black bg-white dark:bg-navy px-2.5 py-1 rounded-xl border border-slate-200 dark:border-navy-light">
                <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                <span>{subject.rating}</span>
                <span className="text-slate-400 font-normal">({subject.enrolledStudents} students)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-navy dark:text-canvas">
              {subject.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {subject.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-navy dark:text-canvas">
                Instructor: <strong>{subject.instructor}</strong> ({subject.instructorRole})
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-teal" />
                {subject.enrolledStudents} Active Learners
              </span>
            </div>
          </div>

          {/* Quick Action Box */}
          <div className="p-6 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/60 space-y-4 shrink-0 lg:w-72 text-center">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Course Status</div>
            <div className="text-xl font-black text-teal">Self-Paced &bull; 100% Free</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {subject.units.length} Units &bull; {totalLectures} Lectures &bull; {subject.practiceWork.length} Problem Sets
            </div>
            <Link
              to="/take-tests"
              className={`${BUTTON_STYLES.primary} w-full py-3 text-xs font-bold block`}
            >
              Take Subject Exam
            </Link>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-200 dark:border-navy-light/40 pt-6">
          <button
            type="button"
            onClick={() => setActiveTab('units')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'units'
                ? 'bg-teal text-white shadow-md'
                : 'bg-white dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-teal'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Units &amp; Lectures ({totalLectures})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('materials')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'materials'
                ? 'bg-teal text-white shadow-md'
                : 'bg-white dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-teal'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>2. Study Materials ({subject.studyMaterials.length} PDFs)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('modules')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'modules'
                ? 'bg-teal text-white shadow-md'
                : 'bg-white dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-teal'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3. Concept Modules ({subject.modules.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-teal text-white shadow-md'
                : 'bg-white dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-teal'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>4. Practice Work ({subject.practiceWork.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tests')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'tests'
                ? 'bg-gold text-navy shadow-md'
                : 'bg-white dark:bg-navy text-slate-600 dark:text-slate-300 hover:text-gold'
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>5. Benchmark Tests ({subject.tests.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="bg-white dark:bg-navy rounded-3xl border border-slate-200/90 dark:border-navy-light/60 p-6 sm:p-10 shadow-md">
        {/* ================= TAB 1: UNITS & LECTURES ================= */}
        {activeTab === 'units' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-navy-light/40">
              <div>
                <h3 className="text-xl font-black text-navy dark:text-canvas">
                  Course Units &amp; Recorded Video Lectures
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Click on any unit to expand its video lectures, lesson topics, and downloadable handouts.
                </p>
              </div>
              <span className={BADGE_STYLES.teal}>{subject.units.length} Comprehensive Units</span>
            </div>

            <div className="space-y-4">
              {subject.units.map((unit) => {
                const isExpanded = expandedUnitId === unit.id || expandedUnitId === null

                return (
                  <div
                    key={unit.id}
                    className="rounded-2xl border border-slate-200 dark:border-navy-light/50 overflow-hidden transition-all"
                  >
                    {/* Unit Accordion Header */}
                    <button
                      type="button"
                      onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                      className="w-full p-5 bg-canvas dark:bg-navy-card/60 flex items-center justify-between text-left hover:bg-slate-100 dark:hover:bg-navy-card transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-teal text-white font-extrabold flex items-center justify-center text-xs">
                          U{unit.unitNumber}
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-navy dark:text-canvas">
                            Unit {unit.unitNumber}: {unit.title}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {unit.description}
                          </p>
                        </div>
                      </div>

                      <span className="text-xs font-bold text-teal flex items-center gap-1">
                        <span>{unit.lectures.length} Lectures</span>
                        <ChevronRight
                          className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                        />
                      </span>
                    </button>

                    {/* Lectures List */}
                    {isExpanded && (
                      <div className="p-4 sm:p-6 space-y-3 bg-white dark:bg-navy border-t border-slate-200 dark:border-navy-light/40">
                        {unit.lectures.map((lec) => (
                          <div
                            key={lec.id}
                            className="p-4 rounded-xl bg-canvas dark:bg-navy-card/40 border border-slate-200/80 dark:border-navy-light/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-teal transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <PlayCircle className="w-5 h-5 text-teal shrink-0" />
                              <div>
                                <h5 className="text-sm font-bold text-navy dark:text-canvas">
                                  Lecture {lec.lectureNumber}: {lec.title}
                                </h5>
                                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-teal" />
                                    {lec.duration}
                                  </span>
                                  {lec.notesAvailable && (
                                    <span className="text-teal font-semibold">Study Notes Included</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              className={`${BUTTON_STYLES.secondary} px-4 py-2 text-xs font-bold shrink-0 self-end sm:self-auto`}
                              onClick={() => alert(`Starting video streaming player for: ${lec.title}`)}
                            >
                              Watch Lecture &rarr;
                            </button>
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
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-navy-light/40">
              <div>
                <h3 className="text-xl font-black text-navy dark:text-canvas">
                  Downloadable Study Materials &amp; Formula Books
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Comprehensive PDF handbooks prepared by professors for exam revision and problem workouts.
                </p>
              </div>
              <span className={BADGE_STYLES.teal}>Free Academic Access</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subject.studyMaterials.map((mat) => (
                <div
                  key={mat.id}
                  className="p-6 rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/50 flex flex-col justify-between hover:border-teal transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-teal/15 text-teal flex items-center justify-center font-bold mb-4">
                      <FileText className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal">
                      {mat.type}
                    </span>

                    <h4 className="mt-2 text-base font-bold text-navy dark:text-canvas leading-snug">
                      {mat.title}
                    </h4>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {mat.description}
                    </p>

                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span>{mat.fileSize}</span>
                      <span>&bull;</span>
                      <span>{mat.pages} Pages</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-navy-light/40">
                    <button
                      type="button"
                      className={`${BUTTON_STYLES.primary} w-full py-2.5 text-xs font-bold gap-2`}
                      onClick={() => alert(`Downloading "${mat.title}" (${mat.fileSize}). PDF file ready.`)}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: MODULES ================= */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-navy-light/40">
              <div>
                <h3 className="text-xl font-black text-navy dark:text-canvas">
                  Sequential Concept Modules
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Step 1 of the basicS pedagogy: master the physics, geometry, and foundational definitions.
                </p>
              </div>
              <span className={BADGE_STYLES.teal}>{subject.modules.length} Concept Modules</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {subject.modules.map((mod, idx) => (
                <div
                  key={mod.id}
                  className="p-5 rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-teal/15 text-teal font-extrabold flex items-center justify-center text-xs">
                        M{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-navy dark:text-canvas">{mod.title}</h4>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{mod.duration} &bull; {mod.lessonsCount} Lessons</span>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {mod.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60 dark:border-navy-light/30">
                    {mod.topics.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-navy text-navy dark:text-canvas border border-slate-200 dark:border-navy-light/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 4: PRACTICE WORK ================= */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-navy-light/40">
              <div>
                <h3 className="text-xl font-black text-navy dark:text-canvas">
                  Graded Numerical Problem Sets
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Step 2 of the basicS pedagogy: apply equations, sketch free body diagrams, and derive solutions.
                </p>
              </div>
              <span className={BADGE_STYLES.teal}>{subject.practiceWork.length} Practice Sets</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subject.practiceWork.map((prac, i) => (
                <div
                  key={prac.id}
                  className="p-6 rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal">Set 0{i + 1}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          prac.difficulty === 'Beginner'
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                            : prac.difficulty === 'Intermediate'
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                            : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                        }`}
                      >
                        {prac.difficulty}
                      </span>
                    </div>

                    <h4 className="mt-3 text-base font-bold text-navy dark:text-canvas">{prac.title}</h4>
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {prac.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-navy-light/40 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{prac.problemsCount} Problems</span>
                    <button
                      type="button"
                      className={`${BUTTON_STYLES.primary} px-4 py-2 text-xs font-bold`}
                      onClick={() => alert(`Opening practice worksheet: ${prac.title}`)}
                    >
                      Solve Problems &rarr;
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: TESTS & ASSESSMENTS ================= */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-navy-light/40">
              <div>
                <h3 className="text-xl font-black text-navy dark:text-canvas">
                  Diagnostic Benchmark Tests for {subject.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Step 3 of the basicS pedagogy: evaluate your speed, accuracy, and depth of conceptual mastery.
                </p>
              </div>
              <span className={BADGE_STYLES.gold}>{subject.tests.length} Active Exams</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subject.tests.map((test) => (
                <div
                  key={test.id}
                  className="p-6 rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/50 flex flex-col justify-between hover:border-gold transition-all"
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gold/15 text-gold-dark dark:text-gold border border-gold/30">
                      {test.type}
                    </span>

                    <h4 className="mt-3 text-base font-bold text-navy dark:text-canvas">{test.title}</h4>

                    <div className="mt-4 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <div>Questions: <strong>{test.questionsCount}</strong></div>
                      <div>Duration: <strong>{test.duration}</strong></div>
                      <div>Pass Mark: <strong>{test.passingScore}%</strong></div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 dark:border-navy-light/40">
                    <Link
                      to="/take-tests"
                      className={`${BUTTON_STYLES.gold} w-full py-2.5 text-xs font-bold block text-center`}
                    >
                      Enter Test Arena &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
