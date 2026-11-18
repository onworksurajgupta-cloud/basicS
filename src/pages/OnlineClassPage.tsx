import { useState } from 'react'
import {
  Video,
  Calendar,
  Clock,
  User,
  ExternalLink,
  PlayCircle,
  Radio,
} from 'lucide-react'
import { UPCOMING_CLASSES, RECORDED_LECTURES } from '../data/onlineClasses'
import { BUTTON_STYLES, BADGE_STYLES } from '../theme/tokens'

export function OnlineClassPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'live' | 'recorded'>('all')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-4 border border-rose-500/20">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Live Interactive Learning Portal</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-navy dark:text-canvas">
          Online Class &amp; Video Lectures
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Join live lectures on Google Meet, ask questions in real-time, or catch up with high-definition recorded archives.
        </p>

        {/* Filter Pills */}
        <div className="mt-8 inline-flex p-1 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/60 shadow-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-teal text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-canvas'
            }`}
          >
            All Sessions
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('live')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'live'
                ? 'bg-teal text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-canvas'
            }`}
          >
            Upcoming Live Classes ({UPCOMING_CLASSES.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('recorded')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === 'recorded'
                ? 'bg-teal text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-canvas'
            }`}
          >
            Recorded Archives ({RECORDED_LECTURES.length})
          </button>
        </div>
      </div>

      {/* ==================== UPCOMING CLASSES SECTION ==================== */}
      {(selectedCategory === 'all' || selectedCategory === 'live') && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-navy-light/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping inline-block" />
                <h2 className="text-2xl font-black text-navy dark:text-canvas">
                  Live &amp; Scheduled Classes
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Direct Google Meet integrations with interactive doubt-solving.
              </p>
            </div>
            <span className={BADGE_STYLES.teal}>Google Meet Integration Enabled</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {UPCOMING_CLASSES.map((cls) => {
              const isLive = cls.status === 'Live Now'

              return (
                <div
                  key={cls.id}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all flex flex-col justify-between ${
                    isLive
                      ? 'bg-gradient-to-br from-rose-500/5 via-white to-rose-500/5 dark:from-navy dark:via-navy-card dark:to-navy border-rose-500/40 shadow-lg shadow-rose-500/5 ring-1 ring-rose-500/30'
                      : 'bg-white dark:bg-navy border-slate-200/90 dark:border-navy-light/60 shadow-md hover:border-teal'
                  }`}
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-navy text-white dark:bg-navy-dark dark:text-teal border border-teal/40">
                          {cls.subjectCode}
                        </span>
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                          {cls.subject}
                        </span>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                          isLive
                            ? 'bg-rose-500 text-white animate-pulse shadow-sm shadow-rose-500/40'
                            : 'bg-teal/10 text-teal-dark dark:text-teal border border-teal/20'
                        }`}
                      >
                        {isLive && <span className="w-2 h-2 rounded-full bg-white" />}
                        {cls.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-navy dark:text-canvas leading-snug">
                      {cls.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cls.description}
                    </p>

                    {/* Schedule Metadata */}
                    <div className="mt-5 p-3.5 rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/40 space-y-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-teal" />
                          <span>Date: <strong>{cls.date}</strong></span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-teal" />
                          <span>{cls.time}</span>
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-navy-light/30">
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4 text-teal" />
                          <span>Instructor: <strong>{cls.instructor}</strong></span>
                        </span>
                        <span className="text-teal font-semibold">{cls.attendeesCount} Registered</span>
                      </div>
                    </div>

                    {/* Topics Covered */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {cls.topicsCovered.map((topic, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-navy-card text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-light/40"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-light/30 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Platform: Google Meet</span>
                    <a
                      href={cls.googleMeetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${
                        isLive ? BUTTON_STYLES.primary : BUTTON_STYLES.secondary
                      } px-5 py-2.5 text-xs font-bold gap-2`}
                    >
                      <Video className="w-4 h-4" />
                      <span>{isLive ? 'Join Google Meet Now' : 'Open Meet Link'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ==================== RECORDED LECTURES SECTION ==================== */}
      {(selectedCategory === 'all' || selectedCategory === 'recorded') && (
        <section className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200 dark:border-navy-light/40">
            <div>
              <h2 className="text-2xl font-black text-navy dark:text-canvas">
                Recorded Lecture Archive
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Missed a live session? Rewatch past engineering lectures in full 1080p.
              </p>
            </div>
            <span className={BADGE_STYLES.neutral}>{RECORDED_LECTURES.length} Full Archives</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECORDED_LECTURES.map((rec) => (
              <div
                key={rec.id}
                className="bg-white dark:bg-navy rounded-3xl border border-slate-200/90 dark:border-navy-light/60 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Placeholder */}
                  <div
                    className={`h-40 bg-gradient-to-br ${rec.thumbnailColor} p-4 flex flex-col justify-between border-b border-slate-100 dark:border-navy-light/40 relative group cursor-pointer`}
                    onClick={() => alert(`Launching player for: ${rec.title}`)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-black uppercase bg-navy/90 text-white border border-teal/40">
                        {rec.subjectCode}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-white/90 dark:bg-navy text-navy dark:text-canvas">
                        {rec.duration}
                      </span>
                    </div>

                    <div className="w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-6 h-6" />
                    </div>

                    <div className="text-[11px] font-medium text-slate-300">
                      {rec.recordedDate} &bull; {rec.viewsCount}
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="text-sm font-bold text-navy dark:text-canvas leading-snug">
                      {rec.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      Instructor: {rec.instructor}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    className={`${BUTTON_STYLES.secondary} w-full py-2 text-xs font-bold gap-1`}
                    onClick={() => alert(`Starting video stream for: ${rec.title}`)}
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-teal" />
                    <span>Watch Recording</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ==================== BACKEND COMING SOON NOTICE ==================== */}
      <section className="p-8 sm:p-10 rounded-3xl bg-canvas dark:bg-navy-card/60 border border-slate-300 dark:border-navy-light/60 space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gold/15 text-gold-dark dark:text-gold border border-gold/30">
            Coming Soon: Advanced Classroom Features
          </span>
        </div>

        <h3 className="text-xl font-bold text-navy dark:text-canvas">
          Next-Generation Virtual Classroom Infrastructure (Phase 2)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <div className="p-4 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/40">
            <div className="font-bold text-navy dark:text-canvas mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal" />
              Live In-Class Whiteboard
            </div>
            Real-time collaborative mathematical sketching for free-body diagrams and beam stress transformations.
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/40">
            <div className="font-bold text-navy dark:text-canvas mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal" />
              Automated Attendance Verification
            </div>
            Automatic verification of lecture attendance synced directly into your student progress dashboard.
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/40">
            <div className="font-bold text-navy dark:text-canvas mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal" />
              Instant Session Transcription
            </div>
            AI-assisted lecture transcription that indexes engineering formulas and timestamps video moments.
          </div>
        </div>
      </section>
    </div>
  )
}
