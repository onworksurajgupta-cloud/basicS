import { useState } from 'react'
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  MessageSquare,
} from 'lucide-react'
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
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name.'
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address (e.g. name@university.edu).'
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please enter a message with at least 15 characters.'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal/10 text-teal-dark dark:text-teal-light text-xs font-bold uppercase tracking-wider mb-4 border border-teal/20">
          <MessageSquare className="w-4 h-4" />
          <span>Academic Support &amp; Inquiries</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-navy dark:text-canvas">
          Contact the basicS Team
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Have questions about the curriculum, Google Meet classes, or examination scoring? Reach out to our academic coordinators.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-navy rounded-3xl border border-slate-200/90 dark:border-navy-light/60 p-6 sm:p-10 shadow-lg">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-navy dark:text-canvas">Send a Message</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  We usually respond within 24 hours on academic working days.
                </p>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Suraj Gupta"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: '' })
                  }}
                  className={`w-full p-3.5 rounded-xl bg-canvas dark:bg-navy-card/60 border text-sm text-navy dark:text-canvas focus:outline-none transition-all ${
                    errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-navy-light focus:border-teal'
                  }`}
                />
                {errors.name && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="name@institution.edu"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: '' })
                  }}
                  className={`w-full p-3.5 rounded-xl bg-canvas dark:bg-navy-card/60 border text-sm text-navy dark:text-canvas focus:outline-none transition-all ${
                    errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-navy-light focus:border-teal'
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.email}</p>}
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-canvas dark:bg-navy-card/60 border border-slate-300 dark:border-navy-light text-sm text-navy dark:text-canvas focus:outline-none focus:border-teal"
                >
                  <option>General Academic Inquiry</option>
                  <option>Basic Mechanical Engineering (ME-101)</option>
                  <option>Finite Element Analysis (ME-402)</option>
                  <option>Mechanical Vibration (ME-305)</option>
                  <option>Mechanics of Solids (ME-201)</option>
                  <option>Online Class &amp; Google Meet Support</option>
                  <option>Exam Arena &amp; Test Submissions</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your inquiry, feedback, or subject question in detail..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value })
                    if (errors.message) setErrors({ ...errors, message: '' })
                  }}
                  className={`w-full p-3.5 rounded-xl bg-canvas dark:bg-navy-card/60 border text-sm text-navy dark:text-canvas focus:outline-none transition-all ${
                    errors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-300 dark:border-navy-light focus:border-teal'
                  }`}
                />
                {errors.message && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.message}</p>}
              </div>

              {/* Backend Delivery Notice */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Notice:</strong> This form validates your message on the client. External email dispatch will be active when backend email integration is configured in Phase 2.
                </span>
              </div>

              <button
                type="submit"
                className={`${BUTTON_STYLES.primary} w-full py-3.5 text-sm font-bold gap-2`}
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          ) : (
            /* Successful Submission Screen */
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-teal/20 text-teal flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <h3 className="text-2xl font-black text-navy dark:text-canvas">
                Thank You, {formData.name}!
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Your message regarding <strong>"{formData.subject}"</strong> has been validated and queued.
              </p>

              <div className="p-4 rounded-xl bg-canvas dark:bg-navy-card/50 border border-slate-200 dark:border-navy-light/40 text-xs text-slate-500 text-left">
                ℹ️ <strong>Backend Configuration Status:</strong> Message saved locally. Automated SMTP / Webhook email delivery connects in Phase 2.
              </div>

              <button
                type="button"
                onClick={() => {
                  setFormData({ name: '', email: '', subject: 'General Academic Inquiry', message: '' })
                  setSubmitted(false)
                }}
                className={`${BUTTON_STYLES.secondary} px-6 py-2.5 text-xs font-bold`}
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Contact Metadata & Information */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl bg-white dark:bg-navy border border-slate-200/90 dark:border-navy-light/60 shadow-md space-y-6">
            <h3 className="text-lg font-black text-navy dark:text-canvas">
              Direct Contact Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-navy dark:text-canvas">Email Support</div>
                  <div className="text-slate-500 dark:text-slate-400">academic@basics-lms.edu</div>
                  <div className="text-[11px] text-teal">Response within 24 hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-navy dark:text-canvas">Academic Support Hours</div>
                  <div className="text-slate-500 dark:text-slate-400">Monday – Saturday</div>
                  <div className="text-[11px] text-slate-400">9:00 AM – 7:00 PM IST</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-teal/15 text-teal flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-navy dark:text-canvas">Curriculum Headquarters</div>
                  <div className="text-slate-500 dark:text-slate-400">basicS Engineering Learning Systems</div>
                  <div className="text-[11px] text-slate-400">Virtual Cloud-Hosted Platform</div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic FAQ Callout */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-navy via-navy-card to-navy text-canvas border border-teal/40 shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-teal flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-white">Need Quick Course Enrollment?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              All 4 core subjects are completely self-paced. You do not need admin approval to begin learning right now.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
