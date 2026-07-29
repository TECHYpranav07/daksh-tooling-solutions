import { useEffect, useRef, useState } from 'react'
import { type Stage } from '@/lib/stages'

function ImageWithFallback({ src, alt, machine, code }: { src: string; alt: string; machine: string; code: string }) {
  const [errored, setErrored] = useState(false)

  // Reset when src changes (different stage opened)
  useEffect(() => { setErrored(false) }, [src])

  if (errored) {
    return (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.875rem', padding: '2rem',
        background: 'linear-gradient(135deg, oklch(0.16 0.015 250) 0%, oklch(0.20 0.018 250) 100%)',
      }}>
        {/* Gear icon */}
        <svg viewBox="0 0 48 48" style={{ width: '3rem', height: '3rem', opacity: 0.35 }} fill="none" stroke="oklch(0.78 0.12 215)" strokeWidth="2" aria-hidden="true">
          <circle cx="24" cy="24" r="7" />
          <path d="M24 4v5M24 39v5M4 24h5M39 24h5M8.3 8.3l3.5 3.5M36.2 36.2l3.5 3.5M8.3 39.7l3.5-3.5M36.2 11.8l3.5-3.5" />
        </svg>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.3em', color: 'oklch(0.78 0.12 215)', marginBottom: '0.3rem' }}>
            {code}
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'oklch(0.55 0.01 250)' }}>
            {machine}
          </div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      onError={() => setErrored(true)}
    />
  )
}

interface StageModalProps {
  stage: Stage | null
  onClose: () => void
}

const BULLET_ICON = (
  <svg
    viewBox="0 0 12 12"
    style={{ width: '0.65rem', height: '0.65rem', flexShrink: 0, marginTop: '3px' }}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    aria-hidden="true"
  >
    <polyline points="2,6 5,9 10,3" />
  </svg>
)

export function StageModal({ stage, onClose }: StageModalProps) {
  // mounted = in the DOM; visible = CSS classes that drive the transition
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const prevStageRef = useRef<Stage | null>(null)

  useEffect(() => {
    if (stage) {
      prevStageRef.current = stage
      setMounted(true)
      // one-tick delay so the browser registers the initial (hidden) state first
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 350)
      return () => clearTimeout(t)
    }
  }, [stage])

  // ESC key
  useEffect(() => {
    if (!stage) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [stage, onClose])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = stage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [stage])

  if (!mounted) return null

  const s = stage ?? prevStageRef.current!

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'oklch(0.08 0.01 250 / 0.75)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          transition: 'opacity 0.3s ease',
          opacity: visible ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${s.title} — Stage ${s.step} details`}
        style={{
          position: 'relative',
          zIndex: 1,
          width: 'min(520px, 100vw)',
          display: 'flex',
          flexDirection: 'column',
          background: 'oklch(0.14 0.012 250)',
          borderLeft: '1px solid oklch(0.93 0.005 250 / 0.1)',
          overflowY: 'auto',
          transition: 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease',
          transform: visible ? 'translateX(0)' : 'translateX(100%)',
          opacity: visible ? 1 : 0,
        }}
      >
        {/* ── Sticky Header ── */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '1rem',
            padding: '1.5rem 1.75rem 1.25rem',
            background: 'oklch(0.14 0.012 250)',
            borderBottom: '1px solid oklch(0.93 0.005 250 / 0.08)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.45em', color: 'oklch(0.72 0.19 45)', marginBottom: '0.35rem' }}>
              STEP {String(s.step).padStart(2, '0')} / 10
            </div>
            <h2 style={{ fontFamily: 'system-ui, sans-serif', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'oklch(0.93 0.005 250)', margin: 0 }}>
              {s.title}
            </h2>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.25em', color: 'oklch(0.78 0.12 215)', marginTop: '0.25rem' }}>
              {s.operation}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.25rem',
              height: '2.25rem',
              border: '1px solid oklch(0.93 0.005 250 / 0.15)',
              background: 'oklch(0.2 0.012 250)',
              color: 'oklch(0.62 0.01 250)',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'background 0.15s, color 0.15s',
              marginTop: '0.25rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'oklch(0.72 0.19 45 / 0.15)'
              e.currentTarget.style.color = 'oklch(0.72 0.19 45)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'oklch(0.2 0.012 250)'
              e.currentTarget.style.color = 'oklch(0.62 0.01 250)'
            }}
            aria-label="Close"
          >
            <svg viewBox="0 0 20 20" style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        {/* ── Image ── */}
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0, background: 'oklch(0.18 0.012 250)' }}>
          <ImageWithFallback
            src={s.imageUrl}
            alt={`${s.title} — industrial manufacturing`}
            machine={s.machine}
            code={s.code}
          />
          {/* bottom-fade gradient */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, oklch(0.14 0.012 250) 0%, transparent 50%)',
              pointerEvents: 'none',
            }}
          />
          {/* badges */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.35em', color: 'oklch(0.72 0.19 45)', border: '1px solid oklch(0.72 0.19 45 / 0.5)', background: 'oklch(0.14 0.012 250 / 0.8)', padding: '0.25rem 0.625rem', backdropFilter: 'blur(8px)' }}>
              {s.code}
            </span>
            <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'oklch(0.78 0.12 215)', border: '1px solid oklch(0.78 0.12 215 / 0.3)', background: 'oklch(0.14 0.012 250 / 0.8)', padding: '0.25rem 0.625rem', backdropFilter: 'blur(8px)' }}>
              {s.machine}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: '1.5rem 1.75rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Description */}
          <p style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.9375rem', lineHeight: 1.7, color: 'oklch(0.78 0.005 250)', margin: 0 }}>
            {s.description}
          </p>

          {/* Specs grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {s.specs.map((spec) => (
              <div
                key={spec.label}
                style={{ padding: '0.625rem 0.75rem', border: '1px solid oklch(0.93 0.005 250 / 0.08)', background: 'oklch(0.18 0.012 250)' }}
              >
                <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'oklch(0.62 0.01 250)', marginBottom: '0.25rem' }}>
                  {spec.label}
                </div>
                <div style={{ fontFamily: 'monospace', fontSize: '12px', color: 'oklch(0.78 0.12 215)', fontWeight: 600 }}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'oklch(0.93 0.005 250 / 0.08)' }} />

          {/* Technical details */}
          <div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.35em', color: 'oklch(0.72 0.19 45)', marginBottom: '0.875rem' }}>
              TECHNICAL BREAKDOWN
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {s.details.map((detail, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <span style={{ color: 'oklch(0.72 0.19 45)', flexShrink: 0, marginTop: '2px' }}>{BULLET_ICON}</span>
                  <span style={{ fontFamily: 'system-ui, sans-serif', fontSize: '0.875rem', lineHeight: 1.65, color: 'oklch(0.72 0.005 250)' }}>
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hint */}
          <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: 'oklch(0.62 0.01 250 / 0.45)', textAlign: 'center', paddingTop: '0.25rem' }}>
            ESC OR CLICK OUTSIDE TO CLOSE
          </div>
        </div>
      </aside>
    </div>
  )
}
