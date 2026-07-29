import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { progressStore } from '@/lib/progress-store'
import { progressToStageValue } from '@/lib/stages'

function phase(v: number, start: number, len = 1): number {
  const t = THREE.MathUtils.clamp((v - start) / len, 0, 1)
  return t * t * (3 - 2 * t)
}

const STEEL_RAW = new THREE.Color('#5a5e66')
const STEEL_MACHINED = new THREE.Color('#8b919c')
const STEEL_GROUND = new THREE.Color('#b8bfc9')
const CAVITY_DARK = '#23262c'
const BRASS = '#b08d3f'

export function Workpiece() {
  const group = useRef<THREE.Group>(null)
  const blockMat = useRef<THREE.MeshStandardMaterial>(null)
  const block = useRef<THREE.Mesh>(null)
  const roughCavity = useRef<THREE.Mesh>(null)
  const pocketL = useRef<THREE.Mesh>(null)
  const pocketR = useRef<THREE.Mesh>(null)
  const stepFront = useRef<THREE.Mesh>(null)
  const holes = useRef<THREE.Group>(null)
  const coolingL = useRef<THREE.Mesh>(null)
  const coolingR = useRef<THREE.Mesh>(null)
  const edmCavity = useRef<THREE.Group>(null)
  const edmMat = useRef<THREE.MeshStandardMaterial>(null)
  const wireSlots = useRef<THREE.Group>(null)
  const assembly = useRef<THREE.Group>(null)
  const cavityPlate = useRef<THREE.Mesh>(null)
  const pillars = useRef<THREE.Group>(null)
  const sprue = useRef<THREE.Mesh>(null)

  const boltPositions = useMemo(
    () => [
      [-1.15, 0, -0.75],
      [1.15, 0, -0.75],
      [-1.15, 0, 0.75],
      [1.15, 0, 0.75],
    ],
    [],
  )

  useFrame((state, delta) => {
    progressStore.smooth = THREE.MathUtils.damp(progressStore.smooth, progressStore.p, 6, delta)
    const v = progressToStageValue(progressStore.smooth)

    const g = group.current
    if (!g) return

    const spinSpeed = v > 9 ? THREE.MathUtils.lerp(0.25, 0, phase(v, 9, 0.6)) : 0.25
    g.rotation.y += spinSpeed * delta

    const squared = phase(v, 1)
    if (block.current) {
      const s = THREE.MathUtils.lerp(1.06, 1.0, squared)
      block.current.scale.setScalar(s)
    }
    if (blockMat.current) {
      const ground = phase(v, 4)
      blockMat.current.color
        .copy(STEEL_RAW)
        .lerp(STEEL_MACHINED, squared)
        .lerp(STEEL_GROUND, ground)
      blockMat.current.roughness = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(0.75, 0.45, squared),
        0.12,
        ground,
      )
      blockMat.current.metalness = THREE.MathUtils.lerp(0.7, 0.95, ground)
    }

    const cav = phase(v, 1.2, 0.8)
    if (roughCavity.current) {
      roughCavity.current.visible = cav > 0.01
      roughCavity.current.scale.set(1, Math.max(cav, 0.001), 1)
      roughCavity.current.position.y = 0.81 - 0.25 * cav
    }

    const mill = phase(v, 2.1, 0.8)
    for (const m of [pocketL.current, pocketR.current, stepFront.current]) {
      if (m) {
        m.visible = mill > 0.01
        m.scale.setScalar(Math.max(mill, 0.001))
      }
    }

    const drill = phase(v, 3.1, 0.8)
    if (holes.current) {
      holes.current.visible = drill > 0.01
      holes.current.children.forEach((h, i) => {
        const d = phase(v, 3.1 + i * 0.12, 0.5)
        h.scale.set(1, Math.max(d, 0.001), 1)
        ;(h as THREE.Mesh).position.y = 0.85 - 0.85 * d
      })
    }
    for (const m of [coolingL.current, coolingR.current]) {
      if (m) {
        m.visible = drill > 0.3
        const d = phase(v, 3.5, 0.4)
        m.scale.set(Math.max(d, 0.001), 1, 1)
      }
    }

    const edm = phase(v, 5.1, 0.8)
    if (edmCavity.current) {
      edmCavity.current.visible = edm > 0.01
      edmCavity.current.scale.setScalar(Math.max(edm, 0.001))
    }
    if (edmMat.current) {
      const heat = edm * (1 - phase(v, 6, 0.5))
      edmMat.current.emissive.set('#3d9df0')
      edmMat.current.emissiveIntensity = heat * (1.2 + Math.sin(state.clock.elapsedTime * 30) * 0.5)
    }

    const wire = phase(v, 6.1, 0.8)
    if (wireSlots.current) {
      wireSlots.current.visible = wire > 0.01
      wireSlots.current.children.forEach((s, i) => {
        const w = phase(v, 6.1 + i * 0.15, 0.5)
        s.scale.set(1, 1, Math.max(w, 0.001))
      })
    }

    const assy = phase(v, 7.05, 0.9)
    if (assembly.current) assembly.current.visible = assy > 0.01
    if (cavityPlate.current) {
      cavityPlate.current.position.y = THREE.MathUtils.lerp(4.5, 1.35, phase(v, 7.1, 0.6))
    }
    if (pillars.current) {
      pillars.current.children.forEach((p, i) => {
        const t = phase(v, 7.05 + i * 0.08, 0.4)
        ;(p as THREE.Group).position.y = THREE.MathUtils.lerp(5.5, 1.05, t)
      })
    }
    if (sprue.current) {
      sprue.current.position.y = THREE.MathUtils.lerp(6, 2.1, phase(v, 7.5, 0.4))
    }

    const done = phase(v, 9, 0.8)
    if (cavityPlate.current && done > 0) {
      cavityPlate.current.position.y = 1.35 + done * 0.0
    }
    g.position.y = -0.2 - done * 0.1
  })

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <mesh ref={block} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.6, 2]} />
        <meshStandardMaterial ref={blockMat} color="#5a5e66" metalness={0.7} roughness={0.75} />
      </mesh>

      <mesh ref={roughCavity} visible={false} position={[0, 0.81, 0]}>
        <boxGeometry args={[1.7, 0.5, 1.1]} />
        <meshStandardMaterial color={CAVITY_DARK} metalness={0.6} roughness={0.6} />
      </mesh>

      <mesh ref={pocketL} visible={false} position={[-1.41, 0.1, 0]}>
        <boxGeometry args={[0.25, 0.7, 1.2]} />
        <meshStandardMaterial color={CAVITY_DARK} metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh ref={pocketR} visible={false} position={[1.41, 0.1, 0]}>
        <boxGeometry args={[0.25, 0.7, 1.2]} />
        <meshStandardMaterial color={CAVITY_DARK} metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh ref={stepFront} visible={false} position={[0, 0.65, 1.01]}>
        <boxGeometry args={[2.2, 0.35, 0.15]} />
        <meshStandardMaterial color={CAVITY_DARK} metalness={0.6} roughness={0.5} />
      </mesh>

      <group ref={holes} visible={false}>
        {boltPositions.map((p, i) => (
          <mesh key={i} position={[p[0], 0.85, p[2]]}>
            <cylinderGeometry args={[0.09, 0.09, 1.7, 16]} />
            <meshStandardMaterial color="#141518" metalness={0.4} roughness={0.7} />
          </mesh>
        ))}
      </group>
      <mesh ref={coolingL} visible={false} position={[0, -0.35, 0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 2.85, 12]} />
        <meshStandardMaterial color="#0e2f45" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh ref={coolingR} visible={false} position={[0, -0.35, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 2.85, 12]} />
        <meshStandardMaterial color="#0e2f45" metalness={0.5} roughness={0.4} />
      </mesh>

      <group ref={edmCavity} visible={false} position={[0, 0.55, 0]}>
        <mesh>
          <cylinderGeometry args={[0.45, 0.38, 0.4, 32]} />
          <meshStandardMaterial
            ref={edmMat}
            color="#1a1d22"
            metalness={0.8}
            roughness={0.3}
            emissive="#3d9df0"
            emissiveIntensity={0}
          />
        </mesh>
        <mesh position={[0.65, 0, 0.35]}>
          <boxGeometry args={[0.3, 0.35, 0.3]} />
          <meshStandardMaterial color="#1a1d22" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.65, 0, -0.35]}>
          <boxGeometry args={[0.3, 0.35, 0.3]} />
          <meshStandardMaterial color="#1a1d22" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      <group ref={wireSlots} visible={false}>
        {[-0.5, 0, 0.5].map((x, i) => (
          <mesh key={i} position={[x, -0.3, 0]}>
            <boxGeometry args={[0.06, 0.9, 2.02]} />
            <meshStandardMaterial color="#101216" metalness={0.5} roughness={0.5} />
          </mesh>
        ))}
      </group>

      <group ref={assembly} visible={false}>
        <mesh ref={cavityPlate} position={[0, 4.5, 0]} castShadow>
          <boxGeometry args={[2.8, 0.9, 2]} />
          <meshStandardMaterial color="#9aa1ab" metalness={0.9} roughness={0.2} />
        </mesh>
        <group ref={pillars}>
          {boltPositions.map((p, i) => (
            <group key={i} position={[p[0], 5.5, p[2]]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.11, 0.11, 2.6, 20]} />
                <meshStandardMaterial color="#c8ced6" metalness={0.95} roughness={0.15} />
              </mesh>
              <mesh position={[0, -0.9, 0]}>
                <cylinderGeometry args={[0.17, 0.17, 0.25, 20]} />
                <meshStandardMaterial color={BRASS} metalness={0.85} roughness={0.35} />
              </mesh>
            </group>
          ))}
        </group>
        <mesh ref={sprue} position={[0, 6, 0]}>
          <cylinderGeometry args={[0.32, 0.32, 0.28, 28]} />
          <meshStandardMaterial color={BRASS} metalness={0.85} roughness={0.35} />
        </mesh>
      </group>
    </group>
  )
}
