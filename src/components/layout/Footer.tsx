import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { SUBJECTS } from '../../data/curriculum'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-navy border-t border-slate-200 dark:border-navy-light/60 py-10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-navy dark:bg-navy-card border border-teal/40 flex items-center justify-center text-teal">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-navy dark:text-canvas">
                basic<span className="text-teal">S</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block ml-0.5" />
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Simple, structured mechanical engineering education for students and self-learners.
            </p>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-3">
              Courses
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {SUBJECTS.map((s) => (
                <li key={s.id}>
                  <Link to={`/courses/${s.id}`} className="hover:text-teal transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-3">
              Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link to="/courses" className="hover:text-teal">All Courses</Link></li>
              <li><Link to="/online-class" className="hover:text-teal">Online Class</Link></li>
              <li><Link to="/take-tests" className="hover:text-teal">Take Tests</Link></li>
              <li><Link to="/contact" className="hover:text-teal">Contact</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-3">
              About
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Designed with React, Vite &amp; Tailwind CSS. Built with a clean, sober EdTech design system.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-navy-light/30 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
          <p>© {new Date().getFullYear()} basicS. All rights reserved.</p>
          <p className="mt-1 sm:mt-0">English &bull; Clean &amp; Sober</p>
        </div>
      </div>
    </footer>
  )
}
