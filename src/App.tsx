import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { DashboardProvider } from './context/DashboardContext'
import { DashboardLayout } from './components/dashboard/DashboardLayout'
import { HomePage } from './pages/HomePage'
import { StudentsPage } from './pages/StudentsPage'
import { CoursesPage } from './pages/CoursesPage'
import { SubjectDetailPage } from './pages/SubjectDetailPage'
import { OnlineClassPage } from './pages/OnlineClassPage'
import { TakeTestsPage } from './pages/TakeTestsPage'
import { AssignmentsPage } from './pages/AssignmentsPage'
import { StudyMaterialsPage } from './pages/StudyMaterialsPage'
import { ResultsPage } from './pages/ResultsPage'
import { CalendarPage } from './pages/CalendarPage'
import { NotificationsPage } from './pages/NotificationsPage'
import { SettingsPage } from './pages/SettingsPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <BrowserRouter>
          <DashboardLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:subjectId" element={<SubjectDetailPage />} />
              <Route path="/online-class" element={<OnlineClassPage />} />
              <Route path="/take-tests" element={<TakeTestsPage />} />
              <Route path="/assignments" element={<AssignmentsPage />} />
              <Route path="/study-materials" element={<StudyMaterialsPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DashboardLayout>
        </BrowserRouter>
      </DashboardProvider>
    </ThemeProvider>
  )
}
