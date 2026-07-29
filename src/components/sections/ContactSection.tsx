import { Mail, MapPin, FileText, ExternalLink } from 'lucide-react'
import { useThemeColors } from '@/hooks/useThemeColors'

const MAPS_URL = 'https://maps.app.goo.gl/i8ypH4VQ5kdxmToW7'
const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=Plot+No.+54%2F26%2C+D-II+Block%2C+MIDC+Chinchwad%2C+Pune+-+411019&t=&z=16&ie=UTF8&iwloc=&output=embed'

const CARDS = [
  {
    icon: MapPin,
    title: 'Our Facility Location',
    lines: [
      'Plot No. 54/26, D-II Block',
      'MIDC Chinchwad',
      'Pimpri Chinchwad, Pune - 411019',
      'Maharashtra, India',
    ],
    action: {
      label: 'OPEN IN GOOGLE MAPS',
      url: MAPS_URL,
    },
  },
  {
    icon: Mail,
    title: 'Email & Contact',
    lines: [
      'dakshtooling@gmail.com',
      '+91 82087 01793 (Direct)',
      'Business inquiries welcome',
      'Response within 24 hours',
    ],
    action: {
      label: 'SEND EMAIL',
      url: 'mailto:dakshtooling@gmail.com',
    },
  },
  {
    icon: FileText,
    title: 'Certifications & Reg',
    lines: [
      'ISO 9001:2015 Certified QMS',
      'GSTIN: 27ARDPG2718D1Z8',
      'Ossnam Engineering Group',
      'Material Cert EN 10204 3.1',
    ],
    action: {
      label: 'DOWNLOAD PROFILE PDF',
      url: '/COMPANY_PROFILE_DTS.pdf',
      download: true,
    },
  },
]

export function ContactSection() {
  const c = useThemeColors()

  return (
    <div style={{ paddingTop: '5rem', minHeight: '80vh', background: c.bg }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-20">
        {/* Section Header */}
        <div className="mb-12">
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: '10px',
              letterSpacing: '0.4em',
              color: c.amber,
              marginBottom: '0.75rem',
            }}
          >
            SECTION 07 — LOCATION & CONTACT
          </div>
          <h2
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: c.heading,
              marginBottom: '0.75rem',
            }}
          >
            Get In Touch
          </h2>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              letterSpacing: '0.05em',
              color: c.body,
              maxWidth: '48rem',
            }}
          >
            Visit our state-of-the-art tool room in Chinchwad, Pune or send us your engineering drawings for immediate quotation.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {CARDS.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={index}
                data-testid={`contact-card-${index}`}
                style={{
                  background: c.bgCard,
                  border: `1px solid ${c.border}`,
                  padding: '2rem',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                className="group hover:-translate-y-1 hover:border-[oklch(0.72_0.19_45_/_50%)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Icon size={28} style={{ color: c.amber }} />
                    <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: c.bodyLight }}>
                      0{index + 1}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: c.heading,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {card.title}
                  </h3>
                  <div
                    style={{
                      width: '2.5rem',
                      height: '1px',
                      background: c.amber,
                      marginBottom: '1rem',
                    }}
                  />
                  {card.lines.map((line, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        lineHeight: 1.7,
                        color: c.body,
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                {/* Action Link */}
                <a
                  href={card.action.url}
                  target={card.action.url.startsWith('http') ? '_blank' : undefined}
                  rel={card.action.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  download={card.action.download}
                  className="mt-6 flex items-center justify-between p-2.5 border border-[oklch(0.72_0.19_45_/_30%)] bg-[oklch(0.72_0.19_45_/_8%)] transition-all duration-200 hover:border-[oklch(0.72_0.19_45)] hover:bg-[oklch(0.72_0.19_45_/_20%)]"
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: c.amber }}>
                    {card.action.label}
                  </span>
                  <ExternalLink size={12} style={{ color: c.amber }} />
                </a>
              </div>
            )
          })}
        </div>

        {/* INTERACTIVE GOOGLE MAP CONTAINER */}
        <div className="relative border border-[oklch(0.72_0.19_45_/_40%)] bg-[oklch(0.14_0.012_250)] p-4 md:p-6 backdrop-blur-md">
          {/* Corner Brackets */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[oklch(0.72_0.19_45)]" />

          {/* Map Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[oklch(0.93_0.005_250_/_10%)]">
            <div className="flex items-center gap-3">
              <span className="hud-blink" style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.amber, display: 'block' }} />
              <div>
                <h3 style={{ fontFamily: 'system-ui', fontSize: '1.1rem', fontWeight: 700, color: c.heading }}>
                  Interactive Facility Map — MIDC Chinchwad
                </h3>
                <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, letterSpacing: '0.05em' }}>
                  Plot No. 54/26, D-II Block, MIDC, Chinchwad, Pune, Maharashtra 411019
                </p>
              </div>
            </div>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-[oklch(0.72_0.19_45)] bg-[oklch(0.72_0.19_45_/_15%)] transition-all duration-200 hover:bg-[oklch(0.72_0.19_45)] hover:text-black shrink-0"
              style={{ textDecoration: 'none' }}
            >
              <MapPin size={14} style={{ color: c.amber }} />
              <span style={{ fontFamily: 'monospace', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: c.amber }}>
                DIRECTIONS IN MAPS ↗
              </span>
            </a>
          </div>

          {/* Map Iframe */}
          <div className="relative w-full h-[380px] overflow-hidden border border-[oklch(0.93_0.005_250_/_12%)] bg-[oklch(0.09_0.01_250)]">
            <iframe
              title="Daksh Tooling Solutions Location Map"
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
