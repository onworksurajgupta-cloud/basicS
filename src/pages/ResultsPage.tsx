import { useState } from 'react'
import {
  Award,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { SAMPLE_RESULTS } from '../data/resultsData'
import { BADGE_STYLES } from '../theme/tokens'

export function ResultsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredResults = SAMPLE_RESULTS.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.testTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.subjectCode.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-navy-light/40">
        <div>
          <h1 className="text-2xl font-bold text-navy dark:text-canvas flex items-center gap-2">
            <Award className="w-6 h-6 text-teal" />
            Diagnostic Results &amp; Academic Benchmarks
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Verified assessment scores, accuracy percentages, and performance breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal/10 border border-teal/20 text-teal text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> 100% Passing Criteria Met
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
          <span className="text-xs text-slate-400 font-semibold uppercase">Average Score</span>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-1">84.5%</div>
          <p className="text-[11px] text-teal mt-1 font-bold">+6.2% vs national average</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
          <span className="text-xs text-slate-400 font-semibold uppercase">Highest Mark</span>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-1">95.0%</div>
          <p className="text-[11px] text-slate-400 mt-1">Priya Sharma • ME-305</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
          <span className="text-xs text-slate-400 font-semibold uppercase">Tests Evaluated</span>
          <div className="text-2xl font-black text-navy dark:text-canvas mt-1">4 Exams</div>
          <p className="text-[11px] text-slate-400 mt-1">Mechanics, Vibration, FEA, BME</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
          <span className="text-xs text-slate-400 font-semibold uppercase">Honors Standing</span>
          <div className="text-2xl font-black text-teal mt-1">First Class</div>
          <p className="text-[11px] text-slate-400 mt-1">Distinction eligibility active</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search result by candidate name, exam title, or course code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-navy-dark rounded-lg border border-slate-200 dark:border-navy-light/40 text-xs sm:text-sm text-navy dark:text-canvas placeholder-slate-400 focus:outline-none focus:border-teal"
          />
        </div>
      </div>

      {/* Results Table */}
      <div className="rounded-xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/50 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-navy-card/50 border-b border-slate-200 dark:border-navy-light/40 text-slate-400">
                <th className="py-3 px-4 font-semibold">Candidate</th>
                <th className="py-3 px-4 font-semibold">Exam Title</th>
                <th className="py-3 px-4 font-semibold">Subject</th>
                <th className="py-3 px-4 font-semibold">Points Scored</th>
                <th className="py-3 px-4 font-semibold">Percentage</th>
                <th className="py-3 px-4 font-semibold">Submission Date</th>
                <th className="py-3 px-4 font-semibold text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-navy-light/20">
              {filteredResults.length > 0 ? (
                filteredResults.map((res) => (
                  <tr
                    key={res.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-navy-card/40 transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-navy dark:text-canvas">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-teal/15 text-teal text-[11px] font-bold flex items-center justify-center">
                          {res.studentAvatar}
                        </span>
                        {res.studentName}
                      </div>
                    </td>

                    <td className="py-3 px-4 font-semibold text-navy dark:text-canvas">
                      {res.testTitle}
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal/10 text-teal border border-teal/20">
                        {res.subjectCode}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-200">
                      {res.score} / {res.totalScore}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 w-28">
                        <div className="flex-1 h-1.5 rounded-full bg-slate-100 dark:bg-navy-dark overflow-hidden">
                          <div
                            className="h-full rounded-full bg-teal"
                            style={{ width: `${res.percentage}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-teal">
                          {res.percentage}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-400">
                      {res.submittedAt}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className={BADGE_STYLES.teal}>{res.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No results found matching "{searchQuery}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
