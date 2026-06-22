"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Stars, Float } from "@react-three/drei"
import * as THREE from "three"

/* ─── AIR FLOW PARTICLES ─── */
function AirFlow({ active }: { active: boolean }) {
  const count = 180
  const ref = useRef<THREE.Points>(null!)

  const { pos, vel } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 3.6
      pos[i * 3 + 1] = -0.6 - Math.random() * 0.2
      pos[i * 3 + 2] = 0.2 + Math.random() * 0.1
      vel[i * 3]     = (Math.random() - 0.5) * 0.006
      vel[i * 3 + 1] = -(0.01 + Math.random() * 0.015)
      vel[i * 3 + 2] = 0
    }
    return { pos, vel }
  }, [])

  useFrame(() => {
    if (!ref.current || !active) return
    const arr = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3]     += vel[i * 3]
      arr[i * 3 + 1] += vel[i * 3 + 1]
      arr[i * 3 + 2] += vel[i * 3 + 2]
      if (arr[i * 3 + 1] < -3.8) {
        arr[i * 3]     = (Math.random() - 0.5) * 3.6
        arr[i * 3 + 1] = -0.6
        arr[i * 3 + 2] = 0.2 + Math.random() * 0.1
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#7dd3fc"
        transparent
        opacity={active ? 0.65 : 0}
        sizeAttenuation
      />
    </points>
  )
}

/* ─── COOL RING WAVES ─── */
function CoolWaves({ active }: { active: boolean }) {
  const refs = [useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!)]

  useFrame(({ clock }) => {
    refs.forEach((r, i) => {
      if (!r.current) return
      const t = ((clock.getElapsedTime() * 0.6) + i * 1.1) % 3.3
      const s = 0.3 + t * 1.0
      r.current.scale.set(s, s * 0.3, 1)
      const m = r.current.material as THREE.MeshBasicMaterial
      m.opacity = active ? Math.max(0, (1 - t / 3.3) * 0.18) : 0
    })
  })

  return (
    <group position={[0, -1.8, 0.1]}>
      {refs.map((r, i) => (
        <mesh key={i} ref={r}>
          <ringGeometry args={[0.9, 1.0, 48]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── VENT FLAP ─── */
function VentFlap({ open }: { open: boolean }) {
  const ref = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (!ref.current) return
    const target = open ? -0.55 : 0
    ref.current.rotation.x += (target - ref.current.rotation.x) * 0.06
  })

  return (
    // pivot at top of flap
    <group ref={ref} position={[0, -0.58, 0.22]}>
      {/* Main flap */}
      <mesh position={[0, -0.09, 0]}>
        <boxGeometry args={[3.82, 0.18, 0.04]} />
        <meshStandardMaterial color="#f0f4f8" roughness={0.08} metalness={0.1} />
      </mesh>
    </group>
  )
}

/* ─── LOUVER SLATS (inside vent when open) ─── */
function Louvers({ count = 11 }: { count?: number }) {
  return (
    <group position={[0, -0.5, 0.17]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[(i - (count - 1) / 2) * 0.33, 0, 0]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.025, 0.14, 0.12]} />
          <meshStandardMaterial color="#2a3540" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── DIGITAL DISPLAY (right side) ─── */
function Display({ on, temp }: { on: boolean; temp: number }) {
  const glowRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!glowRef.current) return
    const m = glowRef.current.material as THREE.MeshStandardMaterial
    m.emissiveIntensity = on ? 0.5 + Math.sin(clock.getElapsedTime() * 1.5) * 0.15 : 0
  })

  return (
    <group position={[1.65, 0.05, 0.235]}>
      {/* Panel */}
      <mesh>
        <boxGeometry args={[0.28, 0.32, 0.012]} />
        <meshStandardMaterial color="#e8edf3" roughness={0.05} metalness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh ref={glowRef} position={[0, 0.04, 0.008]}>
        <boxGeometry args={[0.2, 0.12, 0.002]} />
        <meshStandardMaterial
          color={on ? "#0ea5e9" : "#1a2030"}
          emissive={on ? "#0ea5e9" : "#000"}
          emissiveIntensity={0}
          roughness={0.1}
        />
      </mesh>
      {/* LED dot */}
      <mesh position={[0, -0.1, 0.008]}>
        <circleGeometry args={[0.018, 12]} />
        <meshStandardMaterial
          color={on ? "#38bdf8" : "#333"}
          emissive={on ? "#38bdf8" : "#000"}
          emissiveIntensity={on ? 1 : 0}
        />
      </mesh>
    </group>
  )
}

/* ─── MAIN AC BODY ─── */
function ACUnit({ on, temp }: { on: boolean; temp: number }) {
  const floatRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (!floatRef.current) return
    floatRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.04
  })

  return (
    <group ref={floatRef} position={[0, 0.2, 0]}>
      {/* ── MAIN HOUSING ── */}
      {/* Core body */}
      <mesh castShadow>
        <boxGeometry args={[4.0, 1.28, 0.44]} />
        <meshStandardMaterial
          color="#f2f6fa"
          roughness={0.06}
          metalness={0.12}
        />
      </mesh>

      {/* Top rounded edge (slight bevel effect) */}
      <mesh position={[0, 0.63, -0.04]}>
        <cylinderGeometry args={[2.0, 2.0, 0.44, 48, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#edf1f6" roughness={0.05} metalness={0.15} />
      </mesh>

      {/* Front face — slightly lighter */}
      <mesh position={[0, 0, 0.225]}>
        <boxGeometry args={[3.95, 1.24, 0.005]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.04} metalness={0.08} />
      </mesh>

      {/* Bottom vent opening (dark slot) */}
      <mesh position={[0, -0.5, 0.225]}>
        <boxGeometry args={[3.85, 0.21, 0.006]} />
        <meshStandardMaterial color="#111820" roughness={0.9} />
      </mesh>

      {/* Subtle horizontal crease line */}
      <mesh position={[0, 0.1, 0.228]}>
        <boxGeometry args={[3.9, 0.007, 0.003]} />
        <meshStandardMaterial color="#d8e0ea" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Left edge cap */}
      <mesh position={[-1.985, 0, 0]}>
        <boxGeometry args={[0.03, 1.25, 0.42]} />
        <meshStandardMaterial color="#dde4ee" roughness={0.1} metalness={0.2} />
      </mesh>
      {/* Right edge cap */}
      <mesh position={[1.985, 0, 0]}>
        <boxGeometry args={[0.03, 1.25, 0.42]} />
        <meshStandardMaterial color="#dde4ee" roughness={0.1} metalness={0.2} />
      </mesh>

      {/* Bottom strip — brand accent line */}
      <mesh position={[0, -0.62, 0.228]}>
        <boxGeometry args={[3.85, 0.01, 0.003]} />
        <meshStandardMaterial
          color={on ? "#0ea5e9" : "#c0cad6"}
          emissive={on ? "#0ea5e9" : "#000"}
          emissiveIntensity={on ? 0.6 : 0}
        />
      </mesh>

      {/* Louver slats */}
      <Louvers count={11} />

      {/* Vent flap */}
      <VentFlap open={on} />

      {/* Display */}
      <Display on={on} temp={temp} />

      {/* Glow light when on */}
      {on && (
        <pointLight
          position={[0, -1.2, 1.5]}
          color="#38bdf8"
          intensity={1.2}
          distance={6}
        />
      )}
    </group>
  )
}

/* ─── WALL ─── */
function Wall() {
  return (
    <mesh position={[0, 0, -0.55]} receiveShadow>
      <boxGeometry args={[12, 8, 0.1]} />
      <meshStandardMaterial color="#0a0e14" roughness={0.95} metalness={0} />
    </mesh>
  )
}

/* ─── WALL SHADOW (projected under unit) ─── */
function UnitShadow() {
  return (
    <mesh position={[0, 0.18, -0.49]}>
      <boxGeometry args={[4.2, 1.35, 0.01]} />
      <meshStandardMaterial color="#000" transparent opacity={0.35} roughness={1} />
    </mesh>
  )
}

/* ─── CAMERA FOLLOW ─── */
function CameraFollow() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.7
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.35
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x - camera.position.x) * 0.035
    camera.position.y += (mouse.current.y + 0.15 - camera.position.y) * 0.035
    camera.lookAt(0, 0.1, 0)
  })

  return null
}

/* ─── SCENE ─── */
function Scene() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(34)

  useEffect(() => {
    const t1 = setTimeout(() => setOn(true), 1400)
    let t = 34
    const iv = setInterval(() => {
      t = Math.max(22, t - 0.4)
      setTemp(Math.round(t))
      if (t <= 22) clearInterval(iv)
    }, 120)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [])

  return (
    <>
      <Stars radius={28} depth={5} count={220} factor={1.2} saturation={0} fade speed={0.25} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 4, 6]} intensity={1.4} color="#ffffff" castShadow />
      <directionalLight position={[-3, 2, 3]} intensity={0.5} color="#b8d4f0" />
      <pointLight position={[0, 3, 5]} intensity={0.5} color="#ffffff" />

      <Wall />
      <UnitShadow />
      <ACUnit on={on} temp={temp} />
      <AirFlow active={on} />
      <CoolWaves active={on} />
      <CameraFollow />
    </>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.15, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  )
}
