import { useEffect, useRef, useState, useCallback } from 'react'
import { STAGES, STAGE_COUNT, type Stage } from '@/lib/stages'
import { progressStore } from '@/lib/progress-store'
import { useThemeColors } from '@/hooks/useThemeColors'
import { Scene } from '@/components/experience/scene'
import { Hud } from '@/components/experience/hud'
import { StageModal } from '@/components/experience/StageModal'
import { WebGLErrorBoundary } from '@/components/experience/webgl-error-boundary'

/** Synthesized industrial ambience via WebAudio */
function useAmbience() {
  const ctxRef = useRef<AudioContext | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const [muted, setMuted] = useState(true) // muted by default for main page

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
      if (!ctxRef.current) start()
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.setTargetAtTime(next ? 0 : 0.05, ctxRef.current.currentTime, 0.1)
      }
      return next
    })
  }, [start])

  return { toggleMute, muted }
}

/** Stage-by-stage narration via Web Speech API */
function useNarration() {
  const [narrationMuted, setNarrationMuted] = useState(true)
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
      if (narrationMuted) return
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
    [narrationMuted, stopCurrent],
  )

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

  return { narrationMuted, toggleNarration, playStage }
}

export function ManufacturingJourneySection() {
  const c = useThemeColors()
  const sectionRef = useRef<HTMLDivElement>(null)

  const [stageIndex, setStageIndex] = useState(0)
  const [percent, setPercent] = useState(0)
  const [introVisible, setIntroVisible] = useState(true)
  const [modalStage, setModalStage] = useState<Stage | null>(null)

  const { muted, toggleMute } = useAmbience()
  const { narrationMuted, toggleNarration, playStage } = useNarration()

  // Track scroll progress through this sticky section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight

      if (totalScrollable <= 0) return

      // Progress 0..1 inside this section
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable))
      progressStore.p = progress

      // Map progress to stage 0..9
      const v = progress * STAGE_COUNT
      const idx = Math.min(Math.floor(v), STAGE_COUNT - 1)

      setStageIndex(idx)
      setPercent(Math.min(progress * 100, 100))
      setIntroVisible(progress < 0.02)

      if (progress > 0.02) {
        playStage(idx)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [playStage])

  // Scroll to a specific stage inside Section 03
  const scrollToStage = useCallback((targetIndex: number) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = window.scrollY + rect.top
    const totalScrollable = rect.height - window.innerHeight

    const targetProgress = (targetIndex + 0.5) / STAGE_COUNT
    const targetScrollY = sectionTop + targetProgress * totalScrollable

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' })
  }, [])

  const handleNextStage = useCallback(() => {
    const next = Math.min(stageIndex + 1, STAGE_COUNT - 1)
    scrollToStage(next)
  }, [stageIndex, scrollToStage])

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
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        height: '650vh', // 6.5 screens tall sticky scroll track
        background: c.bg,
      }}
    >
      {/* Sticky 3D Canvas Container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* 3D Scene */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <WebGLErrorBoundary>
            <Scene />
          </WebGLErrorBoundary>
        </div>

        {/* HUD Controls & Stage Overlay */}
        <Hud
          stageIndex={stageIndex}
          percent={percent}
          visible={true}
          introVisible={introVisible}
          muted={muted}
          narrationMuted={narrationMuted}
          onToggleAmbience={toggleMute}
          onToggleNarration={toggleNarration}
          onNextStage={handleNextStage}
          onPrevStage={handlePrevStage}
          onStageClick={handleStageClick}
        />

        {/* Stage Specification Modal */}
        <StageModal stage={modalStage} onClose={handleModalClose} />
      </div>
    </div>
  )
}
