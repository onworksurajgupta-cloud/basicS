import { useState } from 'react'
import {
  Activity,
  Layers,
  Wrench,
  Binary,
  Sparkles,
} from 'lucide-react'

export function HeroInteractiveLab() {
  const [activeSim, setActiveSim] = useState<'mos' | 'vib' | 'fea' | 'bme'>('mos')

  // Simulation 1: Mohr's Circle (Mechanics of Solids)
  const [sigmaX, setSigmaX] = useState<number>(80)
  const [sigmaY, setSigmaY] = useState<number>(20)
  const [tauXY, setTauXY] = useState<number>(40)

  const sigmaAvg = (sigmaX + sigmaY) / 2
  const radius = Math.round(Math.sqrt(Math.pow((sigmaX - sigmaY) / 2, 2) + Math.pow(tauXY, 2)))
  const sigma1 = Math.round(sigmaAvg + radius)
  const sigma2 = Math.round(sigmaAvg - radius)

  // Simulation 2: Vibration (SDOF)
  const [mass, setMass] = useState<number>(5) // kg
  const [stiffness, setStiffness] = useState<number>(500) // N/m
  const [dampingRatio, setDampingRatio] = useState<number>(0.15) // zeta

  const omegaN = Math.sqrt(stiffness / mass).toFixed(2)
  const freqHz = (parseFloat(omegaN) / (2 * Math.PI)).toFixed(2)

  // Simulation 3: FEA Discretization
  const [numElements, setNumElements] = useState<number>(4)
  const [loadKN, setLoadKN] = useState<number>(50)
  const matrixSize = numElements + 1

  // Simulation 4: Thermodynamics (BME)
  const [tempHot, setTempHot] = useState<number>(850) // K
  const [tempCold, setTempCold] = useState<number>(310) // K
  const carnotEff = (((tempHot - tempCold) / tempHot) * 100).toFixed(1)

  return (
    <div className="w-full bg-white/90 dark:bg-navy/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 dark:border-navy-light/80 shadow-2xl overflow-hidden text-left transition-all">
      {/* Widget Header with simulated window controls */}
      <div className="p-4 sm:p-5 bg-slate-100/70 dark:bg-navy-card/80 border-b border-slate-200 dark:border-navy-light/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
          </div>
          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 ml-2">
            basicS // Virtual Engineering Workbench
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-full border border-teal/20">
          <Sparkles className="w-3 h-3" />
          <span>Interactive Model</span>
        </div>
      </div>

      {/* Lab Tabs: Switch between the 4 subjects */}
      <div className="p-2 sm:p-3 bg-slate-50 dark:bg-navy border-b border-slate-200/60 dark:border-navy-light/40 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setActiveSim('mos')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSim === 'mos'
              ? 'bg-teal text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-navy-card'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Mohr's Circle (MOS)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSim('vib')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSim === 'vib'
              ? 'bg-teal text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-navy-card'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>Vibration Oscillations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSim('fea')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSim === 'fea'
              ? 'bg-teal text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-navy-card'
          }`}
        >
          <Binary className="w-3.5 h-3.5" />
          <span>FEA Discretization</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSim('bme')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeSim === 'bme'
              ? 'bg-teal text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-navy-card'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Thermodynamics (BME)</span>
        </button>
      </div>

      {/* Main Interactive Workspace */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* ================= SIMULATION 1: MOHR'S CIRCLE ================= */}
        {activeSim === 'mos' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-navy dark:text-canvas flex items-center gap-1.5">
                  <span>2D Stress State & Principal Stress Calculator</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Drag the sliders to watch how normal & shear stress transform into principal stresses.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded bg-teal/10 text-teal font-mono font-bold">
                  &sigma;₁ = {sigma1} MPa
                </span>
                <span className="text-xs px-2 py-1 rounded bg-gold/15 text-gold-dark dark:text-gold font-mono font-bold">
                  &sigma;₂ = {sigma2} MPa
                </span>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-canvas dark:bg-navy-card/60 p-3.5 rounded-2xl border border-slate-200 dark:border-navy-light/40">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">&sigma;ₓ (Normal X)</span>
                  <span className="text-teal font-mono">{sigmaX} MPa</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={sigmaX}
                  onChange={(e) => setSigmaX(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">&sigma;ᵧ (Normal Y)</span>
                  <span className="text-teal font-mono">{sigmaY} MPa</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sigmaY}
                  onChange={(e) => setSigmaY(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">&tau;ₓᵧ (Shear)</span>
                  <span className="text-gold font-mono">{tauXY} MPa</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={tauXY}
                  onChange={(e) => setTauXY(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Visual Vector Representation */}
            <div className="h-28 sm:h-32 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center p-3 border border-slate-800">
              <svg className="w-full h-full" viewBox="0 0 300 120">
                {/* Horizontal & Vertical Axis */}
                <line x1="10" y1="60" x2="290" y2="60" stroke="#334155" strokeWidth="1" />
                <line x1="150" y1="10" x2="150" y2="110" stroke="#334155" strokeWidth="1" />

                {/* Mohr's Circle */}
                <circle
                  cx="150"
                  cy="60"
                  r={Math.min(50, Math.max(15, radius * 0.7))}
                  fill="rgba(13, 148, 136, 0.15)"
                  stroke="#14B8A6"
                  strokeWidth="2"
                />

                {/* Center marker */}
                <circle cx="150" cy="60" r="3" fill="#F4B942" />

                {/* Principal Stress markers */}
                <circle
                  cx={150 + Math.min(50, Math.max(15, radius * 0.7))}
                  cy="60"
                  r="4"
                  fill="#14B8A6"
                />
                <circle
                  cx={150 - Math.min(50, Math.max(15, radius * 0.7))}
                  cy="60"
                  r="4"
                  fill="#F4B942"
                />

                <text x="10" y="20" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                  Mohr's Circle Plot &bull; &tau;_max = {radius} MPa
                </text>
                <text
                  x={150 + Math.min(50, Math.max(15, radius * 0.7)) + 6}
                  y="55"
                  fill="#14B8A6"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  &sigma;₁ ({sigma1})
                </text>
                <text
                  x={150 - Math.min(50, Math.max(15, radius * 0.7)) - 35}
                  y="55"
                  fill="#F4B942"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  &sigma;₂ ({sigma2})
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* ================= SIMULATION 2: MECHANICAL VIBRATION ================= */}
        {activeSim === 'vib' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-navy dark:text-canvas">
                  SDOF Harmonic Response & Natural Frequency
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Adjust mass and stiffness to observe natural resonance frequency &omega;n = &radic;(k/m).
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded bg-teal/10 text-teal font-mono font-bold">
                  &omega;ₙ = {omegaN} rad/s
                </span>
                <span className="text-xs px-2 py-1 rounded bg-gold/15 text-gold-dark dark:text-gold font-mono font-bold">
                  fₙ = {freqHz} Hz
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-canvas dark:bg-navy-card/60 p-3.5 rounded-2xl border border-slate-200 dark:border-navy-light/40">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Mass (m)</span>
                  <span className="text-teal font-mono">{mass} kg</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Stiffness (k)</span>
                  <span className="text-teal font-mono">{stiffness} N/m</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="50"
                  value={stiffness}
                  onChange={(e) => setStiffness(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Damping (&zeta;)</span>
                  <span className="text-gold font-mono">{dampingRatio}</span>
                </div>
                <input
                  type="range"
                  min="0.02"
                  max="0.8"
                  step="0.02"
                  value={dampingRatio}
                  onChange={(e) => setDampingRatio(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Damped Waveform Canvas SVG */}
            <div className="h-28 sm:h-32 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center p-3 border border-slate-800">
              <svg className="w-full h-full" viewBox="0 0 300 120">
                <line x1="10" y1="60" x2="290" y2="60" stroke="#334155" strokeWidth="1" />
                <path
                  d={`M 10 60 Q 40 ${60 - (50 - dampingRatio * 40)}, 80 60 T 150 60 T 220 60 T 290 60`}
                  fill="none"
                  stroke="#14B8A6"
                  strokeWidth="2.5"
                />
                <text x="10" y="20" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                  Decaying Time Response &bull; Underdamped (&zeta; &lt; 1)
                </text>
                <text x="180" y="20" fill="#F4B942" fontSize="10" fontFamily="monospace">
                  Resonance Peak: {omegaN} rad/s
                </text>
              </svg>
            </div>
          </div>
        )}

        {/* ================= SIMULATION 3: FEA DISCRETIZATION ================= */}
        {activeSim === 'fea' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-navy dark:text-canvas">
                  1D Bar Discretization & Stiffness Matrix Assembly
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Subdivide continuous structure into finite elements to solve nodal reactions [K]{'{'}d{'}'} = {'{'}F{'}'}.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2 py-1 rounded bg-teal/10 text-teal font-mono font-bold">
                  Elements: {numElements}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-gold/15 text-gold-dark dark:text-gold font-mono font-bold">
                  Matrix: {matrixSize}&times;{matrixSize}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-canvas dark:bg-navy-card/60 p-3.5 rounded-2xl border border-slate-200 dark:border-navy-light/40">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Mesh Resolution (Elements)</span>
                  <span className="text-teal font-mono">{numElements} Elements</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={numElements}
                  onChange={(e) => setNumElements(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Axial End Load (P)</span>
                  <span className="text-gold font-mono">{loadKN} kN</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="10"
                  value={loadKN}
                  onChange={(e) => setLoadKN(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Visual Mesh Display */}
            <div className="h-28 sm:h-32 bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col justify-center px-6 border border-slate-800">
              <div className="text-[10px] font-mono text-slate-400 mb-2">
                Discretized 1D Stepped Bar &bull; Fixed Left Boundary (u₁ = 0)
              </div>
              <div className="flex items-center w-full">
                {/* Wall constraint */}
                <div className="w-2.5 h-14 bg-stripes bg-slate-600 rounded-l" />

                {/* Elements */}
                {Array.from({ length: numElements }).map((_, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-10 border-y border-r border-teal/60 bg-gradient-to-r from-teal/20 to-teal/40 flex items-center justify-center relative group"
                  >
                    <span className="text-[9px] font-mono text-teal-light font-bold">
                      e_{idx + 1}
                    </span>
                    {/* Node dot */}
                    <span className="absolute -right-1.5 w-3 h-3 rounded-full bg-gold border-2 border-slate-900 z-10" />
                  </div>
                ))}

                {/* Arrow for Load */}
                <div className="ml-2 flex items-center text-gold font-bold text-xs animate-pulse">
                  &rarr; {loadKN} kN
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SIMULATION 4: THERMODYNAMICS ================= */}
        {activeSim === 'bme' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-navy dark:text-canvas">
                  Carnot Heat Engine Maximum Thermal Efficiency
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Second Law limitation on converting heat into work: &eta;th = 1 - (T_cold / T_hot).
                </p>
              </div>
              <div className="flex gap-2">
                <span className="text-xs px-2.5 py-1 rounded bg-teal/10 text-teal font-mono font-bold">
                  &eta;max = {carnotEff}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-canvas dark:bg-navy-card/60 p-3.5 rounded-2xl border border-slate-200 dark:border-navy-light/40">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Heat Source Temp (T_hot)</span>
                  <span className="text-rose-500 font-mono">{tempHot} K</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="1400"
                  step="20"
                  value={tempHot}
                  onChange={(e) => setTempHot(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">Heat Sink Temp (T_cold)</span>
                  <span className="text-sky-500 font-mono">{tempCold} K</span>
                </div>
                <input
                  type="range"
                  min="270"
                  max="450"
                  step="10"
                  value={tempCold}
                  onChange={(e) => setTempCold(Number(e.target.value))}
                  className="w-full accent-teal h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Efficiency Progress Gauge */}
            <div className="h-28 sm:h-32 bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col justify-center px-6 border border-slate-800">
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Carnot Cycle Limit</span>
                <span className="text-teal font-bold">{carnotEff}% Thermal Efficiency</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden p-0.5 border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-teal via-teal-light to-gold rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(5, parseFloat(carnotEff)))}%` }}
                />
              </div>
              <div className="mt-3 flex justify-between text-[11px] font-mono text-slate-500">
                <span>Source: {tempHot} K (Combustion)</span>
                <span>Sink: {tempCold} K (Atmosphere)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Widget Footer */}
      <div className="px-5 py-3 bg-slate-100/60 dark:bg-navy-card/60 border-t border-slate-200 dark:border-navy-light/60 flex items-center justify-between text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          Included in basicS: Interactive modules with live numerical solvers
        </span>
        <a
          href="#subjects"
          className="text-teal font-bold hover:underline flex items-center gap-1"
        >
          Explore All 4 Subjects &rarr;
        </a>
      </div>
    </div>
  )
}
