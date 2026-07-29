import { useEffect, useState } from 'react'
import { STAGES, STAGE_COUNT } from '@/lib/stages'

function TypedText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    setShown('')
    let raf = 0
    const startedAt = performance.now()
    const tick = (now: number) => {
      const chars = Math.min(Math.floor((now - startedAt) / speed), text.length)
      setShown(text.slice(0, chars))
      if (chars < text.length) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, speed])
  return <span>{shown}</span>
}

function RadarIcon() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="20" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="20" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <g className="radar-spin">
        <line x1="20" y1="20" x2="20" y2="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 20 L20 2 A18 18 0 0 1 33 8 Z" fill="currentColor" opacity="0.15" />
      </g>
    </svg>
  )
}

interface HudProps {
  stageIndex: number
  percent: number
  visible: boolean
  introVisible: boolean
  muted: boolean
  narrationMuted: boolean
  onToggleAmbience: () => void
  onToggleNarration: () => void
  onNextStage: () => void
  onPrevStage: () => void
  onStageClick: (index: number) => void
}

export function Hud({ stageIndex, percent, visible, introVisible, muted, narrationMuted, onToggleAmbience, onToggleNarration, onNextStage, onPrevStage, onStageClick }: HudProps) {
  const stage = STAGES[stageIndex]
  const isComplete = stageIndex === 9 && percent > 97

  return (
    <div className={`pointer-events-none fixed inset-0 z-30 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      {/* top bar */}
      <header className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 md:px-8 md:py-5">
        <div className="flex items-center gap-3">
          <span className="hud-blink h-2 w-2 rounded-full bg-[var(--primary)]" aria-hidden="true" />
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.35em', color: 'oklch(0.93 0.005 250 / 0.8)' }}>
            DAKSH TOOLING — PRECISION FLOW v1.0
          </span>
        </div>
        <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.25em', color: 'oklch(0.62 0.01 250)' }}>
          DIGITAL TWIN <span style={{ color: 'oklch(0.78 0.12 215)' }}>ACTIVE</span>
        </div>
      </header>

      {/* intro title */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center transition-opacity duration-700 ${introVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.5em', color: 'oklch(0.72 0.19 45)' }}>
          DAKSH TOOLING — PRECISION FLOW v1.0
        </div>
        <h1 style={{ fontFamily: 'system-ui, sans-serif', fontSize: 'clamp(2rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.02em', color: 'oklch(0.93 0.005 250)', maxWidth: '48rem' }}>
          THE JOURNEY OF A WORKPIECE
        </h1>
        <p style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.3em', color: 'oklch(0.62 0.01 250)' }}>
          FROM RAW STEEL TO PRECISION ENGINEERING
        </p>
        <div className="mt-10 flex flex-col items-center gap-2" style={{ color: 'oklch(0.62 0.01 250)' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em' }}>SCROLL TO BEGIN</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>

      {/* left: stage info */}
      <div
        className={`absolute left-4 top-1/2 hidden w-72 -translate-y-1/2 transition-opacity duration-500 md:left-8 md:block ${introVisible ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="hud-flicker" style={{ borderLeft: '2px solid oklch(0.72 0.19 45)', paddingLeft: '1.25rem' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.4em', color: 'oklch(0.72 0.19 45)' }}>{stage.code}</div>
          <h2 style={{ marginTop: '0.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '1.875rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'oklch(0.93 0.005 250)' }}>{stage.title}</h2>
          <p style={{ marginTop: '1rem', fontFamily: 'monospace', fontSize: '11px', lineHeight: 1.7, color: 'oklch(0.62 0.01 250)' }}>
            {stage.description}
          </p>
        </div>
      </div>

      {/* right: machine scanner HUD */}
      <div
        className={`absolute right-4 top-1/2 hidden w-72 -translate-y-1/2 transition-opacity duration-500 md:right-8 md:block ${introVisible ? 'opacity-0' : 'opacity-100'}`}
      >
        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid oklch(0.78 0.12 215 / 0.3)', background: 'oklch(0.17 0.012 250 / 65%)', padding: '1.25rem', backdropFilter: 'blur(12px)' }}>
          <div className="hud-scanline pointer-events-none absolute inset-x-0 top-0 h-8" style={{ background: 'linear-gradient(to bottom, transparent, oklch(0.78 0.12 215 / 0.1), transparent)' }} aria-hidden="true" />
          <span className="absolute left-0 top-0 h-3 w-3" style={{ borderLeft: '2px solid oklch(0.78 0.12 215)', borderTop: '2px solid oklch(0.78 0.12 215)' }} aria-hidden="true" />
          <span className="absolute right-0 top-0 h-3 w-3" style={{ borderRight: '2px solid oklch(0.78 0.12 215)', borderTop: '2px solid oklch(0.78 0.12 215)' }} aria-hidden="true" />
          <span className="absolute bottom-0 left-0 h-3 w-3" style={{ borderLeft: '2px solid oklch(0.78 0.12 215)', borderBottom: '2px solid oklch(0.78 0.12 215)' }} aria-hidden="true" />
          <span className="absolute bottom-0 right-0 h-3 w-3" style={{ borderRight: '2px solid oklch(0.78 0.12 215)', borderBottom: '2px solid oklch(0.78 0.12 215)' }} aria-hidden="true" />

          <div className="flex items-center justify-between" style={{ color: 'oklch(0.78 0.12 215)' }}>
            <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.35em' }}>MACHINE DETECTED</span>
            <RadarIcon />
          </div>
          <div style={{ marginTop: '0.75rem', minHeight: '2.5rem', fontFamily: 'system-ui, sans-serif', fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em', color: 'oklch(0.93 0.005 250)' }}>
            <TypedText text={stage.machine} />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${isComplete ? '' : 'hud-blink'}`} style={{ background: 'oklch(0.75 0.17 150)' }} aria-hidden="true" />
            <span style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.25em', color: 'oklch(0.75 0.17 150)' }}>
              STATUS: {isComplete ? 'COMPLETE' : 'ACTIVE'}
            </span>
          </div>
          <div style={{ marginTop: '0.25rem', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: 'oklch(0.62 0.01 250)' }}>
            OPERATION: <span style={{ color: 'oklch(0.93 0.005 250)' }}>{stage.operation}</span>
          </div>

          <dl className="mt-4 flex flex-col gap-2" style={{ borderTop: '1px solid oklch(0.93 0.005 250 / 0.12)', paddingTop: '1rem' }}>
            {stage.specs.map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-3">
                <dt style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', color: 'oklch(0.62 0.01 250)' }}>{s.label}</dt>
                <dd style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '11px', color: 'oklch(0.78 0.12 215)' }}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* manufacturing complete banner */}
      <div
        className={`absolute inset-x-0 top-20 flex justify-center transition-all duration-700 ${isComplete ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
      >
        <div style={{ border: '1px solid oklch(0.75 0.17 150 / 0.5)', background: 'oklch(0.75 0.17 150 / 0.1)', padding: '0.75rem 2rem', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.4em', color: 'oklch(0.75 0.17 150)', backdropFilter: 'blur(12px)' }}>
          MANUFACTURING COMPLETE — DAKSH TOOLING
        </div>
      </div>

      {/* mobile stage strip */}
      <div className={`absolute inset-x-4 top-16 md:hidden ${introVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <div style={{ borderLeft: '2px solid oklch(0.72 0.19 45)', background: 'oklch(0.17 0.012 250 / 65%)', padding: '0.75rem', backdropFilter: 'blur(12px)' }}>
          <div style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.3em', color: 'oklch(0.72 0.19 45)' }}>{stage.code}</div>
          <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: '1.125rem', fontWeight: 700, color: 'oklch(0.93 0.005 250)' }}>{stage.title}</div>
          <div style={{ marginTop: '0.25rem', fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.62 0.01 250)' }}>{stage.machine}</div>
        </div>
      </div>

      {/* bottom timeline */}
      <footer
        className={`absolute inset-x-0 bottom-0 px-4 pb-4 transition-opacity duration-500 md:px-8 md:pb-6 ${introVisible ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="mb-2 flex items-center justify-between" style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.25em', color: 'oklch(0.62 0.01 250)' }}>
          <span>
            MANUFACTURING TIMELINE — <span style={{ color: 'oklch(0.93 0.005 250)' }}>{stage.shortTitle}</span>
          </span>
          <span style={{ color: 'oklch(0.72 0.19 45)' }}>{percent.toFixed(0)}% COMPLETE</span>
        </div>
        <div className="pointer-events-auto flex items-center gap-1.5">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onStageClick(i)}
              title={`${s.code} — ${s.title}`}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                padding: '0.375rem 0',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: '0.375rem',
              }}
            >
              {/* bar */}
              <div
                style={{
                  height: '4px',
                  borderRadius: '9999px',
                  transition: 'background-color 0.3s, transform 0.15s',
                  background: i < stageIndex
                    ? 'oklch(0.72 0.19 45)'
                    : i === stageIndex
                    ? 'oklch(0.78 0.12 215)'
                    : 'oklch(0.22 0.012 250)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scaleY(2)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scaleY(1)' }}
              />
              {/* label */}
              <div
                className="hidden text-center md:block"
                style={{
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                  color: i === stageIndex
                    ? 'oklch(0.78 0.12 215)'
                    : i < stageIndex
                    ? 'oklch(0.72 0.19 45 / 0.7)'
                    : 'oklch(0.62 0.01 250 / 0.5)',
                }}
              >
                {s.shortTitle}
              </div>
            </button>
          ))}
        </div>
      </footer>

      {/* audio controls — pointer-events-auto so they're clickable */}
      <div className="pointer-events-auto absolute bottom-20 right-4 flex flex-col gap-2 md:bottom-24 md:right-8">
        {/* Narration toggle */}
        <button
          type="button"
          onClick={onToggleNarration}
          style={{
            display: 'flex',
            height: '2.25rem',
            width: '2.25rem',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid oklch(0.93 0.005 250 / 0.12)',
            background: narrationMuted ? 'oklch(0.72 0.19 45 / 0.15)' : 'oklch(0.17 0.012 250 / 65%)',
            color: narrationMuted ? 'oklch(0.72 0.19 45)' : 'oklch(0.62 0.01 250)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'color 0.2s, background 0.2s',
            fontFamily: 'monospace',
          }}
          title={narrationMuted ? 'Enable voiceover' : 'Mute voiceover'}
          aria-label={narrationMuted ? 'Enable voiceover narration' : 'Mute voiceover narration'}
        >
          {narrationMuted ? (
            <svg viewBox="0 0 24 24" style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 9v6l-4-3H2V9h3L9 6v3z" />
              <line x1="15" y1="9" x2="20" y2="14" />
              <line x1="20" y1="9" x2="15" y2="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 9v6l-4-3H2V9h3L9 6v3z" />
              <path d="M13 8.5a5.5 5.5 0 0 1 0 7" />
              <path d="M16.5 6a9 9 0 0 1 0 12" />
            </svg>
          )}
        </button>

        {/* Ambience toggle */}
        <button
          type="button"
          onClick={onToggleAmbience}
          style={{
            display: 'flex',
            height: '2.25rem',
            width: '2.25rem',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid oklch(0.93 0.005 250 / 0.12)',
            background: 'oklch(0.17 0.012 250 / 65%)',
            color: 'oklch(0.62 0.01 250)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'color 0.2s',
            fontFamily: 'monospace',
          }}
          title={muted ? 'Unmute ambience' : 'Mute ambience'}
          aria-label={muted ? 'Unmute ambience' : 'Mute ambience'}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5zM22 9l-6 6M16 9l6 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Stage navigation (prev / next) ── centered bottom, above timeline */}
      <div
        className={`pointer-events-auto absolute bottom-24 left-1/2 -translate-x-1/2 transition-opacity duration-500 md:bottom-28 ${introVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
      >
        {/* Prev */}
        <button
          type="button"
          onClick={onPrevStage}
          disabled={stageIndex === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 1rem',
            border: '1px solid oklch(0.93 0.005 250 / 0.15)',
            background: 'oklch(0.17 0.012 250 / 70%)',
            color: stageIndex === 0 ? 'oklch(0.93 0.005 250 / 0.2)' : 'oklch(0.62 0.01 250)',
            backdropFilter: 'blur(12px)',
            cursor: stageIndex === 0 ? 'not-allowed' : 'pointer',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.25em',
            transition: 'color 0.2s, background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (stageIndex === 0) return
            e.currentTarget.style.borderColor = 'oklch(0.72 0.19 45 / 0.6)'
            e.currentTarget.style.color = 'oklch(0.72 0.19 45)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'oklch(0.93 0.005 250 / 0.15)'
            e.currentTarget.style.color = stageIndex === 0 ? 'oklch(0.93 0.005 250 / 0.2)' : 'oklch(0.62 0.01 250)'
          }}
          aria-label="Previous stage"
        >
          <svg viewBox="0 0 16 16" style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M10 3L5 8l5 5" />
          </svg>
          PREV
        </button>

        {/* Stage counter pill */}
        <div
          style={{
            padding: '0.5rem 0.875rem',
            border: '1px solid oklch(0.78 0.12 215 / 0.3)',
            background: 'oklch(0.17 0.012 250 / 70%)',
            backdropFilter: 'blur(12px)',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.25em',
            color: 'oklch(0.78 0.12 215)',
            whiteSpace: 'nowrap',
          }}
        >
          {String(stageIndex + 1).padStart(2, '0')} / {String(STAGE_COUNT).padStart(2, '0')}
        </div>

        {/* Next */}
        <button
          type="button"
          onClick={onNextStage}
          disabled={stageIndex === STAGE_COUNT - 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 1rem',
            border: '1px solid oklch(0.93 0.005 250 / 0.15)',
            background: 'oklch(0.17 0.012 250 / 70%)',
            color: stageIndex === STAGE_COUNT - 1 ? 'oklch(0.93 0.005 250 / 0.2)' : 'oklch(0.72 0.19 45)',
            backdropFilter: 'blur(12px)',
            cursor: stageIndex === STAGE_COUNT - 1 ? 'not-allowed' : 'pointer',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.25em',
            transition: 'color 0.2s, background 0.2s, border-color 0.2s',
            borderColor: stageIndex === STAGE_COUNT - 1 ? 'oklch(0.93 0.005 250 / 0.15)' : 'oklch(0.72 0.19 45 / 0.4)',
          }}
          onMouseEnter={(e) => {
            if (stageIndex === STAGE_COUNT - 1) return
            e.currentTarget.style.background = 'oklch(0.72 0.19 45 / 0.12)'
            e.currentTarget.style.borderColor = 'oklch(0.72 0.19 45 / 0.8)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'oklch(0.17 0.012 250 / 70%)'
            e.currentTarget.style.borderColor = stageIndex === STAGE_COUNT - 1
              ? 'oklch(0.93 0.005 250 / 0.15)'
              : 'oklch(0.72 0.19 45 / 0.4)'
          }}
          aria-label="Next stage"
        >
          NEXT
          <svg viewBox="0 0 16 16" style={{ width: '0.75rem', height: '0.75rem' }} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
