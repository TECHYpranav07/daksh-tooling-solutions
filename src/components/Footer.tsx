import { useThemeColors } from '@/hooks/useThemeColors'

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Manufacturing Journey', href: '#manufacturing-journey' },
  { label: 'Machinery', href: '#machinery' },
  { label: 'Quality', href: '#quality' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  const c = useThemeColors()

  const handleLinkClick = (href: string) => {
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer style={{ background: c.isDark ? 'oklch(0.10 0.01 250)' : 'oklch(0.93 0.003 250)', borderTop: `1px solid ${c.amberA15}` }}>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: c.amber,
                }}
              >
                DTS
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: c.heading,
                marginBottom: '0.5rem',
              }}
            >
              DAKSH TOOLING SOLUTIONS
            </h3>
            <p
              style={{
                fontFamily: 'monospace',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: c.body,
                marginBottom: '1rem',
              }}
            >
              PRECISION ENGINEERING
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.375rem 0.875rem',
                border: `1px solid ${c.amberA40}`,
                background: c.amberA8,
                marginTop: '1rem',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '9999px', background: c.amber }} />
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  color: c.amber,
                }}
              >
                ISO 9001:2015 CERTIFIED
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: c.amber,
                marginBottom: '1.5rem',
              }}
            >
              QUICK LINKS
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  data-testid={`footer-link-${link.href.slice(1)}`}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    letterSpacing: '0.05em',
                    color: c.body,
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    padding: '0.25rem 0',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.amber)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = c.body)}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                letterSpacing: '0.3em',
                color: c.amber,
                marginBottom: '1.5rem',
              }}
            >
              CONTACT
            </h4>
            <div className="space-y-3">
              <div>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: c.body, marginBottom: '0.25rem' }}>
                  LOCATION
                </p>
                <a
                  href="https://maps.app.goo.gl/i8ypH4VQ5kdxmToW7"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: 'monospace', fontSize: '11px', color: c.heading, lineHeight: 1.6, textDecoration: 'none' }}
                  className="hover:text-[oklch(0.72_0.19_45)] transition-colors"
                >
                  Plot No. 54/26, D-II Block
                  <br />
                  Pimpri Chinchwad, Pune
                  <br />
                  Maharashtra, India ↗
                </a>
              </div>
              <div>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: c.body, marginBottom: '0.25rem' }}>
                  EMAIL
                </p>
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: c.heading }}>
                  dakshtooling@gmail.com
                </p>
              </div>
              <div>
                <p style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: c.body, marginBottom: '0.25rem' }}>
                  GSTIN
                </p>
                <p style={{ fontFamily: 'monospace', fontSize: '11px', color: c.heading }}>
                  27ARDPG2718D1Z8
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${c.borderDim}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          className="md:flex-row md:justify-between md:items-center"
        >
          <p style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', color: c.body }}>
            © 2025 DAKSH TOOLING SOLUTIONS — ALL RIGHTS RESERVED
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', color: c.cyan }}>
            PRECISION · QUALITY · EXCELLENCE
          </p>
        </div>
      </div>
    </footer>
  )
}
