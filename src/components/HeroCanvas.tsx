"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { RoundedBox, Stars, Text3D, Float } from "@react-three/drei"
import * as THREE from "three"

/* ─── AIR PARTICLES ─── */
function AirParticles({ active }: { active: boolean }) {
  const count = 120
  const ref = useRef<THREE.Points>(null!)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 2.2   // x spread
      positions[i * 3 + 1] = -0.1 + Math.random() * -2.5    // start near unit, go down
      positions[i * 3 + 2] = 0.3 + Math.random() * 0.3
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.008
      velocities[i * 3 + 1] = -(0.008 + Math.random() * 0.012)
      velocities[i * 3 + 2] = 0
    }
    return { positions, velocities }
  }, [])

  const posRef = useRef(positions.slice())

  useFrame(() => {
    if (!active || !ref.current) return
    const pos = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] += velocities[i * 3 + 0]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]
      // reset if fallen too low
      if (pos[i * 3 + 1] < -3.5) {
        pos[i * 3 + 0] = (Math.random() - 0.5) * 2.2
        pos[i * 3 + 1] = -0.1
        pos[i * 3 + 2] = 0.3 + Math.random() * 0.2
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#38bdf8"
        transparent
        opacity={active ? 0.7 : 0}
        sizeAttenuation
      />
    </points>
  )
}

/* ─── VENT SLATS ─── */
function VentSlats({ count = 6, width = 2.0, y = -0.12 }: {
  count?: number; width?: number; y?: number
}) {
  return (
    <group position={[0, y, 0.08]}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[0, -(i * 0.055), 0]} rotation={[0.35, 0, 0]}>
          <boxGeometry args={[width - 0.1, 0.018, 0.08]} />
          <meshStandardMaterial color="#1a2530" roughness={0.5} metalness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── MAIN AC UNIT ─── */
function ACUnit({ on }: { on: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)
  const ledRef = useRef<THREE.Mesh>(null!)
  const glowRef = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    // gentle floating
    groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.04
    // LED blink when turning on
    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = on
        ? 0.7 + Math.sin(clock.getElapsedTime() * 2) * 0.3
        : 0
    }
    if (glowRef.current) {
      glowRef.current.intensity = on
        ? 1.5 + Math.sin(clock.getElapsedTime() * 1.5) * 0.5
        : 0
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* MAIN BODY */}
      <mesh>
        <boxGeometry args={[2.6, 0.75, 0.38]} />
        <meshStandardMaterial
          color="#e8edf2"
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>

      {/* TOP CURVE / BEVEL */}
      <mesh position={[0, 0.375, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.04, 40, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#dde3ea" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* FRONT FACE PANEL */}
      <mesh position={[0, 0.02, 0.195]}>
        <boxGeometry args={[2.5, 0.68, 0.01]} />
        <meshStandardMaterial color="#f0f4f8" roughness={0.1} metalness={0.3} />
      </mesh>

      {/* VENT OPENING (bottom front) */}
      <mesh position={[0, -0.22, 0.19]}>
        <boxGeometry args={[2.3, 0.2, 0.015]} />
        <meshStandardMaterial color="#111820" roughness={0.8} />
      </mesh>

      {/* SLATS in the vent */}
      <VentSlats count={5} width={2.2} y={-0.22} />

      {/* DISPLAY area */}
      <mesh position={[0.55, 0.18, 0.2]}>
        <boxGeometry args={[0.55, 0.18, 0.005]} />
        <meshStandardMaterial color="#0a1520" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* TEMP display glow */}
      {on && (
        <mesh position={[0.55, 0.18, 0.205]}>
          <boxGeometry args={[0.5, 0.14, 0.001]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* POWER LED */}
      <mesh ref={ledRef} position={[-0.9, 0.18, 0.2]}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial
          color={on ? "#38bdf8" : "#334"}
          emissive={on ? "#38bdf8" : "#000"}
          emissiveIntensity={0}
          roughness={0.1}
        />
      </mesh>

      {/* Decorative stripe */}
      <mesh position={[0, -0.02, 0.196]}>
        <boxGeometry args={[2.45, 0.012, 0.005]} />
        <meshStandardMaterial
          color={on ? "#0ea5e9" : "#334"}
          emissive={on ? "#0ea5e9" : "#000"}
          emissiveIntensity={on ? 0.5 : 0}
        />
      </mesh>

      {/* LOGO dot */}
      <mesh position={[-0.6, 0.18, 0.201]}>
        <circleGeometry args={[0.018, 16]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={on ? 0.8 : 0.1} />
      </mesh>

      {/* Side shadow details */}
      <mesh position={[1.28, 0, 0]}>
        <boxGeometry args={[0.04, 0.72, 0.36]} />
        <meshStandardMaterial color="#c8d0da" roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-1.28, 0, 0]}>
        <boxGeometry args={[0.04, 0.72, 0.36]} />
        <meshStandardMaterial color="#c8d0da" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Glow light from unit when on */}
      <pointLight
        ref={glowRef}
        position={[0, -0.5, 1]}
        color="#38bdf8"
        intensity={0}
        distance={5}
      />
    </group>
  )
}

/* ─── WALL MOUNT BRACKET ─── */
function WallBracket() {
  return (
    <mesh position={[0, 0.8, -0.05]}>
      <boxGeometry args={[2.7, 0.12, 0.06]} />
      <meshStandardMaterial color="#1a2028" roughness={0.6} metalness={0.3} />
    </mesh>
  )
}

/* ─── TEMPERATURE DISPLAY FLOATER ─── */
function TempFloater({ temp }: { temp: number }) {
  const ref = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = 1.6 + Math.sin(clock.getElapsedTime() * 0.8 + 1) * 0.06
    }
  })

  const color = temp > 30 ? "#ef4444" : temp > 26 ? "#fb923c" : "#38bdf8"

  return (
    <group ref={ref} position={[1.6, 1.6, 0.3]}>
      {/* Card bg */}
      <mesh>
        <boxGeometry args={[0.85, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#0a1520"
          transparent
          opacity={0.85}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {/* Colored border */}
      <mesh position={[0, 0, 0.011]}>
        <boxGeometry args={[0.85, 0.005, 0.001]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      <mesh position={[0, -0.247, 0.011]}>
        <boxGeometry args={[0.85, 0.005, 0.001]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
}

/* ─── COOL MIST RINGS ─── */
function CoolRings({ active }: { active: boolean }) {
  const rings = [0, 1, 2]
  const refs = [useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!), useRef<THREE.Mesh>(null!)]

  useFrame(({ clock }) => {
    rings.forEach((_, i) => {
      const ref = refs[i]
      if (!ref.current || !active) return
      const t = (clock.getElapsedTime() * 0.5 + i * 0.8) % 3
      const s = 0.4 + t * 1.2
      ref.current.scale.setScalar(s)
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(0, (1 - t / 3) * 0.25)
    })
  })

  return (
    <group position={[0, -1.2, 0.2]}>
      {rings.map((_, i) => (
        <mesh key={i} ref={refs[i]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.02, 8, 60]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  )
}

/* ─── SCENE ─── */
function Scene() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(34)

  useEffect(() => {
    // Turn on after 1.5s
    const t1 = setTimeout(() => setOn(true), 1500)
    // Cool down
    let t = 34
    const interval = setInterval(() => {
      t = Math.max(22, t - 0.5)
      setTemp(Math.round(t))
      if (t <= 22) clearInterval(interval)
    }, 150)
    return () => { clearTimeout(t1); clearInterval(interval) }
  }, [])

  return (
    <>
      <Stars radius={25} depth={6} count={250} factor={1.5} saturation={0} fade speed={0.3} />

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="#ffffff" castShadow />
      <directionalLight position={[-3, 2, 2]} intensity={0.4} color="#b0c8e0" />
      <pointLight position={[0, -2, 3]} intensity={0.6} color="#0ea5e9" distance={8} />

      <WallBracket />
      <ACUnit on={on} />
      <AirParticles active={on} />
      <CoolRings active={on} />
      <TempFloater temp={temp} />
    </>
  )
}

/* ─── CAMERA RIG ─── */
function CameraRig() {
  const mouse = useRef({ x: 0, y: 0 })
  const { camera } = useFrame as unknown as never

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.6
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  // Use a group ref approach via useFrame directly
  return null
}

function CameraFollow() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.8
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [])

  useFrame(({ camera }) => {
    camera.position.x += (mouse.current.x - camera.position.x) * 0.04
    camera.position.y += (mouse.current.y + 0.2 - camera.position.y) * 0.04
    camera.lookAt(0, 0.3, 0)
  })

  return null
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <CameraFollow />
      <Scene />
    </Canvas>
  )
}
