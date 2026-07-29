import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useThemeColors } from '@/hooks/useThemeColors'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Overview', href: '#company-overview', tab: 'about' },
  { label: 'Manufacturing Journey', href: '#manufacturing-journey' },
  { label: 'Machinery', href: '#machinery' },
  { label: 'Products', href: '#products' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  onTabSelect?: (tab: 'about' | 'capabilities' | 'quality') => void
}

export function Navbar({ onTabSelect }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const c = useThemeColors()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => ({
      id: link.href.slice(1),
      element: document.getElementById(link.href.slice(1)),
    }))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach((section) => {
      if (section.element) observer.observe(section.element)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string, tab?: string) => {
    if (tab && onTabSelect) {
      onTabSelect(tab as 'about' | 'capabilities' | 'quality')
    }
    const element = document.getElementById(href.slice(1))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'navbar-scrolled' : 'navbar-top'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="flex items-center gap-3 group"
              data-testid="navbar-logo"
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: c.amber,
                }}
              >
                DTS
              </span>
              <div style={{ width: '1px', height: '24px', background: c.borderHeading }} />
              <span
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  color: c.heading,
                  textTransform: 'uppercase',
                }}
              >
                Daksh Tooling
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href, link.tab)}
                    data-testid={`nav-link-${link.href.slice(1)}`}
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      letterSpacing: '0.2em',
                      color: isActive ? c.amber : c.body,
                      padding: '0.5rem 1rem',
                      transition: 'color 0.2s ease',
                      cursor: 'pointer',
                      background: 'transparent',
                      border: 'none',
                      textTransform: 'uppercase',
                      position: 'relative',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = c.heading
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = c.body
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '0',
                          left: '1rem',
                          right: '1rem',
                          height: '1px',
                          background: c.amber,
                        }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Mobile Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="mobile-menu-toggle"
                style={{
                  padding: '0.5rem',
                  color: c.amber,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'oklch(0.11 0.01 250 / 0.98)', paddingTop: '80px' }}
        >
          <div className="flex flex-col gap-1 p-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.tab)}
                  data-testid={`mobile-nav-link-${link.href.slice(1)}`}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    letterSpacing: '0.25em',
                    color: isActive ? c.amber : c.body,
                    padding: '1rem',
                    textAlign: 'left',
                    background: isActive ? c.amberA10 : 'transparent',
                    border: isActive ? `1px solid ${c.amberA30}` : '1px solid transparent',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {link.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
