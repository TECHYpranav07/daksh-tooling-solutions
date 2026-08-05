import { useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'
import { 
  ShieldCheck, 
  Flame, 
  Cpu, 
  Wrench, 
  Sparkles, 
  CheckCircle2,
  Activity,
  Layers
} from 'lucide-react'

interface PillarItem {
  id: string
  code: string
  title: string
  shortLabel: string
  icon: any
  tagline: string
  desc: string
  highlights: string[]
  metric: string
  metricLabel: string
  accent: 'amber' | 'cyan' | 'green'
}

const PILLARS: PillarItem[] = [
  {
    id: 'fin-free',
    code: '01',
    title: 'Fin-Free Casting & High Yield',
    shortLabel: 'FIN-FREE CASTING',
    icon: Flame,
    tagline: 'PRECISION CORE CLEARANCE & GATING',
    desc: 'Minimal core-to-core and core-to-mold clearances engineered with high-accuracy tooling and collaborative gating design for maximum foundry yields.',
    highlights: ['Zero core box warpage', 'Expert gating simulation', 'Perfect core-to-mold alignment'],
    metric: '99.8%',
    metricLabel: 'FOUNDRY YIELD RATE',
    accent: 'amber',
  },
  {
    id: 'durability',
    code: '02',
    title: 'Advanced Tooling Durability',
    shortLabel: 'TOOL DURABILITY',
    icon: ShieldCheck,
    tagline: 'BUILT FOR 2 LAKH SHOTS & BEYOND',
    desc: 'Premium die steel cavity inserts with specialized plating and heat treatment. Includes AMC maintenance recall every 50,000 shots for reconditioning.',
    highlights: ['200,000+ Shot Guarantee', 'AMC Recall every 50K shots', 'Foundry-friendly maintenance'],
    metric: '2 LAKH+',
    metricLabel: 'GUARANTEED TOOL LIFE',
    accent: 'cyan',
  },
  {
    id: 'simulation',
    code: '03',
    title: 'Uniform Heating & Core Simulation',
    shortLabel: 'CORE SIMULATION',
    icon: Cpu,
    tagline: 'THERMAL SIMULATION & REJECTION CONTROL',
    desc: 'Advanced thermal management eliminates core distortion issues. Full core simulation delivers consistent quality and drastically reduced casting scrap.',
    highlights: ['Zero core box warpage', 'Thermal distortion control', 'Scrap reduction profiling'],
    metric: '0%',
    metricLabel: 'THERMAL WARPAGE',
    accent: 'green',
  },
  {
    id: 'infrastructure',
    code: '04',
    title: 'State-of-the-Art Infrastructure',
    shortLabel: 'INFRASTRUCTURE',
    icon: Layers,
    tagline: '5-AXIS CNC & 200T DIE SPOTTING',
    desc: 'High-speed 22,000 RPM gantry VMCs, twin-head EDM, and 200T die spotting press ensure 98% core parallelism and complete elimination of manual blue matching.',
    highlights: ['98% Blue Matching', '22,000 RPM Gantry Spindle', 'Twin-Head EDM Erosion'],
    metric: '98%',
    metricLabel: 'BLUE MATCHING ACCURACY',
    accent: 'amber',
  },
  {
    id: 'handling',
    code: '05',
    title: 'Specialized Handling & Assembly',
    shortLabel: 'CORE FIXTURES',
    icon: Wrench,
    tagline: 'FOUNDRY-FRIENDLY CORE FIXTURES',
    desc: 'Custom engineered fixtures for core handling, drilling, and assembly that prevent core damage and preserve critical dimensional tolerances.',
    highlights: ['Custom assembly fixtures', 'Damage-free core handling', 'Foundry productivity boost'],
    metric: '100%',
    metricLabel: 'FIXTURE PRECISION',
    accent: 'cyan',
  },
]

const STRATEGIC_FOCUS = [
  { metric: '90%', label: 'FIRST TRIAL OK', sub: 'First-time-right' },
  { metric: '100%', label: 'FLASH-FREE', sub: 'Zero flash tooling' },
  { metric: '100%', label: 'ON-TIME', sub: 'Workflows on-schedule' },
  { metric: '100%', label: 'SATISFACTION', sub: 'OEM long-term trust' },
]

export function ToolingExcellenceSection() {
  const c = useThemeColors()
  const [activeTab, setActiveTab] = useState<string>('fin-free')

  const activePillar = PILLARS.find((p) => p.id === activeTab) || PILLARS[0]

  const getColor = (accent: 'amber' | 'cyan' | 'green') => {
    switch (accent) {
      case 'amber': return c.amber
      case 'cyan': return c.cyan
      case 'green': return c.green
      default: return c.amber
    }
  }

  const activeColor = getColor(activePillar.accent)

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem', background: c.bg }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Compact Header with Quote Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-4 border-b border-[oklch(0.93_0.005_250_/_10%)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={13} style={{ color: c.amber }} />
              <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.35em', color: c.amber, fontWeight: 700 }}>
                SECTION 03 — CORE STRENGTH
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: c.heading,
              }}
            >
              Tooling Excellence Engine
            </h2>
          </div>

          {/* Core Advantage Statement Pill */}
          <div className="p-3 border border-[oklch(0.72_0.19_45_/_30%)] bg-[oklch(0.72_0.19_45_/_8%)] backdrop-blur-md max-w-lg">
            <p style={{ fontFamily: 'monospace', fontSize: '10.5px', color: c.amber, fontWeight: 600, lineHeight: 1.4 }}>
              “Tooling is not a support function at Daksh Tooling Solutions — it is our core competitive advantage.”
            </p>
          </div>
        </div>

        {/* INTERACTIVE DUAL CONSOLE (Compact Grid: Left 5 Tabs, Right Telemetry Display) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
          
          {/* Left Selector Tabs (5 Cols) */}
          <div className="lg:col-span-5 space-y-2">
            {PILLARS.map((pillar) => {
              const isSelected = pillar.id === activeTab
              const color = getColor(pillar.accent)
              const Icon = pillar.icon

              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveTab(pillar.id)}
                  className="w-full text-left p-3 border transition-all duration-200 flex items-center justify-between group backdrop-blur-md"
                  style={{
                    borderColor: isSelected ? color : `color-mix(in oklch, ${color} 20%, transparent)`,
                    background: isSelected 
                      ? `color-mix(in oklch, ${color} 12%, oklch(0.13 0.01 250 / 80%))` 
                      : 'oklch(0.12 0.01 250 / 40%)',
                    cursor: 'pointer',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 800, color: color }}>
                      {pillar.code}
                    </span>
                    <Icon size={16} style={{ color: isSelected ? color : c.body, flexShrink: 0 }} />
                    <span 
                      style={{ 
                        fontFamily: 'system-ui', 
                        fontSize: '13px', 
                        fontWeight: isSelected ? 700 : 600, 
                        color: isSelected ? c.heading : c.body 
                      }} 
                      className="truncate"
                    >
                      {pillar.shortLabel}
                    </span>
                  </div>

                  <span 
                    style={{ 
                      fontFamily: 'monospace', 
                      fontSize: '9px', 
                      color: isSelected ? color : c.body, 
                      fontWeight: 700 
                    }} 
                    className="shrink-0 group-hover:translate-x-1 transition-transform"
                  >
                    {isSelected ? 'ACTIVE ➔' : 'SELECT'}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Right Interactive Telemetry Console (7 Cols) */}
          <div className="lg:col-span-7">
            <div 
              className="h-full p-6 border relative flex flex-col justify-between backdrop-blur-lg"
              style={{
                borderColor: activeColor,
                background: `radial-gradient(circle at top right, color-mix(in oklch, ${activeColor} 10%, transparent), oklch(0.12 0.01 250 / 95%))`,
                boxShadow: `0 0 25px color-mix(in oklch, ${activeColor} 12%, transparent)`,
              }}
            >
              {/* Corner Reticles */}
              <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2" style={{ borderColor: activeColor }} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2" style={{ borderColor: activeColor }} />
              <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2" style={{ borderColor: activeColor }} />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2" style={{ borderColor: activeColor }} />

              <div>
                {/* Console Bar */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[oklch(0.93_0.005_250_/_10%)]">
                  <div className="flex items-center gap-2">
                    <Activity size={13} style={{ color: activeColor }} />
                    <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', color: activeColor, fontWeight: 700 }}>
                      PILLAR TELEMETRY — {activePillar.code}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, letterSpacing: '0.1em' }}>
                    IN-HOUSE TOOL ROOM PROTOCOL
                  </span>
                </div>

                {/* Main Content */}
                <div className="mb-4">
                  <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: activeColor, fontWeight: 700, marginBottom: '0.2rem' }}>
                    {activePillar.tagline}
                  </div>
                  <h3 style={{ fontFamily: 'system-ui', fontSize: '1.35rem', fontWeight: 800, color: c.heading, marginBottom: '0.5rem', lineHeight: 1.2 }}>
                    {activePillar.title}
                  </h3>
                  <p style={{ fontFamily: 'monospace', fontSize: '11px', color: c.body, lineHeight: 1.6, marginBottom: '1rem' }}>
                    {activePillar.desc}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-2 mb-4">
                  {activePillar.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 border border-[oklch(0.93_0.005_250_/_8%)] bg-[oklch(0.14_0.012_250_/_50%)]">
                      <CheckCircle2 size={14} style={{ color: activeColor, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'monospace', fontSize: '10px', color: c.heading, fontWeight: 600 }}>
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric Footer Pill */}
              <div className="pt-3 border-t border-[oklch(0.93_0.005_250_/_10%)] flex items-center justify-between">
                <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em', color: c.body }}>
                  BENCHMARK SPECIFICATION:
                </span>
                <div className="flex items-center gap-2">
                  <span style={{ fontFamily: 'system-ui', fontSize: '1.2rem', fontWeight: 900, color: activeColor, lineHeight: 1 }}>
                    {activePillar.metric}
                  </span>
                  <span style={{ fontFamily: 'monospace', fontSize: '8.5px', color: activeColor, letterSpacing: '0.15em', fontWeight: 700 }}>
                    {activePillar.metricLabel}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Strategic Focus Strip — Ultra-Compact Line */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-[oklch(0.93_0.005_250_/_10%)]">
          {STRATEGIC_FOCUS.map((item) => (
            <div 
              key={item.label}
              className="flex items-center gap-3 p-2.5 border border-[oklch(0.93_0.005_250_/_8%)] bg-[oklch(0.12_0.01_250_/_40%)]"
            >
              <span style={{ fontFamily: 'system-ui', fontSize: '1.1rem', fontWeight: 800, color: c.amber, lineHeight: 1 }}>
                {item.metric}
              </span>
              <div>
                <div style={{ fontFamily: 'monospace', fontSize: '9px', color: c.heading, fontWeight: 700, letterSpacing: '0.1em' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '8px', color: c.body }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
