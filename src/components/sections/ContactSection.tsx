import { useState, type FormEvent } from 'react'
import { Mail, MapPin, FileText, ExternalLink, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
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
    padding: '0.75rem 1rem',
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
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          fontFamily: 'monospace',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.3em',
          color: focused ? c.amber : c.body,
          marginBottom: '0.4rem',
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
          rows={3}
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

/* ─── Static info cards (Location + Certifications) ─── */
const INFO_CARDS = [
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

      // Reset to idle after 5s
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setTimeout(() => setStatus('idle'), 6000)
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

        {/* Cards Grid — 2 info cards + 1 contact form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Info Cards */}
          {INFO_CARDS.map((card, index) => {
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

          {/* ─── CONTACT FORM CARD ─── */}
          <div
            data-testid="contact-form-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: c.bgCard,
              border: `1px solid ${c.border}`,
              padding: '2rem',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
            }}
            className="group hover:-translate-y-1 hover:border-[oklch(0.72_0.19_45_/_50%)]"
          >
            {/* Corner accents */}
            <span style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, borderTop: `2px solid ${c.amber}`, borderLeft: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', top: 0, right: 0, width: 12, height: 12, borderTop: `2px solid ${c.amber}`, borderRight: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', bottom: 0, left: 0, width: 12, height: 12, borderBottom: `2px solid ${c.amber}`, borderLeft: `2px solid ${c.amber}` }} />
            <span style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderBottom: `2px solid ${c.amber}`, borderRight: `2px solid ${c.amber}` }} />

            <div>
              <div className="flex items-center justify-between mb-4">
                <Mail size={28} style={{ color: c.amber }} />
                <span style={{ fontFamily: 'monospace', fontSize: '9px', letterSpacing: '0.2em', color: c.bodyLight }}>
                  03
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
                Send Us a Message
              </h3>
              <div
                style={{
                  width: '2.5rem',
                  height: '1px',
                  background: c.amber,
                  marginBottom: '1rem',
                }}
              />
            </div>

            {/* Success State */}
            {status === 'success' ? (
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  textAlign: 'center',
                  animation: 'fadeIn 0.5s ease',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'oklch(0.75 0.17 150 / 0.15)',
                    border: '2px solid oklch(0.75 0.17 150 / 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckCircle size={28} style={{ color: c.green }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'system-ui', fontWeight: 700, fontSize: '14px', color: c.green, marginBottom: '0.25rem' }}>
                    Message Sent Successfully!
                  </p>
                  <p style={{ fontFamily: 'monospace', fontSize: '10px', color: c.body, letterSpacing: '0.1em' }}>
                    WE'LL GET BACK TO YOU WITHIN 24 HOURS
                  </p>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <FormField label="Full Name" name="name" placeholder="Your name" value={name} onChange={setName} />
                <FormField label="Phone Number" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={phone} onChange={setPhone} />
                <FormField label="Email Address" name="email" type="email" placeholder="you@company.com" value={email} onChange={setEmail} />
                <FormField label="Message" name="message" placeholder="Brief description of your requirement..." value={message} onChange={setMessage} required={false} isTextarea />

                {/* Error Message */}
                {status === 'error' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      marginBottom: '0.75rem',
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  data-testid="contact-form-submit"
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    width: '100%',
                    padding: '0.8rem 1.5rem',
                    fontFamily: 'monospace',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
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
