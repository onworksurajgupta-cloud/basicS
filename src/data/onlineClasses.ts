export interface OnlineClassItem {
  id: string
  title: string
  subject: string
  subjectCode: string
  instructor: string
  date: string
  time: string
  status: 'Live Now' | 'Scheduled' | 'Completed'
  googleMeetUrl: string
  attendeesCount: number
  description: string
  topicsCovered: string[]
}

export interface RecordedLectureItem {
  id: string
  title: string
  subject: string
  subjectCode: string
  instructor: string
  recordedDate: string
  duration: string
  viewsCount: string
  description: string
  thumbnailColor: string
}

export const UPCOMING_CLASSES: OnlineClassItem[] = [
  {
    id: 'class-1',
    title: 'Live Workshop: Mohr’s Circle Construction & Stress Transformations',
    subject: 'Mechanics of Solids',
    subjectCode: 'ME-201',
    instructor: 'Alex Mercer',
    date: 'Today',
    time: '5:00 PM – 6:30 PM IST',
    status: 'Live Now',
    googleMeetUrl: 'https://meet.google.com/bsc-solids-live',
    attendeesCount: 84,
    description: 'Interactive live derivation of graphical Mohr’s circle plotting, principal planes, and failure criteria.',
    topicsCovered: ['Plane Stress State', 'Graphical Center & Radius', 'Principal Stress Directions', 'Live Numerical Demo'],
  },
  {
    id: 'class-2',
    title: 'Finite Element Stiffness Assembly: 1D Stepped Bar Case Study',
    subject: 'Finite Element Analysis',
    subjectCode: 'ME-402',
    instructor: 'Prof. David Vance',
    date: 'Tomorrow',
    time: '6:00 PM – 7:30 PM IST',
    status: 'Scheduled',
    googleMeetUrl: 'https://meet.google.com/bsc-fea-live',
    attendeesCount: 112,
    description: 'Detailed walkthrough on manual matrix assembly, boundary condition elimination, and reaction forces.',
    topicsCovered: ['Local vs Global Coordinates', 'Boundary Penalty Method', 'Axial Nodal Displacements'],
  },
  {
    id: 'class-3',
    title: 'Harmonic Oscillation & Resonance in Industrial Shafts',
    subject: 'Mechanical Vibration',
    subjectCode: 'ME-305',
    instructor: 'Dr. Sarah Lin',
    date: 'Friday, Nov 21',
    time: '4:30 PM – 6:00 PM IST',
    status: 'Scheduled',
    googleMeetUrl: 'https://meet.google.com/bsc-vib-live',
    attendeesCount: 96,
    description: 'Exploring rotating machine unbalance, dynamic magnification factors, and rubber isolation mounting.',
    topicsCovered: ['Magnification Factor (M)', 'Critical Whirling Speeds', 'Transmissibility Curves'],
  },
  {
    id: 'class-4',
    title: 'Carnot Heat Engine & Steam Tables Problem Solving Clinic',
    subject: 'Basic Mechanical Engineering',
    subjectCode: 'ME-101',
    instructor: 'Dr. Evelyn Reed',
    date: 'Saturday, Nov 22',
    time: '11:00 AM – 12:30 PM IST',
    status: 'Scheduled',
    googleMeetUrl: 'https://meet.google.com/bsc-bme-live',
    attendeesCount: 135,
    description: 'Solving complex steam quality problems and thermodynamic cycle enthalpy balances.',
    topicsCovered: ['Dryness Fraction (x)', 'Rankine Heat Rate', 'Steam Enthalpy Calculations'],
  },
]

export const RECORDED_LECTURES: RecordedLectureItem[] = [
  {
    id: 'rec-1',
    title: 'Derivation of Euler-Bernoulli Beam Differential Equation',
    subject: 'Mechanics of Solids',
    subjectCode: 'ME-201',
    instructor: 'Alex Mercer',
    recordedDate: 'Nov 12, 2026',
    duration: '1 hr 18 mins',
    viewsCount: '1.4k views',
    description: 'Complete first-principles breakdown of pure bending assumptions and curvature relations.',
    thumbnailColor: 'from-amber-500/20 to-navy',
  },
  {
    id: 'rec-2',
    title: 'SDOF Damped Free Vibration & Logarithmic Decrement Clinic',
    subject: 'Mechanical Vibration',
    subjectCode: 'ME-305',
    instructor: 'Dr. Sarah Lin',
    recordedDate: 'Nov 08, 2026',
    duration: '1 hr 05 mins',
    viewsCount: '2.1k views',
    description: 'Practical analysis of decaying waveforms and experimental determination of damping ratios.',
    thumbnailColor: 'from-teal/20 to-navy',
  },
  {
    id: 'rec-3',
    title: 'Introduction to Constant Strain Triangle (CST) 2D Elements',
    subject: 'Finite Element Analysis',
    subjectCode: 'ME-402',
    instructor: 'Prof. David Vance',
    recordedDate: 'Nov 04, 2026',
    duration: '1 hr 25 mins',
    viewsCount: '1.8k views',
    description: 'Natural coordinates, area interpolation shape functions, and element strain matrix formulation.',
    thumbnailColor: 'from-gold/20 to-navy',
  },
  {
    id: 'rec-4',
    title: 'Thermodynamic Power Cycles: Rankine vs Brayton Comparison',
    subject: 'Basic Mechanical Engineering',
    subjectCode: 'ME-101',
    instructor: 'Dr. Evelyn Reed',
    recordedDate: 'Oct 29, 2026',
    duration: '58 mins',
    viewsCount: '3.2k views',
    description: 'Comparing steam and gas turbine systems with pressure-volume and temperature-entropy graphs.',
    thumbnailColor: 'from-teal-light/20 to-navy',
  },
]
