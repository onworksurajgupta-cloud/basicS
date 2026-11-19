import type { CalendarEventItem } from '../types/dashboard'

export const INITIAL_CALENDAR_EVENTS: CalendarEventItem[] = [
  {
    id: 'evt-1',
    title: 'Mohr’s Circle Construction Live Workshop',
    date: '2026-11-19', // Today
    time: '5:00 PM – 6:30 PM',
    type: 'class',
    subjectCode: 'ME-201',
    locationOrUrl: 'https://meet.google.com/bsc-solids-live',
    description: 'Live interactive derivation of Mohr’s stress transformation on Google Meet.',
  },
  {
    id: 'evt-2',
    title: 'FEA 1D Stepped Bar Stiffness Assembly Class',
    date: '2026-11-20', // Tomorrow
    time: '6:00 PM – 7:30 PM',
    type: 'class',
    subjectCode: 'ME-402',
    locationOrUrl: 'https://meet.google.com/bsc-fea-live',
    description: 'Step-by-step matrix assembly and boundary condition elimination.',
  },
  {
    id: 'evt-3',
    title: 'Mechanical Vibration SDOF Midterm Exam',
    date: '2026-11-21',
    time: '4:00 PM – 5:30 PM',
    type: 'test',
    subjectCode: 'ME-305',
    description: 'Timed diagnostic assessment covering free and damped vibrations.',
  },
  {
    id: 'evt-4',
    title: 'Assignment Deadline: Mohr’s Circle Plotting',
    date: '2026-11-22',
    time: '11:59 PM',
    type: 'assignment',
    subjectCode: 'ME-201',
    description: 'Submit calculation sheets and transformed 2D stress tensors.',
  },
  {
    id: 'evt-5',
    title: 'Finite Element Analysis Project Deadline',
    date: '2026-11-25',
    time: '5:00 PM',
    type: 'assignment',
    subjectCode: 'ME-402',
    description: 'Submit 3-bar truss nodal reaction calculations.',
  },
  {
    id: 'evt-6',
    title: 'Mechanics of Solids Benchmark Certification Exam',
    date: '2026-11-27',
    time: '10:00 AM – 11:40 AM',
    type: 'test',
    subjectCode: 'ME-201',
    description: 'Comprehensive 40-question end-of-unit certification test.',
  },
  {
    id: 'evt-7',
    title: 'Spring 2026 Cohort Orientation & Welcome Session',
    date: '2026-11-18', // Yesterday
    time: '3:00 PM – 4:00 PM',
    type: 'announcement',
    description: 'Platform overview and syllabus walkthrough with Lead Academic Director.',
  },
]
