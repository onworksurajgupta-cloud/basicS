import { useState } from 'react'
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  RotateCcw,
} from 'lucide-react'
import { EXAMINATIONS, type ExamItem } from '../data/testsData'
import { BUTTON_STYLES } from '../theme/tokens'

export function TakeTestsPage() {
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null)
  const [filterType, setFilterType] = useState<'All' | 'MCQ' | 'Descriptive'>('All')

  // MCQ State
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({})
  const [mcqSubmitted, setMcqSubmitted] = useState<boolean>(false)
  const [currentIdx, setCurrentIdx] = useState<number>(0)

  // Descriptive State
  const [descriptiveAnswers, setDescriptiveAnswers] = useState<Record<number, string>>({})
  const [descriptiveSubmitted, setDescriptiveSubmitted] = useState<boolean>(false)

  const handleStartExam = (exam: ExamItem) => {
    setSelectedExam(exam)
    setMcqAnswers({})
    setMcqSubmitted(false)
    setCurrentIdx(0)
    setDescriptiveAnswers({})
    setDescriptiveSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExit = () => {
    setSelectedExam(null)
    setMcqSubmitted(false)
    setDescriptiveSubmitted(false)
  }

  const filteredExams = EXAMINATIONS.filter((exam) => {
    if (filterType === 'MCQ') return exam.format.includes('MCQ')
    if (filterType === 'Descriptive') return exam.format.includes('Descriptive')
    return true
  })

  // Calculate score
  const calculateScore = () => {
    if (!selectedExam?.mcqQuestions) return { correct: 0, total: 0, pct: 0, passed: false }
    let correct = 0
    selectedExam.mcqQuestions.forEach((q) => {
      if (mcqAnswers[q.id] === q.correctIndex) correct++
    })
    const total = selectedExam.mcqQuestions.length
    const pct = Math.round((correct / total) * 100)
    return { correct, total, pct, passed: pct >= selectedExam.passingPercentage }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* ================= CATALOG VIEW ================= */}
      {!selectedExam ? (
        <div className="space-y-6">
          {/* Sober Header */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-navy dark:text-canvas">
              Tests &amp; Assessments
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select a test to evaluate your understanding of key mechanical engineering topics.
            </p>
          </div>

          {/* Simple Filter Pills */}
          <div className="flex gap-2">
            {(['All', 'MCQ', 'Descriptive'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterType === type
                    ? 'bg-teal text-white'
                    : 'bg-white dark:bg-navy-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-light hover:border-teal'
                }`}
              >
                {type === 'All' ? 'All Tests' : `${type} Tests`}
              </button>
            ))}
          </div>

          {/* Clean Test Cards List */}
          <div className="space-y-3">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="p-5 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 hover:border-teal transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-teal">
                      {exam.subjectCode} &bull; {exam.subject}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-light/40 text-slate-600 dark:text-slate-300">
                      {exam.format.replace(' Examination', '')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-navy dark:text-canvas">
                    {exam.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal" />
                      {exam.duration}
                    </span>
                    <span>&bull;</span>
                    <span>{exam.questionsCount} Questions</span>
                    <span>&bull;</span>
                    <span>Passing: {exam.passingPercentage}%</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartExam(exam)}
                  className={`${BUTTON_STYLES.primary} px-5 py-2.5 text-xs whitespace-nowrap self-start sm:self-auto`}
                >
                  Start Test
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ================= ACTIVE TEST VIEW ================= */
        <div className="space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-navy-light/60">
            <button
              type="button"
              onClick={handleExit}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tests</span>
            </button>

            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal" />
              Time: {selectedExam.duration}
            </span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy dark:text-canvas">
              {selectedExam.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {selectedExam.subject} ({selectedExam.subjectCode})
            </p>
          </div>

          {/* MCQ Test View */}
          {selectedExam.format === 'MCQ Examination' && selectedExam.mcqQuestions && (
            <div className="bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 p-6 space-y-6">
              {!mcqSubmitted ? (
                <>
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 dark:border-navy-light/30">
                    <span className="font-semibold text-teal">
                      Question {currentIdx + 1} of {selectedExam.mcqQuestions.length}
                    </span>
                    <span>{Object.keys(mcqAnswers).length} answered</span>
                  </div>

                  <p className="text-base font-semibold text-navy dark:text-canvas leading-relaxed">
                    {selectedExam.mcqQuestions[currentIdx].question}
                  </p>

                  {/* Options */}
                  <div className="space-y-2 pt-2">
                    {selectedExam.mcqQuestions[currentIdx].options.map((opt, optIdx) => {
                      const qId = selectedExam.mcqQuestions![currentIdx].id
                      const isChosen = mcqAnswers[qId] === optIdx

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => setMcqAnswers((prev) => ({ ...prev, [qId]: optIdx }))}
                          className={`w-full p-3.5 rounded-lg border text-left text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                            isChosen
                              ? 'bg-teal/10 border-teal text-teal-dark dark:text-teal-light font-semibold'
                              : 'bg-slate-50 dark:bg-navy border-slate-200 dark:border-navy-light/50 text-navy dark:text-canvas hover:border-slate-300'
                          }`}
                        >
                          <span>{opt}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] shrink-0 ml-2 ${
                              isChosen ? 'bg-teal text-white border-teal' : 'border-slate-300'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-navy-light/30">
                    <button
                      type="button"
                      disabled={currentIdx === 0}
                      onClick={() => setCurrentIdx((p) => p - 1)}
                      className={`${BUTTON_STYLES.secondary} px-4 py-2 text-xs ${
                        currentIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''
                      }`}
                    >
                      Previous
                    </button>

                    {currentIdx < selectedExam.mcqQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentIdx((p) => p + 1)}
                        className={`${BUTTON_STYLES.primary} px-5 py-2 text-xs`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setMcqSubmitted(true)}
                        className={`${BUTTON_STYLES.gold} px-6 py-2 text-xs`}
                      >
                        Submit Test
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Results View */
                <div className="space-y-6">
                  {(() => {
                    const res = calculateScore()
                    return (
                      <div
                        className={`p-5 rounded-lg border flex items-center justify-between ${
                          res.passed
                            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 text-emerald-800 dark:text-emerald-300'
                            : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {res.passed ? (
                            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                          ) : (
                            <XCircle className="w-6 h-6 text-amber-600 shrink-0" />
                          )}
                          <div>
                            <div className="font-bold text-sm">
                              {res.passed ? 'Test Passed' : 'Test Completed'}
                            </div>
                            <div className="text-xs">
                              Score: <strong>{res.correct} / {res.total}</strong> ({res.pct}%) &bull; Pass mark: {selectedExam.passingPercentage}%
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setMcqAnswers({})
                            setMcqSubmitted(false)
                            setCurrentIdx(0)
                          }}
                          className="px-3 py-1.5 rounded bg-white dark:bg-navy text-xs font-semibold shadow-xs hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retake</span>
                        </button>
                      </div>
                    )
                  })()}

                  <div className="space-y-4 pt-2">
                    <h4 className="text-sm font-bold text-navy dark:text-canvas">
                      Answer Review &amp; Explanations:
                    </h4>

                    {selectedExam.mcqQuestions.map((q, idx) => {
                      const userAns = mcqAnswers[q.id]
                      const isCorrect = userAns === q.correctIndex

                      return (
                        <div
                          key={q.id}
                          className="p-4 rounded-lg bg-slate-50 dark:bg-navy border border-slate-200 dark:border-navy-light/40 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between font-semibold">
                            <span>Question {idx + 1}</span>
                            {isCorrect ? (
                              <span className="text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                              </span>
                            ) : (
                              <span className="text-rose-600 flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> Incorrect
                              </span>
                            )}
                          </div>

                          <p className="font-medium text-navy dark:text-canvas">{q.question}</p>

                          <div className="p-2.5 rounded bg-white dark:bg-navy-card text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-light/40">
                            <strong>Correct:</strong> {q.options[q.correctIndex]}
                            <p className="mt-1 text-slate-500 leading-relaxed">{q.explanation}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Descriptive Test View */}
          {selectedExam.format === 'Descriptive Examination' && selectedExam.descriptiveQuestions && (
            <div className="bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 p-6 space-y-6">
              {!descriptiveSubmitted ? (
                <>
                  <div className="space-y-6">
                    {selectedExam.descriptiveQuestions.map((q, idx) => (
                      <div key={q.id} className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-teal">Question {idx + 1}</span>
                          <span className="text-slate-400">{q.marks} Marks</span>
                        </div>

                        <p className="text-sm font-semibold text-navy dark:text-canvas">
                          {q.prompt}
                        </p>

                        <textarea
                          rows={5}
                          placeholder="Type your derivation or solution steps here..."
                          value={descriptiveAnswers[q.id] || ''}
                          onChange={(e) =>
                            setDescriptiveAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          className="w-full p-3 rounded-lg bg-slate-50 dark:bg-navy border border-slate-300 dark:border-navy-light text-xs sm:text-sm font-mono text-navy dark:text-canvas focus:outline-none focus:border-teal"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-navy-light/30">
                    <button
                      type="button"
                      onClick={() => setDescriptiveSubmitted(true)}
                      className={`${BUTTON_STYLES.primary} px-6 py-2.5 text-xs font-semibold`}
                    >
                      Submit Response
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center space-y-4">
                  <CheckCircle2 className="w-10 h-10 text-teal mx-auto" />
                  <h3 className="text-lg font-bold text-navy dark:text-canvas">
                    Response Recorded
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Your answers for {selectedExam.title} have been saved in this session.
                  </p>
                  <button
                    type="button"
                    onClick={handleExit}
                    className={`${BUTTON_STYLES.primary} px-5 py-2 text-xs`}
                  >
                    Back to Tests
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
