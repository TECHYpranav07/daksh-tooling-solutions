import { useEffect, useState } from 'react'

const BOOT_LINES = [
  'INITIALIZING MANUFACTURING SYSTEM...',
  'LOADING DIGITAL TWIN CORE ............ OK',
  'CALIBRATING SPINDLE ENCODERS ......... OK',
  'PRESSURIZING COOLANT SYSTEM .......... OK',
  'SYNCING TOOLPATH DATABASE ............ OK',
  'FACTORY LIGHTING ..................... ONLINE',
  'ALL SYSTEMS NOMINAL',
]

interface BootSequenceProps {
  started: boolean
  onComplete: () => void
}

export function BootSequence({ started, onComplete }: BootSequenceProps) {
  const [lineCount, setLineCount] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (!started) return
    if (lineCount < BOOT_LINES.length) {
      const t = setTimeout(() => setLineCount((c) => c + 1), 320)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setFading(true)
      setTimeout(onComplete, 900)
    }, 500)
    return () => clearTimeout(t)
  }, [started, lineCount, onComplete])

  if (!started) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'oklch(0.13 0.01 250)',
        transition: 'opacity 0.7s ease',
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ width: '100%', maxWidth: '32rem', padding: '0 2rem' }}>
        <div className="mb-6 flex items-center gap-3">
          <span className="hud-blink h-2 w-2 rounded-full" style={{ background: 'oklch(0.72 0.19 45)' }} aria-hidden="true" />
          <span style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.35em', color: 'oklch(0.72 0.19 45)' }}>SYSTEM BOOT</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minHeight: '12rem', fontFamily: 'monospace', fontSize: '13px', color: 'oklch(0.62 0.01 250)' }} aria-live="polite">
          {BOOT_LINES.slice(0, lineCount).map((line, i) => (
            <div key={i} style={{ color: i === BOOT_LINES.length - 1 ? 'oklch(0.78 0.12 215)' : undefined }}>
              <span style={{ marginRight: '0.75rem', color: 'oklch(0.72 0.19 45 / 0.7)' }}>{'>'}</span>
              {line}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1.5rem', height: '4px', width: '100%', overflow: 'hidden', borderRadius: '9999px', background: 'oklch(0.22 0.012 250)' }}>
          <div
            style={{
              height: '100%',
              background: 'oklch(0.72 0.19 45)',
              transition: 'width 0.3s ease',
              width: `${(lineCount / BOOT_LINES.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
