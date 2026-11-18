export interface MCQQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface DescriptiveQuestion {
  id: number
  prompt: string
  marks: number
  guidelines: string[]
  sampleKeyPoints: string[]
}

export interface ExamItem {
  id: string
  title: string
  subject: string
  subjectCode: string
  format: 'MCQ Examination' | 'Descriptive Examination'
  duration: string
  totalMarks: number
  questionsCount: number
  passingPercentage: number
  difficulty: 'Foundational' | 'Intermediate' | 'Advanced'
  instructions: string[]
  mcqQuestions?: MCQQuestion[]
  descriptiveQuestions?: DescriptiveQuestion[]
}

export const EXAMINATIONS: ExamItem[] = [
  {
    id: 'exam-mos-mcq',
    title: 'Mechanics of Solids: Stress & Failure Diagnostic Exam',
    subject: 'Mechanics of Solids',
    subjectCode: 'ME-201',
    format: 'MCQ Examination',
    duration: '25 Mins',
    totalMarks: 50,
    questionsCount: 5,
    passingPercentage: 70,
    difficulty: 'Intermediate',
    instructions: [
      'Each question carries 10 marks. There is no negative marking in this diagnostic test.',
      'A scientific calculator is permitted for numerical calculations.',
      'You can freely navigate between questions using the Question Palette.',
      'Submit the test when finished to inspect your concept breakdown and explanations.',
    ],
    mcqQuestions: [
      {
        id: 1,
        question:
          'A circular shaft of diameter d is subjected to torque T. The maximum shear stress developed at the outer fiber is proportional to which factor of diameter?',
        options: ['Directly proportional to d', 'Inversely proportional to d²', 'Inversely proportional to d³', 'Inversely proportional to d⁴'],
        correctIndex: 2,
        explanation: 'From the torsion equation T/J = tau/r, tau_max = (T * (d/2)) / (pi * d^4 / 32) = 16T / (pi * d^3). Thus, maximum shear stress is inversely proportional to d³.',
      },
      {
        id: 2,
        question:
          'On Mohr’s circle of plane stress, the coordinates of the center of the circle represent which quantity?',
        options: [
          'The maximum shear stress (tau_max)',
          'The average normal stress: (sigma_x + sigma_y) / 2',
          'The principal stress difference: (sigma_1 - sigma_2)',
          'The hydrostatic strain tensor',
        ],
        correctIndex: 1,
        explanation: 'The center of Mohr’s Circle lies on the normal stress axis at C = ((sigma_x + sigma_y) / 2, 0).',
      },
      {
        id: 3,
        question:
          'For a simply supported beam of length L carrying a uniformly distributed load (w) over its entire span, what is the maximum bending moment and where does it occur?',
        options: [
          'wL² / 8 at the mid-span (x = L/2)',
          'wL² / 4 at the mid-span (x = L/2)',
          'wL² / 2 at the support ends',
          'wL / 2 at the quarter span',
        ],
        correctIndex: 0,
        explanation: 'For a simply supported beam with UDL, M(x) = (wL/2)*x - (w*x^2)/2. Maximum bending moment occurs at mid-span where dM/dx = 0, giving M_max = wL² / 8.',
      },
      {
        id: 4,
        question:
          'According to the Von Mises (Maximum Distortion Energy) failure criterion, yielding initiates when the equivalent stress equals which property of the material?',
        options: [
          'Ultimate tensile strength (UTS)',
          'Yield strength in uniaxial tension (sigma_y)',
          'Shear yield strength (0.5 * sigma_y)',
          'Modulus of elasticity (E)',
        ],
        correctIndex: 1,
        explanation: 'Von Mises states that yielding occurs when the octahedral shear stress or distortion energy under multi-axial load reaches the distortion energy at yield under uniaxial tension: sigma_vm = sigma_y.',
      },
      {
        id: 5,
        question:
          'What is the relationship between Young’s Modulus (E), Shear Modulus (G), and Poisson’s Ratio (nu) for an isotropic elastic solid?',
        options: [
          'E = 2G * (1 + nu)',
          'E = 3G * (1 - 2nu)',
          'G = 2E * (1 + nu)',
          'E = G * (1 + 2nu)',
        ],
        correctIndex: 0,
        explanation: 'The standard elasticity formulation relating tensile and shear deformation is E = 2G(1 + nu).',
      },
    ],
  },

  {
    id: 'exam-vib-mcq',
    title: 'Mechanical Vibration: SDOF & Resonance Benchmark',
    subject: 'Mechanical Vibration',
    subjectCode: 'ME-305',
    format: 'MCQ Examination',
    duration: '20 Mins',
    totalMarks: 40,
    questionsCount: 4,
    passingPercentage: 75,
    difficulty: 'Intermediate',
    instructions: [
      'Read each dynamic question carefully before selecting your answer.',
      'Review angular frequency vs cyclic frequency conversion (rad/s vs Hz).',
      'The test provides step-by-step mathematical reasoning upon completion.',
    ],
    mcqQuestions: [
      {
        id: 1,
        question:
          'In an SDOF spring-mass system with mass m and spring stiffness k, what happens to the natural frequency (omega_n) if the mass is increased 4 times?',
        options: ['Doubles (2x)', 'Quadruples (4x)', 'Halved (0.5x)', 'Remains unchanged'],
        correctIndex: 2,
        explanation: 'Because omega_n = sqrt(k / m). If m becomes 4m, omega_n becomes sqrt(k / 4m) = 0.5 * sqrt(k / m), meaning the natural frequency is halved.',
      },
      {
        id: 2,
        question:
          'At the condition of resonance in harmonically excited viscous vibration, what is the phase angle between the applied force and the displacement response?',
        options: ['0 degrees (in phase)', '45 degrees', '90 degrees (quarter cycle lag)', '180 degrees (out of phase)'],
        correctIndex: 2,
        explanation: 'At frequency ratio r = omega/omega_n = 1, tan(phi) = (2*zeta*r) / (1 - r^2) approaches infinity, meaning the phase angle phi is exactly 90 degrees.',
      },
      {
        id: 3,
        question:
          'For effective vibration isolation, the frequency ratio (r = omega / omega_n) must be in which range?',
        options: ['r < 1', 'r = 1', '1 < r < sqrt(2)', 'r > sqrt(2)'],
        correctIndex: 3,
        explanation: 'Vibration isolation transmissibility (TR) is less than 1.0 (isolation zone) strictly when the excitation frequency ratio r exceeds sqrt(2) = 1.414.',
      },
      {
        id: 4,
        question:
          'The logarithmic decrement (delta) measured across consecutive amplitude peaks x_n and x_{n+1} is expressed as:',
        options: [
          'delta = ln(x_n / x_{n+1})',
          'delta = (x_n - x_{n+1}) / x_n',
          'delta = log10(x_{n+1} / x_n)',
          'delta = 2 * pi * zeta',
        ],
        correctIndex: 0,
        explanation: 'Logarithmic decrement is defined as the natural logarithm of the ratio of any two successive amplitudes: delta = ln(x_n / x_{n+1}) = (2*pi*zeta) / sqrt(1 - zeta^2).',
      },
    ],
  },

  {
    id: 'exam-fea-desc',
    title: 'Finite Element Analysis: 1D Stepped Bar Formulation (Descriptive)',
    subject: 'Finite Element Analysis',
    subjectCode: 'ME-402',
    format: 'Descriptive Examination',
    duration: '45 Mins',
    totalMarks: 50,
    questionsCount: 2,
    passingPercentage: 75,
    difficulty: 'Advanced',
    instructions: [
      'Write clear step-by-step mathematical derivations and show intermediate matrix equations.',
      'Define all symbols clearly (A = cross-sectional area, E = Young’s modulus, L = element length).',
      'The descriptive interface allows entering structured text or uploading computation sheets.',
      'Automated submission grading connects with instructor review in Phase 2.',
    ],
    descriptiveQuestions: [
      {
        id: 1,
        prompt:
          'Derive the element stiffness matrix [k] for a 1D two-node linear bar element using the direct equilibrium or minimum potential energy method. State all assumptions clearly.',
        marks: 25,
        guidelines: [
          'State linear displacement interpolation: u(x) = N1*u1 + N2*u2',
          'Derive shape functions: N1 = (1 - x/L), N2 = x/L',
          'Formulate strain-displacement matrix [B] = dN/dx = [-1/L, 1/L]',
          'Integrate strain energy U = 0.5 * integral(sigma * epsilon * dV) to yield [k] = (AE/L) * [[1, -1], [-1, 1]]',
        ],
        sampleKeyPoints: [
          'Assumptions: Uniform prismatic bar, linear elastic isotropic material, axial displacement only.',
          'Result: [k] = (AE/L) * [[1, -1], [-1, 1]]',
        ],
      },
      {
        id: 2,
        prompt:
          'Explain the elimination method versus the penalty method for applying boundary conditions to the assembled global stiffness matrix [K]{d} = {F}. Compare their computational advantages.',
        marks: 25,
        guidelines: [
          'Elimination approach: Remove rows and columns corresponding to known zero displacements (preserves matrix size reduction).',
          'Penalty approach: Add a large stiffness C (penalty parameter) to diagonal term K_ii and set force term F_i = C * specified_displacement.',
          'Trade-offs: Penalty maintains matrix order and topology but may introduce numerical round-off ill-conditioning if C is excessively large.',
        ],
        sampleKeyPoints: [
          'Elimination reduces equations by number of constraints.',
          'Penalty allows easy handling of non-zero support settlements without changing matrix pointer structures.',
        ],
      },
    ],
  },

  {
    id: 'exam-bme-desc',
    title: 'Basic Mechanical Engineering: Thermal Cycles & Transmission (Descriptive)',
    subject: 'Basic Mechanical Engineering',
    subjectCode: 'ME-101',
    format: 'Descriptive Examination',
    duration: '40 Mins',
    totalMarks: 40,
    questionsCount: 2,
    passingPercentage: 70,
    difficulty: 'Foundational',
    instructions: [
      'Draw schematic diagrams and state governing thermodynamic equations.',
      'Show temperature-entropy (T-s) or pressure-volume (P-v) processes where applicable.',
      'Provide concise, structured numerical explanations.',
    ],
    descriptiveQuestions: [
      {
        id: 1,
        prompt:
          'Describe the 4 thermodynamic processes that constitute the ideal Carnot vapor cycle. Explain why the Carnot cycle cannot be practically implemented in real steam power plants.',
        marks: 20,
        guidelines: [
          'List 4 processes: Reversible isothermal expansion (1-2), Isentropic expansion in turbine (2-3), Reversible isothermal compression in condenser (3-4), Isentropic compression in pump (4-1).',
          'Practical limitations: Compressing a wet two-phase mixture requires a compressor handling liquid-vapor droplet erosion, and superheating isothermal heat addition requires astronomical pressures.',
        ],
        sampleKeyPoints: [
          'Process 1-2: Isothermal heat addition at T_H.',
          'Process 2-3: Isentropic expansion with work output.',
          'Process 3-4: Isothermal heat rejection at T_C.',
          'Process 4-1: Isentropic pumping of wet steam.',
        ],
      },
      {
        id: 2,
        prompt:
          'Derive the ratio of belt tensions (T1 / T2) for a flat belt drive on the verge of slipping: T1 / T2 = e^(mu * theta). Define all variables.',
        marks: 20,
        guidelines: [
          'Consider a small element of belt subtending angle d(theta) at pulley center.',
          'Resolve normal and tangential forces: dN = T * d(theta) and dT = mu * dN = mu * T * d(theta).',
          'Integrate dT / T = mu * d(theta) from T2 to T1 over total contact lap angle theta to get T1/T2 = e^(mu*theta).',
        ],
        sampleKeyPoints: [
          'T1 = tight side tension, T2 = slack side tension, mu = coefficient of friction, theta = wrap angle in radians.',
        ],
      },
    ],
  },
]
