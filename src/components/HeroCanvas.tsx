"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Sphere, Torus, MeshDistortMaterial, Float, Stars } from "@react-three/drei"
import * as THREE from "three"

// Animated floating orb — main centerpiece
function CoolOrb({ phase }: { phase: "hot" | "cooling" | "cool" }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15
      meshRef.current.rotation.y = t * 0.2
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4
      innerRef.current.rotation.z = Math.sin(t * 0.5) * 0.1
    }
  })

  const hotColor = new THREE.Color(0.9, 0.2, 0.1)
  const coolColor = new THREE.Color(0.05, 0.65, 0.95)
  const color = phase === "cool" ? coolColor : phase === "cooling"
    ? new THREE.Color().lerpColors(hotColor, coolColor, 0.5)
    : hotColor

  return (
    <group position={[0, 0, 0]}>
      {/* Outer ring */}
      <Torus args={[2.2, 0.02, 8, 120]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </Torus>
      <Torus args={[2.8, 0.015, 8, 100]} rotation={[Math.PI / 3, 0.5, 0]}>
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </Torus>

      {/* Main distorted sphere */}
      <Sphere ref={meshRef} args={[1.4, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          distort={phase === "hot" ? 0.5 : 0.25}
          speed={phase === "hot" ? 3 : 1.5}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </Sphere>

      {/* Inner glow sphere */}
      <Sphere ref={innerRef} args={[0.9, 32, 32]}>
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </Sphere>
    </group>
  )
}

// Floating ice crystal / snowflake shapes
function IceCrystal({ position, size, delay }: {
  position: [number, number, number]
  size: number
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.3
      ref.current.rotation.x = t * 0.4
      ref.current.rotation.z = t * 0.3
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={new THREE.Color(0.1, 0.7, 1.0)}
        transparent
        opacity={0.6}
        roughness={0.1}
        metalness={0.9}
        wireframe={false}
      />
    </mesh>
  )
}

// Heat particle
function HeatParticle({ position, delay }: {
  position: [number, number, number]
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null!)
  const startY = position[1]

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() + delay) % 4
    if (ref.current) {
      ref.current.position.y = startY + t * 1.5
      ref.current.position.x = position[0] + Math.sin(t * 2 + delay) * 0.3
      const mat = ref.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(0, 1 - t / 4) * 0.7
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={new THREE.Color(1, 0.3, 0.1)} transparent opacity={0.5} />
    </mesh>
  )
}

// Particle field
function ParticleField({ phase }: { phase: "hot" | "cooling" | "cool" }) {
  const count = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3
    }
    return arr
  }, [])

  const ref = useRef<THREE.Points>(null!)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02
    }
  })

  const color = phase === "cool"
    ? new THREE.Color(0.05, 0.65, 0.95)
    : new THREE.Color(0.9, 0.3, 0.1)

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={color} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

// Animated wireframe icosahedron
function WireOrb({ phase }: { phase: "hot" | "cooling" | "cool" }) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.x = t * 0.15
      ref.current.rotation.y = t * 0.25
      const scale = 1 + Math.sin(t * 0.8) * 0.05
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[2.1, 1]} />
      <meshBasicMaterial
        color={phase === "cool" ? 0x0ea5e9 : 0xff3310}
        wireframe
        transparent
        opacity={0.07}
      />
    </mesh>
  )
}

// Camera that gently moves
function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.03
    camera.position.y += (mouse.current.y * 0.5 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  const [phase, setPhase] = useState<"hot" | "cooling" | "cool">("hot")

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("cooling"), 2000)
    const t2 = setTimeout(() => setPhase("cool"), 4500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const crystals = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3 - 1,
      ] as [number, number, number],
      size: Math.random() * 0.12 + 0.05,
      delay: Math.random() * Math.PI * 2,
    })), [])

  const heatParticles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3 - 1,
        (Math.random() - 0.5) * 2,
      ] as [number, number, number],
      delay: Math.random() * 4,
    })), [])

  return (
    <>
      <CameraRig />
      <Stars radius={30} depth={8} count={300} factor={2} saturation={0} fade speed={0.5} />

      {/* Ambient + point lights */}
      <ambientLight intensity={0.3} />
      <pointLight
        position={[3, 3, 3]}
        intensity={phase === "cool" ? 3 : 2}
        color={phase === "cool" ? "#0ea5e9" : "#ff4422"}
        distance={12}
      />
      <pointLight
        position={[-3, -2, 2]}
        intensity={1.5}
        color={phase === "cool" ? "#818cf8" : "#ff8833"}
        distance={10}
      />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#ffffff" distance={8} />

      <WireOrb phase={phase} />
      <ParticleField phase={phase} />

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <CoolOrb phase={phase} />
      </Float>

      {/* Ice crystals — only in cool phase */}
      {phase === "cool" && crystals.map((c, i) => (
        <IceCrystal key={i} {...c} />
      ))}

      {/* Heat particles — only in hot phase */}
      {phase === "hot" && heatParticles.map((p, i) => (
        <HeatParticle key={i} {...p} />
      ))}
    </>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  )
}
