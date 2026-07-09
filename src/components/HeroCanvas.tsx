"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, ContactShadows, Float } from "@react-three/drei"
import { AirconModel } from "./AirconModel"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 4.5], fov: 38 }}
      shadows
      dpr={[1, 2]}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 4]} intensity={1.5} castShadow />
      <directionalLight position={[-3, 2, -3]} intensity={0.5} color="#60c8f0" />
      <pointLight position={[0, -1, 3]} intensity={0.4} color="#7dd3fc" />

      <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
        <AirconModel />
      </Float>

      <ContactShadows
        position={[0, -1.9, 0]}
        opacity={0.3}
        scale={6}
        blur={3}
        far={4}
        color="#000820"
      />
      <Environment preset="city" />
    </Canvas>
  )
}

export default function HeroCanvas() {
  const [temp, setTemp] = useState(36)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 1000)
    let v = 36
    const iv = setInterval(() => {
      v = Math.max(22, v - 0.5)
      setTemp(Math.round(v))
      if (v <= 22) clearInterval(iv)
    }, 100)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [])

  const tempColor = temp > 31 ? "#f87171" : temp > 26 ? "#fb923c" : "#38bdf8"

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <div className="relative w-full h-full">

        {/* Temp badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="absolute z-20 rounded-2xl px-4 py-2.5"
          style={{
            top: "8%", right: "4%",
            background: "rgba(4,6,16,0.88)",
            border: `1px solid ${tempColor}40`,
            boxShadow: `0 0 40px ${tempColor}18, 0 8px 32px rgba(0,0,0,0.5)`,
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-0.5"
            style={{ color: "rgba(255,255,255,0.3)" }}>Teplota</div>
          <motion.div key={temp}
            initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="text-3xl font-black tabular-nums leading-none"
            style={{ color: tempColor, textShadow: `0 0 28px ${tempColor}55` }}
          >{temp}°C</motion.div>
        </motion.div>

        {/* Status pill */}
        {on && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            className="absolute z-20 flex items-center gap-2 px-4 py-1.5 rounded-full"
            style={{
              bottom: "10%", left: "50%", transform: "translateX(-50%)",
              background: "rgba(14,165,233,0.08)",
              border: "1px solid rgba(14,165,233,0.18)",
              whiteSpace: "nowrap",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block"
            />
            <span className="text-xs font-medium" style={{ color: "rgba(125,211,252,0.75)" }}>
              Klimeon beží · Chladenie aktívne
            </span>
          </motion.div>
        )}

        {/* 3D Canvas fills the container */}
        <div className="absolute inset-0">
          <Scene />
        </div>
      </div>
    </div>
  )
}
