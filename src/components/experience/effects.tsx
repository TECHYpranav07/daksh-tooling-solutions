import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { progressStore } from '@/lib/progress-store'
import { progressToStageValue } from '@/lib/stages'

function inWindow(v: number, start: number, end: number): number {
  if (v < start || v > end) return 0
  const fadeIn = THREE.MathUtils.clamp((v - start) / 0.15, 0, 1)
  const fadeOut = THREE.MathUtils.clamp((end - v) / 0.15, 0, 1)
  return Math.min(fadeIn, fadeOut)
}

interface SparksProps {
  color: string
  origin: [number, number, number]
  count?: number
  speed?: number
  spread?: number
  gravity?: number
  size?: number
  window: [number, number]
}

function Sparks({
  color,
  origin,
  count = 120,
  speed = 2.2,
  spread = 1,
  gravity = 4,
  size = 0.035,
  window: win,
}: SparksProps) {
  const points = useRef<THREE.Points>(null)
  const mat = useRef<THREE.PointsMaterial>(null)

  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const lifetimes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      lifetimes[i] = Math.random()
      velocities[i * 3] = (Math.random() - 0.5) * speed * spread
      velocities[i * 3 + 1] = Math.random() * speed
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speed * spread
    }
    return { positions, velocities, lifetimes }
  }, [count, speed, spread])

  useFrame((_, delta) => {
    const v = progressToStageValue(progressStore.smooth)
    const active = inWindow(v, win[0], win[1])
    if (points.current) points.current.visible = active > 0.01
    if (mat.current) mat.current.opacity = active
    if (active < 0.01 || !points.current) return

    const pos = points.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      lifetimes[i] += delta * 1.6
      if (lifetimes[i] > 1) {
        lifetimes[i] = 0
        pos[i * 3] = 0
        pos[i * 3 + 1] = 0
        pos[i * 3 + 2] = 0
        velocities[i * 3] = (Math.random() - 0.5) * speed * spread
        velocities[i * 3 + 1] = Math.random() * speed
        velocities[i * 3 + 2] = (Math.random() - 0.5) * speed * spread
      } else {
        velocities[i * 3 + 1] -= gravity * delta
        pos[i * 3] += velocities[i * 3] * delta
        pos[i * 3 + 1] += velocities[i * 3 + 1] * delta
        pos[i * 3 + 2] += velocities[i * 3 + 2] * delta
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points} position={origin} visible={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        color={color}
        size={size}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function MachineTools() {
  const cutter = useRef<THREE.Group>(null)
  const drillBit = useRef<THREE.Group>(null)
  const wheel = useRef<THREE.Mesh>(null)
  const electrode = useRef<THREE.Group>(null)
  const edmLight = useRef<THREE.PointLight>(null)
  const wire = useRef<THREE.Group>(null)

  useFrame((state) => {
    const v = progressToStageValue(progressStore.smooth)
    const t = state.clock.elapsedTime

    if (cutter.current) {
      const a = inWindow(v, 1.1, 3.0)
      cutter.current.visible = a > 0.01
      if (a > 0.01) {
        cutter.current.position.set(Math.sin(t * 1.6) * 0.9, 1.55 + (1 - a) * 1.5, Math.cos(t * 1.1) * 0.5)
        cutter.current.rotation.y = t * 40
      }
    }
    if (drillBit.current) {
      const a = inWindow(v, 3.05, 4.0)
      drillBit.current.visible = a > 0.01
      if (a > 0.01) {
        const cycle = (t * 0.6) % 1
        drillBit.current.position.set(
          [-1.15, 1.15, -1.15, 1.15][Math.floor(t * 0.6) % 4],
          1.9 - Math.sin(cycle * Math.PI) * 0.55,
          [-0.75, -0.75, 0.75, 0.75][Math.floor(t * 0.6) % 4],
        )
        drillBit.current.rotation.y = t * 50
      }
    }
    if (wheel.current) {
      const a = inWindow(v, 4.05, 5.0)
      wheel.current.visible = a > 0.01
      if (a > 0.01) {
        wheel.current.position.set(Math.sin(t * 1.2) * 1.1, 1.35, 0)
        wheel.current.rotation.x = t * 25
      }
    }
    if (electrode.current) {
      const a = inWindow(v, 5.05, 6.0)
      electrode.current.visible = a > 0.01
      if (a > 0.01) {
        electrode.current.position.y = 1.45 + Math.sin(t * 3) * 0.06
      }
      if (edmLight.current) {
        edmLight.current.intensity = a > 0.01 ? (2 + Math.sin(t * 35) * 2) * a : 0
      }
    }
    if (wire.current) {
      const a = inWindow(v, 6.05, 7.0)
      wire.current.visible = a > 0.01
      if (a > 0.01) {
        wire.current.position.x = Math.sin(t * 0.9) * 0.5
      }
    }
  })

  return (
    <group>
      <group ref={cutter} visible={false}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 12]} />
          <meshStandardMaterial color="#d8b544" metalness={0.9} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.4, 16]} />
          <meshStandardMaterial color="#3a3e46" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
      <group ref={drillBit} visible={false}>
        <mesh>
          <coneGeometry args={[0.07, 0.5, 12]} />
          <meshStandardMaterial color="#9aa1ab" metalness={0.9} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.45, 12]} />
          <meshStandardMaterial color="#3a3e46" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
      <mesh ref={wheel} visible={false} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.45, 0.45, 0.18, 32]} />
        <meshStandardMaterial color="#7c4a3a" metalness={0.2} roughness={0.9} />
      </mesh>
      <group ref={electrode} visible={false} position={[0, 1.45, 0]}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.34, 0.5, 32]} />
          <meshStandardMaterial color="#2b2b2b" metalness={0.3} roughness={0.85} />
        </mesh>
        <pointLight ref={edmLight} color="#4da6ff" intensity={0} distance={4} position={[0, -0.5, 0]} />
      </group>
      <group ref={wire} visible={false}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.012, 3.4, 6]} />
          <meshBasicMaterial color="#7fd4ff" />
        </mesh>
        <pointLight color="#7fd4ff" intensity={1.4} distance={3} />
      </group>
    </group>
  )
}

function InspectionScan() {
  const plane = useRef<THREE.Mesh>(null)
  const rings = useRef<THREE.Group>(null)

  useFrame((state) => {
    const v = progressToStageValue(progressStore.smooth)
    const a = inWindow(v, 8.05, 9.2)
    const t = state.clock.elapsedTime
    if (plane.current) {
      plane.current.visible = a > 0.01
      plane.current.position.y = -1 + ((t * 0.7) % 1) * 3.4
      const m = plane.current.material as THREE.MeshBasicMaterial
      m.opacity = 0.22 * a
    }
    if (rings.current) {
      rings.current.visible = a > 0.01
      rings.current.children.forEach((r, i) => {
        r.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.04)
      })
    }
  })

  return (
    <group>
      <mesh ref={plane} visible={false} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.2, 3.2]} />
        <meshBasicMaterial color="#39ff8e" transparent opacity={0} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <group ref={rings} visible={false}>
        {[
          [-1.15, 0.85, -0.75],
          [1.15, 0.85, 0.75],
          [0, 1.9, 0],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.18, 0.22, 32]} />
            <meshBasicMaterial color="#39ff8e" transparent opacity={0.8} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export function StageEffects() {
  return (
    <group>
      <MachineTools />
      <InspectionScan />
      <Sparks color="#ffa040" origin={[0, 1.0, 0]} window={[1.15, 3.0]} />
      <Sparks color="#5ab8ff" origin={[0.4, 1.2, 0.3]} window={[1.3, 4.0]} speed={1.4} gravity={2.5} size={0.03} count={80} />
      <Sparks color="#c0c6ce" origin={[0, 1.1, 0]} window={[3.1, 4.0]} speed={1.8} size={0.04} count={90} />
      <Sparks color="#ffb340" origin={[0, 1.0, 0]} window={[4.1, 5.0]} speed={3.2} spread={1.6} gravity={5} count={160} />
      <Sparks color="#4da6ff" origin={[0, 0.9, 0]} window={[5.1, 6.0]} speed={1.2} gravity={1.2} size={0.045} count={110} />
      <Sparks color="#7fd4ff" origin={[0, 0.2, 0]} window={[6.1, 7.0]} speed={1.0} gravity={0.8} size={0.035} count={90} />
    </group>
  )
}
