import { useEffect, useState } from 'react'
import { useThemeColors } from '@/hooks/useThemeColors'

export function HeroSection() {
  const c = useThemeColors()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleScrollToJourney = () => {
    const element = document.getElementById('manufacturing-journey')
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
      }}
    >
      {/* Scanlines overlay */}
      <div className="scanlines-bg pointer-events-none absolute inset-0" style={{ zIndex: 0 }} aria-hidden="true" />

      {/* Corner brackets — top left */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}>
        <div style={{ width: '3rem', height: '3rem', borderTop: `1px solid ${c.amberA60}`, borderLeft: `1px solid ${c.amberA60}` }} />
      </div>
      {/* Corner brackets — top right */}
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}>
        <div style={{ width: '3rem', height: '3rem', borderTop: `1px solid ${c.amberA60}`, borderRight: `1px solid ${c.amberA60}` }} />
      </div>
      {/* Corner brackets — bottom left */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}>
        <div style={{ width: '3rem', height: '3rem', borderBottom: `1px solid ${c.amberA60}`, borderLeft: `1px solid ${c.amberA60}` }} />
      </div>
      {/* Corner brackets — bottom right */}
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}>
        <div style={{ width: '3rem', height: '3rem', borderBottom: `1px solid ${c.amberA60}`, borderRight: `1px solid ${c.amberA60}` }} />
      </div>

      {/* Top label bar */}
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
          zIndex: 1,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="hud-blink" style={{ width: '6px', height: '6px', borderRadius: '9999px', background: c.amber, display: 'block' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.35em', color: c.body }}>
            ISO 9001:2015 CERTIFIED
          </span>
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.25em', color: c.body }}>
          PIMPRI CHINCHWAD, PUNE — INDIA
        </span>
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '1.5rem',
          padding: '2rem',
          maxWidth: '56rem',
          width: '100%',
        }}
      >
        {/* Badge */}
        <div
          className="landing-in landing-in-delay-1"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.375rem 1rem',
            border: `1px solid ${c.amberA40}`,
            background: c.amberA8,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: c.amber }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.4em', color: c.amber }}>
            OSSNAM ENGINEERING GROUP
          </span>
        </div>

        {/* Company name */}
        <div className="landing-in landing-in-delay-2">
          <div style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.6em', color: c.body, marginBottom: '0.5rem' }}>
            DAKSH
          </div>
          <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, color: c.heading }}>
            TOOLING
          </div>
          <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.2em', color: c.amber, marginTop: '0.375rem', textTransform: 'uppercase' }}>
            SOLUTIONS
          </div>
        </div>

        {/* Divider */}
        <div className="landing-in landing-in-delay-3" style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '24rem' }}>
          <div style={{ flex: 1, height: '1px', background: c.border }} />
          <div style={{ width: '6px', height: '6px', background: c.amber, transform: 'rotate(45deg)' }} />
          <div style={{ flex: 1, height: '1px', background: c.border }} />
        </div>

        {/* Headline */}
        <h1
          className="landing-in landing-in-delay-3"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(1.25rem, 3.5vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: c.heading,
            lineHeight: 1.3,
            maxWidth: '42rem',
          }}
        >
          Redefining Precision Engineering — <br />
          <span style={{ color: c.cyan, fontWeight: 400 }}>
            From Raw Steel to Finished Mould
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="landing-in landing-in-delay-4"
          style={{
            fontFamily: 'monospace',
            fontSize: '13px',
            lineHeight: 1.8,
            color: c.body,
            maxWidth: '36rem',
            letterSpacing: '0.02em',
          }}
        >
          Manufacturing and supply of all types of toolings, dies, injection moulds,
          sheet metal, and casting parts — with micron-level precision on every piece.
        </p>

        {/* Capability tags */}
        <div className="landing-in landing-in-delay-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {['CNC MACHINING', '5-AXIS MILLING', 'EDM', 'WIRE CUT', 'CMM INSPECTION', 'SURFACE GRINDING'].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'monospace',
                fontSize: '9px',
                letterSpacing: '0.25em',
                color: c.cyanA80,
                border: `1px solid ${c.cyanA20}`,
                padding: '0.25rem 0.625rem',
                background: c.cyanA6,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <button
          type="button"
          onClick={handleScrollToJourney}
          className="cta-pulse landing-in landing-in-delay-5"
          data-testid="hero-cta-button"
          style={{
            marginTop: '1rem',
            padding: '1rem 3rem',
            border: `1px solid ${c.amberA70}`,
            background: c.amberA12,
            color: c.amber,
            fontFamily: 'monospace',
            fontSize: '13px',
            letterSpacing: '0.35em',
            cursor: 'pointer',
            transition: 'background 0.25s ease, color 0.25s ease',
            textTransform: 'uppercase',
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
          Explore Our Process
        </button>

        {/* Hint text */}
        <p className="landing-in landing-in-delay-5" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.bodyLight }}>
          INTERACTIVE 3D DIGITAL MANUFACTURING EXPERIENCE
        </p>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
          borderTop: `1px solid ${c.borderDim}`,
          zIndex: 1,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease 0.4s',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.bodyLighter }}>
          PLOT NO. 54/26, D-II BLOCK
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.bodyLighter }}>
          GSTIN: 27ARDPG2718D1Z8
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.bodyLighter }}>
          dakshtooling@gmail.com
        </span>
      </div>
    </div>
  )
}
