"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function ColdParticle({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: "78%", opacity: 0 }}
      animate={{ y: [0, 130], opacity: [0, 0.8, 0], rotate: [0, 180] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeIn" }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="2" x2="12" y2="22" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="12" x2="22" y2="12" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="5" x2="19" y2="19" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="5" x2="5" y2="19" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

const PARTICLES = [
  { x: 10, delay: 0.2, duration: 2.8 },
  { x: 22, delay: 0.8, duration: 3.1 },
  { x: 35, delay: 0.4, duration: 2.5 },
  { x: 48, delay: 1.3, duration: 2.9 },
  { x: 60, delay: 0.6, duration: 2.6 },
  { x: 72, delay: 1.7, duration: 3.0 },
  { x: 83, delay: 0.1, duration: 2.7 },
  { x: 26, delay: 1.5, duration: 2.4 },
  { x: 55, delay: 0.9, duration: 3.2 },
]

export default function HeroCanvas() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(36)

  useEffect(() => {
    const t1 = setTimeout(() => setOn(true), 800)
    let t = 36
    const iv = setInterval(() => {
      t = Math.max(22, t - 0.5)
      setTemp(Math.round(t))
      if (t <= 22) clearInterval(iv)
    }, 100)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [])

  const tempColor = temp > 31 ? "#f87171" : temp > 26 ? "#fb923c" : "#38bdf8"

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <div className="relative w-full max-w-xl px-2">

        {/* TEMP BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
          className="absolute z-20 rounded-2xl px-4 py-2.5"
          style={{
            top: "-54px", right: "8px",
            background: "rgba(4,6,16,0.88)",
            border: `1px solid ${tempColor}40`,
            boxShadow: `0 0 40px ${tempColor}18, 0 8px 32px rgba(0,0,0,0.45)`,
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

        {/* VIDEO — mix-blend-mode:multiply removes white bg on dark background */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          style={{ animation: "acFloat 5s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes acFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          `}</style>

          {/* White backing so multiply blend works correctly */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ background: "white" }}
          >
            <video
              src="/ac-animation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </motion.div>

        {/* COLD PARTICLES on top */}
        <div className="absolute inset-0 overflow-visible" style={{ zIndex: 15 }}>
          {on && PARTICLES.map((p, i) => <ColdParticle key={i} {...p} />)}
        </div>

        {/* STATUS */}
        {on && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full z-20 whitespace-nowrap"
            style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.18)" }}
          >
            <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />
            <span className="text-xs font-medium" style={{ color: "rgba(125,211,252,0.75)" }}>
              Klimeon beží · Chladenie aktívne
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
