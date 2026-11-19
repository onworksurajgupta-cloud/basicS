export type UserRole = 'admin' | 'student'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  title: string
  institution?: string
  studentId?: string
}

export interface StudentItem {
  id: string
  name: string
  studentId: string
  email: string
  avatar: string
  enrolledCourses: string[]
  progressPercentage: number
  attendanceRate: number
  overallGrade: string
  status: 'Active' | 'On Leave' | 'Graduated'
}

export interface AssignmentItem {
  id: string
  title: string
  subject: string
  subjectCode: string
  dueDate: string
  dueTime: string
  totalPoints: number
  submittedCount?: number
  totalStudents?: number
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue'
  description: string
  grade?: string
}

export interface TestResultItem {
  id: string
  studentName: string
  studentAvatar: string
  testTitle: string
  subjectCode: string
  score: number
  totalScore: number
  percentage: number
  submittedAt: string
  status: 'Passed' | 'Needs Improvement'
}

export interface CalendarEventItem {
  id: string
  title: string
  date: string // ISO 'YYYY-MM-DD'
  time: string
  type: 'class' | 'test' | 'assignment' | 'task' | 'meeting' | 'reminder' | 'announcement'
  subjectCode?: string
  locationOrUrl?: string
  description?: string
  completed?: boolean
  priority?: 'low' | 'medium' | 'high'
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'class' | 'test' | 'assignment' | 'system'
}
