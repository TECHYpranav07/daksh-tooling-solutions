import { useEffect, useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'
import { ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react'

export function HeroSection() {
  const c = useThemeColors()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: c.bg,
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingBottom: '4rem',
      }}
    >
      {/* Dynamic Ambient Background Glows */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(circle at 50% 38%, oklch(0.72 0.19 45 / 0.14) 0%, transparent 55%),
            radial-gradient(circle at 20% 80%, oklch(0.78 0.12 215 / 0.08) 0%, transparent 45%),
            radial-gradient(circle at 80% 20%, oklch(0.75 0.17 150 / 0.08) 0%, transparent 45%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Grid Pattern with Scanlines */}
      <div
        className="scanlines-bg pointer-events-none absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.93 0.005 250 / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.93 0.005 250 / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Futuristic Reticle Corner Brackets */}
      <div style={{ position: 'absolute', top: '5rem', left: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }} className="hidden sm:block">
        <div style={{ width: '2.5rem', height: '2.5rem', borderTop: `2px solid ${c.amberA60}`, borderLeft: `2px solid ${c.amberA60}` }} />
      </div>
      <div style={{ position: 'absolute', top: '5rem', right: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }} className="hidden sm:block">
        <div style={{ width: '2.5rem', height: '2.5rem', borderTop: `2px solid ${c.amberA60}`, borderRight: `2px solid ${c.amberA60}` }} />
      </div>
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }} className="hidden sm:block">
        <div style={{ width: '2.5rem', height: '2.5rem', borderBottom: `2px solid ${c.amberA60}`, borderLeft: `2px solid ${c.amberA60}` }} />
      </div>
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }} className="hidden sm:block">
        <div style={{ width: '2.5rem', height: '2.5rem', borderBottom: `2px solid ${c.amberA60}`, borderRight: `2px solid ${c.amberA60}` }} />
      </div>

      {/* Top Floating Status Ticker Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 2rem',
          borderBottom: `1px solid ${c.borderDim}`,
          zIndex: 10,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
          flexWrap: 'wrap',
          gap: '1rem',
          background: 'oklch(0.11 0.01 250 / 0.6)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="hud-blink" style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.green, display: 'block', boxShadow: `0 0 8px ${c.green}` }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.35em', color: c.heading, fontWeight: 600 }}>
            ISO 9001:2015 CERTIFIED TOOL ROOM
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.body }}>
          <span>EST. APRIL 2019</span>
          <span>•</span>
          <span>PIMPRI CHINCHWAD, PUNE</span>
          <span>•</span>
          <span style={{ color: c.amber }}>250+ MOLDS DELIVERED</span>
        </div>
      </div>

      {/* Main Hero Center Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.75rem',
          padding: '2rem 1.5rem',
          maxWidth: '64rem',
          width: '100%',
        }}
      >
        {/* Top Status Pill */}
        <div
          className="landing-in landing-in-delay-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            padding: '0.45rem 1.25rem',
            border: `1px solid ${c.amberA40}`,
            background: c.amberA8,
            backdropFilter: 'blur(8px)',
            boxShadow: `0 0 20px ${c.amberA8}`,
          }}
        >
          <Cpu size={14} style={{ color: c.amber }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.35em', color: c.amber, fontWeight: 700 }}>
            OSSNAM ENGINEERING GROUP
          </span>
        </div>

        {/* Master Headline Branding */}
        <div className="landing-in landing-in-delay-2" style={{ width: '100%' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.7em', color: c.body, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
            HIGH-PRECISION TOOLING & MOLDING HUB
          </div>

          <h1
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(2.75rem, 8vw, 6.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, oklch(0.85 0.01 250) 60%, oklch(0.65 0.02 250) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
              }}
            >
              DAKSH TOOLING
            </span>
            <span
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3.25rem)',
                fontWeight: 700,
                letterSpacing: '0.25em',
                background: `linear-gradient(135deg, ${c.amber}, ${c.cyan})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
                marginTop: '0.35rem',
              }}
            >
              SOLUTIONS
            </span>
          </h1>
        </div>

        {/* Sub-headline / Core Promise */}
        <p
          className="landing-in landing-in-delay-3"
          style={{
            fontFamily: 'monospace',
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            lineHeight: 1.8,
            color: c.body,
            maxWidth: '44rem',
            letterSpacing: '0.02em',
          }}
        >
          Single-source high-precision manufacturer for <span style={{ color: c.heading, fontWeight: 600 }}>Injection Molds, Stamping Dies, Pressed & Over-Molded Parts</span> — engineered to micron tolerances for Automotive, Medical & Engineering OEMs.
        </p>

        {/* Capability Pill Bar */}
        <div className="landing-in landing-in-delay-4 flex flex-wrap justify-center gap-2 max-w-3xl">
          {[
            '5-AXIS CNC MILLING',
            '200T SPOTTING (98% MATCH)',
            'ROTARY VERTICAL OVER-MOLDING',
            'PROGRESSIVE STAMPING',
            'CMM & 3D LASER SCAN',
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: c.cyanA80,
                border: `1px solid ${c.cyanA20}`,
                padding: '0.35rem 0.75rem',
                background: c.cyanA6,
                backdropFilter: 'blur(4px)',
              }}
            >
              ◆ {tag}
            </span>
          ))}
        </div>

        {/* CTA Buttons Row */}
        <div className="landing-in landing-in-delay-5 flex flex-col sm:flex-row items-center gap-4 mt-2">
          <button
            type="button"
            onClick={() => handleScrollToSection('manufacturing-journey')}
            className="cta-pulse"
            data-testid="hero-cta-button"
            style={{
              padding: '1.1rem 2.5rem',
              border: `1px solid ${c.amberA70}`,
              background: c.amberA12,
              color: c.amber,
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.3em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = c.amber
              e.currentTarget.style.color = c.btnHoverText
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = c.amberA12
              e.currentTarget.style.color = c.amber
            }}
          >
            <span>EXPLORE PROCESS</span>
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => handleScrollToSection('company-overview')}
            style={{
              padding: '1.1rem 2.25rem',
              border: `1px solid ${c.border}`,
              background: c.bgCard,
              color: c.heading,
              fontFamily: 'monospace',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.2em',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              textTransform: 'uppercase',
              backdropFilter: 'blur(8px)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = c.cyan
              e.currentTarget.style.color = c.cyan
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = c.border
              e.currentTarget.style.color = c.heading
            }}
          >
            <Layers size={15} />
            <span>COMMAND HUB</span>
          </button>
        </div>

        {/* Live Metrics Grid inside Hero */}
        <div className="landing-in landing-in-delay-5 grid grid-cols-2 md:grid-cols-4 gap-3 w-full mt-6 pt-6 border-t border-[oklch(0.93_0.005_250_/_10%)]">
          {[
            { metric: '90%', label: 'FIRST-TRIAL APPROVAL', sub: 'First-time-right accuracy' },
            { metric: '2 Lakhs+', label: 'SHOTS TOOL LIFE', sub: 'Guaranteed durability' },
            { metric: '250+', label: 'MOLDS DELIVERED', sub: 'Last year production' },
            { metric: '600+', label: 'ZERO INCIDENT DAYS', sub: 'Safety excellence' },
          ].map((item) => (
            <div key={item.label} className="p-3 border border-[oklch(0.93_0.005_250_/_8%)] bg-[oklch(0.14_0.012_250_/_50%)] backdrop-blur-sm text-center">
              <div style={{ fontFamily: 'system-ui', fontSize: '1.35rem', fontWeight: 800, color: c.amber, lineHeight: 1 }}>
                {item.metric}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.15em', color: c.heading, fontWeight: 600, marginTop: '0.25rem' }}>
                {item.label}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '8px', color: c.body, marginTop: '0.1rem' }}>
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
