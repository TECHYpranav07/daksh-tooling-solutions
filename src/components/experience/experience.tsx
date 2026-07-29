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

interface ExperienceProps {
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

  const progressRef = useRef(0)

  // ─── Update progress helper ───────────────────────────────────────────────
  const updateProgress = useCallback((newP: number) => {
    const clampedP = Math.max(0, Math.min(1, newP))
    progressRef.current = clampedP
    progressStore.p = clampedP

    const v = progressToStageValue(clampedP)
    const idx = stageIndexFromValue(v)
    setStageIndex(idx)
    setPercent(Math.min((v / STAGE_COUNT) * 100, 100))
    setIntroVisible(clampedP <= INTRO_FRACTION * 0.5)

    if (v > 0) playStage(idx)
  }, [playStage])

  // ─── Trigger boot when started is true ───────────────────────────────────
  useEffect(() => {
    if (started && !bootStarted) {
      updateProgress(0)
      startAudio()
      unlock()
      setBootStarted(true)
    }
  }, [started, bootStarted, startAudio, unlock, updateProgress])

  // ─── Direct Wheel, Touch, and Keyboard Event Controller ─────────────────
  useEffect(() => {
    if (!booted) return

    const handleWheel = (e: WheelEvent) => {
      // Sensitivity: mouse wheel delta Y
      const delta = e.deltaY * 0.0008
      updateProgress(progressRef.current + delta)
    }

    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const deltaY = touchStartY - touchY
      touchStartY = touchY
      updateProgress(progressRef.current + deltaY * 0.002)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        updateProgress(progressRef.current + 0.08)
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        updateProgress(progressRef.current - 0.08)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [booted, updateProgress])

  const handleBooted = useCallback(() => {
    setBooted(true)
    setTimeout(() => playStage(0), 600)
  }, [playStage])

  const scrollToStage = useCallback((targetIndex: number) => {
    const v = targetIndex + 0.3
    const p = (v / STAGE_COUNT) * (1 - INTRO_FRACTION) + INTRO_FRACTION
    updateProgress(p)
  }, [updateProgress])

  const handleNextStage = useCallback(() => {
    if (introVisible || progressRef.current <= INTRO_FRACTION * 0.5) {
      scrollToStage(0)
    } else {
      const next = Math.min(stageIndex + 1, STAGE_COUNT - 1)
      scrollToStage(next)
    }
  }, [introVisible, stageIndex, scrollToStage])

  const handlePrevStage = useCallback(() => {
    const prev = Math.max(stageIndex - 1, 0)
    scrollToStage(prev)
  }, [stageIndex, scrollToStage])

  const handleStageClick = useCallback((index: number) => {
    setModalStage(STAGES[index])
  }, [])

  const handleModalClose = useCallback(() => {
    setModalStage(null)
  }, [])

  return (
    <main aria-label="Daksh Tooling — Precision Flow — interactive 3D manufacturing experience">
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
