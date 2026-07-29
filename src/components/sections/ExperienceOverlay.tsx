import { useState } from 'react'
import { LandingPage } from '@/components/landing/landing-page'
import { Experience } from '@/components/experience/experience'

interface ExperienceOverlayProps {
  onClose: () => void
}

export function ExperienceOverlay({ onClose }: ExperienceOverlayProps) {
  const [started, setStarted] = useState(false)
  const [landingGone, setLandingGone] = useState(false)

  const handleEnter = () => {
    setStarted(true)
    setTimeout(() => setLandingGone(true), 750)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
      {/* Close button — visible only after the landing screen fades */}
      {landingGone && (
        <button
          onClick={onClose}
          data-testid="experience-close-button"
          style={{
            position: 'fixed',
            top: '1.5rem',
            right: '1.5rem',
            zIndex: 110,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'oklch(0.72 0.19 45 / 0.15)',
            border: '1px solid oklch(0.72 0.19 45 / 0.4)',
            color: 'oklch(0.72 0.19 45)',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: '10px',
            letterSpacing: '0.3em',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'oklch(0.72 0.19 45 / 0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'oklch(0.72 0.19 45 / 0.15)'
          }}
        >
          EXIT EXPERIENCE
        </button>
      )}
      <Experience started={started} />
      {!landingGone && <LandingPage onEnter={handleEnter} />}
    </div>
  )
}
