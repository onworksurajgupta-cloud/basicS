import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, Home } from 'lucide-react'
import { BUTTON_STYLES } from '../theme/tokens'

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 text-center">
      <div className="max-w-md space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-teal/15 text-teal flex items-center justify-center mx-auto shadow-md">
          <GraduationCap className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal to-gold">
            404
          </span>
          <h1 className="text-2xl font-black text-navy dark:text-canvas">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The page or curriculum resource you are looking for does not exist, has been moved, or has not yet been published.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className={`${BUTTON_STYLES.primary} w-full sm:w-auto px-6 py-2.5 text-xs font-bold gap-2`}
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/courses"
            className={`${BUTTON_STYLES.secondary} w-full sm:w-auto px-6 py-2.5 text-xs font-bold gap-2`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Courses</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
