import { useState, type FormEvent } from 'react'
import { Mail, MapPin, FileText, ExternalLink, Send, CheckCircle, AlertCircle, Loader2, X, MessageSquare } from 'lucide-react'
import { useThemeColors } from '@/hooks/useThemeColors'
import { supabase } from '@/lib/supabase'

const MAPS_URL = 'https://maps.app.goo.gl/i8ypH4VQ5kdxmToW7'
const MAPS_EMBED_URL = 'https://maps.google.com/maps?q=Plot+No.+54%2F26%2C+D-II+Block%2C+MIDC+Chinchwad%2C+Pune+-+411019&t=&z=16&ie=UTF8&iwloc=&output=embed'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

/* ─── Animated input field ─── */
function FormField({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = true,
  isTextarea = false,
}: {
  label: string
  name: string
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  isTextarea?: boolean
}) {
  const c = useThemeColors()
  const [focused, setFocused] = useState(false)

  const sharedStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.85rem 1rem',
    fontFamily: 'monospace',
    fontSize: '12px',
    letterSpacing: '0.03em',
    color: c.heading,
    background: focused ? 'oklch(0.16 0.012 250 / 80%)' : 'oklch(0.14 0.012 250 / 60%)',
    border: `1px solid ${focused ? c.amber : c.border}`,
    outline: 'none',
    transition: 'all 0.3s ease',
    resize: isTextarea ? 'vertical' as const : undefined,
  }

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          fontFamily: 'monospace',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: focused ? c.amber : c.body,
          marginBottom: '0.5rem',
          transition: 'color 0.3s ease',
          textTransform: 'uppercase',
        }}
      >
        {label} {required && <span style={{ color: c.amber }}>*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={4}
          style={sharedStyle}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          style={sharedStyle}
        />
      )}
    </div>
  )
}

/* ─── Contact cards data ─── */
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
    action: { label: 'OPEN IN GOOGLE MAPS', url: MAPS_URL },
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
    action: { label: 'SEND EMAIL', url: 'mailto:dakshtooling@gmail.com' },
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
    action: { label: 'DOWNLOAD PROFILE PDF', url: '/COMPANY_PROFILE_DTS.pdf', download: true },
  },
]

export function ContactSection() {
  const c = useThemeColors()

  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      const { error } = await supabase.from('contact_submissions').insert([
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          message: message.trim() || null,
        },
      ])

      if (error) throw error

      setStatus('success')
      setName('')
      setPhone('')
      setEmail('')
      setMessage('')

      setTimeout(() => {
        setStatus('idle')
        setModalOpen(false)
      }, 3000)
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const handleCloseModal = () => {
    if (status !== 'submitting') {
      setModalOpen(false)
      setStatus('idle')
      setErrorMsg('')
    }
  }

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

        {/* Cards Grid — 3 compact info cards + Contact Us CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {CARDS.map((card, index) => {
            const Icon = card.icon
            return (
              <div
                key={index}
                data-testid={`contact-card-${index}`}
                style={{
                  background: c.bgCard,
                  border: `1px solid ${c.border}`,
                  padding: '1.5rem',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                className="group hover:-translate-y-1 hover:border-[oklch(0.72_0.19_45_/_50%)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Icon size={22} style={{ color: c.amber }} />
                    <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: c.bodyLight }}>
                      0{index + 1}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: c.heading,
                      marginBottom: '0.4rem',
                    }}
                  >
                    {card.title}
                  </h3>
                  <div style={{ width: '2rem', height: '1px', background: c.amber, marginBottom: '0.75rem' }} />
                  {card.lines.map((line, i) => (
                    <p
                      key={i}
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '10px',
                        lineHeight: 1.7,
                        color: c.body,
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>

                <a
                  href={card.action.url}
                  target={card.action.url.startsWith('http') ? '_blank' : undefined}
                  rel={card.action.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  download={card.action.download}
                  className="mt-4 flex items-center justify-between p-2 border border-[oklch(0.72_0.19_45_/_30%)] bg-[oklch(0.72_0.19_45_/_8%)] transition-all duration-200 hover:border-[oklch(0.72_0.19_45)] hover:bg-[oklch(0.72_0.19_45_/_20%)]"
                  style={{ textDecoration: 'none' }}
                >
                  <span style={{ fontFamily: 'monospace', fontSize: '8px', fontWeight: 700, letterSpacing: '0.15em', color: c.amber }}>
                    {card.action.label}
                  </span>
                  <ExternalLink size={11} style={{ color: c.amber }} />
                </a>
              </div>
            )
          })}

          {/* ─── CONTACT US CTA CARD ─── */}
          <button
            onClick={() => setModalOpen(true)}
            data-testid="contact-form-open"
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'oklch(0.72 0.19 45 / 0.06)',
              border: `1px solid oklch(0.72 0.19 45 / 0.35)`,
              padding: '1.5rem',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            className="group hover:-translate-y-1 hover:border-[oklch(0.72_0.19_45)] hover:bg-[oklch(0.72_0.19_45_/_12%)]"
          >
            {/* Corner accents */}
            <span style={{ position: 'absolute', top: 0, left: 0, width: 10, height: 10, borderTop: `2px solid ${c.amber}`, borderLeft: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', top: 0, right: 0, width: 10, height: 10, borderTop: `2px solid ${c.amber}`, borderRight: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: 10, height: 10, borderBottom: `2px solid ${c.amber}`, borderLeft: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderBottom: `2px solid ${c.amber}`, borderRight: `2px solid ${c.amber}` }} />

            {/* Animated pulse ring */}
            <div style={{ position: 'relative', width: 48, height: 48 }}>
              <div
                style={{
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  border: '1px solid oklch(0.72 0.19 45 / 0.3)',
                  animation: 'pulse-border 2s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'oklch(0.72 0.19 45 / 0.15)',
                  border: '1px solid oklch(0.72 0.19 45 / 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MessageSquare size={22} style={{ color: c.amber }} />
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: c.heading,
                  marginBottom: '0.3rem',
                }}
              >
                Contact Us
              </h3>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, letterSpacing: '0.05em' }}>
                Send your enquiry directly
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.25rem',
                background: c.amber,
                color: 'oklch(0.13 0.01 250)',
                fontFamily: 'monospace',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                transition: 'all 0.3s ease',
              }}
            >
              <Send size={12} />
              SEND ENQUIRY
            </div>
          </button>
        </div>

        {/* INTERACTIVE GOOGLE MAP CONTAINER */}
        <div className="relative border border-[oklch(0.72_0.19_45_/_40%)] bg-[oklch(0.14_0.012_250)] p-4 md:p-6 backdrop-blur-md">
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[oklch(0.72_0.19_45)]" />
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[oklch(0.72_0.19_45)]" />

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

      {/* ═══════════════════════════════════════════════════════════
          CONTACT FORM MODAL POPUP
          ═══════════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div
          data-testid="contact-modal-backdrop"
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'oklch(0.05 0.01 250 / 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          {/* Modal Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'oklch(0.14 0.012 250 / 95%)',
              border: '1px solid oklch(0.72 0.19 45 / 0.4)',
              backdropFilter: 'blur(24px)',
              padding: '2.5rem',
              animation: 'fade-in-up 0.35s ease',
            }}
          >
            {/* Corner accents */}
            <span style={{ position: 'absolute', top: 0, left: 0, width: 14, height: 14, borderTop: `2px solid ${c.amber}`, borderLeft: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, borderTop: `2px solid ${c.amber}`, borderRight: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: 14, height: 14, borderBottom: `2px solid ${c.amber}`, borderLeft: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderBottom: `2px solid ${c.amber}`, borderRight: `2px solid ${c.amber}` }} />

            {/* Close button */}
            <button
              onClick={handleCloseModal}
              data-testid="contact-modal-close"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'oklch(0.72 0.19 45 / 0.1)',
                border: '1px solid oklch(0.72 0.19 45 / 0.3)',
                color: c.amber,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'oklch(0.72 0.19 45 / 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'oklch(0.72 0.19 45 / 0.1)'
              }}
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ marginBottom: '1.75rem' }}>
              <div style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.4em', color: c.amber, marginBottom: '0.5rem' }}>
                DAKSH TOOLING SOLUTIONS
              </div>
              <h3
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: c.heading,
                  marginBottom: '0.4rem',
                }}
              >
                Send Us a Message
              </h3>
              <div style={{ width: '3rem', height: '2px', background: c.amber, marginBottom: '0.75rem' }} />
              <p style={{ fontFamily: 'monospace', fontSize: '11px', color: c.body, lineHeight: 1.6 }}>
                Share your requirements and we'll respond within 24 hours with a detailed quotation.
              </p>
            </div>

            {/* Success State */}
            {status === 'success' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.25rem',
                  textAlign: 'center',
                  padding: '2rem 0',
                  animation: 'fadeIn 0.5s ease',
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'oklch(0.75 0.17 150 / 0.12)',
                    border: '2px solid oklch(0.75 0.17 150 / 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle size={32} style={{ color: c.green }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: '16px', color: c.green, marginBottom: '0.35rem' }}>
                    Message Sent Successfully!
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, letterSpacing: '0.1em' }}>
                    WE'LL GET BACK TO YOU WITHIN 24 HOURS
                  </p>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit}>
                <FormField label="Full Name" name="name" placeholder="Your name" value={name} onChange={setName} />
                <FormField label="Phone Number" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={setPhone} />
                <FormField label="Email Address" name="email" type="email" placeholder="you@company.com" value={email} onChange={setEmail} />
                <FormField label="Message" name="message" placeholder="Brief description of your requirement..." value={message} onChange={setMessage} required={false} isTextarea />

                {/* Error */}
                {status === 'error' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 0.85rem',
                      marginBottom: '1rem',
                      background: 'oklch(0.62 0.2 25 / 0.1)',
                      border: '1px solid oklch(0.62 0.2 25 / 0.3)',
                    }}
                  >
                    <AlertCircle size={14} style={{ color: 'oklch(0.62 0.2 25)', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'oklch(0.62 0.2 25)' }}>
                      {errorMsg}
                    </span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  data-testid="contact-form-submit"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    width: '100%',
                    padding: '0.9rem 1.5rem',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    color: status === 'submitting' ? c.body : 'oklch(0.13 0.01 250)',
                    background: status === 'submitting' ? 'oklch(0.72 0.19 45 / 0.2)' : c.amber,
                    border: `1px solid ${c.amber}`,
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'submitting') {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.color = c.amber
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (status !== 'submitting') {
                      e.currentTarget.style.background = c.amber
                      e.currentTarget.style.color = 'oklch(0.13 0.01 250)'
                    }
                  }}
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      SEND ENQUIRY
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
