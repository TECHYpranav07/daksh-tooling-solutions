import { Experience } from '@/components/experience/experience'
import { useThemeColors } from '@/hooks/useThemeColors'

interface ExperienceOverlayProps {
  onClose: () => void
}

export function ExperienceOverlay({ onClose }: ExperienceOverlayProps) {
  const c = useThemeColors()

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
          background: c.amberA15,
          border: `1px solid ${c.amberA50}`,
          color: c.amber,
          padding: '0.6rem 1.25rem',
          cursor: 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
          fontSize: '11px',
          letterSpacing: '0.3em',
          fontWeight: 700,
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = c.amber
          e.currentTarget.style.color = c.btnHoverText
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = c.amberA15
          e.currentTarget.style.color = c.amber
        }}
      >
        EXIT EXPERIENCE ✕
      </button>

      <Experience started={true} />
    </div>
  )
}
