import { useState } from 'react'
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Upload,
  RotateCcw,
} from 'lucide-react'
import { EXAMINATIONS, type ExamItem } from '../data/testsData'
import { BUTTON_STYLES } from '../theme/tokens'

export function TakeTestsPage() {
  const [selectedExam, setSelectedExam] = useState<ExamItem | null>(null)

  // MCQ Exam State
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({})
  const [mcqSubmitted, setMcqSubmitted] = useState<boolean>(false)
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0)

  // Descriptive Exam State
  const [descriptiveAnswers, setDescriptiveAnswers] = useState<Record<number, string>>({})
  const [descriptiveSubmitted, setDescriptiveSubmitted] = useState<boolean>(false)

  const handleStartExam = (exam: ExamItem) => {
    setSelectedExam(exam)
    setMcqAnswers({})
    setMcqSubmitted(false)
    setCurrentQuestionIdx(0)
    setDescriptiveAnswers({})
    setDescriptiveSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleExitExam = () => {
    setSelectedExam(null)
    setMcqSubmitted(false)
    setDescriptiveSubmitted(false)
  }

  // Calculate MCQ score accurately
  const calculateMcqScore = (exam: ExamItem) => {
    if (!exam.mcqQuestions) return { score: 0, total: 0, percentage: 0, passed: false }
    let correct = 0
    exam.mcqQuestions.forEach((q) => {
      if (mcqAnswers[q.id] === q.correctIndex) {
        correct++
      }
    })
    const percentage = Math.round((correct / exam.mcqQuestions.length) * 100)
    return {
      score: correct,
      total: exam.mcqQuestions.length,
      percentage,
      passed: percentage >= exam.passingPercentage,
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* If No Exam is Active: Show Test Catalog */}
      {!selectedExam ? (
        <>
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 text-gold-dark dark:text-gold text-xs font-bold uppercase tracking-wider mb-4 border border-gold/30">
              <Award className="w-4 h-4" />
              <span>Diagnostic Examination Arena</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-navy dark:text-canvas">
              Take Tests &amp; Benchmark Assessments
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Verify your analytical capabilities under timed conditions. Choose an objective MCQ test or a step-by-step descriptive engineering exam.
            </p>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXAMINATIONS.map((exam) => (
              <div
                key={exam.id}
                className="bg-white dark:bg-navy rounded-3xl border border-slate-200/90 dark:border-navy-light/60 p-7 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-navy text-white dark:bg-navy-dark dark:text-teal border border-teal/40">
                        {exam.subjectCode}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {exam.subject}
                      </span>
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${
                        exam.format === 'MCQ Examination'
                          ? 'bg-teal/10 text-teal-dark dark:text-teal border-teal/20'
                          : 'bg-gold/15 text-gold-dark dark:text-gold border-gold/30'
                      }`}
                    >
                      {exam.format}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-black text-navy dark:text-canvas leading-snug">
                    {exam.title}
                  </h3>

                  {/* Metadata Specs */}
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Duration</div>
                      <div className="text-sm font-black text-navy dark:text-canvas mt-0.5">{exam.duration}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Questions</div>
                      <div className="text-sm font-black text-teal mt-0.5">{exam.questionsCount} Items</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Pass Mark</div>
                      <div className="text-sm font-black text-gold mt-0.5">{exam.passingPercentage}%</div>
                    </div>
                  </div>

                  {/* Instructions Preview */}
                  <div className="mt-6 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <div className="font-bold text-slate-400 uppercase text-[10px]">Instructions:</div>
                    {exam.instructions.slice(0, 2).map((ins, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-teal font-bold">&bull;</span>
                        <span>{ins}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Start Exam Button */}
                <div className="mt-8 pt-5 border-t border-slate-100 dark:border-navy-light/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    Format: {exam.difficulty}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleStartExam(exam)}
                    className={`${BUTTON_STYLES.primary} px-6 py-2.5 text-xs font-bold gap-2`}
                  >
                    <span>Start Examination</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ==================== ACTIVE EXAMINATION INTERFACE ==================== */
        <div className="space-y-8">
          {/* Active Exam Header Bar */}
          <div className="p-6 rounded-3xl bg-white dark:bg-navy border border-slate-200 dark:border-navy-light/60 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <button
                type="button"
                onClick={handleExitExam}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-navy dark:hover:text-canvas mb-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Exit Examination &amp; Return to Catalog</span>
              </button>
              <h2 className="text-xl sm:text-2xl font-black text-navy dark:text-canvas">
                {selectedExam.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {selectedExam.subject} ({selectedExam.subjectCode}) &bull; {selectedExam.format}
              </p>
            </div>

            <div className="flex items-center gap-4 self-end md:self-auto">
              <div className="p-3 rounded-2xl bg-canvas dark:bg-navy-card border border-slate-200 dark:border-navy-light/40 flex items-center gap-2 text-xs font-bold text-navy dark:text-canvas">
                <Clock className="w-4 h-4 text-teal" />
                <span>Duration: {selectedExam.duration}</span>
              </div>
            </div>
          </div>

          {/* ================= MCQ INTERFACE ================= */}
          {selectedExam.format === 'MCQ Examination' && selectedExam.mcqQuestions && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Question Area */}
              <div className="lg:col-span-8 bg-white dark:bg-navy rounded-3xl border border-slate-200 dark:border-navy-light/60 p-6 sm:p-8 shadow-md space-y-6">
                {!mcqSubmitted ? (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-navy-light/40">
                      <span className="text-xs font-bold text-teal uppercase tracking-wider">
                        Question {currentQuestionIdx + 1} of {selectedExam.mcqQuestions.length}
                      </span>
                      <span className="text-xs text-slate-400">10 Marks</span>
                    </div>

                    {/* Question Prompt */}
                    <h3 className="text-base sm:text-lg font-bold text-navy dark:text-canvas leading-relaxed">
                      {selectedExam.mcqQuestions[currentQuestionIdx].question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 pt-2">
                      {selectedExam.mcqQuestions[currentQuestionIdx].options.map((opt, optIdx) => {
                        const qId = selectedExam.mcqQuestions![currentQuestionIdx].id
                        const isChosen = mcqAnswers[qId] === optIdx

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() =>
                              setMcqAnswers((prev) => ({
                                ...prev,
                                [qId]: optIdx,
                              }))
                            }
                            className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                              isChosen
                                ? 'bg-teal/15 border-teal text-teal-dark dark:text-teal-light font-bold ring-2 ring-teal/40'
                                : 'bg-canvas dark:bg-navy-card/50 border-slate-200 dark:border-navy-light/40 text-navy dark:text-canvas hover:border-teal'
                            }`}
                          >
                            <span>{opt}</span>
                            <span
                              className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ml-3 ${
                                isChosen
                                  ? 'bg-teal text-white border-teal'
                                  : 'border-slate-300 dark:border-navy-light'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-6 border-t border-slate-100 dark:border-navy-light/40 flex items-center justify-between">
                      <button
                        type="button"
                        disabled={currentQuestionIdx === 0}
                        onClick={() => setCurrentQuestionIdx((p) => p - 1)}
                        className={`${BUTTON_STYLES.secondary} px-5 py-2.5 text-xs font-bold ${
                          currentQuestionIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''
                        }`}
                      >
                        &larr; Previous Question
                      </button>

                      {currentQuestionIdx < selectedExam.mcqQuestions.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                          className={`${BUTTON_STYLES.primary} px-6 py-2.5 text-xs font-bold`}
                        >
                          Next Question &rarr;
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setMcqSubmitted(true)}
                          className={`${BUTTON_STYLES.gold} px-7 py-2.5 text-xs font-bold`}
                        >
                          Finish &amp; Submit Exam
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  /* Evaluation & Results Review Mode */
                  <div className="space-y-6">
                    {(() => {
                      const res = calculateMcqScore(selectedExam)
                      return (
                        <div
                          className={`p-6 rounded-2xl border ${
                            res.passed
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {res.passed ? (
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                              ) : (
                                <AlertCircle className="w-8 h-8 text-amber-500" />
                              )}
                              <div>
                                <h4 className="text-xl font-black">
                                  {res.passed ? 'Benchmark Examination Passed!' : 'Benchmark Needs Revision'}
                                </h4>
                                <p className="text-xs">
                                  Score: <strong>{res.score} / {res.total}</strong> ({res.percentage}%) &bull; Pass Threshold: {selectedExam.passingPercentage}%
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setMcqAnswers({})
                                setMcqSubmitted(false)
                                setCurrentQuestionIdx(0)
                              }}
                              className="px-4 py-2 rounded-xl bg-white dark:bg-navy text-xs font-bold shadow-xs hover:underline flex items-center gap-1.5 cursor-pointer text-navy dark:text-canvas"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Retake Test</span>
                            </button>
                          </div>
                        </div>
                      )
                    })()}

                    <div className="text-xs text-slate-500 dark:text-slate-400 p-4 rounded-xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/40">
                      ℹ️ <strong>Session Notice:</strong> This examination score is evaluated directly on your local device. Persistent grading transcript storage connects with student database in Phase 2.
                    </div>

                    {/* Explanations Review */}
                    <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-navy-light/40">
                      <h4 className="text-base font-bold text-navy dark:text-canvas">
                        Question-by-Question Solution Explanations:
                      </h4>

                      {selectedExam.mcqQuestions.map((q, idx) => {
                        const userAns = mcqAnswers[q.id]
                        const isCorrect = userAns === q.correctIndex

                        return (
                          <div
                            key={q.id}
                            className="p-5 rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/40 space-y-3"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-500">Question {idx + 1}</span>
                              {isCorrect ? (
                                <span className="text-emerald-600 font-bold flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4" /> Correct (+10 Marks)
                                </span>
                              ) : (
                                <span className="text-rose-600 font-bold flex items-center gap-1">
                                  <XCircle className="w-4 h-4" /> Incorrect (0 Marks)
                                </span>
                              )}
                            </div>

                            <p className="text-sm font-semibold text-navy dark:text-canvas">
                              {q.question}
                            </p>

                            <div className="p-3 rounded-xl bg-white dark:bg-navy text-xs text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-navy-light/40">
                              <strong className="text-teal">Correct Answer:</strong> {q.options[q.correctIndex]}
                              <p className="mt-1.5 text-slate-500 dark:text-slate-400 leading-relaxed">
                                {q.explanation}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Question Palette Sidebar */}
              <div className="lg:col-span-4 bg-white dark:bg-navy rounded-3xl border border-slate-200 dark:border-navy-light/60 p-6 shadow-md space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-navy dark:text-canvas">Question Palette</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Jump directly to any question</p>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {selectedExam.mcqQuestions.map((q, idx) => {
                    const isAnswered = mcqAnswers[q.id] !== undefined
                    const isCurrent = currentQuestionIdx === idx

                    return (
                      <button
                        key={q.id}
                        type="button"
                        disabled={mcqSubmitted}
                        onClick={() => setCurrentQuestionIdx(idx)}
                        className={`h-11 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-teal text-white ring-2 ring-teal shadow-xs'
                            : isAnswered
                            ? 'bg-teal/20 text-teal-dark dark:text-teal-light border border-teal/40'
                            : 'bg-canvas dark:bg-navy-card text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-navy-light'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    )
                  })}
                </div>

                <div className="p-4 rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/40 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-teal text-white" />
                    <span>Current Question</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-teal/20 border border-teal/40" />
                    <span>Answered ({Object.keys(mcqAnswers).length})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded bg-canvas dark:bg-navy-card border" />
                    <span>Unanswered ({selectedExam.mcqQuestions.length - Object.keys(mcqAnswers).length})</span>
                  </div>
                </div>

                {!mcqSubmitted && (
                  <button
                    type="button"
                    onClick={() => setMcqSubmitted(true)}
                    className={`${BUTTON_STYLES.gold} w-full py-3 text-xs font-bold`}
                  >
                    Finish Exam Now
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= DESCRIPTIVE INTERFACE ================= */}
          {selectedExam.format === 'Descriptive Examination' && selectedExam.descriptiveQuestions && (
            <div className="bg-white dark:bg-navy rounded-3xl border border-slate-200 dark:border-navy-light/60 p-6 sm:p-10 shadow-md space-y-8">
              {!descriptiveSubmitted ? (
                <>
                  <div className="p-4 rounded-2xl bg-teal/10 border border-teal/20 text-xs text-teal-dark dark:text-teal-light font-medium">
                    ✏️ <strong>Descriptive Interface:</strong> Type your step-by-step mathematical reasoning, state assumptions, and use the upload placeholder if you drafted diagrams by hand.
                  </div>

                  <div className="space-y-8">
                    {selectedExam.descriptiveQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-6 rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/40 space-y-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal uppercase tracking-wider">
                            Problem #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-gold">{q.marks} Marks</span>
                        </div>

                        <h4 className="text-base font-bold text-navy dark:text-canvas leading-relaxed">
                          {q.prompt}
                        </h4>

                        {/* Grading guidelines */}
                        <div className="p-3.5 rounded-xl bg-white dark:bg-navy text-xs space-y-1 border border-slate-200/80 dark:border-navy-light/30">
                          <div className="font-bold text-slate-400 uppercase text-[10px]">
                            Required Solution Steps:
                          </div>
                          {q.guidelines.map((g, i) => (
                            <div key={i} className="text-slate-600 dark:text-slate-300">
                              &bull; {g}
                            </div>
                          ))}
                        </div>

                        {/* Solution Input Area */}
                        <div>
                          <label className="block text-xs font-bold text-slate-500 mb-1">
                            Your Derivation &amp; Calculations:
                          </label>
                          <textarea
                            rows={6}
                            placeholder="Type your mathematical formulation, assumptions, equilibrium equations, and final result here..."
                            value={descriptiveAnswers[q.id] || ''}
                            onChange={(e) =>
                              setDescriptiveAnswers((prev) => ({
                                ...prev,
                                [q.id]: e.target.value,
                              }))
                            }
                            className="w-full p-4 rounded-xl bg-white dark:bg-navy border border-slate-300 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas font-mono focus:outline-none focus:ring-2 focus:ring-teal"
                          />
                        </div>

                        {/* Upload Calculation Sheet Simulation */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-slate-400">
                            Optional: Hand-written diagram / photo
                          </span>
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-navy-light text-xs font-bold text-slate-500 hover:text-teal cursor-pointer"
                            onClick={() => alert('Worksheet upload interface ready. Backend file storage will attach in Phase 2.')}
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Attach Diagram (PDF/PNG)</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-navy-light/40 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setDescriptiveSubmitted(true)}
                      className={`${BUTTON_STYLES.gold} px-8 py-3 text-xs sm:text-sm font-bold`}
                    >
                      Submit Descriptive Solutions
                    </button>
                  </div>
                </>
              ) : (
                /* Descriptive Submission Confirmation */
                <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-teal/20 text-teal flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <h3 className="text-2xl font-black text-navy dark:text-canvas">
                    Descriptive Solutions Submitted Successfully
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                    Your answers for <strong>{selectedExam.title}</strong> have been recorded in this browser session.
                  </p>

                  <div className="p-4 max-w-lg mx-auto rounded-2xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/40 text-xs text-slate-500 text-left">
                    ℹ️ <strong>Phase 2 Notification:</strong> In the upcoming database phase, descriptive engineering submissions will be routed to course instructors for rubric grading, partial credit marking, and feedback.
                  </div>

                  <div className="pt-4 flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setDescriptiveSubmitted(false)}
                      className={`${BUTTON_STYLES.secondary} px-6 py-2.5 text-xs font-bold`}
                    >
                      Edit Submission Draft
                    </button>
                    <button
                      type="button"
                      onClick={handleExitExam}
                      className={`${BUTTON_STYLES.primary} px-6 py-2.5 text-xs font-bold`}
                    >
                      Return to Examination Catalog
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
