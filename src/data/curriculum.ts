/**
 * basicS — Multi-Subject Curriculum Data
 *
 * Fully modular and extensible:
 * Units, Lectures, Study Materials, Modules, Practice Work, and Tests.
 */

export interface LectureItem {
  id: string
  lectureNumber: number
  title: string
  duration: string
  videoUrl?: string
  notesAvailable: boolean
}

export interface UnitItem {
  id: string
  unitNumber: number
  title: string
  description: string
  lectures: LectureItem[]
}

export interface StudyMaterialItem {
  id: string
  title: string
  type: 'PDF Formula Sheet' | 'Handwritten Lecture Notes' | 'Numerical Problem Book' | 'Derivation Compendium'
  fileSize: string
  pages: number
  description: string
  downloadUrl?: string
}

export interface ModuleItem {
  id: string
  title: string
  description: string
  duration: string
  lessonsCount: number
  topics: string[]
}

export interface PracticeItem {
  id: string
  title: string
  problemsCount: number
  estimatedTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
}

export interface TestItem {
  id: string
  title: string
  type: 'Quiz' | 'Unit Assessment' | 'Final Exam'
  questionsCount: number
  duration: string
  passingScore: number // in percentage, e.g. 75
}

export interface Subject {
  id: string
  name: string
  code: string
  level: 'Foundational' | 'Core' | 'Advanced'
  tagline: string
  description: string
  accentColor: 'teal' | 'gold'
  instructor: string
  instructorRole: string
  rating: number
  enrolledStudents: string
  modules: ModuleItem[]
  practiceWork: PracticeItem[]
  tests: TestItem[]
  units: UnitItem[]
  studyMaterials: StudyMaterialItem[]
}

export const SUBJECTS: Subject[] = [
  {
    id: 'bme',
    name: 'Basic Mechanical Engineering',
    code: 'ME-101',
    level: 'Foundational',
    accentColor: 'teal',
    instructor: 'Dr. Evelyn Reed',
    instructorRole: 'Professor of Thermal Sciences, MIT Alum',
    rating: 4.94,
    enrolledStudents: '5,420',
    tagline: 'Thermodynamics, energy conversion systems, and fundamental machine components.',
    description:
      'A primary gateway into mechanical engineering covering heat cycles, power transmission systems, fluid power, and materials manufacturing.',
    units: [
      {
        id: 'bme-u1',
        unitNumber: 1,
        title: 'Thermal Engineering & Energy Laws',
        description: 'First and Second Laws of Thermodynamics, open and closed systems, enthalpy, and the Carnot cycle.',
        lectures: [
          { id: 'bme-l1', lectureNumber: 1, title: 'Introduction to Thermodynamic Systems & Boundaries', duration: '45 mins', notesAvailable: true },
          { id: 'bme-l2', lectureNumber: 2, title: 'First Law of Thermodynamics & Non-Flow Energy Equation', duration: '52 mins', notesAvailable: true },
          { id: 'bme-l3', lectureNumber: 3, title: 'Second Law, Heat Reservoirs & Kelvin-Planck Statements', duration: '48 mins', notesAvailable: true },
          { id: 'bme-l4', lectureNumber: 4, title: 'Carnot Heat Engine & Theoretical Efficiency Limits', duration: '50 mins', notesAvailable: true },
        ],
      },
      {
        id: 'bme-u2',
        unitNumber: 2,
        title: 'Steam Properties & Power Cycles',
        description: 'Vapor power systems, steam generators, Rankine cycle, and steam tables analysis.',
        lectures: [
          { id: 'bme-l5', lectureNumber: 5, title: 'Steam Generation: Wet, Dry Saturated & Superheated States', duration: '40 mins', notesAvailable: true },
          { id: 'bme-l6', lectureNumber: 6, title: 'Using Steam Tables & Mollier Diagrams for Enthalpy', duration: '55 mins', notesAvailable: true },
          { id: 'bme-l7', lectureNumber: 7, title: 'Simple Rankine Cycle Analysis with Boiler & Turbine Stages', duration: '60 mins', notesAvailable: true },
        ],
      },
      {
        id: 'bme-u3',
        unitNumber: 3,
        title: 'Machine Kinematics & Power Transmission',
        description: 'Belt drives, gear trains, clutches, couplings, and mechanical power transfer.',
        lectures: [
          { id: 'bme-l8', lectureNumber: 8, title: 'Flat vs V-Belt Drives: Velocity Ratio, Slip & Creep', duration: '46 mins', notesAvailable: true },
          { id: 'bme-l9', lectureNumber: 9, title: 'Gear Train Classification: Simple, Compound & Epicyclic', duration: '58 mins', notesAvailable: true },
          { id: 'bme-l10', lectureNumber: 10, title: 'Clutches & Couplings: Friction Disc Torque Formulas', duration: '42 mins', notesAvailable: true },
        ],
      },
      {
        id: 'bme-u4',
        unitNumber: 4,
        title: 'Engineering Materials & Manufacturing',
        description: 'Iron-carbon equilibrium, casting metallurgy, arc welding, and metal cutting basics.',
        lectures: [
          { id: 'bme-l11', lectureNumber: 11, title: 'Ferrous & Non-Ferrous Alloys & Heat Treatment Methods', duration: '50 mins', notesAvailable: true },
          { id: 'bme-l12', lectureNumber: 12, title: 'Metal Casting Processes: Sand Molds & Gating Systems', duration: '45 mins', notesAvailable: true },
          { id: 'bme-l13', lectureNumber: 13, title: 'Welding Fundamentals: SMAW, TIG & MIG Techniques', duration: '40 mins', notesAvailable: true },
        ],
      },
    ],
    studyMaterials: [
      {
        id: 'bme-sm1',
        title: 'Thermodynamics & Steam Formula Handbook',
        type: 'PDF Formula Sheet',
        fileSize: '2.4 MB',
        pages: 18,
        description: 'Complete equations for ideal gas relations, first/second law expressions, and steam quality relations.',
      },
      {
        id: 'bme-sm2',
        title: 'Belt Drive & Gear Train Design Summary Notes',
        type: 'Handwritten Lecture Notes',
        fileSize: '4.1 MB',
        pages: 32,
        description: 'Comprehensive derivation of velocity ratios, centrifugal tension corrections, and compound gear train speed reductions.',
      },
      {
        id: 'bme-sm3',
        title: 'Basic Mechanical 100 Solved Numerical Problems',
        type: 'Numerical Problem Book',
        fileSize: '6.8 MB',
        pages: 64,
        description: 'Step-by-step solved problems covering thermodynamic work, Rankine cycle efficiency, and clutch torque ratings.',
      },
    ],
    modules: [
      {
        id: 'bme-m1',
        title: 'Module 1: Laws of Thermodynamics & Heat Engines',
        description: 'First & Second Laws, closed/open systems, Carnot cycle, and energy conservation.',
        duration: '5 hours',
        lessonsCount: 6,
        topics: ['Zeroth & First Law', 'Heat Engines & Heat Pumps', 'Entropy & Carnot Cycle', 'Steam Tables'],
      },
      {
        id: 'bme-m2',
        title: 'Module 2: Energy Conversion & Power Plants',
        description: 'Thermal, hydroelectric, nuclear, and renewable energy conversion mechanisms.',
        duration: '4.5 hours',
        lessonsCount: 5,
        topics: ['Rankine Cycle', 'Boilers & Turbines', 'Hydroelectric Systems', 'Solar & Wind Basics'],
      },
      {
        id: 'bme-m3',
        title: 'Module 3: Machine Elements & Power Transmission',
        description: 'Kinematics of belt drives, chain drives, gear trains, and couplings.',
        duration: '6 hours',
        lessonsCount: 7,
        topics: ['Belt Drive Velocity Ratio', 'Spur & Helical Gears', 'Clutches & Couplings', 'Flywheels'],
      },
      {
        id: 'bme-m4',
        title: 'Module 4: Engineering Materials & Manufacturing',
        description: 'Ferrous/non-ferrous alloys, casting, welding, and metal forming techniques.',
        duration: '5.5 hours',
        lessonsCount: 6,
        topics: ['Iron-Carbon Phase Diagram', 'Sand Casting Basics', 'Arc Welding Types', 'Machining Processes'],
      },
    ],
    practiceWork: [
      {
        id: 'bme-p1',
        title: 'Practice Set 1: Thermodynamic State & Work Calculations',
        problemsCount: 15,
        estimatedTime: '45 mins',
        difficulty: 'Beginner',
        description: 'Compute boundary work, enthalpy changes, and thermal efficiency for ideal gas cycles.',
      },
      {
        id: 'bme-p2',
        title: 'Practice Set 2: Gear Ratio & Belt Tension Numerical Problems',
        problemsCount: 12,
        estimatedTime: '60 mins',
        difficulty: 'Intermediate',
        description: 'Calculate torque transmitted, slip percentage, and gear train velocity ratios.',
      },
      {
        id: 'bme-p3',
        title: 'Practice Set 3: Heat Exchanger & Power Plant Efficiency Worksheets',
        problemsCount: 10,
        estimatedTime: '40 mins',
        difficulty: 'Intermediate',
        description: 'Solve real-world heat transfer balance equations and turbine power output problems.',
      },
    ],
    tests: [
      {
        id: 'bme-t1',
        title: 'Thermodynamics & Energy Conversion Quiz',
        type: 'Quiz',
        questionsCount: 20,
        duration: '30 mins',
        passingScore: 70,
      },
      {
        id: 'bme-t2',
        title: 'Machine Elements & Transmission Assessment',
        type: 'Unit Assessment',
        questionsCount: 15,
        duration: '45 mins',
        passingScore: 75,
      },
      {
        id: 'bme-t3',
        title: 'Basic Mechanical Engineering Comprehensive Benchmark Exam',
        type: 'Final Exam',
        questionsCount: 40,
        duration: '90 mins',
        passingScore: 80,
      },
    ],
  },

  {
    id: 'fea',
    name: 'Finite Element Analysis',
    code: 'ME-402',
    level: 'Advanced',
    accentColor: 'gold',
    instructor: 'Prof. David Vance',
    instructorRole: 'Computational Mechanics Lead, Stanford PhD',
    rating: 4.96,
    enrolledStudents: '3,890',
    tagline: 'Computational numerical simulation for structural stress, thermal gradients, and modal mechanics.',
    description:
      'Rigorous mathematical formulation and discrete element analysis for predicting displacement, strain, and stress in complex engineering geometries.',
    units: [
      {
        id: 'fea-u1',
        unitNumber: 1,
        title: 'Mathematical Foundations & Variational Methods',
        description: 'Rayleigh-Ritz technique, Galerkin weighted residuals, and minimum potential energy principles.',
        lectures: [
          { id: 'fea-l1', lectureNumber: 1, title: 'Historical Evolution & Continuum vs Discrete Discretization', duration: '48 mins', notesAvailable: true },
          { id: 'fea-l2', lectureNumber: 2, title: 'Principle of Minimum Potential Energy & Rayleigh-Ritz Method', duration: '56 mins', notesAvailable: true },
          { id: 'fea-l3', lectureNumber: 3, title: 'Galerkin Weighted Residual Formulation for Differential Equations', duration: '52 mins', notesAvailable: true },
        ],
      },
      {
        id: 'fea-u2',
        unitNumber: 2,
        title: '1D Bar & Truss Formulations',
        description: 'Element stiffness matrix, global assembly, coordinate transformation, and boundary conditions.',
        lectures: [
          { id: 'fea-l4', lectureNumber: 4, title: 'Derivation of 1D Bar Stiffness Matrix [k] = (AE/L)', duration: '50 mins', notesAvailable: true },
          { id: 'fea-l5', lectureNumber: 5, title: 'Global Stiffness Matrix Assembly & Boundary Penalty Methods', duration: '62 mins', notesAvailable: true },
          { id: 'fea-l6', lectureNumber: 6, title: 'Plane Truss Coordinate Transformations [T] & Stress Recovery', duration: '55 mins', notesAvailable: true },
        ],
      },
      {
        id: 'fea-u3',
        unitNumber: 3,
        title: '2D CST & Quadrilateral Formulations',
        description: 'Constant Strain Triangle (CST), shape functions, strain-displacement matrix [B], and constitutive relations.',
        lectures: [
          { id: 'fea-l7', lectureNumber: 7, title: 'Plane Stress vs Plane Strain Formulations & [D] Matrix', duration: '46 mins', notesAvailable: true },
          { id: 'fea-l8', lectureNumber: 8, title: 'Constant Strain Triangle (CST) Shape Functions & Areas', duration: '58 mins', notesAvailable: true },
          { id: 'fea-l9', lectureNumber: 9, title: 'Evaluating Element [B] Matrix & Nodal Stress Smoothing', duration: '54 mins', notesAvailable: true },
        ],
      },
      {
        id: 'fea-u4',
        unitNumber: 4,
        title: 'Isoparametric Mapping & Gauss Quadrature',
        description: 'Natural coordinate systems, Jacobian transformation, numerical integration, and mesh convergence.',
        lectures: [
          { id: 'fea-l10', lectureNumber: 10, title: 'Isoparametric Concept & Natural Coordinates (xi, eta)', duration: '50 mins', notesAvailable: true },
          { id: 'fea-l11', lectureNumber: 11, title: 'Jacobian Matrix [J] Derivation & Area Inversion', duration: '60 mins', notesAvailable: true },
          { id: 'fea-l12', lectureNumber: 12, title: 'Gauss Numerical Quadrature Rules & Mesh Convergence (h vs p)', duration: '48 mins', notesAvailable: true },
        ],
      },
    ],
    studyMaterials: [
      {
        id: 'fea-sm1',
        title: 'Finite Element Matrices & Shape Functions Compendium',
        type: 'PDF Formula Sheet',
        fileSize: '3.1 MB',
        pages: 24,
        description: 'Essential reference sheets for 1D bar, 2D CST, 4-node quad, and beam stiffness matrices.',
      },
      {
        id: 'fea-sm2',
        title: 'Variational Principles & Stiffness Derivation Notes',
        type: 'Handwritten Lecture Notes',
        fileSize: '5.2 MB',
        pages: 40,
        description: 'Detailed hand derivations of potential energy minimization and global matrix assembly with boundary conditions.',
      },
      {
        id: 'fea-sm3',
        title: 'FEA Manual Calculations & Benchmark Solutions',
        type: 'Numerical Problem Book',
        fileSize: '7.9 MB',
        pages: 72,
        description: 'Hand solutions for 3-bar planar trusses, stepped bars under axial tension, and 2D triangular element stress tensors.',
      },
    ],
    modules: [
      {
        id: 'fea-m1',
        title: 'Module 1: Mathematical Foundations & Direct Stiffness Method',
        description: 'Variational principles, Rayleigh-Ritz method, and spring/bar element matrix formulation.',
        duration: '6 hours',
        lessonsCount: 7,
        topics: ['Weak Form Derivations', 'Potential Energy Principles', 'Element Stiffness Matrix', 'Global Assembly'],
      },
      {
        id: 'fea-m2',
        title: 'Module 2: 1D Truss & Beam Element Formulations',
        description: 'Hermite shape functions, coordinate transformation matrices, and boundary conditions.',
        duration: '7.5 hours',
        lessonsCount: 8,
        topics: ['Truss Transformation [T]', 'Euler-Bernoulli Beam Matrix', 'Distributed Loads', 'Nodal Reactions'],
      },
      {
        id: 'fea-m3',
        title: 'Module 3: 2D Plane Stress, Plane Strain & CST Elements',
        description: 'Constant Strain Triangle (CST), Linear Strain Triangle (LST), and 4-node quadrilaterals.',
        duration: '8 hours',
        lessonsCount: 9,
        topics: ['Constitutive Relations [D]', 'Strain-Displacement Matrix [B]', 'Gauss Quadrature', 'Stress Recovery'],
      },
      {
        id: 'fea-m4',
        title: 'Module 4: Isoparametric Formulations & Non-Linearities',
        description: 'Natural coordinates, Jacobian matrix calculation, mesh convergence, and thermal-structural FEA.',
        duration: '7 hours',
        lessonsCount: 7,
        topics: ['Jacobian Inversion [J]', 'Isoparametric Mapping', 'Mesh Refinement (h vs p)', 'Modal Analysis Basics'],
      },
    ],
    practiceWork: [
      {
        id: 'fea-p1',
        title: 'Practice Set 1: Global Stiffness Matrix Assembly & Boundary Conditions',
        problemsCount: 10,
        estimatedTime: '60 mins',
        difficulty: 'Intermediate',
        description: 'Hand-assemble global [K] for 3-bar systems and apply elimination & penalty boundary techniques.',
      },
      {
        id: 'fea-p2',
        title: 'Practice Set 2: 2D CST Element Stress-Strain Worksheets',
        problemsCount: 8,
        estimatedTime: '75 mins',
        difficulty: 'Advanced',
        description: 'Derive shape functions and evaluate element [B] matrices for triangular finite elements.',
      },
      {
        id: 'fea-p3',
        title: 'Practice Set 3: 1D Heat Conduction & Thermal FEA Numerical Problems',
        problemsCount: 10,
        estimatedTime: '50 mins',
        difficulty: 'Intermediate',
        description: 'Solve temperature distribution along composite rods using conduction-convection boundary FEA.',
      },
    ],
    tests: [
      {
        id: 'fea-t1',
        title: 'Direct Stiffness & 1D Elements Quiz',
        type: 'Quiz',
        questionsCount: 15,
        duration: '35 mins',
        passingScore: 70,
      },
      {
        id: 'fea-t2',
        title: '2D Elements & Isoparametric Formulation Assessment',
        type: 'Unit Assessment',
        questionsCount: 12,
        duration: '50 mins',
        passingScore: 75,
      },
      {
        id: 'fea-t3',
        title: 'Finite Element Analysis Professional Certification Exam',
        type: 'Final Exam',
        questionsCount: 35,
        duration: '100 mins',
        passingScore: 80,
      },
    ],
  },

  {
    id: 'mech-vib',
    name: 'Mechanical Vibration',
    code: 'ME-305',
    level: 'Core',
    accentColor: 'teal',
    instructor: 'Dr. Sarah Lin',
    instructorRole: 'Dynamics & Acoustics Specialist, Caltech Fellow',
    rating: 4.91,
    enrolledStudents: '4,150',
    tagline: 'Oscillatory motion, natural frequencies, damping phenomena, resonance, and vibration control.',
    description:
      'Study of dynamics in mechanical components, modeling single and multi-degree-of-freedom systems, and designing industrial vibration isolation devices.',
    units: [
      {
        id: 'vib-u1',
        unitNumber: 1,
        title: 'Undamped Free Vibrations (SDOF)',
        description: 'Harmonic motion equations, Newton and energy methods, equivalent spring and mass modeling.',
        lectures: [
          { id: 'vib-l1', lectureNumber: 1, title: 'Simple Harmonic Motion Foundations & Phase Relationships', duration: '44 mins', notesAvailable: true },
          { id: 'vib-l2', lectureNumber: 2, title: 'Derivation of SDOF Equations of Motion via D’Alembert & Energy', duration: '52 mins', notesAvailable: true },
          { id: 'vib-l3', lectureNumber: 3, title: 'Equivalent Spring Stiffness for Beams, Shafts & Springs in Parallel/Series', duration: '58 mins', notesAvailable: true },
        ],
      },
      {
        id: 'vib-u2',
        unitNumber: 2,
        title: 'Damped Free Oscillations',
        description: 'Viscous damping mechanics, critical damping coefficient, logarithmic decrement, and decay curves.',
        lectures: [
          { id: 'vib-l4', lectureNumber: 4, title: 'Underdamped, Critically Damped & Overdamped Dynamic Response', duration: '50 mins', notesAvailable: true },
          { id: 'vib-l5', lectureNumber: 5, title: 'Logarithmic Decrement (delta) & Experimental Damping Extraction', duration: '48 mins', notesAvailable: true },
          { id: 'vib-l6', lectureNumber: 6, title: 'Coulomb (Dry Friction) & Structural Damping Formulations', duration: '45 mins', notesAvailable: true },
        ],
      },
      {
        id: 'vib-u3',
        unitNumber: 3,
        title: 'Harmonically Forced Vibration & Resonance',
        description: 'Harmonic excitation, magnification factor, phase lag, rotating unbalance, and base motion.',
        lectures: [
          { id: 'vib-l7', lectureNumber: 7, title: 'Forced Steady-State Amplitude & Dynamic Magnification Factor', duration: '54 mins', notesAvailable: true },
          { id: 'vib-l8', lectureNumber: 8, title: 'Resonance Phenomena & Phase Angle Shift Across Critical Speeds', duration: '50 mins', notesAvailable: true },
          { id: 'vib-l9', lectureNumber: 9, title: 'Rotating Machine Unbalance & Whirling of Elastic Shafts', duration: '56 mins', notesAvailable: true },
        ],
      },
      {
        id: 'vib-u4',
        unitNumber: 4,
        title: 'Vibration Control & MDOF Systems',
        description: 'Transmissibility ratio, vibration isolation mount design, and tuned dynamic mass absorbers.',
        lectures: [
          { id: 'vib-l10', lectureNumber: 10, title: 'Force & Motion Transmissibility Ratios Across Isolation Mounts', duration: '52 mins', notesAvailable: true },
          { id: 'vib-l11', lectureNumber: 11, title: 'Undamped Frahm Dynamic Vibration Absorber Sizing & Design', duration: '60 mins', notesAvailable: true },
          { id: 'vib-l12', lectureNumber: 12, title: '2-DOF Eigenvalue Problem: Mode Shapes & Coordinate Decoupling', duration: '58 mins', notesAvailable: true },
        ],
      },
    ],
    studyMaterials: [
      {
        id: 'vib-sm1',
        title: 'Mechanical Vibration Equations & Formulas Sheet',
        type: 'PDF Formula Sheet',
        fileSize: '2.8 MB',
        pages: 20,
        description: 'Quick reference sheet for natural frequency, damping ratios, magnification factors, and transmissibility.',
      },
      {
        id: 'vib-sm2',
        title: 'SDOF & MDOF Analytical Derivations Handbook',
        type: 'Handwritten Lecture Notes',
        fileSize: '4.8 MB',
        pages: 36,
        description: 'Complete mathematical derivations for decaying oscillations, rotating unbalance, and vibration absorber equations.',
      },
      {
        id: 'vib-sm3',
        title: 'Vibration Dynamics 80 Numerical Problem Solutions',
        type: 'Numerical Problem Book',
        fileSize: '6.2 MB',
        pages: 58,
        description: 'Full solutions for natural frequency calculations, damper sizing, critical whirling speeds, and tuned absorber design.',
      },
    ],
    modules: [
      {
        id: 'vib-m1',
        title: 'Module 1: Undamped Free Vibration of SDOF Systems',
        description: 'Harmonic motion, Newton & energy methods, equivalent spring and mass systems.',
        duration: '5 hours',
        lessonsCount: 6,
        topics: ['Equation of Motion', "Rayleigh's Method", 'Torsional Oscillations', 'Equivalent Stiffness'],
      },
      {
        id: 'vib-m2',
        title: 'Module 2: Damped Free Vibration Phenomena',
        description: 'Viscous damping, critical damping factor, logarithmic decrement, and Coulomb friction.',
        duration: '6.5 hours',
        lessonsCount: 7,
        topics: ['Overdamped vs Underdamped', 'Damping Ratio (zeta)', 'Logarithmic Decrement (delta)', 'Coulomb Damping'],
      },
      {
        id: 'vib-m3',
        title: 'Module 3: Harmonically Excited Forced Vibration & Resonance',
        description: 'Magnification factor, phase angle, rotating unbalance, and base excitation.',
        duration: '7 hours',
        lessonsCount: 8,
        topics: ['Resonance Condition', 'Dynamic Magnification Factor', 'Whirling of Shafts', 'Transmissibility Ratio'],
      },
      {
        id: 'vib-m4',
        title: 'Module 4: Multi-Degree-of-Freedom (MDOF) & Vibration Absorbers',
        description: 'Modal matrices, mode shapes, orthogonality, and tuned mass dampers.',
        duration: '8 hours',
        lessonsCount: 9,
        topics: ['Eigenvalues & Eigenvectors', 'Modal Decoupling', 'Frahm Vibration Absorber', 'Dunkerley Formula'],
      },
    ],
    practiceWork: [
      {
        id: 'vib-p1',
        title: 'Practice Set 1: Natural Frequency & Equivalent System Calculation',
        problemsCount: 14,
        estimatedTime: '50 mins',
        difficulty: 'Beginner',
        description: 'Calculate circular natural frequencies for cantilever-mounted motors and pulley assemblies.',
      },
      {
        id: 'vib-p2',
        title: 'Practice Set 2: Logarithmic Decrement & Damping Evaluation',
        problemsCount: 12,
        estimatedTime: '55 mins',
        difficulty: 'Intermediate',
        description: 'Compute damping coefficients from decay curves and amplitude attenuation records.',
      },
      {
        id: 'vib-p3',
        title: 'Practice Set 3: Vibration Isolation & Absorber Sizing Worksheets',
        problemsCount: 9,
        estimatedTime: '60 mins',
        difficulty: 'Advanced',
        description: 'Design rubber mounts and tuned mass dampers to achieve less than 10% force transmissibility.',
      },
    ],
    tests: [
      {
        id: 'vib-t1',
        title: 'SDOF Free & Damped Response Diagnostic Quiz',
        type: 'Quiz',
        questionsCount: 15,
        duration: '30 mins',
        passingScore: 70,
      },
      {
        id: 'vib-t2',
        title: 'Harmonic Excitation & Vibration Control Assessment',
        type: 'Unit Assessment',
        questionsCount: 12,
        duration: '45 mins',
        passingScore: 75,
      },
      {
        id: 'vib-t3',
        title: 'Mechanical Vibration Comprehensive Benchmark Exam',
        type: 'Final Exam',
        questionsCount: 35,
        duration: '90 mins',
        passingScore: 80,
      },
    ],
  },

  {
    id: 'mos',
    name: 'Mechanics of Solids',
    code: 'ME-201',
    level: 'Core',
    accentColor: 'gold',
    instructor: 'Alex Mercer',
    instructorRole: 'Structural Integrity Lead, Cambridge MSc',
    rating: 4.97,
    enrolledStudents: '6,280',
    tagline: 'Stress-strain distributions, beam shear & bending moments, torsion, and failure theories.',
    description:
      'Fundamental mechanics exploring internal resistance of solid bodies under external mechanical and thermal loads to ensure structural integrity.',
    units: [
      {
        id: 'mos-u1',
        unitNumber: 1,
        title: 'Simple Stresses, Strains & Elastic Constants',
        description: 'Hooke’s law, Poisson’s ratio, compound bars, volumetric strain, and thermal thermal stress development.',
        lectures: [
          { id: 'mos-l1', lectureNumber: 1, title: 'Normal & Shear Stress: True vs Engineering Strain', duration: '46 mins', notesAvailable: true },
          { id: 'mos-l2', lectureNumber: 2, title: 'Elastic Moduli Relationships: E, G, K, and Poisson’s Ratio (nu)', duration: '50 mins', notesAvailable: true },
          { id: 'mos-l3', lectureNumber: 3, title: 'Stresses in Compound Bars & Thermal Expansion Restraints', duration: '54 mins', notesAvailable: true },
        ],
      },
      {
        id: 'mos-u2',
        unitNumber: 2,
        title: 'Shear Force & Bending Moment Diagrams (SFD & BMD)',
        description: 'Differential equilibrium relations, points of contraflexure, and shear/moment envelopes for beams.',
        lectures: [
          { id: 'mos-l4', lectureNumber: 4, title: 'Beam Loading Types: Point Loads, UDL & Uniformly Varying Loads', duration: '48 mins', notesAvailable: true },
          { id: 'mos-l5', lectureNumber: 5, title: 'Plotting SFD & BMD for Simply Supported & Overhanging Beams', duration: '62 mins', notesAvailable: true },
          { id: 'mos-l6', lectureNumber: 6, title: 'Differential Calculus Relationships: dM/dx = V and dV/dx = -w', duration: '45 mins', notesAvailable: true },
        ],
      },
      {
        id: 'mos-u3',
        unitNumber: 3,
        title: 'Pure Bending & Torsion in Shafts',
        description: 'Euler-Bernoulli flexure formula, section modulus, shear stress in I-beams, and torsional shear in solid/hollow shafts.',
        lectures: [
          { id: 'mos-l7', lectureNumber: 7, title: 'Derivation of Flexure Formula (M/I = sigma/y = E/R)', duration: '52 mins', notesAvailable: true },
          { id: 'mos-l8', lectureNumber: 8, title: 'Section Modulus Optimization for Rectangular, Circular & I-Beams', duration: '48 mins', notesAvailable: true },
          { id: 'mos-l9', lectureNumber: 9, title: 'Torsional Shear Stress Equation (T/J = tau/r = G*theta/L)', duration: '56 mins', notesAvailable: true },
        ],
      },
      {
        id: 'mos-u4',
        unitNumber: 4,
        title: 'Principal Stresses, Mohr’s Circle & Failure Theories',
        description: '2D stress transformation, principal planes, Mohr’s circle graphical construction, and Von Mises yield criteria.',
        lectures: [
          { id: 'mos-l10', lectureNumber: 10, title: 'Plane Stress Transformation Equations & Maximum In-Plane Shear', duration: '50 mins', notesAvailable: true },
          { id: 'mos-l11', lectureNumber: 11, title: 'Mohr’s Circle Construction: Center, Radius & Principal Planes', duration: '60 mins', notesAvailable: true },
          { id: 'mos-l12', lectureNumber: 12, title: 'Theories of Failure: Maximum Shear (Tresca) vs Distortion Energy (Von Mises)', duration: '55 mins', notesAvailable: true },
        ],
      },
    ],
    studyMaterials: [
      {
        id: 'mos-sm1',
        title: 'Mechanics of Solids Master Formulas & Diagrams',
        type: 'PDF Formula Sheet',
        fileSize: '3.4 MB',
        pages: 22,
        description: 'Complete reference for SFD/BMD standard cases, moment of inertia formulas, and stress transformation equations.',
      },
      {
        id: 'mos-sm2',
        title: 'SFD, BMD & Mohr’s Circle Step-by-Step Drawing Guide',
        type: 'Handwritten Lecture Notes',
        fileSize: '5.6 MB',
        pages: 44,
        description: 'Visual guides explaining point of contraflexure identification, cantilever envelopes, and Mohr’s circle plotting.',
      },
      {
        id: 'mos-sm3',
        title: '120 Solved Strength of Materials Exam Problems',
        type: 'Numerical Problem Book',
        fileSize: '8.4 MB',
        pages: 86,
        description: 'Complete numerical workouts for thermal bar stresses, beam deflections, shaft horsepowers, and yield factor of safety.',
      },
    ],
    modules: [
      {
        id: 'mos-m1',
        title: 'Module 1: Simple Stress, Strain & Elastic Constants',
        description: 'Direct stress, shear stress, Hookes law, Poissons ratio, and thermal stresses.',
        duration: '6 hours',
        lessonsCount: 7,
        topics: ['True vs Engineering Stress', 'Composite Bars & Thermal Load', 'Bulk & Shear Modulus', 'Strain Energy'],
      },
      {
        id: 'mos-m2',
        title: 'Module 2: Shear Force Diagrams (SFD) & Bending Moment Diagrams (BMD)',
        description: 'Beams under point, uniformly distributed (UDL), and uniformly varying (UVL) loads.',
        duration: '8 hours',
        lessonsCount: 9,
        topics: ['Point of Contraflexure', 'Cantilever & Simply Supported', 'Overhanging Beams', 'Differential Relations'],
      },
      {
        id: 'mos-m3',
        title: 'Module 3: Pure Bending & Torsion in Circular Shafts',
        description: 'Flexure formula, section modulus, shear stress in beams, and polar moment of inertia.',
        duration: '7 hours',
        lessonsCount: 8,
        topics: ['Euler-Bernoulli Bending Formula', 'Section Modulus (Z)', 'Torsion Formula (T/J = tau/r)', 'Power Transmitted'],
      },
      {
        id: 'mos-m4',
        title: 'Module 4: Principal Stresses, Mohrs Circle & Failure Theories',
        description: 'Plane stress transformation, principal planes, maximum shear stress, and yield criteria.',
        duration: '7.5 hours',
        lessonsCount: 8,
        topics: ["Mohr's Circle Graphical Solution", 'Rankine & Tresca Theories', 'Von Mises Yield Criterion', 'Factor of Safety'],
      },
    ],
    practiceWork: [
      {
        id: 'mos-p1',
        title: 'Practice Set 1: Compound Bar & Thermal Stress Numerical Problems',
        problemsCount: 15,
        estimatedTime: '45 mins',
        difficulty: 'Beginner',
        description: 'Calculate stresses in parallel steel-copper bars subjected to temperature variations.',
      },
      {
        id: 'mos-p2',
        title: 'Practice Set 2: SFD & BMD Construction Worksheets',
        problemsCount: 10,
        estimatedTime: '70 mins',
        difficulty: 'Intermediate',
        description: 'Plot exact shear force and bending moment diagrams for combined point & UDL loading.',
      },
      {
        id: 'mos-p3',
        title: 'Practice Set 3: Mohrs Circle & Von Mises Failure Analysis',
        problemsCount: 11,
        estimatedTime: '60 mins',
        difficulty: 'Advanced',
        description: 'Transform 2D stress tensors and predict yielding failure under multi-axial state of stress.',
      },
    ],
    tests: [
      {
        id: 'mos-t1',
        title: 'Stress-Strain & Thermal Stresses Quiz',
        type: 'Quiz',
        questionsCount: 20,
        duration: '35 mins',
        passingScore: 70,
      },
      {
        id: 'mos-t2',
        title: 'SFD/BMD & Pure Bending Assessment',
        type: 'Unit Assessment',
        questionsCount: 15,
        duration: '50 mins',
        passingScore: 75,
      },
      {
        id: 'mos-t3',
        title: 'Mechanics of Solids Benchmark Comprehensive Exam',
        type: 'Final Exam',
        questionsCount: 40,
        duration: '100 mins',
        passingScore: 80,
      },
    ],
  },
]
