/**
 * basicS — Multi-Subject Curriculum Data
 *
 * HOW TO ADD MORE SUBJECTS IN THE FUTURE:
 * Simply copy one of the subject objects below, change the fields (id, name, code, modules,
 * practiceWork, tests), and paste it into the SUBJECTS list!
 */

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
  modules: ModuleItem[]
  practiceWork: PracticeItem[]
  tests: TestItem[]
}

export const SUBJECTS: Subject[] = [
  {
    id: 'bme',
    name: 'Basic Mechanical Engineering',
    code: 'ME-101',
    level: 'Foundational',
    accentColor: 'teal',
    tagline: 'Thermodynamics, energy conversion systems, and fundamental machine components.',
    description:
      'A primary gateway into mechanical engineering covering heat cycles, power transmission systems, fluid power, and materials manufacturing.',
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
    tagline: 'Computational numerical simulation for structural stress, thermal gradients, and modal mechanics.',
    description:
      'Rigorous mathematical formulation and discrete element analysis for predicting displacement, strain, and stress in complex engineering geometries.',
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
    tagline: 'Oscillatory motion, natural frequencies, damping phenomena, resonance, and vibration control.',
    description:
      'Study of dynamics in mechanical components, modeling single and multi-degree-of-freedom systems, and designing industrial vibration isolation devices.',
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
    tagline: 'Stress-strain distributions, beam shear & bending moments, torsion, and failure theories.',
    description:
      'Fundamental mechanics exploring internal resistance of solid bodies under external mechanical and thermal loads to ensure structural integrity.',
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
