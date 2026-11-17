import { useState, useEffect } from 'react'
import {
  GraduationCap,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Binary,
  Layers,
  FileCode,
  FileCheck2,
  BookOpen,
  PlusCircle,
  Wrench,
  Activity,
  Award,
  CheckCircle2,
  Star,
} from 'lucide-react'
import { BUTTON_STYLES, BADGE_STYLES } from './theme/tokens'
import { SUBJECTS, type Subject } from './data/curriculum'
import { SubjectCurriculumModal } from './components/SubjectCurriculumModal'
import { HeroInteractiveLab } from './components/HeroInteractiveLab'
import { EngineeringQuizTeaser } from './components/EngineeringQuizTeaser'

export default function App() {
  // Theme state: reads from localStorage or falls back to system preference
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('basicS-theme')
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  // Synchronize '.dark' class on root <html> element
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('basicS-theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('basicS-theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }


  return (
    <div className="min-h-screen flex flex-col bg-canvas dark:bg-navy-dark text-navy dark:text-canvas transition-colors duration-300 selection:bg-teal selection:text-white bg-grid-subtle">
      {/* ==================== FLOATING GLASS NAVBAR ==================== */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-navy/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-navy-light/60 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo with Glow */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-navy to-navy-light dark:from-navy-card dark:to-teal-dark border border-teal/40 flex items-center justify-center text-teal-light shadow-md shadow-teal/15 group cursor-pointer">
                <GraduationCap className="w-6 h-6 text-teal group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <a href="#" className="text-2xl font-black tracking-tight text-navy dark:text-canvas flex items-baseline">
                  basic<span className="text-teal">S</span>
                  <span className="w-2 h-2 rounded-full bg-gold ml-0.5 animate-pulse" />
                </a>
                <span className="text-[10px] tracking-wider uppercase font-extrabold text-slate-500 dark:text-slate-400">
                  Engineering LMS
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-bold text-navy/80 dark:text-canvas/80">
              <a href="#subjects" className="hover:text-teal dark:hover:text-teal-light transition-colors">
                Disciplines ({SUBJECTS.length})
              </a>
              <a href="#virtual-lab" className="hover:text-teal dark:hover:text-teal-light transition-colors">
                Virtual Workbench
              </a>
              <a href="#learning-method" className="hover:text-teal dark:hover:text-teal-light transition-colors">
                3-Step Method
              </a>
              <a href="#practice-challenge" className="hover:text-teal dark:hover:text-teal-light transition-colors">
                Interactive Quiz
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Working Theme Switcher Button */}
              <button
                type="button"
                onClick={toggleTheme}
                className={BUTTON_STYLES.icon}
                aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
                title={`Currently in ${isDark ? 'Dark' : 'Light'} Mode. Click to toggle.`}
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gold animate-in spin-in-180 duration-300" />
                ) : (
                  <Moon className="w-5 h-5 text-navy animate-in spin-in-180 duration-300" />
                )}
              </button>

              <button
                type="button"
                className="px-4 py-2.5 text-sm font-bold text-navy dark:text-canvas hover:text-teal dark:hover:text-teal-light transition-colors cursor-pointer"
                onClick={() => alert('Authentication will be integrated in Phase 2.')}
              >
                Sign In
              </button>

              <button
                type="button"
                className={`${BUTTON_STYLES.primary} px-5 py-2.5 text-sm`}
                onClick={() => {
                  const bme = SUBJECTS[0]
                  if (bme) setSelectedSubject(bme)
                }}
              >
                Start Learning Free
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-2 md:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                className={BUTTON_STYLES.icon}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5 text-navy" />}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-navy dark:text-canvas hover:bg-slate-200/50 dark:hover:bg-navy-light/50 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 dark:border-navy-light/60 bg-white/95 dark:bg-navy/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-2xl">
            <a
              href="#subjects"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-navy dark:text-canvas hover:bg-slate-100 dark:hover:bg-navy-card hover:text-teal"
            >
              Engineering Disciplines ({SUBJECTS.length})
            </a>
            <a
              href="#virtual-lab"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-navy dark:text-canvas hover:bg-slate-100 dark:hover:bg-navy-card hover:text-teal"
            >
              Virtual Workbench
            </a>
            <a
              href="#learning-method"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-navy dark:text-canvas hover:bg-slate-100 dark:hover:bg-navy-card hover:text-teal"
            >
              3-Step Method
            </a>
            <a
              href="#practice-challenge"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-bold text-navy dark:text-canvas hover:bg-slate-100 dark:hover:bg-navy-card hover:text-teal"
            >
              Interactive Quiz
            </a>

            <div className="pt-4 border-t border-slate-200 dark:border-navy-light/40 flex flex-col space-y-2">
              <button
                type="button"
                className="w-full py-2.5 text-sm font-bold rounded-xl border border-slate-300 dark:border-navy-light text-navy dark:text-canvas"
                onClick={() => alert('Authentication will be integrated in Phase 2.')}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`${BUTTON_STYLES.primary} w-full py-2.5 text-sm`}
                onClick={() => {
                  setMobileMenuOpen(false)
                  const bme = SUBJECTS[0]
                  if (bme) setSelectedSubject(bme)
                }}
              >
                Start Learning Free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ==================== HERO SECTION (SPLIT SCREEN DESKTOP) ==================== */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80 dark:border-navy-light/40">
        {/* Glow ambient backdrops */}
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
                <a
                  href="#subjects"
                  className={`${BUTTON_STYLES.primary} w-full sm:w-auto px-7 py-3.5 text-sm gap-2 font-bold`}
                >
                  Explore All 4 Subjects
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#virtual-lab"
                  className={`${BUTTON_STYLES.secondary} w-full sm:w-auto px-6 py-3.5 text-sm gap-2 font-bold`}
                >
                  <Wrench className="w-4 h-4 text-teal" />
                  Try Virtual Lab Below
                </a>
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
            <div id="virtual-lab" className="lg:col-span-6 w-full">
              <HeroInteractiveLab />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4 CORE SUBJECTS DIRECTORY (VISUAL CARDS) ==================== */}
      <section id="subjects" className="py-20 bg-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                <Wrench className="w-4 h-4" />
                <span>Active Mechanical Engineering Disciplines</span>
              </div>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-navy dark:text-canvas">
                Featured Engineering Subjects
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
              Each discipline contains a complete 3-step syllabus: <span className="text-teal font-bold">Modules</span>,{' '}
              <span className="text-teal font-bold">Practice Work</span>, and <span className="text-gold font-bold">Tests</span>.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {SUBJECTS.map((sub) => {
              const isGold = sub.accentColor === 'gold'
              return (
                <div
                  key={sub.id}
                  className="group bg-canvas dark:bg-navy-card rounded-3xl border border-slate-200/90 dark:border-navy-light/60 overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  onClick={() => setSelectedSubject(sub)}
                >
                  {/* Card Visual Hero Banner */}
                  <div className={`p-6 sm:p-7 relative border-b border-slate-200 dark:border-navy-light/40 overflow-hidden ${
                    isGold
                      ? 'bg-gradient-to-r from-amber-500/10 via-gold/10 to-transparent dark:from-navy dark:via-navy-light/30 dark:to-navy'
                      : 'bg-gradient-to-r from-teal/10 via-teal-light/10 to-transparent dark:from-navy dark:via-navy-light/30 dark:to-navy'
                  }`}>
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

                  {/* 3-Step Pathway Badges on Card */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/40 shadow-xs">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step 1</div>
                        <div className="text-sm font-black text-teal mt-0.5">
                          {sub.modules.length} Modules
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/40 shadow-xs">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step 2</div>
                        <div className="text-sm font-black text-teal mt-0.5">
                          {sub.practiceWork.length} Practice Sets
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/40 shadow-xs">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Step 3</div>
                        <div className="text-sm font-black text-gold mt-0.5">
                          {sub.tests.length} Tests
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-teal flex items-center gap-1 group-hover:underline">
                        <span>Open Syllabus & Practice</span>
                        <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                      </span>

                      <button
                        type="button"
                        className={`${BUTTON_STYLES.primary} px-5 py-2.5 text-xs font-bold`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedSubject(sub)
                        }}
                      >
                        Start Learning &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ==================== BENTO GRID: 3-STEP LEARNING METHOD ==================== */}
      <section id="learning-method" className="py-20 bg-canvas dark:bg-navy-dark transition-colors duration-300 border-t border-slate-200/80 dark:border-navy-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-teal">
              Proven Pedagogical Architecture
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-navy dark:text-canvas">
              How Every Subject Works
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              No guessing what to study. Every discipline follows this structured sequence to guarantee mastery.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Box 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light shadow-md hover:border-teal transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal/15 text-teal flex items-center justify-center font-bold mb-6">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal">Stage 01</span>
                <h3 className="mt-1 text-xl font-black text-navy dark:text-canvas">Theory & Concept Modules</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Clear visual video lectures and mathematical derivations that build genuine physical intuition before calculation.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-light/40 text-xs font-bold text-teal flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>4 Modules Per Subject</span>
              </div>
            </div>

            {/* Bento Box 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light shadow-md hover:border-teal transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal/15 text-teal flex items-center justify-center font-bold mb-6">
                  <FileCode className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal">Stage 02</span>
                <h3 className="mt-1 text-xl font-black text-navy dark:text-canvas">Hands-On Practice Work</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real engineering numerical sets, calculation worksheets, free-body diagrams, and step-by-step verified solutions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-light/40 text-xs font-bold text-teal flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>3 Practice Sets Per Subject</span>
              </div>
            </div>

            {/* Bento Box 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light shadow-md hover:border-gold transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gold/15 text-gold-dark dark:text-gold flex items-center justify-center font-bold mb-6">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-dark dark:text-gold">Stage 03</span>
                <h3 className="mt-1 text-xl font-black text-navy dark:text-canvas">Diagnostic Benchmark Tests</h3>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Timed quizzes, midterm evaluations, and comprehensive final certification exams to prove true readiness.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-light/40 text-xs font-bold text-gold flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>3 Tests Per Subject</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== INTERACTIVE QUIZ CHALLENGE ==================== */}
      <section id="practice-challenge" className="py-20 bg-white dark:bg-navy transition-colors duration-300 border-t border-slate-200/80 dark:border-navy-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-teal">
              Sample the Experience
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-navy dark:text-canvas">
              Try an Interactive Practice Question
            </h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              See how basicS gives immediate, insightful feedback to build strong engineering fundamentals.
            </p>
          </div>

          <EngineeringQuizTeaser />
        </div>
      </section>

      {/* ==================== EXTENSIBILITY HIGHLIGHT ==================== */}
      <section className="py-16 bg-canvas dark:bg-navy-dark transition-colors duration-300 border-t border-slate-200/80 dark:border-navy-light/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-navy-card border border-teal/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/10 text-teal-dark dark:text-teal-light text-xs font-bold uppercase tracking-wider mb-3">
                <PlusCircle className="w-4 h-4" />
                <span>Extensible Architecture</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-navy dark:text-canvas">
                Ready to Add More Subjects in the Future?
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                basicS is built with zero hardcoding. When you want to add <em>Fluid Mechanics</em>, <em>Heat Transfer</em>, or <em>Dynamics</em>,
                simply add a new subject object to <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy font-mono text-teal font-semibold">src/data/curriculum.ts</code> and it will instantly populate across the website with full Modules, Practice Work, and Tests!
              </p>
            </div>

            <button
              type="button"
              className={`${BUTTON_STYLES.secondary} px-6 py-3 text-xs sm:text-sm whitespace-nowrap font-bold`}
              onClick={() => {
                alert('Curriculum data is cleanly organized in src/data/curriculum.ts. Just copy and paste a subject block to add a new course!')
              }}
            >
              Learn How to Add Subjects
            </button>
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="relative overflow-hidden bg-navy text-canvas py-20 border-t border-navy-light/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/15 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-white/10 border border-teal/40 flex items-center justify-center text-teal mb-6 shadow-xl shadow-teal/15">
            <GraduationCap className="w-9 h-9 text-teal" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Start Mastering Engineering on <span className="text-teal">basic</span>
            <span className="text-gold">S</span> Today
          </h2>

          <p className="mt-5 text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join thousands of engineering students mastering foundational concepts with clarity, precision, and depth.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              className={`${BUTTON_STYLES.primary} w-full sm:w-auto px-8 py-4 text-sm font-bold gap-2`}
              onClick={() => {
                const bme = SUBJECTS[0]
                if (bme) setSelectedSubject(bme)
              }}
            >
              Start Basic Mechanical Engineering
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="#subjects"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold rounded-xl border border-navy-light bg-navy-card/80 text-canvas hover:bg-navy-light transition-colors"
            >
              View All 4 Disciplines
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-white dark:bg-navy border-t border-slate-200 dark:border-navy-light/60 py-14 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Brand Info */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-navy dark:bg-navy-card border border-teal/40 flex items-center justify-center text-teal">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xl font-black text-navy dark:text-canvas">
                  basic<span className="text-teal">S</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block ml-0.5" />
                </span>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Multi-Subject Engineering LMS with structured Modules, Practice Work, and Tests.
              </p>
              <div className="mt-4">
                <span className={BADGE_STYLES.teal}>4 Subjects Active &bull; Fully Extensible</span>
              </div>
            </div>

            {/* Subjects List */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-4">
                Core Disciplines
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {SUBJECTS.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      className="hover:text-teal text-left cursor-pointer transition-colors"
                      onClick={() => setSelectedSubject(s)}
                    >
                      {s.name} ({s.code})
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum Structure */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-4">
                3-Step Learning
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                <li><a href="#learning-method" className="hover:text-teal">1. Concept Modules</a></li>
                <li><a href="#learning-method" className="hover:text-teal">2. Practice Worksheets</a></li>
                <li><a href="#learning-method" className="hover:text-teal">3. Diagnostic Tests</a></li>
                <li><a href="#virtual-lab" className="hover:text-teal">Virtual Workbench</a></li>
              </ul>
            </div>

            {/* Platform Information */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-4">
                Platform Design
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                <li><strong className="text-navy dark:text-canvas">Palette:</strong> Deep Navy, Teal, White, Gold</li>
                <li><strong className="text-navy dark:text-canvas">Theme:</strong> Persistent Light/Dark Toggle</li>
                <li><strong className="text-navy dark:text-canvas">Engine:</strong> React 19, Vite, Tailwind CSS</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-navy-light/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} basicS Learning Systems. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 font-medium">
              English &bull; Responsive &bull; Mechanical Engineering LMS
            </p>
          </div>
        </div>
      </footer>

      {/* ==================== INTERACTIVE CURRICULUM MODAL ==================== */}
      <SubjectCurriculumModal
        subject={selectedSubject}
        onClose={() => setSelectedSubject(null)}
      />
    </div>
  )
}
