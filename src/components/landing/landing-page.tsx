import { useEffect, useState } from 'react'

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  // Mount animation trigger
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleEnter = () => {
    setExiting(true)
    setTimeout(() => {
      setVisible(false)
      onEnter()
    }, 700)
  }

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'oklch(0.11 0.01 250 / 0.96)',
        backdropFilter: 'blur(2px)',
        transition: 'opacity 0.7s ease',
        opacity: exiting ? 0 : 1,
        overflow: 'hidden',
      }}
    >
      {/* Scanlines overlay */}
      <div className="scanlines-bg pointer-events-none absolute inset-0" style={{ zIndex: 0 }} aria-hidden="true" />

      {/* Corner brackets — top left */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}>
        <div style={{ width: '3rem', height: '3rem', borderTop: '1px solid oklch(0.72 0.19 45 / 0.6)', borderLeft: '1px solid oklch(0.72 0.19 45 / 0.6)' }} />
      </div>
      {/* Corner brackets — top right */}
      <div style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}>
        <div style={{ width: '3rem', height: '3rem', borderTop: '1px solid oklch(0.72 0.19 45 / 0.6)', borderRight: '1px solid oklch(0.72 0.19 45 / 0.6)' }} />
      </div>
      {/* Corner brackets — bottom left */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}>
        <div style={{ width: '3rem', height: '3rem', borderBottom: '1px solid oklch(0.72 0.19 45 / 0.6)', borderLeft: '1px solid oklch(0.72 0.19 45 / 0.6)' }} />
      </div>
      {/* Corner brackets — bottom right */}
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 1, opacity: mounted ? 1 : 0, transition: 'opacity 0.6s ease 0.1s' }}>
        <div style={{ width: '3rem', height: '3rem', borderBottom: '1px solid oklch(0.72 0.19 45 / 0.6)', borderRight: '1px solid oklch(0.72 0.19 45 / 0.6)' }} />
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
          borderBottom: '1px solid oklch(0.93 0.005 250 / 0.06)',
          zIndex: 1,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease 0.2s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="hud-blink" style={{ width: '6px', height: '6px', borderRadius: '9999px', background: 'oklch(0.72 0.19 45)', display: 'block' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.35em', color: 'oklch(0.62 0.01 250)' }}>
            ISO 9001:2015 CERTIFIED
          </span>
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.25em', color: 'oklch(0.62 0.01 250)' }}>
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
            border: '1px solid oklch(0.72 0.19 45 / 0.4)',
            background: 'oklch(0.72 0.19 45 / 0.08)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: 'oklch(0.72 0.19 45)' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.4em', color: 'oklch(0.72 0.19 45)' }}>
            OSSNAM ENGINEERING GROUP
          </span>
        </div>

        {/* Company name */}
        <div className="landing-in landing-in-delay-2">
          <div style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.6em', color: 'oklch(0.62 0.01 250)', marginBottom: '0.5rem' }}>
            DAKSH
          </div>
          <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'oklch(0.93 0.005 250)' }}>
            TOOLING
          </div>
          <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: 300, letterSpacing: '0.2em', color: 'oklch(0.72 0.19 45)', marginTop: '0.375rem', textTransform: 'uppercase' }}>
            SOLUTIONS
          </div>
        </div>

        {/* Divider */}
        <div className="landing-in landing-in-delay-3" style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', maxWidth: '24rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'oklch(0.93 0.005 250 / 0.12)' }} />
          <div style={{ width: '6px', height: '6px', background: 'oklch(0.72 0.19 45)', transform: 'rotate(45deg)' }} />
          <div style={{ flex: 1, height: '1px', background: 'oklch(0.93 0.005 250 / 0.12)' }} />
        </div>

        {/* Headline */}
        <h1
          className="landing-in landing-in-delay-3"
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 'clamp(1.25rem, 3.5vw, 2rem)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            color: 'oklch(0.93 0.005 250)',
            lineHeight: 1.3,
            maxWidth: '42rem',
          }}
        >
          Redefining Precision Engineering — <br />
          <span style={{ color: 'oklch(0.78 0.12 215)', fontWeight: 400 }}>
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
            color: 'oklch(0.62 0.01 250)',
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
                color: 'oklch(0.78 0.12 215 / 0.8)',
                border: '1px solid oklch(0.78 0.12 215 / 0.2)',
                padding: '0.25rem 0.625rem',
                background: 'oklch(0.78 0.12 215 / 0.06)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA button */}
        <button
          type="button"
          onClick={handleEnter}
          className="cta-pulse landing-in landing-in-delay-5"
          style={{
            marginTop: '1rem',
            padding: '1rem 3rem',
            border: '1px solid oklch(0.72 0.19 45 / 0.7)',
            background: 'oklch(0.72 0.19 45 / 0.12)',
            color: 'oklch(0.72 0.19 45)',
            fontFamily: 'monospace',
            fontSize: '13px',
            letterSpacing: '0.35em',
            cursor: 'pointer',
            transition: 'background 0.25s ease, color 0.25s ease',
            textTransform: 'uppercase',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'oklch(0.72 0.19 45)'
            e.currentTarget.style.color = 'oklch(0.13 0.01 250)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'oklch(0.72 0.19 45 / 0.12)'
            e.currentTarget.style.color = 'oklch(0.72 0.19 45)'
          }}
        >
          Experience Precision Flow
        </button>

        {/* Hint text */}
        <p className="landing-in landing-in-delay-5" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'oklch(0.62 0.01 250 / 0.6)' }}>
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
          borderTop: '1px solid oklch(0.93 0.005 250 / 0.06)',
          zIndex: 1,
          opacity: mounted ? 1 : 0,
          transition: 'opacity 0.6s ease 0.4s',
        }}
      >
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'oklch(0.62 0.01 250 / 0.5)' }}>
          PLOT NO. 54/26, D-II BLOCK
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'oklch(0.62 0.01 250 / 0.5)' }}>
          GSTIN: 27ARDPG2718D1Z8
        </span>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'oklch(0.62 0.01 250 / 0.5)' }}>
          dakshtooling@gmail.com
        </span>
      </div>
    </div>
  )
}
