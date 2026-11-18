import { Video, Calendar, Clock, ExternalLink } from 'lucide-react'
import { UPCOMING_CLASSES, RECORDED_LECTURES } from '../data/onlineClasses'
import { BUTTON_STYLES } from '../theme/tokens'

export function OnlineClassPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy dark:text-canvas">
          Online Classes
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Join upcoming Google Meet sessions or rewatch recorded lecture archives.
        </p>
      </div>

      {/* ================= LIVE & UPCOMING CLASSES ================= */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-navy dark:text-canvas pb-2 border-b border-slate-200 dark:border-navy-light/40">
          Scheduled Live Sessions
        </h2>

        <div className="space-y-3">
          {UPCOMING_CLASSES.map((cls) => {
            const isLive = cls.status === 'Live Now'

            return (
              <div
                key={cls.id}
                className="p-5 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-teal">{cls.subjectCode}</span>
                    <span className="text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-500">{cls.subject}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 ${
                        isLive
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-100 dark:bg-navy-light/40 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {cls.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy dark:text-canvas">
                    {cls.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {cls.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-teal" />
                      {cls.date}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal" />
                      {cls.time}
                    </span>
                    <span>&bull;</span>
                    <span>Instructor: {cls.instructor}</span>
                  </div>
                </div>

                <a
                  href={cls.googleMeetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${
                    isLive ? BUTTON_STYLES.primary : BUTTON_STYLES.secondary
                  } px-4 py-2.5 text-xs font-semibold gap-1.5 whitespace-nowrap self-start sm:self-auto`}
                >
                  <Video className="w-4 h-4" />
                  <span>Join Google Meet</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )
          })}
        </div>
      </div>

      {/* ================= RECORDED ARCHIVE ================= */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-navy dark:text-canvas pb-2 border-b border-slate-200 dark:border-navy-light/40">
          Recorded Lectures
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {RECORDED_LECTURES.map((rec) => (
            <div
              key={rec.id}
              className="p-4 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-teal">{rec.subjectCode}</span>
                  <span className="text-slate-400">{rec.duration}</span>
                </div>

                <h4 className="text-sm font-bold text-navy dark:text-canvas">
                  {rec.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {rec.description}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100 dark:border-navy-light/30">
                <span className="text-slate-400">{rec.recordedDate}</span>
                <button
                  type="button"
                  className="font-semibold text-teal hover:underline cursor-pointer"
                  onClick={() => alert(`Opening recording for: ${rec.title}`)}
                >
                  Watch Recording &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
