const CARDS = [
  {
    title: 'CNC Machining',
    description: 'Multi-axis CNC milling and turning with ±0.005 mm tolerance. Fanuc VMC 850 and DMG Mori 5-axis centres for complex geometries.',
  },
  {
    title: 'EDM Processing',
    description: 'Sinker EDM and Wire EDM for hardened steel cavities. Sodick AG60L and Fanuc Robocut delivering VDI 18 surface finish.',
  },
  {
    title: 'Heat Treatment',
    description: 'Vacuum hardening, tempering, and nitriding services. Achieve 52 HRC for H13 tool steel with minimal distortion.',
  },
  {
    title: 'Surface Finishing',
    description: 'Precision grinding to 0.003 mm flatness. Mirror polishing to SPI A2 standard (Ra 0.05 µm) for optical-grade surfaces.',
  },
]

export function CapabilitiesSection() {
  return (
    <div style={{ paddingTop: '5rem', minHeight: '80vh', background: 'oklch(0.13 0.01 250)' }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        {/* Section Header */}
        <div className="mb-16">
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: 'oklch(0.72 0.19 45)',
              marginBottom: '1rem',
            }}
          >
            SECTION 02
          </div>
          <h2
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'oklch(0.93 0.005 250)',
              marginBottom: '1rem',
            }}
          >
            Capabilities
          </h2>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              letterSpacing: '0.05em',
              color: 'oklch(0.62 0.01 250)',
              maxWidth: '48rem',
            }}
          >
            End-to-end manufacturing capabilities
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card, index) => (
            <div
              key={index}
              data-testid={`capability-card-${index}`}
              style={{
                background: 'oklch(0.17 0.012 250 / 65%)',
                border: '1px solid oklch(0.93 0.005 250 / 12%)',
                padding: '2rem',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'oklch(0.72 0.19 45 / 0.3)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'oklch(0.93 0.005 250 / 12%)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <h3
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'oklch(0.93 0.005 250)',
                  marginBottom: '0.75rem',
                }}
              >
                {card.title}
              </h3>
              <div
                style={{
                  width: '3rem',
                  height: '1px',
                  background: 'oklch(0.72 0.19 45)',
                  marginBottom: '1rem',
                }}
              />
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  lineHeight: 1.7,
                  color: 'oklch(0.62 0.01 250)',
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
