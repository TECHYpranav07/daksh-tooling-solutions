import { STAGES } from '@/lib/stages'
import { ArrowRight } from 'lucide-react'
import { useThemeColors } from '@/hooks/useThemeColors'

interface ManufacturingJourneySectionProps {
  onLaunch: () => void
}

export function ManufacturingJourneySection({ onLaunch }: ManufacturingJourneySectionProps) {
  const c = useThemeColors()
  const previewStages = STAGES.slice(0, 3)

  return (
    <div style={{ paddingTop: '5rem', minHeight: '80vh', background: c.bgAlt }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: c.amber,
              marginBottom: '1rem',
            }}
          >
            SECTION 03
          </div>
          <h2
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: c.heading,
              marginBottom: '1rem',
            }}
          >
            Manufacturing Journey
          </h2>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              letterSpacing: '0.05em',
              color: c.body,
              maxWidth: '48rem',
              margin: '0 auto',
            }}
          >
            Walk through our 10-stage precision manufacturing process
          </p>
        </div>

        {/* Preview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {previewStages.map((stage, index) => (
            <div
              key={stage.id}
              data-testid={`journey-preview-${index}`}
              style={{
                background: c.bgCard,
                border: `1px solid ${c.border}`,
                padding: '2rem',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = c.cyanA20
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = c.border
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div className="hud-blink" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: c.cyan }} />
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '9px',
                    letterSpacing: '0.3em',
                    color: c.cyan,
                  }}
                >
                  {stage.code}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: c.heading,
                  marginBottom: '0.5rem',
                }}
              >
                {stage.title}
              </h3>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  color: c.body,
                  marginBottom: '0.75rem',
                }}
              >
                {stage.machine}
              </p>
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: c.cyanA20,
                  marginBottom: '0.75rem',
                }}
              />
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  color: c.cyan,
                }}
              >
                {stage.operation}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          style={{
            background: c.bgCard,
            border: `1px solid ${c.amberA30}`,
            padding: '3rem',
            backdropFilter: 'blur(8px)',
            textAlign: 'center',
          }}
        >
          <div className="hud-flicker" style={{ marginBottom: '2rem' }}>
            <h3
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 600,
                color: c.heading,
                marginBottom: '1rem',
              }}
            >
              Experience the Full Manufacturing Process
            </h3>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                letterSpacing: '0.1em',
                color: c.body,
                maxWidth: '42rem',
                margin: '0 auto',
              }}
            >
              Full interactive 3D experience — use scroll to navigate through 10 manufacturing stages
            </p>
          </div>

          <button
            onClick={onLaunch}
            data-testid="launch-experience-button"
            className="cta-pulse"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.25rem 3rem',
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
            <span>Launch Precision Flow Experience</span>
            <ArrowRight size={18} />
          </button>

          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.2em',
              color: c.bodyLight,
              marginTop: '1.5rem',
            }}
          >
            INTERACTIVE 3D WEBGL EXPERIENCE — SCROLL TO NAVIGATE
          </p>
        </div>
      </div>
    </div>
  )
}
