"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

/* ══════════════════════════════════════
   AIR FLOW PARTICLES
══════════════════════════════════════ */
function AirFlow({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null!)
  const count = 200

  const { pos, vel } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 4.2
      pos[i * 3 + 1] = -0.75 - Math.random() * 0.15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4
      vel[i * 3]     = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 1] = -(0.009 + Math.random() * 0.013)
      vel[i * 3 + 2] = 0
    }
    return { pos, vel }
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const a = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      if (!active) { a[i * 3 + 1] = -999; continue }
      a[i * 3]     += vel[i * 3]
      a[i * 3 + 1] += vel[i * 3 + 1]
      if (a[i * 3 + 1] < -4.2) {
        a[i * 3]     = (Math.random() - 0.5) * 4.2
        a[i * 3 + 1] = -0.75
        a[i * 3 + 2] = (Math.random() - 0.5) * 0.4
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#7dd3fc" transparent opacity={active ? 0.55 : 0} sizeAttenuation />
    </points>
  )
}

/* ══════════════════════════════════════
   COOL RING PULSES
══════════════════════════════════════ */
function CoolRings({ active }: { active: boolean }) {
  const refs = [useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!)]

  useFrame(({ clock }) => {
    refs.forEach((r, i) => {
      if (!r.current) return
      const t = ((clock.getElapsedTime() * 0.55) + i * 1.2) % 3.6
      const s = 0.2 + t * 0.85
      r.current.scale.set(s, s * 0.25, 1)
      const m = r.current.material as THREE.MeshBasicMaterial
      m.opacity = active ? Math.max(0, (1 - t / 3.6) * 0.14) : 0
    })
  })

  return (
    <group position={[0, -2.0, 0]}>
      {refs.map((r, i) => (
        <mesh key={i} ref={r}>
          <ringGeometry args={[1.0, 1.08, 52]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* ══════════════════════════════════════
   DIGITAL DISPLAY (top-right)
══════════════════════════════════════ */
function DigitalDisplay({ temp, on }: { temp: number; on: boolean }) {
  const glowRef = useRef<THREE.Mesh>(null!)
  const frameRef = useRef<number>(0)

  useFrame(({ clock }) => {
    if (!glowRef.current) return
    const m = glowRef.current.material as THREE.MeshStandardMaterial
    m.emissiveIntensity = on
      ? 0.55 + Math.sin(clock.getElapsedTime() * 1.8) * 0.1
      : 0.0
    frameRef.current++
  })

  const digits = String(temp).padStart(2, "0")

  return (
    <group position={[1.52, 0.28, 0.24]}>
      {/* Ghost screen background */}
      <mesh>
        <boxGeometry args={[0.44, 0.22, 0.002]} />
        <meshStandardMaterial color="#e8ecf2" roughness={0.2} transparent opacity={0.4} />
      </mesh>
      {/* Glow plane */}
      <mesh ref={glowRef} position={[0, 0, 0.003]}>
        <boxGeometry args={[0.42, 0.2, 0.001]} />
        <meshStandardMaterial
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0}
          transparent
          opacity={on ? 0.18 : 0}
        />
      </mesh>
      {/* Digit segments — simple box approximation */}
      {on && [0, 1].map((d) => (
        <group key={d} position={[(d - 0.5) * 0.17, 0, 0.005]}>
          {/* horizontal top */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.09, 0.014, 0.001]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
          {/* horizontal mid */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.09, 0.014, 0.001]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
          {/* horizontal bot */}
          <mesh position={[0, -0.06, 0]}>
            <boxGeometry args={[0.09, 0.014, 0.001]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
          {/* vertical top-left */}
          <mesh position={[-0.047, 0.032, 0]}>
            <boxGeometry args={[0.014, 0.055, 0.001]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
          {/* vertical bot-left */}
          <mesh position={[-0.047, -0.032, 0]}>
            <boxGeometry args={[0.014, 0.055, 0.001]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
          {/* vertical top-right */}
          <mesh position={[0.047, 0.032, 0]}>
            <boxGeometry args={[0.014, 0.055, 0.001]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
          {/* vertical bot-right */}
          <mesh position={[0.047, -0.032, 0]}>
            <boxGeometry args={[0.014, 0.055, 0.001]} />
            <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ══════════════════════════════════════
   VENT FLAP (opens when on)
══════════════════════════════════════ */
function VentFlap({ open }: { open: boolean }) {
  const pivotRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!pivotRef.current) return
    const target = open ? -0.52 : 0.0
    pivotRef.current.rotation.x += (target - pivotRef.current.rotation.x) * 0.05
  })

  return (
    <group ref={pivotRef} position={[0, -0.72, 0.24]}>
      <mesh position={[0, -0.1, 0.04]}>
        <boxGeometry args={[4.52, 0.2, 0.045]} />
        <meshStandardMaterial color="#f0f3f8" roughness={0.12} metalness={0.08} />
      </mesh>
    </group>
  )
}

/* ══════════════════════════════════════
   MAIN AC UNIT — pill-shaped premium
══════════════════════════════════════ */
function ACUnit({ on, temp }: { on: boolean; temp: number }) {
  const rootRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (!rootRef.current) return
    rootRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.55) * 0.045
  })

  return (
    <group ref={rootRef}>

      {/* ── UPPER SHELL (large pill top half) ── */}
      {/* The rounded pill look comes from a half-cylinder on top + box body */}
      <mesh position={[0, 0.36, 0]} castShadow>
        <cylinderGeometry args={[2.26, 2.26, 0.46, 64, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#f4f7fb" roughness={0.06} metalness={0.12} />
      </mesh>
      {/* Left half-sphere cap */}
      <mesh position={[-2.26, 0.36, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <sphereGeometry args={[0.23, 32, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#f4f7fb" roughness={0.06} metalness={0.12} />
      </mesh>
      {/* Right half-sphere cap */}
      <mesh position={[2.26, 0.36, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <sphereGeometry args={[0.23, 32, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#f4f7fb" roughness={0.06} metalness={0.12} />
      </mesh>

      {/* ── MAIN RECTANGULAR BODY ── */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[4.52, 0.9, 0.46]} />
        <meshStandardMaterial color="#f0f4f9" roughness={0.07} metalness={0.1} />
      </mesh>

      {/* ── FRONT FACE (subtle lighter panel) ── */}
      <mesh position={[0, 0.12, 0.234]}>
        <boxGeometry args={[4.48, 1.1, 0.004]} />
        <meshStandardMaterial color="#f8fafd" roughness={0.04} metalness={0.06} />
      </mesh>

      {/* ── SILVER ACCENT BAND ── */}
      <mesh position={[0, -0.52, 0.22]}>
        <boxGeometry args={[4.45, 0.06, 0.015]} />
        <meshStandardMaterial color="#b8c4d0" roughness={0.15} metalness={0.7} />
      </mesh>

      {/* ── LOWER VENT AREA (recessed, darker) ── */}
      <mesh position={[0, -0.7, 0.18]}>
        <boxGeometry args={[4.48, 0.32, 0.04]} />
        <meshStandardMaterial color="#d8dde6" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Louver lines inside vent */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0, -0.58 - i * 0.028, 0.2]}>
          <boxGeometry args={[4.3, 0.006, 0.025]} />
          <meshStandardMaterial color="#c0c8d4" roughness={0.4} metalness={0.3} />
        </mesh>
      ))}

      {/* ── LOGO TEXT AREA (center) ── */}
      <mesh position={[0, 0.04, 0.236]}>
        <boxGeometry args={[0.55, 0.05, 0.001]} />
        <meshStandardMaterial
          color="#c0cad6"
          roughness={0.3}
        />
      </mesh>
      {/* Tiny klimeon lettering dots (decorative) */}
      {[-0.18, -0.09, 0, 0.09, 0.18].map((x, i) => (
        <mesh key={i} position={[x, 0.04, 0.237]}>
          <boxGeometry args={[0.032, 0.016, 0.001]} />
          <meshStandardMaterial color="#a0aab6" roughness={0.5} />
        </mesh>
      ))}

      {/* ── BOTTOM ROUNDED EDGE ── */}
      <mesh position={[0, -0.88, 0]} castShadow>
        <cylinderGeometry args={[2.26, 2.26, 0.46, 64, 1, false, Math.PI, Math.PI]} />
        <meshStandardMaterial color="#e8ecf2" roughness={0.1} metalness={0.1} />
      </mesh>
      {/* Left bottom-sphere cap */}
      <mesh position={[-2.26, -0.88, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
        <sphereGeometry args={[0.23, 32, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#e8ecf2" roughness={0.1} metalness={0.1} />
      </mesh>
      {/* Right bottom-sphere cap */}
      <mesh position={[2.26, -0.88, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
        <sphereGeometry args={[0.23, 32, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#e8ecf2" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* Left end cap fill */}
      <mesh position={[-2.26, -0.26, 0]}>
        <boxGeometry args={[0.46, 1.24, 0.46]} />
        <meshStandardMaterial color="#eef1f7" roughness={0.08} metalness={0.1} />
      </mesh>
      {/* Right end cap fill */}
      <mesh position={[2.26, -0.26, 0]}>
        <boxGeometry args={[0.46, 1.24, 0.46]} />
        <meshStandardMaterial color="#eef1f7" roughness={0.08} metalness={0.1} />
      </mesh>

      {/* ── VENT FLAP ── */}
      <VentFlap open={on} />

      {/* ── DIGITAL DISPLAY ── */}
      <DigitalDisplay temp={temp} on={on} />

      {/* ── GLOW LIGHT WHEN ON ── */}
      {on && (
        <pointLight position={[0, -1.4, 1.8]} color="#38bdf8" intensity={1.0} distance={5} />
      )}
    </group>
  )
}

/* ══════════════════════════════════════
   SUBTLE AMBIENT GLOW BEHIND UNIT
══════════════════════════════════════ */
function BackGlow({ active }: { active: boolean }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!ref.current) return
    const m = ref.current.material as THREE.MeshBasicMaterial
    m.opacity = active
      ? 0.08 + Math.sin(clock.getElapsedTime() * 0.8) * 0.025
      : 0.0
  })

  return (
    <mesh ref={ref} position={[0, -0.1, -0.35]}>
      <planeGeometry args={[7, 4]} />
      <meshBasicMaterial color="#0ea5e9" transparent opacity={0} />
    </mesh>
  )
}

/* ══════════════════════════════════════
   CAMERA FOLLOW MOUSE
══════════════════════════════════════ */
function CameraFollow() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.65
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.3
    }
    window.addEventListener("mousemove", h)
    return () => window.removeEventListener("mousemove", h)
  }, [])

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x - camera.position.x) * 0.03
    camera.position.y += (mouse.current.y + 0.1 - camera.position.y) * 0.03
    camera.lookAt(0, -0.1, 0)
  })

  return null
}

/* ══════════════════════════════════════
   SCENE
══════════════════════════════════════ */
function Scene() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(34)

  useEffect(() => {
    const t1 = setTimeout(() => setOn(true), 1600)
    let t = 34
    const iv = setInterval(() => {
      t = Math.max(22, t - 0.35)
      setTemp(Math.round(t))
      if (t <= 22) clearInterval(iv)
    }, 110)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [])

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={1.1} color="#ffffff" />
      <directionalLight position={[1, 3, 5]} intensity={1.6} color="#ffffff" castShadow />
      <directionalLight position={[-2, 1, 3]} intensity={0.5} color="#ddeeff" />
      <directionalLight position={[0, -2, 4]} intensity={0.3} color="#ffffff" />
      <spotLight position={[0, 4, 4]} angle={0.6} intensity={0.8} color="#ffffff" penumbra={0.4} />

      <BackGlow active={on} />
      <ACUnit on={on} temp={temp} />
      <AirFlow active={on} />
      <CoolRings active={on} />
      <CameraFollow />
    </>
  )
}

/* ══════════════════════════════════════
   EXPORT
══════════════════════════════════════ */
export default function HeroCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 7.5], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  )
}
