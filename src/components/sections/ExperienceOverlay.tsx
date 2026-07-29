import { Experience } from '@/components/experience/experience'

interface ExperienceOverlayProps {
  onClose: () => void
}

export function ExperienceOverlay({ onClose }: ExperienceOverlayProps) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: '#0b0d12' }}>
      {/* Exit Button */}
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
          border: '1px solid oklch(0.72 0.19 45 / 0.5)',
          color: 'oklch(0.72 0.19 45)',
          padding: '0.6rem 1.25rem',
          cursor: 'pointer',
          fontFamily: 'monospace',
          fontSize: '11px',
          letterSpacing: '0.3em',
          fontWeight: 700,
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'oklch(0.72 0.19 45)'
          e.currentTarget.style.color = 'oklch(0.13 0.01 250)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'oklch(0.72 0.19 45 / 0.15)'
          e.currentTarget.style.color = 'oklch(0.72 0.19 45)'
        }}
      >
        EXIT EXPERIENCE ✕
      </button>

      <Experience started={true} />
    </div>
  )
}
