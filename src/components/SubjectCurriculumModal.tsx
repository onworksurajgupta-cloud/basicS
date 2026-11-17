import { useState } from 'react'
import {
  X,
  BookOpen,
  FileCode,
  FileCheck2,
  Clock,
  HelpCircle,
  Layers,
  ChevronRight,
  Sparkles,
  Wrench,
  Binary,
  Activity,
  PlayCircle,
  Award,
} from 'lucide-react'
import type { Subject } from '../data/curriculum'
import { BUTTON_STYLES, BADGE_STYLES } from '../theme/tokens'

interface SubjectCurriculumModalProps {
  subject: Subject | null
  onClose: () => void
}

export function SubjectCurriculumModal({ subject, onClose }: SubjectCurriculumModalProps) {
  const [activeTab, setActiveTab] = useState<'modules' | 'practice' | 'tests'>('modules')

  if (!subject) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-navy-dark/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-navy rounded-3xl border border-slate-200/90 dark:border-navy-light shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Banner with Visual Engineering Hero */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-navy via-navy-card to-navy text-canvas relative border-b border-navy-light/60 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-teal/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/10 blur-3xl rounded-full pointer-events-none" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-canvas transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal text-white shadow-xs">
                {subject.code}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-canvas border border-white/20">
                {subject.level} Level
              </span>
              <span className="text-xs text-gold flex items-center gap-1 font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Engineering Standard
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-teal/20 text-teal-light border border-teal/40 flex items-center justify-center shrink-0">
                {subject.id === 'bme' && <Wrench className="w-7 h-7 text-teal-light" />}
                {subject.id === 'fea' && <Binary className="w-7 h-7 text-gold" />}
                {subject.id === 'mech-vib' && <Activity className="w-7 h-7 text-teal-light" />}
                {subject.id === 'mos' && <Layers className="w-7 h-7 text-gold" />}
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {subject.name}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {subject.description}
                </p>
              </div>
            </div>

            {/* 3-Tier Navigation Tabs (Modules -> Practice Work -> Tests) */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-navy-light/40 pt-5">
              <button
                type="button"
                onClick={() => setActiveTab('modules')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'modules'
                    ? 'bg-teal text-white shadow-md shadow-teal/30 scale-[1.02]'
                    : 'bg-navy-light/50 text-slate-300 hover:bg-navy-light hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>1. Modules ({subject.modules.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'practice'
                    ? 'bg-teal text-white shadow-md shadow-teal/30 scale-[1.02]'
                    : 'bg-navy-light/50 text-slate-300 hover:bg-navy-light hover:text-white'
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>2. Practice Work ({subject.practiceWork.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('tests')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'tests'
                    ? 'bg-gold text-navy shadow-md shadow-gold/30 scale-[1.02]'
                    : 'bg-navy-light/50 text-slate-300 hover:bg-navy-light hover:text-white'
                }`}
              >
                <FileCheck2 className="w-4 h-4" />
                <span>3. Tests & Assessments ({subject.tests.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-4 flex-1 bg-canvas dark:bg-navy-dark text-navy dark:text-canvas">
          {/* ---------------- TAB 1: MODULES ---------------- */}
          {activeTab === 'modules' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-navy dark:text-canvas">
                    Theory & Concept Modules
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Master theoretical intuition and derivations first before moving to numerical practice.
                  </p>
                </div>
                <span className={BADGE_STYLES.teal}>
                  {subject.modules.reduce((acc, m) => acc + m.lessonsCount, 0)} Total Lessons
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {subject.modules.map((mod, index) => (
                  <div
                    key={mod.id}
                    className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/90 dark:border-navy-light/60 shadow-xs hover:border-teal transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-9 h-9 rounded-xl bg-teal/15 text-teal font-extrabold flex items-center justify-center text-sm">
                          0{index + 1}
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-navy dark:text-canvas">
                            {mod.title}
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-teal" />
                          {mod.duration}
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Layers className="w-3.5 h-3.5 text-teal" />
                          {mod.lessonsCount} Lessons
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {mod.description}
                    </p>

                    {/* Lesson Topics */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-light/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Included Topics:
                        </span>
                        <div className="mt-1.5 flex flex-wrap gap-1.5">
                          {mod.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-xs rounded-lg bg-canvas dark:bg-navy-card text-navy dark:text-canvas border border-slate-200/80 dark:border-navy-light/40 font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:underline self-end sm:self-center shrink-0 cursor-pointer"
                        onClick={() => alert(`Starting video lecture and study notes for: ${mod.title}`)}
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Start Module</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- TAB 2: PRACTICE WORK ---------------- */}
          {activeTab === 'practice' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-navy dark:text-canvas">
                    Hands-On Practice Work & Numerical Sets
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Apply formulas, derive formulations, and solve real engineering calculations with step-by-step solutions.
                  </p>
                </div>
                <span className={BADGE_STYLES.teal}>Calculations & Worksheets</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {subject.practiceWork.map((practice, index) => (
                  <div
                    key={practice.id}
                    className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/90 dark:border-navy-light/60 shadow-xs hover:border-teal transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-teal">
                          Practice Set #{index + 1}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                            practice.difficulty === 'Beginner'
                              ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                              : practice.difficulty === 'Intermediate'
                              ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                          }`}
                        >
                          {practice.difficulty}
                        </span>
                      </div>

                      <h4 className="mt-2 text-base font-bold text-navy dark:text-canvas">
                        {practice.title}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {practice.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-navy-light/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 font-medium">
                          <HelpCircle className="w-3.5 h-3.5 text-teal" />
                          {practice.problemsCount} Numerical Problems
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-teal" />
                          Est. Time: {practice.estimatedTime}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`${BUTTON_STYLES.primary} px-5 py-2 text-xs font-bold`}
                        onClick={() => alert(`Opening worksheet with ${practice.problemsCount} questions for: ${practice.title}`)}
                      >
                        Open Worksheet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- TAB 3: TESTS & ASSESSMENTS ---------------- */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                <div>
                  <h3 className="text-lg font-bold text-navy dark:text-canvas">
                    Tests & Diagnostic Assessments
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Timed diagnostic tests and final benchmark certifications for {subject.name}.
                  </p>
                </div>
                <span className={BADGE_STYLES.gold}>Exam Arena</span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {subject.tests.map((test, index) => (
                  <div
                    key={test.id}
                    className="p-5 rounded-2xl bg-white dark:bg-navy border border-slate-200/90 dark:border-navy-light/60 shadow-xs hover:border-gold transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gold/15 text-gold-dark dark:text-gold border border-gold/30">
                          {test.type}
                        </span>
                        <span className="text-xs font-bold text-teal flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          Passing Score: {test.passingScore}%
                        </span>
                      </div>

                      <h4 className="mt-3 text-base font-bold text-navy dark:text-canvas">
                        {test.title}
                      </h4>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-navy-light/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1 font-medium">
                          <HelpCircle className="w-3.5 h-3.5 text-gold" />
                          {test.questionsCount} Exam Questions
                        </span>
                        <span className="flex items-center gap-1 font-medium">
                          <Clock className="w-3.5 h-3.5 text-gold" />
                          Duration: {test.duration}
                        </span>
                      </div>

                      <button
                        type="button"
                        className={`${BUTTON_STYLES.gold} px-5 py-2 text-xs font-bold`}
                        onClick={() => alert(`Launching timed assessment test: ${test.title} (${test.duration})`)}
                      >
                        Start Test #{index + 1}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white dark:bg-navy border-t border-slate-200 dark:border-navy-light/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <span>Engineering Pathway:</span>
            <span className="font-bold text-teal">1. Modules</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-teal">2. Practice Work</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-gold">3. Benchmark Test</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`${BUTTON_STYLES.secondary} px-6 py-2 text-xs sm:text-sm font-semibold`}
          >
            Close Curriculum Window
          </button>
        </div>
      </div>
    </div>
  )
}
