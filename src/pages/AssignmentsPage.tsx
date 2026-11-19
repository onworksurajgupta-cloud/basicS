import { useState } from 'react'
import {
  FileText,
  CheckCircle2,
  Upload,
  Calendar,
  Award,
  X,
  Database,
} from 'lucide-react'
import { SAMPLE_ASSIGNMENTS } from '../data/assignmentsData'
import { useDashboard } from '../context/DashboardContext'
import { BADGE_STYLES } from '../theme/tokens'
import type { AssignmentItem } from '../types/dashboard'

export function AssignmentsPage() {
  const { role } = useDashboard()
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Submitted'>('All')
  const [assignments, setAssignments] = useState<AssignmentItem[]>(SAMPLE_ASSIGNMENTS)
  const [showSubmitModal, setShowSubmitModal] = useState<AssignmentItem | null>(null)
  const [submissionFile, setSubmissionFile] = useState<string>('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const filteredAssignments = assignments.filter((asg) => {
    if (filter === 'All') return true
    return asg.status === filter
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!showSubmitModal) return

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === showSubmitModal.id
          ? { ...a, status: 'Submitted', grade: 'Under Evaluation' }
          : a
      )
    )

    setSubmitSuccess(true)
    setTimeout(() => {
      setSubmitSuccess(false)
      setShowSubmitModal(null)
      setSubmissionFile('')
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-navy-light/40">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-canvas flex items-center gap-2">
            <FileText className="w-6 h-6 text-teal" />
            Engineering Assignments &amp; Problem Sets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Solve numericals, tensor calculations, and finite element derivations to build hands-on mastery.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5">
          {(['All', 'Pending', 'Submitted'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === status
                  ? 'bg-teal text-white'
                  : 'bg-white dark:bg-navy border border-slate-200 dark:border-navy-light text-slate-600 dark:text-slate-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Assignment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssignments.map((asg) => {
          const isSubmitted = asg.status === 'Submitted'

          return (
            <div
              key={asg.id}
              className="p-5 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 flex flex-col justify-between shadow-xs hover:border-teal/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal/10 text-teal border border-teal/20">
                      {asg.subjectCode}
                    </span>
                    <span className="text-xs text-slate-400">{asg.subject}</span>
                  </div>

                  <span className={isSubmitted ? BADGE_STYLES.teal : BADGE_STYLES.gold}>
                    {asg.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-navy dark:text-canvas mt-1">
                  {asg.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {asg.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-light/30 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" /> Due {asg.dueDate} at {asg.dueTime}
                  </span>
                  <span className="font-semibold text-navy dark:text-canvas">
                    {asg.totalPoints} Marks Total
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-light/30 flex items-center justify-between">
                <div>
                  {asg.grade ? (
                    <span className="text-xs font-bold text-teal flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Grade: {asg.grade}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">
                      Submissions: {asg.submittedCount} / {asg.totalStudents}
                    </span>
                  )}
                </div>

                {role === 'student' && (
                  <div>
                    {isSubmitted ? (
                      <span className="text-xs text-teal font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Submitted
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowSubmitModal(asg)}
                        className="px-3 py-1.5 rounded-lg bg-teal text-white hover:bg-teal-dark text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" /> Submit Work
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-navy rounded-2xl border border-slate-200 dark:border-navy-light max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-navy-light/40">
              <h3 className="text-base font-bold text-navy dark:text-canvas">
                Submit Engineering Assignment
              </h3>
              <button
                type="button"
                onClick={() => setShowSubmitModal(null)}
                className="p-1 rounded text-slate-400 hover:text-navy dark:hover:text-canvas"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-teal/15 text-teal flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-navy dark:text-canvas">
                  Assignment Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-400">
                  Your work has been timestamped and queued for instructor evaluation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-teal">{showSubmitModal.subjectCode}</div>
                  <div className="text-sm font-bold text-navy dark:text-canvas mt-0.5">
                    {showSubmitModal.title}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">
                    Upload Solution PDF / Scan
                  </label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-navy-light rounded-xl p-6 text-center hover:border-teal transition-colors">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500">
                      Select your handwritten calculations or FEA report
                    </p>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => setSubmissionFile(e.target.files?.[0]?.name || '')}
                      className="mt-2 text-xs text-slate-500 block w-full mx-auto"
                    />
                    {submissionFile && (
                      <div className="mt-2 text-xs font-bold text-teal">
                        Selected: {submissionFile}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-navy-dark text-[11px] text-slate-500 flex items-start gap-2">
                  <Database className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                  <span>
                    Backend storage uses Supabase Storage buckets in production. Demo simulation records your submission in local session state.
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(null)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-navy-light text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-navy-card"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-teal text-white text-xs font-bold hover:bg-teal-dark transition-colors cursor-pointer"
                  >
                    Confirm Submission
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
