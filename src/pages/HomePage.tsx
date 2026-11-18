import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
} from 'lucide-react'
import { SUBJECTS } from '../data/curriculum'
import { ANNOUNCEMENTS } from '../data/announcements'
import { BUTTON_STYLES } from '../theme/tokens'

export function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* ==================== CLEAN & SOBER HERO ==================== */}
      <section className="text-center max-w-3xl mx-auto space-y-5 pt-4">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal/10 text-teal-dark dark:text-teal-light border border-teal/20">
          Mechanical Engineering LMS
        </span>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy dark:text-canvas tracking-tight leading-tight">
          Learn Mechanical Engineering.{' '}
          <span className="text-teal">From the Basics Up.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          A structured multi-subject learning platform covering Basic Mechanical Engineering, Finite Element Analysis, Mechanical Vibration, and Mechanics of Solids.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/courses"
            className={`${BUTTON_STYLES.primary} w-full sm:w-auto px-6 py-3 text-sm font-semibold gap-2`}
          >
            <span>Explore Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/take-tests"
            className={`${BUTTON_STYLES.secondary} w-full sm:w-auto px-6 py-3 text-sm font-semibold`}
          >
            Take Tests
          </Link>
        </div>
      </section>

      {/* ==================== ANNOUNCEMENTS ==================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-navy-light/40">
          <h2 className="text-base font-bold text-navy dark:text-canvas">Announcements</h2>
          <Link to="/online-class" className="text-xs font-semibold text-teal hover:underline">
            View Live Class Schedule &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {ANNOUNCEMENTS.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 space-y-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-teal">{item.category}</span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </span>
              </div>
              <h3 className="text-sm font-bold text-navy dark:text-canvas">{item.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 4 SUBJECTS ==================== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-navy-light/40">
          <div>
            <h2 className="text-xl font-bold text-navy dark:text-canvas">Subjects</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every subject follows: Modules &rarr; Practice Work &rarr; Test.
            </p>
          </div>
          <Link to="/courses" className="text-xs font-semibold text-teal hover:underline">
            All Courses &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBJECTS.map((sub) => (
            <div
              key={sub.id}
              className="p-5 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 hover:border-teal transition-colors flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-teal">{sub.code}</span>
                  <span className="text-slate-400">{sub.level} Level</span>
                </div>

                <h3 className="text-base font-bold text-navy dark:text-canvas">
                  {sub.name}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {sub.tagline}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-500 pt-2">
                  <span>{sub.units.length} Units</span>
                  <span>&bull;</span>
                  <span>{sub.practiceWork.length} Practice Sets</span>
                  <span>&bull;</span>
                  <span>{sub.tests.length} Tests</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-navy-light/30 flex justify-end">
                <Link
                  to={`/courses/${sub.id}`}
                  className={`${BUTTON_STYLES.primary} px-4 py-2 text-xs`}
                >
                  View Course &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SIMPLE 3-STEP LEARNING METHOD ==================== */}
      <section className="p-6 bg-slate-50 dark:bg-navy-card/40 rounded-xl border border-slate-200 dark:border-navy-light/40 space-y-4">
        <h3 className="text-sm font-bold text-navy dark:text-canvas uppercase tracking-wider text-center">
          The basicS Learning Structure
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white dark:bg-navy-card rounded-lg border border-slate-200 dark:border-navy-light/40">
            <div className="text-xs font-bold text-teal mb-1">1. Modules &amp; Lectures</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Video lessons and foundational theory broken down into bite-sized units.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-navy-card rounded-lg border border-slate-200 dark:border-navy-light/40">
            <div className="text-xs font-bold text-teal mb-1">2. Practice Work</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hands-on numerical problem sets and worksheets with step-by-step solutions.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-navy-card rounded-lg border border-slate-200 dark:border-navy-light/40">
            <div className="text-xs font-bold text-gold mb-1">3. Tests</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Timed diagnostic assessments to check your understanding and exam readiness.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
