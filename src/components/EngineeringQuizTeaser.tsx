import { useState } from 'react'
import { Sparkles, CheckCircle2, XCircle } from 'lucide-react'
import { BUTTON_STYLES } from '../theme/tokens'

export function EngineeringQuizTeaser() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)

  const question = {
    title: 'Quick Engineering Check: Mechanical Vibration',
    prompt:
      'In a single-degree-of-freedom (SDOF) spring-mass system, if the spring stiffness (k) is increased by 4 times while keeping the mass constant, what happens to the natural frequency (ωn)?',
    options: [
      { text: 'A) The natural frequency doubles (increases by 2x)', isCorrect: true, explanation: 'Correct! Because ωn = √(k/m). When k is replaced by 4k, √(4k/m) = 2√(k/m), exactly doubling the frequency!' },
      { text: 'B) The natural frequency quadruples (increases by 4x)', isCorrect: false, explanation: 'Incorrect. Remember that natural frequency depends on the square root of stiffness: ωn = √(k/m).' },
      { text: 'C) The natural frequency is halved (0.5x)', isCorrect: false, explanation: 'Incorrect. Increasing stiffness makes the system oscillate faster, not slower!' },
      { text: 'D) The natural frequency remains unchanged', isCorrect: false, explanation: 'Incorrect. Natural frequency is directly governed by spring stiffness and mass.' },
    ],
  }

  const handleSelect = (idx: number) => {
    if (submitted) return
    setSelectedOption(idx)
  }

  const handleReset = () => {
    setSelectedOption(null)
    setSubmitted(false)
  }

  return (
    <div className="w-full bg-gradient-to-br from-navy via-navy-card to-navy rounded-3xl p-6 sm:p-10 border border-teal/40 text-canvas shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal/15 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/20 text-teal-light text-xs font-bold uppercase tracking-wider mb-4 border border-teal/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Practice Sample</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
          {question.title}
        </h3>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          {question.prompt}
        </p>

        {/* Options */}
        <div className="mt-6 space-y-3">
          {question.options.map((opt, idx) => {
            const isSelected = selectedOption === idx
            let btnClass = 'bg-navy-light/40 border-navy-light hover:bg-navy-light/80 hover:border-teal'

            if (submitted) {
              if (opt.isCorrect) {
                btnClass = 'bg-teal/20 border-teal text-teal-light font-bold'
              } else if (isSelected && !opt.isCorrect) {
                btnClass = 'bg-rose-500/20 border-rose-500 text-rose-300'
              }
            } else if (isSelected) {
              btnClass = 'bg-teal/20 border-teal text-white shadow-sm ring-2 ring-teal/50'
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${btnClass}`}
              >
                <span>{opt.text}</span>
                {submitted && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-teal shrink-0 ml-2" />
                )}
                {submitted && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback & Actions */}
        <div className="mt-6 pt-5 border-t border-navy-light/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {!submitted ? (
            <>
              <span className="text-xs text-slate-400">
                Select an answer to test your engineering intuition.
              </span>
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={() => setSubmitted(true)}
                className={`${BUTTON_STYLES.primary} px-6 py-2.5 text-xs sm:text-sm ${
                  selectedOption === null ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Submit Answer
              </button>
            </>
          ) : (
            <div className="w-full space-y-3">
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm ${
                  question.options[selectedOption!].isCorrect
                    ? 'bg-teal/20 border-teal/40 text-teal-light'
                    : 'bg-rose-500/15 border-rose-500/30 text-rose-200'
                }`}
              >
                {question.options[selectedOption!].explanation}
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-400">
                  Every basicS module includes hundreds of step-by-step practice problems like this.
                </span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-semibold text-gold hover:underline cursor-pointer"
                >
                  Try Again &or;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
