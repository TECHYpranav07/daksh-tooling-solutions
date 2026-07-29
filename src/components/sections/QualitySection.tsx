const CARDS = [
  {
    title: 'Quality Standards',
    description: 'ISO 9001:2015 certified quality management system. All processes documented and audited quarterly. Material certifications to EN 10204 3.1.',
  },
  {
    title: 'Inspection Process',
    description: 'Full CMM inspection with 48,200+ touch points per mould. PPAP Level 3 reports generated. Maximum dimensional deviation ±0.004 mm verified.',
  },
  {
    title: 'Certifications',
    description: 'ISO 9001:2015 certification. GSTIN registered. Member of Ossnam Engineering Group. All tooling backed by performance guarantees.',
  },
]

export function QualitySection() {
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
            SECTION 05
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
            Quality
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
            ISO 9001:2015 certified quality management
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CARDS.map((card, index) => (
            <div
              key={index}
              data-testid={`quality-card-${index}`}
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
