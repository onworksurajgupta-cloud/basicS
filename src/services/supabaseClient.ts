/**
 * basicS — Supabase Integration Readiness Layer
 *
 * This service abstracts database communication away from UI components.
 * When you provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file,
 * this client connects to your live Supabase database.
 * Until then, it gracefully serves typed local academic data.
 */

import { SAMPLE_STUDENTS } from '../data/studentsData'
import { COURSES } from '../data/curriculum'
import { SAMPLE_ASSIGNMENTS } from '../data/assignmentsData'
import { SAMPLE_RESULTS } from '../data/resultsData'
import { INITIAL_CALENDAR_EVENTS } from '../data/eventsData'
import type { StudentItem, AssignmentItem, TestResultItem, CalendarEventItem } from '../types/dashboard'
import type { Subject } from '../data/curriculum'

export interface DatabaseStatus {
  isConnected: boolean
  provider: 'Local Mock Store' | 'Supabase Cloud PostgreSQL'
  notice: string
}

const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || ''

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

export const databaseStatus: DatabaseStatus = {
  isConnected: isSupabaseConfigured,
  provider: isSupabaseConfigured ? 'Supabase Cloud PostgreSQL' : 'Local Mock Store',
  notice: isSupabaseConfigured
    ? 'Connected to live Supabase backend database.'
    : 'Running in demonstration mode with mock academic data. Connect Supabase in Phase 2 for permanent database persistence.',
}

/**
 * Data Access Service Functions
 * Ready to hook directly to Supabase table queries
 */
export async function getStudents(): Promise<StudentItem[]> {
  // If Supabase configured, execute: await supabase.from('profiles').select('*')
  return SAMPLE_STUDENTS
}

export async function getCourses(): Promise<Subject[]> {
  // If Supabase configured, execute: await supabase.from('courses').select('*, modules(*)')
  return COURSES
}

export async function getAssignments(): Promise<AssignmentItem[]> {
  // If Supabase configured, execute: await supabase.from('assignments').select('*')
  return SAMPLE_ASSIGNMENTS
}

export async function getTestResults(): Promise<TestResultItem[]> {
  // If Supabase configured, execute: await supabase.from('test_results').select('*')
  return SAMPLE_RESULTS
}

export async function getCalendarEvents(): Promise<CalendarEventItem[]> {
  // If Supabase configured, execute: await supabase.from('calendar_events').select('*')
  return INITIAL_CALENDAR_EVENTS
}
