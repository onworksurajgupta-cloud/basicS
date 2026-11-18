import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { BUTTON_STYLES } from '../theme/tokens'

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Academic Inquiry',
    message: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState<boolean>(false)

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!formData.name.trim()) errs.name = 'Please provide your name.'
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please enter at least 10 characters.'
    }
    return errs
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setSubmitted(true)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy dark:text-canvas">
          Contact Us
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Have questions or need guidance on courses, tests, or curriculum? Reach out to us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="md:col-span-8 p-6 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: '' })
                  }}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-navy border border-slate-300 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal"
                />
                {errors.name && <p className="text-[11px] text-rose-500 mt-0.5">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-navy border border-slate-300 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal"
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-navy border border-slate-300 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal"
                >
                  <option>General Academic Inquiry</option>
                  <option>Basic Mechanical Engineering (ME-101)</option>
                  <option>Finite Element Analysis (ME-402)</option>
                  <option>Mechanical Vibration (ME-305)</option>
                  <option>Mechanics of Solids (ME-201)</option>
                  <option>Online Class &amp; Google Meet</option>
                  <option>Tests &amp; Exams</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value })
                    if (errors.message) setErrors({ ...errors, message: '' })
                  }}
                  className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-navy border border-slate-300 dark:border-navy-light text-xs sm:text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal"
                />
                {errors.message && <p className="text-[11px] text-rose-500 mt-0.5">{errors.message}</p>}
              </div>

              <p className="text-[11px] text-slate-400">
                Note: Form validated locally. Direct email delivery will be active once backend integration connects.
              </p>

              <button
                type="submit"
                className={`${BUTTON_STYLES.primary} px-6 py-2.5 text-xs font-semibold gap-1.5`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          ) : (
            <div className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-teal mx-auto" />
              <h3 className="text-base font-bold text-navy dark:text-canvas">
                Message Sent, {formData.name}
              </h3>
              <p className="text-xs text-slate-500">
                We have received your message regarding "{formData.subject}". We will reply to {formData.email}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setFormData({ name: '', email: '', subject: 'General Academic Inquiry', message: '' })
                  setSubmitted(false)
                }}
                className={`${BUTTON_STYLES.secondary} px-4 py-2 text-xs`}
              >
                Send Another
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-4 p-5 bg-white dark:bg-navy-card rounded-xl border border-slate-200 dark:border-navy-light/60 space-y-3 text-xs">
          <h3 className="font-bold text-sm text-navy dark:text-canvas">Information</h3>

          <div className="space-y-1">
            <span className="text-slate-400">Email:</span>
            <div className="font-medium text-navy dark:text-canvas">support@basics-lms.edu</div>
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-navy-light/30">
            <span className="text-slate-400">Hours:</span>
            <div className="font-medium text-navy dark:text-canvas">Monday &ndash; Saturday, 9am &ndash; 6pm</div>
          </div>
        </div>
      </div>
    </div>
  )
}
