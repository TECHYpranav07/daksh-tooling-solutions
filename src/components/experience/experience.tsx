import { useCallback, useEffect, useRef, useState } from 'react'
import { progressStore } from '@/lib/progress-store'
import {
  progressToStageValue,
  stageIndexFromValue,
  INTRO_FRACTION,
  STAGE_COUNT,
  STAGES,
  type Stage,
} from '@/lib/stages'
import { Scene } from './scene'
import { Hud } from './hud'
import { BootSequence } from './boot-sequence'
import { StageModal } from './StageModal'
import { WebGLErrorBoundary } from './webgl-error-boundary'

/** Synthesized industrial ambience via WebAudio */
function useAmbience() {
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const [muted, setMuted] = useState(false)

  const start = useCallback(() => {
    if (ctxRef.current) return
    try {
      const ctx = new AudioContext()
      const master = ctx.createGain()
      master.gain.value = 0.05
      master.connect(ctx.destination)

      for (const [freq, vol] of [[50, 1], [100, 0.4], [150, 0.15]] as const) {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        const g = ctx.createGain()
        g.gain.value = vol
        osc.connect(g).connect(master)
        osc.start()
      }

      const bufferSize = ctx.sampleRate * 2
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3
      const noise = ctx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 260
      const ng = ctx.createGain()
      ng.gain.value = 0.5
      noise.connect(filter).connect(ng).connect(master)
      noise.start()

      ctxRef.current = ctx
      gainRef.current = master
    } catch {
      // audio unavailable — continues silently
    }
  }, [])

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.setTargetAtTime(next ? 0 : 0.05, ctxRef.current.currentTime, 0.1)
      }
      return next
    })
  }, [])

  return { start, muted, toggleMute }
}

/** Stage-by-stage narration via Web Speech API */
function useNarration() {
  const [narrationMuted, setNarrationMuted] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const currentStageRef = useRef<number>(-1)
  const pendingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stopCurrent = useCallback(() => {
    if (pendingTimerRef.current) {
      clearTimeout(pendingTimerRef.current)
      pendingTimerRef.current = null
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (!unlocked || narrationMuted) return
      if (!('speechSynthesis' in window)) return

      stopCurrent()

      // Small delay so fast scrolling doesn't stack utterances
      pendingTimerRef.current = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.92
        utterance.pitch = 0.95
        utterance.volume = 0.9

        const voices = window.speechSynthesis.getVoices()
        const preferred =
          voices.find(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Samantha')),
          ) || voices.find((v) => v.lang.startsWith('en'))
        if (preferred) utterance.voice = preferred

        window.speechSynthesis.speak(utterance)
      }, 600)
    },
    [unlocked, narrationMuted, stopCurrent],
  )

  const unlock = useCallback(() => setUnlocked(true), [])

  const toggleNarration = useCallback(() => {
    setNarrationMuted((m) => {
      const next = !m
      if (next) stopCurrent()
      return next
    })
  }, [stopCurrent])

  const playStage = useCallback(
    (index: number) => {
      if (index === currentStageRef.current) return
      currentStageRef.current = index
      const stage = STAGES[index]
      if (stage) speak(stage.narration)
    },
    [speak],
  )

  useEffect(() => () => { stopCurrent() }, [stopCurrent])

  return { narrationMuted, toggleNarration, unlock, playStage }
}

/** Scroll the page to the start of a given stage index (0-based) */
function scrollToStage(targetIndex: number) {
  // Place camera at 30% into the target stage so the transition reads clearly
  const v = targetIndex + 0.3
  const p = (v / STAGE_COUNT) * (1 - INTRO_FRACTION) + INTRO_FRACTION
  const max = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo({ top: p * max, behavior: 'smooth' })
}

interface ExperienceProps {
  /** Flips to true when the user clicks the landing-page CTA */
  started: boolean
}

export function Experience({ started }: ExperienceProps) {
  const [bootStarted, setBootStarted] = useState(false)
  const [booted, setBooted] = useState(false)
  const [stageIndex, setStageIndex] = useState(0)
  const [percent, setPercent] = useState(0)
  const [introVisible, setIntroVisible] = useState(true)
  const [modalStage, setModalStage] = useState<Stage | null>(null)
  const { start: startAudio, muted, toggleMute } = useAmbience()
  const { narrationMuted, toggleNarration, unlock, playStage } = useNarration()

  // ─── Trigger boot when the landing-page CTA is clicked ───────────────────
  useEffect(() => {
    if (started && !bootStarted) {
      window.scrollTo(0, 0)
      startAudio()
      unlock()
      setBootStarted(true)
    }
  }, [started, bootStarted, startAudio, unlock])

  // ─── Scroll tracking & wheel listener (active after boot) ────────────────
  useEffect(() => {
    if (!booted) return

    let raf = 0
    const updateProgress = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        const p = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0
        progressStore.p = p

        const v = progressToStageValue(p)
        const idx = stageIndexFromValue(v)
        setStageIndex(idx)
        setPercent(Math.min((v / STAGE_COUNT) * 100, 100))
        setIntroVisible(p < 0.008)

        if (v > 0) playStage(idx)
      })
    }

    const onWheel = (e: WheelEvent) => {
      // Forward wheel delta with multiplier for fast, responsive scrolling over fixed canvas
      if (Math.abs(e.deltaY) > 0) {
        window.scrollBy({ top: e.deltaY * 1.5 })
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('wheel', onWheel, { passive: true })
    updateProgress() // sync on mount

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('wheel', onWheel)
      cancelAnimationFrame(raf)
    }
  }, [booted, playStage])

  // ─── Manage scroll lock state ─────────────────────────────────────────────
  useEffect(() => {
    if (!booted) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.style.overflow = 'auto'
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [booted])

  const handleBooted = useCallback(() => {
    setBooted(true)
    setTimeout(() => playStage(0), 800)
  }, [playStage])

  const handleNextStage = useCallback(() => {
    const next = Math.min(stageIndex + 1, STAGE_COUNT - 1)
    scrollToStage(next)
  }, [stageIndex])

  const handlePrevStage = useCallback(() => {
    const prev = Math.max(stageIndex - 1, 0)
    scrollToStage(prev)
  }, [stageIndex])

  const handleStageClick = useCallback((index: number) => {
    setModalStage(STAGES[index])
  }, [])

  const handleModalClose = useCallback(() => {
    setModalStage(null)
  }, [])

  return (
    <main aria-label="Daksh Tooling — Precision Flow — interactive 3D manufacturing experience">
      {/* Tall scroll track — creates the scrollable height */}
      <div style={{ height: '1150vh' }} aria-hidden="true" />

      {/* Fixed 3D scene */}
      <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100vh' }}>
        <WebGLErrorBoundary>
          <Scene />
        </WebGLErrorBoundary>
      </div>

      <Hud
        stageIndex={stageIndex}
        percent={percent}
        visible={booted}
        introVisible={introVisible}
        muted={muted}
        narrationMuted={narrationMuted}
        onToggleAmbience={toggleMute}
        onToggleNarration={toggleNarration}
        onNextStage={handleNextStage}
        onPrevStage={handlePrevStage}
        onStageClick={handleStageClick}
      />

      <StageModal stage={modalStage} onClose={handleModalClose} />

      <BootSequence started={bootStarted} onComplete={handleBooted} />
    </main>
  )
}
