'use client'

import { useMemo, useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Draped shimmering silk.
 * A high-segment plane whose vertices ripple with layered sine waves so it
 * reads as flowing wedding-canopy fabric. A metallic gold material catches the
 * warm lights for that liquid-gold shimmer.
 */
function Silk({
  z = 0,
  speed = 1,
  tone = '#e6b34d',
  rotation = [-0.18, 0, 0.05] as [number, number, number],
}: {
  z?: number
  speed?: number
  tone?: string
  rotation?: [number, number, number]
}) {
  const geoRef = useRef<THREE.PlaneGeometry>(null)

  // cache the flat rest positions so we can re-derive the wave each frame
  const base = useMemo(() => {
    const g = new THREE.PlaneGeometry(11, 6.5, 60, 40)
    const arr = (g.attributes.position.array as Float32Array).slice()
    g.dispose()
    return arr
  }, [])

  useFrame((state) => {
    const geo = geoRef.current
    if (!geo) return
    const t = state.clock.elapsedTime * speed
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3
      const x = base[ix]
      const y = base[ix + 1]
      // layered waves = cloth caught in a soft breeze
      const wave =
        Math.sin(x * 0.9 + t * 1.1) * 0.5 +
        Math.sin(y * 1.3 + t * 0.8) * 0.38 +
        Math.sin((x + y) * 0.6 + t * 1.6) * 0.22
      pos.setZ(i, wave)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  })

  return (
    <mesh position={[0, 0, z]} rotation={rotation}>
      <planeGeometry ref={geoRef} args={[11, 6.5, 60, 40]} />
      <meshStandardMaterial
        color={tone}
        metalness={1}
        roughness={0.26}
        side={THREE.DoubleSide}
        emissive={'#3a1f04'}
        emissiveIntensity={0.35}
      />
    </mesh>
  )
}

/** Warm key light that drifts across the folds, making the shimmer travel. */
function SweepingLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.x = Math.sin(t * 0.4) * 5
    ref.current.position.y = Math.cos(t * 0.3) * 2.4
  })
  return <pointLight ref={ref} position={[3, 2, 5]} intensity={45} color="#ffce7a" distance={20} decay={1.3} />
}

/** Camera slowly drifts / dollies for a living cinematic feel. */
function CameraRig() {
  const { camera } = useThree()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.position.x = Math.sin(t * 0.12) * 0.5
    camera.position.y = 0.2 + Math.cos(t * 0.1) * 0.2
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#120b06']} />
      <fog attach="fog" args={['#120b06', 9, 20]} />

      <ambientLight intensity={0.35} color="#ffdca8" />
      <SweepingLight />
      <directionalLight position={[-6, 3, 4]} intensity={1.2} color="#ffd27a" />

      {/* layered silks at different depths for parallax + richness */}
      <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.4}>
        <Silk z={0.2} speed={0.9} tone="#e9b74f" rotation={[-0.16, 0.04, 0.05]} />
      </Float>
      <Float speed={1} rotationIntensity={0.18} floatIntensity={0.5}>
        <Silk z={-2.6} speed={0.62} tone="#b9822f" rotation={[-0.2, -0.06, -0.04]} />
      </Float>
      <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.3}>
        <Silk z={-5} speed={0.45} tone="#7d5216" rotation={[-0.24, 0.02, 0.02]} />
      </Float>

      <CameraRig />
      <Environment preset="sunset" environmentIntensity={0.55} />
    </>
  )
}

export function OpeningScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.2, 6.5], fov: 44 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

export default OpeningScene
