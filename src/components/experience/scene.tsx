import { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Grid, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { progressStore } from '@/lib/progress-store'
import { progressToStageValue, STAGE_COUNT } from '@/lib/stages'
import { Workpiece } from './workpiece'
import { StageEffects } from './effects'

const CAM_KEYS: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [0, 1.2, 9.5], look: [0, 0, 0] },
  { pos: [4.6, 2.4, 5.6], look: [0, 0, 0] },
  { pos: [4.0, 3.6, 5.0], look: [0, 0.3, 0] },
  { pos: [-4.6, 2.4, 4.6], look: [0, 0.2, 0] },
  { pos: [3.4, 4.6, 3.4], look: [0, 0.2, 0] },
  { pos: [-3.8, 1.8, 5.6], look: [0, 0.2, 0] },
  { pos: [0, 3.0, 5.6], look: [0, 0.4, 0] },
  { pos: [4.4, 1.2, 3.8], look: [0, 0, 0] },
  { pos: [5.2, 3.6, 5.2], look: [0, 1.0, 0] },
  { pos: [-4.6, 3.0, 4.8], look: [0, 0.8, 0] },
  { pos: [5.2, 2.8, 5.8], look: [0, 0.6, 0] },
]

const _pos = new THREE.Vector3()
const _look = new THREE.Vector3()

function CameraRig({ freeMode }: { freeMode: boolean }) {
  useFrame((state, delta) => {
    progressStore.smooth = THREE.MathUtils.damp(progressStore.smooth, progressStore.p, 6, delta)
    if (freeMode) return
    const v = progressToStageValue(progressStore.smooth)
    const i = Math.min(Math.floor(v), STAGE_COUNT - 1)
    const t = THREE.MathUtils.clamp(v - i, 0, 1)
    const e = t * t * (3 - 2 * t)
    const a = CAM_KEYS[i]
    const b = CAM_KEYS[Math.min(i + 1, STAGE_COUNT)]
    _pos.set(...a.pos).lerp(_look.set(...b.pos), e)
    const look = new THREE.Vector3(...a.look).lerp(new THREE.Vector3(...b.look), e)

    const time = state.clock.elapsedTime
    _pos.x += Math.sin(time * 0.3) * 0.06
    _pos.y += Math.cos(time * 0.4) * 0.04

    state.camera.position.lerp(_pos, 1 - Math.exp(-5 * delta))
    state.camera.lookAt(look)
  })
  return null
}

function FreeModeTracker({ onChange }: { onChange: (free: boolean) => void }) {
  const wasFree = useRef(false)
  useFrame(() => {
    const v = progressToStageValue(progressStore.smooth)
    const free = v > 9.35
    if (free !== wasFree.current) {
      wasFree.current = free
      onChange(free)
    }
  })
  return null
}

function FactoryLighting() {
  const key = useRef<THREE.SpotLight>(null)
  useFrame(() => {
    const v = progressToStageValue(progressStore.smooth)
    const boot = THREE.MathUtils.clamp(progressStore.smooth * 40, 0, 1)
    if (key.current) {
      key.current.intensity = 120 * Math.max(boot, v > 0 ? 1 : 0)
    }
  })
  return (
    <>
      <ambientLight intensity={0.25} />
      <spotLight
        ref={key}
        position={[5, 8, 4]}
        angle={0.5}
        penumbra={0.6}
        intensity={120}
        color="#fff4e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-6, 2, -4]} intensity={30} color="#ff7a2f" />
      <pointLight position={[4, 1, -5]} intensity={22} color="#3fb6d9" />
    </>
  )
}

export function Scene() {
  const [freeMode, setFreeMode] = useState(false)

  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.2, 9.5], fov: 42 }}
      gl={{ antialias: true }}
      dpr={[1, 2]}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0b0d12']} />
      <fog attach="fog" args={['#0b0d12', 12, 26]} />

      <Suspense fallback={null}>
        <FactoryLighting />
        <Environment preset="warehouse" environmentIntensity={0.35} />

        <Workpiece />
        <StageEffects />

        <Grid
          position={[0, -1.21, 0]}
          args={[40, 40]}
          cellSize={0.5}
          cellColor="#1d2735"
          sectionSize={2.5}
          sectionColor="#2c4a63"
          fadeDistance={22}
          fadeStrength={2}
          infiniteGrid
        />
        <mesh position={[0, -1.22, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#0d1016" metalness={0.6} roughness={0.55} />
        </mesh>

        <CameraRig freeMode={freeMode} />
        <FreeModeTracker onChange={setFreeMode} />
        {freeMode && (
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={12}
            maxPolarAngle={Math.PI / 2 - 0.05}
            target={[0, 0.6, 0]}
          />
        )}
      </Suspense>
    </Canvas>
  )
}
