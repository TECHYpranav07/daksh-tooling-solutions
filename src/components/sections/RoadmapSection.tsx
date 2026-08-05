import { useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'
import { 
  Microscope, 
  Globe, 
  Cpu, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Target, 
  HeartHandshake, 
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react'

interface RoadmapItem {
  id: string
  target: string
  title: string
  subtitle: string
  status: 'in-progress' | 'planned' | 'ongoing'
  progress: number
  icon: any
  details: string[]
  accent: 'amber' | 'cyan' | 'green' | 'purple'
}

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: 'quality-lab',
    target: 'DEC 2026',
    title: 'Advanced Metrology Quality Lab',
    subtitle: 'Climate-Controlled Inspection Center',
    status: 'in-progress',
    progress: 75,
    icon: Microscope,
    accent: 'amber',
    details: [
      'Dedicated cleanroom environment for optical & CMM inspection',
      'Sub-micron accuracy profiling for complex die inserts',
      'Integrated PPAP Level 3 documentation suite',
    ],
  },
  {
    id: 'export-fta',
    target: 'DEC 2026',
    title: 'Export Readiness & FTA Compliance',
    subtitle: 'Global Automotive Supply Chain',
    status: 'in-progress',
    progress: 60,
    icon: Globe,
    accent: 'cyan',
    details: [
      'Free Trade Agreement (FTA) compliant export packaging',
      'Direct dispatch to EU, ASEAN & North American OEMs',
      'Customs & international logistics integration',
    ],
  },
  {
    id: 'ai-erp',
    target: 'JAN 2027',
    title: 'AI-Driven Smart ERP Integration',
    subtitle: 'Predictive Tooling & Shopfloor Intelligence',
    status: 'planned',
    progress: 40,
    icon: Cpu,
    accent: 'purple',
    details: [
      'Real-time machine telemetry & spindle vibration analytics',
      'Automated raw material & electrode replenishment',
      'AI predictive tool wear & maintenance scheduling',
    ],
  },
  {
    id: 'iatf-16949',
    target: 'BY 2027',
    title: 'IATF 16949 Certification',
    subtitle: 'Global Automotive Benchmark',
    status: 'planned',
    progress: 30,
    icon: Award,
    accent: 'green',
    details: [
      'Full compliance with global automotive quality standards',
      'Advanced Product Quality Planning (APQP) protocols',
      'Enhanced FMEA and statistical process control (SPC)',
    ],
  },
  {
    id: 'capacity',
    target: 'ONGOING',
    title: 'Facility & Fleet Capacity Expansion',
    subtitle: 'High-Tonnage & 5-Axis Scale',
    status: 'ongoing',
    progress: 85,
    icon: TrendingUp,
    accent: 'amber',
    details: [
      'Addition of 200T+ high-speed press & injection molding lines',
      'Expansion of 5-axis CNC milling bay',
      'Increased free capacity for rapid-turn OEM orders',
    ],
  },
]

const COMMITMENT_ITEMS = [
  {
    num: '01',
    title: 'Zero-Defect Mindset',
    tagline: 'FIRST-TIME-RIGHT PHILOSOPHY',
    icon: ShieldCheck,
    badge: 'ACCURACY 99.9%',
    accent: 'amber',
    desc: 'Integrated Poka-Yoke error proofing, 100% flash-free mold design, and multi-point optical verification at every production stage.',
    highlights: ['Poka-Yoke Verification', '100% Flash-Free Molds', 'Zero Field Defects'],
  },
  {
    num: '02',
    title: 'Process Reliability & OTIF',
    tagline: 'ON-TIME IN-FULL DELIVERY',
    icon: Target,
    badge: 'OTIF 99.5%',
    accent: 'cyan',
    desc: 'Synchronized production scheduling, dedicated buffer management, and rigorous preventive maintenance ensuring zero downtime.',
    highlights: ['Kanban Workflows', 'Zero Line-Stoppage', 'Guaranteed Delivery'],
  },
  {
    num: '03',
    title: 'Continuous Tech Investment',
    tagline: 'CUTTING-EDGE INFRASTRUCTURE',
    icon: Cpu,
    badge: 'ANNUAL RE-INVESTMENT',
    accent: 'purple',
    desc: 'Relentless upgrade of 5-axis CNC machining, high-precision EDM, digital metrology, and team upskilling to maintain industry leadership.',
    highlights: ['5-Axis Innovation', 'Sub-Micron EDM', 'Skilled Workmanship'],
  },
  {
    num: '04',
    title: 'Trust & Long-Term Alliances',
    tagline: 'OEM PARTNERSHIP VALUE',
    icon: HeartHandshake,
    badge: 'RETENTION 98%',
    accent: 'green',
    desc: 'Transparent pricing, single-source accountability from tooling to finished parts, and dedicated program managers for every OEM client.',
    highlights: ['Single-Source Partner', 'Dedicated Account Managers', 'AMC Lifetime Support'],
  },
]

export function RoadmapSection() {
  const c = useThemeColors()
  const [activeItem, setActiveItem] = useState<string>('quality-lab')

  const getColor = (accent: 'amber' | 'cyan' | 'green' | 'purple') => {
    switch (accent) {
      case 'amber': return c.amber
      case 'cyan': return c.cyan
      case 'green': return c.green
      case 'purple': return 'oklch(0.72 0.22 310)'
      default: return c.amber
    }
  }

  const selectedRoadmap = ROADMAP_ITEMS.find((item) => item.id === activeItem) || ROADMAP_ITEMS[0]

  return (
    <div style={{ paddingTop: '5rem', paddingBottom: '6rem', background: c.bg }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Section Telemetry Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="hud-blink" style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.amber, display: 'block', boxShadow: `0 0 8px ${c.amber}` }} />
              <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.4em', color: c.amber, fontWeight: 700 }}>
                SECTION 05 — STRATEGIC HORIZON
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: c.heading,
              }}
            >
              Future Roadmap & Core Commitments
            </h2>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                letterSpacing: '0.05em',
                color: c.body,
                maxWidth: '46rem',
                marginTop: '0.35rem',
                lineHeight: 1.7,
              }}
            >
              Building tomorrow’s precision tool room — combining AI shopfloor intelligence, global automotive quality standards, and uncompromised customer trust.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="px-3.5 py-2 border border-[oklch(0.93_0.005_250_/_15%)] bg-[oklch(0.14_0.012_250_/_60%)] backdrop-blur-md flex items-center gap-2">
              <Sparkles size={14} style={{ color: c.amber }} />
              <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.heading, fontWeight: 600 }}>
                VISION 2027 ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* BLOCK 1: INTERACTIVE FUTURE ROADMAP TIMELINE            */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-[oklch(0.93_0.005_250_/_12%)]">
            <div className="flex items-center gap-2">
              <span style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.3em', color: c.cyan, fontWeight: 700 }}>
                ◆ STRATEGIC MILESTONE MATRIX
              </span>
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, letterSpacing: '0.15em' }} className="hidden sm:inline">
              SELECT MILESTONE FOR SPECIFICATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Milestone Interactive List (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              {ROADMAP_ITEMS.map((item) => {
                const isSelected = item.id === activeItem
                const color = getColor(item.accent)
                const IconComponent = item.icon

                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className="group relative p-4 border transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md"
                    style={{
                      borderColor: isSelected ? color : `color-mix(in oklch, ${color} 20%, transparent)`,
                      background: isSelected 
                        ? `color-mix(in oklch, ${color} 10%, oklch(0.14 0.012 250 / 80%))` 
                        : 'oklch(0.13 0.01 250 / 50%)',
                      boxShadow: isSelected ? `0 0 20px color-mix(in oklch, ${color} 15%, transparent)` : 'none',
                    }}
                  >
                    {/* Glowing Left Indicator Bar */}
                    <div 
                      className="absolute top-0 left-0 bottom-0 w-1 transition-all duration-300"
                      style={{ background: isSelected ? color : 'transparent' }}
                    />

                    <div className="flex items-center justify-between gap-4 pl-2">
                      <div className="flex items-center gap-4 min-w-0">
                        <div 
                          className="p-2.5 rounded-sm border shrink-0 transition-transform duration-300 group-hover:scale-110"
                          style={{ 
                            borderColor: `color-mix(in oklch, ${color} 40%, transparent)`,
                            background: `color-mix(in oklch, ${color} 15%, transparent)`,
                            color: color,
                          }}
                        >
                          <IconComponent size={20} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', color: color }}>
                              [{item.target}]
                            </span>
                            <span 
                              style={{ 
                                fontFamily: 'monospace', 
                                fontSize: '8px', 
                                letterSpacing: '0.15em', 
                                padding: '0.1rem 0.4rem',
                                border: `1px solid color-mix(in oklch, ${color} 30%, transparent)`,
                                color: color,
                                background: `color-mix(in oklch, ${color} 8%, transparent)`,
                                textTransform: 'uppercase'
                              }}
                            >
                              {item.status}
                            </span>
                          </div>
                          <h3 style={{ fontFamily: 'system-ui', fontSize: '1.05rem', fontWeight: 700, color: isSelected ? c.heading : c.body, lineHeight: 1.3 }} className="truncate">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {/* Progress Ring / Mini Bar */}
                        <div className="hidden sm:flex flex-col items-end min-w-[70px]">
                          <span style={{ fontFamily: 'monospace', fontSize: '10px', color: color, fontWeight: 700 }}>
                            {item.progress}%
                          </span>
                          <div className="w-16 h-1 bg-[oklch(0.93_0.005_250_/_10%)] rounded-full overflow-hidden mt-1">
                            <div 
                              className="h-full transition-all duration-500" 
                              style={{ width: `${item.progress}%`, background: color }}
                            />
                          </div>
                        </div>

                        <ChevronRight 
                          size={18} 
                          style={{ color: isSelected ? color : c.body }} 
                          className={`transition-transform duration-300 ${isSelected ? 'translate-x-1' : 'group-hover:translate-x-1'}`}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Active Milestone Telemetry Card (Right 5 Cols) */}
            <div className="lg:col-span-5">
              <div 
                className="h-full p-6 lg:p-8 border relative flex flex-col justify-between backdrop-blur-lg"
                style={{
                  borderColor: getColor(selectedRoadmap.accent),
                  background: `radial-gradient(circle at top right, color-mix(in oklch, ${getColor(selectedRoadmap.accent)} 12%, transparent), oklch(0.12 0.01 250 / 90%))`,
                  boxShadow: `0 0 30px color-mix(in oklch, ${getColor(selectedRoadmap.accent)} 10%, transparent)`
                }}
              >
                {/* HUD Corner Reticles */}
                <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: getColor(selectedRoadmap.accent) }} />
                <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: getColor(selectedRoadmap.accent) }} />
                <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: getColor(selectedRoadmap.accent) }} />
                <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: getColor(selectedRoadmap.accent) }} />

                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[oklch(0.93_0.005_250_/_12%)]">
                    <div className="flex items-center gap-2">
                      <span className="hud-blink" style={{ width: '6px', height: '6px', borderRadius: '50%', background: getColor(selectedRoadmap.accent) }} />
                      <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.3em', color: getColor(selectedRoadmap.accent), fontWeight: 700 }}>
                        MILESTONE SPECIFICATION
                      </span>
                    </div>
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', color: c.heading, fontWeight: 700 }}>
                      TARGET: {selectedRoadmap.target}
                    </span>
                  </div>

                  {/* Header Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div 
                      className="p-3 border shrink-0"
                      style={{ 
                        borderColor: getColor(selectedRoadmap.accent),
                        background: `color-mix(in oklch, ${getColor(selectedRoadmap.accent)} 20%, transparent)`,
                        color: getColor(selectedRoadmap.accent),
                      }}
                    >
                      {(() => {
                        const Icon = selectedRoadmap.icon
                        return <Icon size={28} />
                      })()}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'system-ui', fontSize: '1.4rem', fontWeight: 800, color: c.heading, lineHeight: 1.2 }}>
                        {selectedRoadmap.title}
                      </h3>
                      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: getColor(selectedRoadmap.accent), letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                        {selectedRoadmap.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Implementation Deliverables */}
                  <div className="space-y-3 mb-8">
                    <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.25em', color: c.body, textTransform: 'uppercase' }}>
                      Key Deliverables & Specifications:
                    </div>
                    {selectedRoadmap.details.map((detail, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-2.5 p-2.5 border border-[oklch(0.93_0.005_250_/_8%)] bg-[oklch(0.14_0.012_250_/_50%)]"
                      >
                        <CheckCircle2 size={15} style={{ color: getColor(selectedRoadmap.accent), flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ fontFamily: 'monospace', fontSize: '10.5px', color: c.heading, lineHeight: 1.5 }}>
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress Bar Display */}
                <div className="pt-4 border-t border-[oklch(0.93_0.005_250_/_12%)]">
                  <div className="flex items-center justify-between mb-2" style={{ fontFamily: 'monospace', fontSize: '10px' }}>
                    <span style={{ color: c.body }}>EXECUTION READY:</span>
                    <span style={{ color: getColor(selectedRoadmap.accent), fontWeight: 800 }}>
                      {selectedRoadmap.progress}% COMPLETE
                    </span>
                  </div>
                  <div className="h-2 bg-[oklch(0.17_0.012_250)] rounded-full overflow-hidden p-0.5 border border-[oklch(0.93_0.005_250_/_10%)]">
                    <div 
                      className="h-full rounded-full transition-all duration-700 shadow-sm"
                      style={{ 
                        width: `${selectedRoadmap.progress}%`, 
                        background: `linear-gradient(90deg, ${getColor(selectedRoadmap.accent)}, oklch(0.95 0.05 250))` 
                      }}
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* BLOCK 2: VISUAL HUD COMMITMENT GRID                      */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[oklch(0.93_0.005_250_/_12%)]">
            <div>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.3em', color: c.green, fontWeight: 700 }}>
                ◆ GUARANTEED OEM COMMITMENTS
              </span>
              <h3 style={{ fontFamily: 'system-ui', fontSize: '1.5rem', fontWeight: 800, color: c.heading, marginTop: '0.2rem' }}>
                Operational Promises Built On Trust
              </h3>
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, letterSpacing: '0.15em' }} className="hidden sm:inline">
              ISO 9001:2015 AUDITED STANDARDS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMMITMENT_ITEMS.map((item) => {
              const color = getColor(item.accent as any)
              const IconComponent = item.icon

              return (
                <div
                  key={item.num}
                  className="group relative p-6 border bg-[oklch(0.13_0.01_250_/_70%)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
                  style={{
                    borderColor: `color-mix(in oklch, ${color} 25%, transparent)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = color
                    e.currentTarget.style.boxShadow = `0 10px 30px color-mix(in oklch, ${color} 15%, transparent)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `color-mix(in oklch, ${color} 25%, transparent)`
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Corner Accent */}
                  <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: color }} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: color }} />

                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="p-3 border rounded-sm"
                        style={{ 
                          borderColor: `color-mix(in oklch, ${color} 40%, transparent)`,
                          background: `color-mix(in oklch, ${color} 12%, transparent)`,
                          color: color,
                        }}
                      >
                        <IconComponent size={22} />
                      </div>
                      <span style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 900, color: `color-mix(in oklch, ${color} 40%, white)` }}>
                        {item.num}
                      </span>
                    </div>

                    {/* Badge Pill */}
                    <div className="mb-2">
                      <span 
                        style={{ 
                          fontFamily: 'monospace', 
                          fontSize: '8px', 
                          fontWeight: 700, 
                          letterSpacing: '0.15em',
                          padding: '0.2rem 0.5rem',
                          border: `1px solid color-mix(in oklch, ${color} 40%, transparent)`,
                          background: `color-mix(in oklch, ${color} 10%, transparent)`,
                          color: color,
                        }}
                      >
                        ★ {item.badge}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'system-ui', fontSize: '1.15rem', fontWeight: 800, color: c.heading, marginBottom: '0.25rem', lineHeight: 1.2 }}>
                      {item.title}
                    </h4>
                    <div style={{ fontFamily: 'monospace', fontSize: '8.5px', letterSpacing: '0.2em', color: color, marginBottom: '0.75rem', fontWeight: 600 }}>
                      {item.tagline}
                    </div>

                    <p style={{ fontFamily: 'monospace', fontSize: '10.5px', color: c.body, lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Highlights Bullet Tags */}
                  <div className="pt-3 border-t border-[oklch(0.93_0.005_250_/_10%)] space-y-1">
                    {item.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-1.5" style={{ fontFamily: 'monospace', fontSize: '9px', color: c.heading }}>
                        <span style={{ color: color }}>▸</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
