import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'
import { SUBJECTS } from '../../data/curriculum'
import { BADGE_STYLES } from '../../theme/tokens'

export function Footer() {
  return (
    <footer className="bg-white dark:bg-navy border-t border-slate-200 dark:border-navy-light/60 py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-navy dark:bg-navy-card border border-teal/40 flex items-center justify-center text-teal">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-navy dark:text-canvas">
                basic<span className="text-teal">S</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block ml-0.5" />
              </span>
            </Link>
            <p className="mt-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Premium Multi-Subject Mechanical Engineering Learning Management System with structured Units, Lectures, Practice Work, and Tests.
            </p>
            <div className="mt-4">
              <span className={BADGE_STYLES.teal}>Full Multi-Page LMS Active</span>
            </div>
          </div>

          {/* Academic Disciplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-4">
              Engineering Disciplines
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              {SUBJECTS.map((s) => (
                <li key={s.id}>
                  <Link
                    to={`/courses/${s.id}`}
                    className="hover:text-teal transition-colors"
                  >
                    {s.name} ({s.code})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-4">
              Academic Portals
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
              <li><Link to="/" className="hover:text-teal">Home Overview</Link></li>
              <li><Link to="/courses" className="hover:text-teal">Courses Catalog</Link></li>
              <li><Link to="/online-class" className="hover:text-teal">Online Class & Meet</Link></li>
              <li><Link to="/take-tests" className="hover:text-teal">Take Tests Arena</Link></li>
              <li><Link to="/contact" className="hover:text-teal">Contact Support</Link></li>
              <li><Link to="/login" className="hover:text-teal">Student Login</Link></li>
            </ul>
          </div>

          {/* Technical Specifications */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy dark:text-canvas mb-4">
              Design Architecture
            </h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <li><strong className="text-navy dark:text-canvas">Palette:</strong> Deep Navy, Teal, White, Gold</li>
              <li><strong className="text-navy dark:text-canvas">Routing:</strong> React Router (SPA)</li>
              <li><strong className="text-navy dark:text-canvas">Hosting:</strong> Cloudflare Pages Compatible</li>
              <li><strong className="text-teal">Status:</strong> Phase 1 Multi-Page Foundation</li>
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
  )
}
