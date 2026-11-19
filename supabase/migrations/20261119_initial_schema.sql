-- =====================================================================
-- basicS Learning Management System — Supabase Database Migration Schema
-- Created: November 2026
-- Database: PostgreSQL 15+ (Supabase)
-- =====================================================================

-- 1. PROFILES & USERS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'student')),
    avatar TEXT,
    title TEXT,
    student_id TEXT,
    institution TEXT DEFAULT 'basicS Academic Institute',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COURSES / DISCIPLINES
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    level TEXT NOT NULL CHECK (level IN ('Foundational', 'Core', 'Advanced')),
    tagline TEXT,
    description TEXT,
    instructor TEXT,
    instructor_role TEXT,
    rating NUMERIC(3, 2) DEFAULT 4.90,
    enrolled_students TEXT DEFAULT '0',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. MODULES
CREATE TABLE IF NOT EXISTS public.modules (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    lessons_count INT DEFAULT 0,
    topics TEXT[] DEFAULT '{}',
    sort_order INT DEFAULT 0
);

-- 4. UNITS & LECTURES
CREATE TABLE IF NOT EXISTS public.units (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.lectures (
    id TEXT PRIMARY KEY,
    unit_id TEXT NOT NULL REFERENCES public.units(id) ON DELETE CASCADE,
    lecture_number INT NOT NULL,
    title TEXT NOT NULL,
    duration TEXT,
    video_url TEXT,
    notes_available BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- 5. STUDY MATERIALS
CREATE TABLE IF NOT EXISTS public.study_materials (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    file_size TEXT,
    pages INT DEFAULT 1,
    description TEXT,
    download_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ONLINE CLASSES
CREATE TABLE IF NOT EXISTS public.online_classes (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    subject_code TEXT NOT NULL,
    instructor TEXT NOT NULL,
    class_date TEXT NOT NULL,
    class_time TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Live Now', 'Scheduled', 'Completed')),
    google_meet_url TEXT,
    attendees_count INT DEFAULT 0,
    description TEXT,
    topics_covered TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ASSIGNMENTS & SUBMISSIONS
CREATE TABLE IF NOT EXISTS public.assignments (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subject TEXT NOT NULL,
    subject_code TEXT NOT NULL,
    due_date TEXT NOT NULL,
    due_time TEXT NOT NULL,
    total_points INT DEFAULT 100,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.assignment_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assignment_id TEXT NOT NULL REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    file_url TEXT,
    status TEXT NOT NULL DEFAULT 'Submitted' CHECK (status IN ('Pending', 'Submitted', 'Graded')),
    grade TEXT,
    feedback TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TESTS & RESULTS
CREATE TABLE IF NOT EXISTS public.tests (
    id TEXT PRIMARY KEY,
    course_id TEXT REFERENCES public.courses(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Quiz', 'Unit Assessment', 'Final Exam')),
    questions_count INT NOT NULL,
    duration TEXT NOT NULL,
    passing_score INT DEFAULT 70
);

CREATE TABLE IF NOT EXISTS public.test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    test_id TEXT NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    student_name TEXT NOT NULL,
    student_avatar TEXT,
    test_title TEXT NOT NULL,
    subject_code TEXT NOT NULL,
    score INT NOT NULL,
    total_score INT NOT NULL,
    percentage INT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Passed', 'Failed')),
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CALENDAR EVENTS
CREATE TABLE IF NOT EXISTS public.calendar_events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    event_date DATE NOT NULL,
    event_time TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('class', 'test', 'assignment')),
    subject_code TEXT,
    location_or_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.online_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

-- Read policies for authenticated users
CREATE POLICY "Public courses are viewable by all users" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Modules are viewable by all users" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Units are viewable by all users" ON public.units FOR SELECT USING (true);
CREATE POLICY "Lectures are viewable by all users" ON public.lectures FOR SELECT USING (true);
CREATE POLICY "Study materials are viewable by all users" ON public.study_materials FOR SELECT USING (true);
CREATE POLICY "Online classes are viewable by all users" ON public.online_classes FOR SELECT USING (true);
CREATE POLICY "Assignments are viewable by all users" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Calendar events are viewable by all users" ON public.calendar_events FOR SELECT USING (true);
CREATE POLICY "Tests are viewable by all users" ON public.tests FOR SELECT USING (true);

-- Student-specific policies
CREATE POLICY "Students can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Students can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Students can view their own submissions" ON public.assignment_submissions FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can create submissions" ON public.assignment_submissions FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can view their own results" ON public.test_results FOR SELECT USING (auth.uid() = student_id);

-- Admin policies (Full access for users with role='admin')
CREATE POLICY "Admins have full access to all profiles" ON public.profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins have full access to calendar events" ON public.calendar_events FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins have full access to submissions" ON public.assignment_submissions FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admins have full access to test results" ON public.test_results FOR ALL USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
