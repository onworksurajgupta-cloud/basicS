import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { CoursesPage } from './pages/CoursesPage'
import { SubjectDetailPage } from './pages/SubjectDetailPage'
import { OnlineClassPage } from './pages/OnlineClassPage'
import { TakeTestsPage } from './pages/TakeTestsPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-canvas dark:bg-navy-dark text-navy dark:text-canvas transition-colors duration-300 selection:bg-teal selection:text-white bg-grid-subtle">
          {/* Main Top Navigation Bar */}
          <Navbar />

          {/* Dynamic Page Routes */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:subjectId" element={<SubjectDetailPage />} />
              <Route path="/online-class" element={<OnlineClassPage />} />
              <Route path="/take-tests" element={<TakeTestsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Shared Global Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}
