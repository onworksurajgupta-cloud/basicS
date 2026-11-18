import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  Wrench,
  Binary,
  Activity,
  Layers,
  BookOpen,
  FileCode,
  FileCheck2,
  Bell,
  Star,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Award,
} from 'lucide-react'
import { SUBJECTS } from '../data/curriculum'
import { ANNOUNCEMENTS } from '../data/announcements'
import { HeroInteractiveLab } from '../components/HeroInteractiveLab'
import { EngineeringQuizTeaser } from '../components/EngineeringQuizTeaser'
import { BUTTON_STYLES } from '../theme/tokens'

export function HomePage() {
  return (
    <div className="space-y-20 pb-20">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 border-b border-slate-200/80 dark:border-navy-light/40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal/15 blur-3xl pointer-events-none rounded-full -z-10" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold/10 blur-3xl pointer-events-none rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-6 text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-navy-card border border-slate-200/90 dark:border-navy-light shadow-xs mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
                <span className="text-xs font-bold text-navy/90 dark:text-canvas/90">
                  Engineering Education &bull; Built From First Principles
                </span>
                <Sparkles className="w-3.5 h-3.5 text-gold" />
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-navy dark:text-canvas leading-[1.12]">
                Master Complex Mechanical Engineering.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-teal-light to-gold">
                  From the Basics Up.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                Tired of memorizing rigid formulas without intuition? <strong className="text-navy dark:text-canvas">basicS</strong> breaks down{' '}
                <em>Mechanics of Solids</em>, <em>FEA</em>, <em>Vibration</em>, and <em>Basic Mechanical Engineering</em> into an intuitive 3-step cycle:
                Concept Modules &rarr; Numerical Practice &rarr; Diagnostic Tests.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5">
                <Link
                  to="/courses"
                  className={`${BUTTON_STYLES.primary} w-full sm:w-auto px-7 py-3.5 text-sm gap-2 font-bold`}
                >
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/online-class"
                  className={`${BUTTON_STYLES.secondary} w-full sm:w-auto px-6 py-3.5 text-sm gap-2 font-bold`}
                >
                  <Wrench className="w-4 h-4 text-teal" />
                  Join Online Class
                </Link>
              </div>

              {/* Social Proof Trust Bar */}
              <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-navy-light/40 flex items-center gap-6">
                <div className="flex -space-x-2">
                  {['#0D9488', '#101D35', '#F4B942', '#14B8A6'].map((bg, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white dark:border-navy flex items-center justify-center text-[10px] font-bold text-white shadow-xs"
                      style={{ backgroundColor: bg }}
                    >
                      {['AK', 'ER', 'MT', 'SV'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-gold text-xs">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-gold" />
                    ))}
                    <span className="text-navy dark:text-canvas font-bold ml-1">4.96 / 5</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Trusted by 12,000+ engineering students & self-learners
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive Virtual Lab Preview */}
            <div className="lg:col-span-6 w-full">
              <HeroInteractiveLab />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ANNOUNCEMENTS SECTION ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light shadow-md">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-navy-light/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center font-bold">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-navy dark:text-canvas">
                  Latest Announcements & Notices
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Stay updated on upcoming live sessions, test releases, and cohort milestones.
                </p>
              </div>
            </div>

            <Link
              to="/online-class"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-teal hover:underline"
            >
              <span>View Online Schedule</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {ANNOUNCEMENTS.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all ${
                  item.isImportant
                    ? 'bg-amber-500/5 dark:bg-navy-card border-gold/30 hover:border-gold'
                    : 'bg-canvas dark:bg-navy-card/50 border-slate-200 dark:border-navy-light/40 hover:border-teal'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      item.category === 'Live Class'
                        ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                        : item.category === 'Exams'
                        ? 'bg-gold/15 text-gold-dark dark:text-gold border border-gold/30'
                        : 'bg-teal/10 text-teal border border-teal/20'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-navy dark:text-canvas leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED COURSES SECTION ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
              <BookOpen className="w-4 h-4" />
              <span>Core Academic Curriculum</span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-navy dark:text-canvas">
              Featured Engineering Subjects
            </h2>
          </div>
          <Link
            to="/courses"
            className={`${BUTTON_STYLES.primary} px-6 py-2.5 text-xs sm:text-sm font-bold gap-2 self-start md:self-auto`}
          >
            <span>Explore All Subjects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {SUBJECTS.map((sub) => {
            const isGold = sub.accentColor === 'gold'
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
                </div>

                {/* 3-Step Badges & Link to Subject Details */}
                <div className="p-6 sm:p-7 space-y-5">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40 shadow-xs">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Units</div>
                      <div className="text-sm font-black text-teal mt-0.5">
                        {sub.units.length} Units
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40 shadow-xs">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Practice</div>
                      <div className="text-sm font-black text-teal mt-0.5">
                        {sub.practiceWork.length} Sets
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40 shadow-xs">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Exams</div>
                      <div className="text-sm font-black text-gold mt-0.5">
                        {sub.tests.length} Tests
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-teal flex items-center gap-1 group-hover:underline">
                      <span>View Full Subject Curriculum</span>
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </span>

                    <Link
                      to={`/courses/${sub.id}`}
                      className={`${BUTTON_STYLES.primary} px-5 py-2.5 text-xs font-bold`}
                    >
                      Open Subject &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ==================== BENTO GRID: 3-STEP LEARNING METHOD ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal">
            The basicS Standard
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-navy dark:text-canvas">
            How Every Subject Is Engineered
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            A cohesive three-tier methodology turning abstract mechanical engineering equations into tangible understanding.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light shadow-md hover:border-teal transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal/15 text-teal flex items-center justify-center font-bold mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal">Phase 01</span>
              <h3 className="mt-1 text-xl font-black text-navy dark:text-canvas">Units & Concept Lectures</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Clear visual video lectures, physical intuition, and complete first-principles mathematical derivations.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-light/40 text-xs font-bold text-teal flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>4 Units &amp; 12+ Lectures Per Subject</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light shadow-md hover:border-teal transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal/15 text-teal flex items-center justify-center font-bold mb-6">
                <FileCode className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal">Phase 02</span>
              <h3 className="mt-1 text-xl font-black text-navy dark:text-canvas">Numerical Practice Work</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Real engineering problem sets, free body diagram workouts, and step-by-step verified numerical solutions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-light/40 text-xs font-bold text-teal flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Graded Calculation Sets</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light shadow-md hover:border-gold transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold-dark dark:text-gold flex items-center justify-center font-bold mb-6">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold-dark dark:text-gold">Phase 03</span>
              <h3 className="mt-1 text-xl font-black text-navy dark:text-canvas">Diagnostic Benchmark Tests</h3>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Timed MCQ tests and descriptive examinations replicating university, FE, and technical certification exams.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-light/40 text-xs font-bold text-gold flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>Real Exam Arenas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== QUIZ CHALLENGE ==================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-teal">
            Sample Problem Workout
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-navy dark:text-canvas">
            Test Your Engineering Intuition
          </h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Experience our instant, insightful calculation feedback right now.
          </p>
        </div>

        <EngineeringQuizTeaser />
      </section>
    </div>
  )
}
