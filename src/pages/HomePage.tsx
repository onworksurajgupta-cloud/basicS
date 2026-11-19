import { useDashboard } from '../context/DashboardContext'
import { AdminDashboardView } from '../components/dashboard/AdminDashboardView'
import { StudentDashboardView } from '../components/dashboard/StudentDashboardView'

export function HomePage() {
  const { role } = useDashboard()

  return role === 'admin' ? <AdminDashboardView /> : <StudentDashboardView />
}
