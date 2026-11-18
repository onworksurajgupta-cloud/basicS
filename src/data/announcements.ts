export interface AnnouncementItem {
  id: string
  title: string
  date: string
  category: 'Academics' | 'Exams' | 'Live Class' | 'Platform'
  summary: string
  isImportant?: boolean
  linkUrl?: string
}

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Spring 2026 Cohort Registration is Officially Open',
    date: 'Nov 18, 2026',
    category: 'Academics',
    summary:
      'Enrollment is now live across all 4 Mechanical Engineering disciplines with full access to Modules, Practice Worksheets, and Benchmark Tests.',
    isImportant: true,
  },
  {
    id: 'ann-2',
    title: 'Live Google Meet Doubt-Clearing Clinic This Friday',
    date: 'Nov 16, 2026',
    category: 'Live Class',
    summary:
      'Join Alex Mercer on Google Meet for live step-by-step Mohr’s Circle plotting and complex stress tensor resolution. Check the Online Class tab for links.',
    isImportant: true,
  },
  {
    id: 'ann-3',
    title: 'Diagnostic Benchmark Tests Published for All Subjects',
    date: 'Nov 12, 2026',
    category: 'Exams',
    summary:
      'Both MCQ Examination and Descriptive Examination arenas are now live under the "Take Tests" navigation portal. Practice with realistic exam time constraints.',
    isImportant: false,
  },
  {
    id: 'ann-4',
    title: 'New Study Materials & Hand-Derived Formula Compendiums Added',
    date: 'Nov 08, 2026',
    category: 'Platform',
    summary:
      'High-resolution PDF formula sheets and solved numerical problem handbooks have been uploaded to each subject details page.',
    isImportant: false,
  },
]
