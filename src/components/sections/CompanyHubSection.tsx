import { useState, useEffect, useRef } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'

interface CompanyHubSectionProps {
  initialTab?: 'about' | 'capabilities' | 'quality'
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }: { target: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

/* ─── OEM Partners Data ─── */
const OEM_PARTNERS = [
  { name: 'TOYOTA KIRLOSKAR', sector: 'AUTOMOTIVE OEM', logo: '/images/clients/page_20_img_7_267x189.jpeg' },
  { name: 'SPARK MINDA', sector: 'TIER-1 AUTO COMPONENTS', logo: '/images/clients/page_20_img_2_319x180.jpeg' },
  { name: 'PSA GROUPE', sector: 'GLOBAL AUTOMOTIVE', logo: '/images/clients/page_20_img_5_292x173.jpeg' },
  { name: 'TRW', sector: 'SAFETY SYSTEMS', logo: '/images/clients/page_20_img_8_225x225.jpeg' },
  { name: 'MINDA VAST', sector: 'ACCESS SYSTEMS', logo: '/images/clients/page_20_img_4_115x141.jpeg' },
  { name: 'TREND TECHNOLOGIES', sector: 'ELECTRONICS MFG', logo: '/images/clients/page_20_img_6_386x130.jpeg' },
  { name: 'PREMIER SEALS', sector: 'SEALING SOLUTIONS', logo: '/images/clients/page_20_img_3_317x176.jpeg' },
]

export function CompanyHubSection({ initialTab = 'about' }: CompanyHubSectionProps) {
  const c = useThemeColors()
  const [activeTab, setActiveTab] = useState<'about' | 'capabilities' | 'quality'>(initialTab)

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab)
  }, [initialTab])

  return (
    <div style={{ paddingTop: '5rem', paddingBottom: '5rem', background: c.bg }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

        {/* ═══════════════════════════════════════════════════════ */}
        {/* SECTION HEADER                                         */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mb-8">
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: c.amber,
              marginBottom: '0.5rem',
            }}
          >
            SECTION 02 — COMMAND CENTER
          </div>
          <h2
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: c.heading,
            }}
          >
            Daksh Tooling Command Hub
          </h2>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '12px',
              letterSpacing: '0.05em',
              color: c.body,
              maxWidth: '42rem',
              marginTop: '0.25rem',
            }}
          >
            Real-time overview of our engineering capabilities, quality standards, and operational metrics.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* DYNAMIC KPI METRIC BAR                                 */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {/* KPI 1 */}
          <div className="group relative overflow-hidden border border-[oklch(0.93_0.005_250_/_10%)] bg-[oklch(0.14_0.012_250_/_70%)] p-4 backdrop-blur-md transition-all duration-300 hover:border-[oklch(0.75_0.17_150_/_60%)] hover:-translate-y-0.5">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[oklch(0.75_0.17_150_/_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[oklch(0.75_0.17_150_/_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div style={{
              fontFamily: 'system-ui', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, lineHeight: 1,
              background: c.gradientGreenCyan,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              <AnimatedCounter target={90} suffix="%" />
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.heading, fontWeight: 600, marginTop: '0.35rem' }}>
              FIRST-TRIAL APPROVAL
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, marginTop: '0.15rem' }}>
              FIRST-TIME-RIGHT MOLD PRECISION
            </div>
          </div>

          {/* KPI 2 */}
          <div className="group relative overflow-hidden border border-[oklch(0.93_0.005_250_/_10%)] bg-[oklch(0.14_0.012_250_/_70%)] p-4 backdrop-blur-md transition-all duration-300 hover:border-[oklch(0.72_0.19_45_/_60%)] hover:-translate-y-0.5">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[oklch(0.72_0.19_45_/_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[oklch(0.72_0.19_45_/_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div style={{
              fontFamily: 'system-ui', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, lineHeight: 1,
              background: c.gradientAmberCyan,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              <AnimatedCounter target={2} suffix=" Lakhs+" />
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.heading, fontWeight: 600, marginTop: '0.35rem' }}>
              GUARANTEED TOOL LIFE
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, marginTop: '0.15rem' }}>
              SHOTS PER MOLD GUARANTEED
            </div>
          </div>

          {/* KPI 3 */}
          <div className="group relative overflow-hidden border border-[oklch(0.93_0.005_250_/_10%)] bg-[oklch(0.14_0.012_250_/_70%)] p-4 backdrop-blur-md transition-all duration-300 hover:border-[oklch(0.78_0.12_215_/_60%)] hover:-translate-y-0.5">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[oklch(0.78_0.12_215_/_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[oklch(0.78_0.12_215_/_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div style={{
              fontFamily: 'system-ui', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, lineHeight: 1,
              background: c.gradientCyanAmber,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              <AnimatedCounter target={250} suffix="+" />
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.heading, fontWeight: 600, marginTop: '0.35rem' }}>
              MOLDS & DIES DELIVERED
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, marginTop: '0.15rem' }}>
              IN THE LAST YEAR ALONE
            </div>
          </div>

          {/* KPI 4 */}
          <div className="group relative overflow-hidden border border-[oklch(0.93_0.005_250_/_10%)] bg-[oklch(0.14_0.012_250_/_70%)] p-4 backdrop-blur-md transition-all duration-300 hover:border-[oklch(0.72_0.19_45_/_60%)] hover:-translate-y-0.5">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[oklch(0.72_0.19_45_/_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[oklch(0.72_0.19_45_/_60%)] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div style={{
              fontFamily: 'system-ui', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, lineHeight: 1,
              background: c.gradientAmberGreen,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              <AnimatedCounter target={600} suffix="+" />
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.heading, fontWeight: 600, marginTop: '0.35rem' }}>
              ZERO-INCIDENT DAYS
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, marginTop: '0.15rem' }}>
              CONSECUTIVE SAFETY RECORD
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* COMMAND HUB INTERFACE                                  */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="relative border border-[oklch(0.93_0.005_250_/_12%)] bg-[oklch(0.14_0.012_250_/_60%)] backdrop-blur-md">
          {/* Corner Brackets */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[oklch(0.72_0.19_45)]" />

          {/* Tab Bar */}
          <div className="flex items-stretch border-b border-[oklch(0.93_0.005_250_/_12%)]">
            {(['about', 'capabilities', 'quality'] as const).map((tab) => {
              const isActive = activeTab === tab
              const labels = {
                about: '01. ABOUT US',
                capabilities: '02. CAPABILITIES',
                quality: '03. QUALITY & STANDARDS',
              }
              const colors = {
                about: c.amber,
                capabilities: c.cyan,
                quality: c.green,
              }
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 transition-all duration-200"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    padding: '1rem 1.5rem',
                    borderBottom: isActive ? `2px solid ${colors[tab]}` : '2px solid transparent',
                    background: isActive ? `color-mix(in oklch, ${colors[tab]} 10%, transparent)` : 'transparent',
                    color: isActive ? colors[tab] : c.body,
                    cursor: 'pointer',
                    border: 'none',
                    borderRight: `1px solid ${c.borderSubtle}`,
                  }}
                >
                  {labels[tab]}
                  {isActive && (
                    <span style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: colors[tab],
                      marginLeft: '0.5rem',
                      boxShadow: `0 0 6px ${colors[tab]}`,
                    }} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 md:p-8 min-h-[320px]">

            {/* ─── TAB 1: ABOUT US ─── */}
            {activeTab === 'about' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Company Story */}
                  <div className="flex-1">
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', color: c.amber, marginBottom: '0.5rem' }}>
                      ESTABLISHED APRIL 2019 · PIMPRI CHINCHWAD, PUNE
                    </div>
                    <h3 style={{ fontFamily: 'system-ui', fontSize: '1.5rem', fontWeight: 700, color: c.heading, marginBottom: '0.75rem', lineHeight: 1.3 }}>
                      Innovative Partner for Tooling, Molded & Pressed Parts
                    </h3>
                    <p style={{ fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.8, color: c.body, marginBottom: '1rem' }}>
                      Daksh Tooling Solutions is a technology-driven manufacturer specializing in high-precision tools, dies, molded and pressed components for automotive, medical, and industrial engineering sectors. Located at Chinchwad, Pune — India's strategic automotive manufacturing hub — we deliver single-source tooling, molding, stamping, and assemblies under one roof.
                    </p>

                    {/* Mission & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <div className="group p-3.5 border border-[oklch(0.93_0.005_250_/_8%)] bg-[oklch(0.12_0.01_250_/_60%)] transition-all duration-200 hover:border-[oklch(0.72_0.19_45_/_40%)] hover:-translate-y-0.5">
                        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: c.amber, fontWeight: 700, marginBottom: '0.3rem' }}>
                          ◆ MISSION
                        </div>
                        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, lineHeight: 1.5 }}>
                          To advance precision manufacturing by combining engineering excellence, continuous improvement, and collaborative partnerships to deliver consistently high-quality products and services.
                        </p>
                      </div>
                      <div className="group p-3.5 border border-[oklch(0.93_0.005_250_/_8%)] bg-[oklch(0.12_0.01_250_/_60%)] transition-all duration-200 hover:border-[oklch(0.78_0.12_215_/_40%)] hover:-translate-y-0.5">
                        <div style={{ fontFamily: 'monospace', fontSize: '10px', color: c.cyan, fontWeight: 700, marginBottom: '0.3rem' }}>
                          ◆ VISION
                        </div>
                        <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, lineHeight: 1.5 }}>
                          To be recognized as a benchmark manufacturer in Precision Tools, Molded & Stamped Parts — delivering outstanding products and dependable services that create premium value for our customers through innovation, reliability, and first-time-right performance.
                        </p>
                      </div>
                    </div>

                    {/* Competitive Edge — 4 Pillars */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { icon: '⬡', label: 'ENGINEERING EXCELLENCE', desc: 'Deep domain experience with a focus on precision, performance, and reliability.', color: c.amber },
                        { icon: '◈', label: 'INTEGRATED MANUFACTURING', desc: 'Single-source delivery of tooling, molding, stamping & assemblies — reducing lead times and risk.', color: c.cyan },
                        { icon: '◇', label: 'COST & VALUE OPTIMIZATION', desc: 'Optimized processes and equipment ensure competitive pricing without compromising quality.', color: c.green },
                        { icon: '△', label: 'CUSTOMER-CENTRIC SERVICE', desc: 'Collaborative project development, responsive support, and on-time delivery commitment.', color: c.amber },
                      ].map((edge) => (
                        <div key={edge.label} className="group p-3.5 border border-[oklch(0.93_0.005_250_/_8%)] bg-[oklch(0.12_0.01_250_/_60%)] transition-all duration-200 hover:-translate-y-0.5" style={{ borderColor: `color-mix(in oklch, ${edge.color} 20%, transparent)` }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = `color-mix(in oklch, ${edge.color} 50%, transparent)` }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = `color-mix(in oklch, ${edge.color} 20%, transparent)` }}
                        >
                          <div className="flex items-center gap-2 mb-1.5">
                            <span style={{ fontSize: '14px', color: edge.color, lineHeight: 1 }}>{edge.icon}</span>
                            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: edge.color, fontWeight: 700, letterSpacing: '0.15em' }}>
                              {edge.label}
                            </span>
                          </div>
                          <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, lineHeight: 1.5 }}>
                            {edge.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CEO Executive Card */}
                  <div className="lg:w-[300px] shrink-0">
                    <div className="group relative border border-[oklch(0.72_0.19_45_/_30%)] bg-[oklch(0.12_0.01_250)] p-5 transition-all duration-300 hover:border-[oklch(0.72_0.19_45_/_60%)]">
                      <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[oklch(0.72_0.19_45)]" />
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[oklch(0.72_0.19_45)]" />
                      <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[oklch(0.72_0.19_45)]" />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[oklch(0.72_0.19_45)]" />

                      <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.3em', color: c.amber, marginBottom: '0.75rem' }}>
                        LEADERSHIP
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div style={{
                          width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: `1px solid ${c.amberA40}`, background: c.amberA8,
                          fontFamily: 'system-ui', fontSize: '16px', fontWeight: 800, color: c.amber,
                        }}>
                          SG
                        </div>
                        <div>
                          <div style={{ fontFamily: 'system-ui', fontSize: '1rem', fontWeight: 700, color: c.heading }}>
                            Suresh M. Gherade
                          </div>
                          <div style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, letterSpacing: '0.1em' }}>
                            CEO & MANAGING DIRECTOR
                          </div>
                        </div>
                      </div>

                      <a
                        href="https://maps.app.goo.gl/i8ypH4VQ5kdxmToW7"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, lineHeight: 1.6, marginBottom: '1rem', display: 'block', textDecoration: 'none' }}
                        className="hover:text-[oklch(0.72_0.19_45)] transition-colors"
                      >
                        Plot No. 54/26 D-II Block MIDC, Chinchwad, Pune - 411019 ↗
                      </a>

                      {/* Direct Contact */}
                      <a
                        href="tel:+918208701793"
                        className="flex items-center gap-2 mb-2.5 p-2.5 border border-[oklch(0.78_0.12_215_/_30%)] bg-[oklch(0.78_0.12_215_/_8%)] transition-all duration-200 hover:border-[oklch(0.78_0.12_215_/_60%)] hover:bg-[oklch(0.78_0.12_215_/_15%)]"
                        style={{ textDecoration: 'none' }}
                      >
                        <span style={{ fontSize: '14px' }}>📞</span>
                        <div>
                          <div style={{ fontFamily: 'monospace', fontSize: '12px', fontWeight: 700, color: c.cyan, letterSpacing: '0.05em' }}>
                            +91 82087 01793
                          </div>
                          <div style={{ fontFamily: 'monospace', fontSize: '8px', color: c.body, letterSpacing: '0.15em' }}>
                            DIRECT LINE
                          </div>
                        </div>
                      </a>

                      {/* Download PDF */}
                      <a
                        href="/COMPANY_PROFILE_DTS.pdf"
                        download
                        className="flex items-center justify-center gap-2 p-2.5 border border-[oklch(0.72_0.19_45_/_50%)] bg-[oklch(0.72_0.19_45_/_12%)] transition-all duration-200 hover:bg-[oklch(0.72_0.19_45_/_25%)] hover:border-[oklch(0.72_0.19_45)]"
                        style={{ textDecoration: 'none' }}
                      >
                        <span style={{ fontSize: '14px' }}>📄</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 700, color: c.amber, letterSpacing: '0.2em' }}>
                          DOWNLOAD PROFILE PDF
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 2: CAPABILITIES ─── */}
            {activeTab === 'capabilities' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="border-b border-[oklch(0.93_0.005_250_/_10%)] pb-3">
                  <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', color: c.cyan, marginBottom: '0.25rem' }}>
                    END-TO-END MANUFACTURING EXCELLENCE
                  </div>
                  <h3 style={{ fontFamily: 'system-ui', fontSize: '1.5rem', fontWeight: 700, color: c.heading }}>
                    In-House Tooling & Part Production Capabilities
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      num: '01', color: c.cyan,
                      title: 'Injection Molds & Stamping Dies',
                      icon: '⬡',
                      desc: 'Precision molds up to 800T, casting dies, and progressive press tools. Built with 5-axis CNC, twin-head EDM, and 200T die spotting (98% blue matching).',
                      tags: ['UP TO 800T', 'HOT RUNNER', 'MULTI-CAVITY'],
                    },
                    {
                      num: '02', color: c.amber,
                      title: 'Molding & Over-Molding',
                      icon: '◈',
                      desc: 'Horizontal & vertical injection molding (30T–180T). Specialised in rotary vertical over-molding of stamped metal terminals into engineering plastic bodies.',
                      tags: ['INSERT MOLD', 'ROTARY', '2-SHOT'],
                    },
                    {
                      num: '03', color: c.green,
                      title: 'Ferrous & Non-Ferrous Stamping',
                      icon: '◇',
                      desc: 'High-speed progressive & compound stamping up to 100T for steel, copper, brass, and aluminium automotive components.',
                      tags: ['UP TO 100T', 'PROGRESSIVE', 'COMPOUND'],
                    },
                    {
                      num: '04', color: c.cyan,
                      title: 'PDC & GDC Die Casting',
                      icon: '△',
                      desc: 'Pressure Die Casting and Gravity Die Casting tooling engineered for aluminium and zinc alloys with near-net-shape accuracy.',
                      tags: ['ALUMINIUM', 'ZINC', 'NEAR-NET'],
                    },
                  ].map((cap) => (
                    <div
                      key={cap.num}
                      className="group relative overflow-hidden p-5 border bg-[oklch(0.12_0.01_250_/_70%)] transition-all duration-300 hover:-translate-y-1"
                      style={{ borderColor: `color-mix(in oklch, ${cap.color} 30%, transparent)` }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = cap.color }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = `color-mix(in oklch, ${cap.color} 30%, transparent)` }}
                    >
                      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: cap.color }} />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: cap.color }} />

                      <div className="flex items-center gap-2 mb-3">
                        <span style={{ fontSize: '1.25rem', color: cap.color, lineHeight: 1 }}>{cap.icon}</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: cap.color }}>{cap.num}</span>
                      </div>
                      <h4 style={{ fontFamily: 'system-ui', fontSize: '1rem', fontWeight: 700, color: c.heading, marginBottom: '0.5rem', lineHeight: 1.3 }}>
                        {cap.title}
                      </h4>
                      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, lineHeight: 1.6, marginBottom: '0.75rem' }}>
                        {cap.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {cap.tags.map((tag) => (
                          <span key={tag} style={{
                            fontFamily: 'monospace', fontSize: '8px', letterSpacing: '0.15em',
                            color: `color-mix(in oklch, ${cap.color} 80%, white)`,
                            border: `1px solid color-mix(in oklch, ${cap.color} 25%, transparent)`,
                            background: `color-mix(in oklch, ${cap.color} 8%, transparent)`,
                            padding: '0.15rem 0.4rem',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── TAB 3: QUALITY ─── */}
            {activeTab === 'quality' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col lg:flex-row gap-4 items-start justify-between border-b border-[oklch(0.93_0.005_250_/_10%)] pb-4">
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', color: c.green, marginBottom: '0.25rem' }}>
                      ZERO-DEFECT MINDSET · ISO 9001:2015 CERTIFIED
                    </div>
                    <h3 style={{ fontFamily: 'system-ui', fontSize: '1.5rem', fontWeight: 700, color: c.heading }}>
                      Quality Assurance & Metrology Standards
                    </h3>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[oklch(0.75_0.17_150_/_10%)] border border-[oklch(0.75_0.17_150_/_40%)] px-4 py-2.5 shrink-0">
                    <span style={{ fontSize: '1.25rem', color: c.green }}>✓</span>
                    <div>
                      <div style={{ fontFamily: 'monospace', fontSize: '11px', color: c.green, fontWeight: 700, letterSpacing: '0.2em' }}>
                        ISO 9001:2015
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '8px', color: c.body, letterSpacing: '0.1em' }}>
                        CERTIFIED QMS
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 90, suffix: '%', label: 'FIRST TRIAL OK', sub: 'First-Time-Right precision', color: c.green },
                    { value: 98, suffix: '%', label: 'BLUE MATCHING', sub: '200T Sprex Die Spotting', color: c.amber },
                    { value: 100, suffix: '%', label: 'FLASH-FREE', sub: 'Zero flash tooling design', color: c.cyan },
                    { value: 48200, suffix: '', label: 'CMM POINTS', sub: 'PPAP Level 3 verification', color: c.green },
                  ].map((metric) => (
                    <div key={metric.label} className="group relative p-4 bg-[oklch(0.12_0.01_250)] border border-[oklch(0.93_0.005_250_/_10%)] transition-all duration-200 hover:border-[oklch(0.93_0.005_250_/_25%)] hover:-translate-y-0.5">
                      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: metric.color }} />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: metric.color }} />
                      <div style={{
                        fontFamily: 'system-ui', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800, color: metric.color, lineHeight: 1,
                      }}>
                        <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: c.heading, fontWeight: 600, marginTop: '0.3rem', letterSpacing: '0.15em' }}>
                        {metric.label}
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '9px', color: c.body, marginTop: '0.15rem' }}>
                        {metric.sub}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quality Process Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { title: 'INCOMING QC', desc: 'Raw material certification (EN 10204 3.1), hardness verification, dimensional inspection before machining.', color: c.amber },
                    { title: 'IN-PROCESS QC', desc: 'CNC program verification, electrode inspection, EDM cavity checks, surface roughness (Ra) profiling at each stage.', color: c.cyan },
                    { title: 'FINAL INSPECTION', desc: 'Full CMM scan (48,200+ points), Hexagon 3D laser comparison to CAD, PPAP Level 3 report generation.', color: c.green },
                  ].map((step) => (
                    <div key={step.title} className="group p-3.5 border bg-[oklch(0.12_0.01_250_/_60%)] transition-all duration-200 hover:-translate-y-0.5" style={{ borderColor: `color-mix(in oklch, ${step.color} 25%, transparent)` }}>
                      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: step.color, fontWeight: 700, marginBottom: '0.3rem', letterSpacing: '0.15em' }}>
                        {step.title}
                      </div>
                      <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, lineHeight: 1.5 }}>
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* OEM PARTNER MARQUEE                                    */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="mt-8">
          <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.3em', color: c.body, marginBottom: '0.75rem', textAlign: 'center' }}>
            TRUSTED BY LEADING OEMs & TIER-1 SUPPLIERS
          </div>
          <div className="relative overflow-hidden border border-[oklch(0.93_0.005_250_/_8%)] bg-[oklch(0.13_0.012_250_/_50%)] py-3.5">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[oklch(0.11_0.01_250)] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[oklch(0.11_0.01_250)] to-transparent z-10 pointer-events-none" />

            {/* Scrolling track */}
            <div className="flex animate-marquee whitespace-nowrap">
              {[...OEM_PARTNERS, ...OEM_PARTNERS].map((partner, i) => (
                <div key={`${partner.name}-${i}`} className="inline-flex items-center gap-3 mx-8 shrink-0">
                  <div style={{
                    width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `1px solid ${c.borderStrong}`, background: 'white',
                    padding: '4px', overflow: 'hidden',
                  }}>
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'system-ui', fontSize: '12px', fontWeight: 700, color: c.heading, letterSpacing: '0.05em' }}>
                      {partner.name}
                    </div>
                    <div style={{ fontFamily: 'monospace', fontSize: '8px', color: c.body, letterSpacing: '0.15em' }}>
                      {partner.sector}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
