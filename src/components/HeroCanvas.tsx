"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function ColdParticle({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={{ left: `${x}%`, top: "80%", opacity: 0 }}
      animate={{ y: ["0px", "120px"], opacity: [0, 0.7, 0], rotate: [0, 180] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeIn" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12">
        <line x1="6" y1="0" x2="6" y2="12" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="0" y1="6" x2="12" y2="6" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="1.5" y1="1.5" x2="10.5" y2="10.5" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="10.5" y1="1.5" x2="1.5" y2="10.5" stroke="#93c5fd" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}

function PhotorealisticAC({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 560 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        {/* Pearl white plastic body - multiple stops for realistic curvature */}
        <linearGradient id="bodyMain" x1="280" y1="8" x2="280" y2="158" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f9fbfd" />
          <stop offset="18%" stopColor="#f2f6fb" />
          <stop offset="45%" stopColor="#eaeff8" />
          <stop offset="72%" stopColor="#dde4f0" />
          <stop offset="100%" stopColor="#cdd7e8" />
        </linearGradient>

        {/* Top specular streak - simulates plastic mold line */}
        <linearGradient id="specular" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,1)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Left edge light */}
        <linearGradient id="edgeLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Right edge shadow */}
        <linearGradient id="edgeRight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,20,0.08)" />
        </linearGradient>

        {/* Bottom curved shadow inside body */}
        <radialGradient id="innerShadow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="rgba(0,20,60,0.1)" />
          <stop offset="100%" stopColor="rgba(0,20,60,0)" />
        </radialGradient>

        {/* Blue top accent */}
        <linearGradient id="blueTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60c8f0" />
          <stop offset="100%" stopColor="#29a8e0" />
        </linearGradient>

        {/* Display */}
        <linearGradient id="displayBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1f35" />
          <stop offset="100%" stopColor="#081525" />
        </linearGradient>

        {/* Vent area - slightly recessed look */}
        <linearGradient id="ventArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c8d4e4" />
          <stop offset="40%" stopColor="#d8e2ef" />
          <stop offset="100%" stopColor="#bfcada" />
        </linearGradient>

        {/* Single vent slat */}
        <linearGradient id="slat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dce6f4" />
          <stop offset="30%" stopColor="#c8d4e6" />
          <stop offset="100%" stopColor="#b8c4d8" />
        </linearGradient>

        {/* Silver LED strip */}
        <linearGradient id="ledStrip" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8899b4" />
          <stop offset="15%" stopColor="#b0bece" />
          <stop offset="50%" stopColor="#c8d8e8" />
          <stop offset="85%" stopColor="#b0bece" />
          <stop offset="100%" stopColor="#8899b4" />
        </linearGradient>

        {/* Drop shadow */}
        <filter id="bodyShadow" x="-5%" y="-8%" width="115%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="rgba(0,10,30,0.45)" />
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,10,30,0.2)" />
        </filter>

        {/* Soft glow for LED */}
        <filter id="ledGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Blue strip glow */}
        <filter id="stripGlow" x="-5%" y="-200%" width="110%" height="600%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        <clipPath id="bodyClip">
          <rect x="8" y="8" width="544" height="152" rx="28" />
        </clipPath>
      </defs>

      {/* ── CAST SHADOW on wall ── */}
      <ellipse cx="280" cy="172" rx="220" ry="9" fill="rgba(0,0,0,0.22)" />

      {/* ── BODY BASE ── */}
      <rect x="8" y="8" width="544" height="152" rx="28" fill="url(#bodyMain)" filter="url(#bodyShadow)" />

      {/* ── CLIPPED LAYERS ── */}
      <g clipPath="url(#bodyClip)">
        {/* Inner bottom shadow */}
        <rect x="8" y="8" width="544" height="152" fill="url(#innerShadow)" />

        {/* Left edge highlight */}
        <rect x="8" y="8" width="60" height="152" fill="url(#edgeLeft)" />

        {/* Right edge shadow */}
        <rect x="500" y="8" width="52" height="152" fill="url(#edgeRight)" />

        {/* ── BLUE TOP ACCENT STRIPE ── */}
        <rect x="8" y="8" width="544" height="19" fill="url(#blueTop)" />
        {/* Gloss on blue stripe */}
        <rect x="8" y="8" width="544" height="10" fill="rgba(255,255,255,0.25)" />
        {/* Bottom edge of blue stripe */}
        <rect x="8" y="25" width="544" height="2" fill="rgba(0,100,180,0.2)" />

        {/* ── TOP GLOSS HIGHLIGHT ── large specular area */}
        <rect x="8" y="27" width="544" height="56" fill="url(#specular)" opacity="0.55" />

        {/* Subtle horizontal crease at 1/3 from top */}
        <rect x="20" y="62" width="520" height="1" fill="rgba(255,255,255,0.7)" />
        <rect x="20" y="63" width="520" height="0.5" fill="rgba(130,155,190,0.2)" />
      </g>

      {/* ── VENT SECTION ── */}
      <rect x="8" y="138" width="544" height="22" rx="0" fill="url(#ventArea)" />
      {/* Recessed shadow above vent */}
      <rect x="8" y="136" width="544" height="4" fill="rgba(0,20,50,0.08)" />

      {/* Vent slats - 15 of them, perspective angle */}
      {Array.from({ length: 15 }).map((_, i) => (
        <g key={i}>
          <motion.rect
            x={16 + i * 34}
            y={140}
            width={26}
            height={18}
            rx={2.5}
            fill="url(#slat)"
            animate={on ? {
              y: [140, 145, 140],
              rx: [2.5, 4, 2.5],
            } : { y: 140 }}
            transition={{ duration: 2.5, delay: i * 0.04, repeat: on ? Infinity : 0, ease: "easeInOut" }}
          />
          {/* Slat top gloss */}
          <motion.rect
            x={16 + i * 34}
            y={140}
            width={26}
            height={5}
            rx={2.5}
            fill="rgba(255,255,255,0.45)"
            animate={on ? { y: [140, 145, 140] } : { y: 140 }}
            transition={{ duration: 2.5, delay: i * 0.04, repeat: on ? Infinity : 0, ease: "easeInOut" }}
          />
        </g>
      ))}

      {/* Bottom edge of body */}
      <rect x="8" y="155" width="544" height="5" rx="4" fill="rgba(0,20,50,0.06)" />

      {/* ── LED INDICATOR STRIP ── */}
      <rect x="8" y="132" width="544" height="5" rx="2.5" fill="url(#ledStrip)" opacity="0.6" />
      <motion.rect
        x="8" y="132" width="544" height="5" rx="2.5"
        animate={{
          fill: on ? "#29b6f6" : "transparent",
          opacity: on ? 0.85 : 0,
        }}
        transition={{ duration: 1 }}
        filter={on ? "url(#stripGlow)" : undefined}
      />
      {on && (
        <motion.rect
          x="8" y="132" width="544" height="5" rx="2.5"
          fill="#7dd3fc"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      )}

      {/* ── DIGITAL DISPLAY ── */}
      <rect x="398" y="26" width="128" height="80" rx="12" fill="#080e1c" />
      <rect x="401" y="29" width="122" height="74" rx="10" fill="url(#displayBg)" />
      {/* Display glass reflection */}
      <rect x="401" y="29" width="122" height="16" rx="10" fill="rgba(255,255,255,0.05)" />
      {on && (
        <motion.rect
          x="401" y="29" width="122" height="74" rx="10"
          fill="none" stroke="#0ea5e9" strokeWidth="0.8"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
      )}

      {/* Temp display */}
      <motion.text
        x="462" y="76"
        textAnchor="middle"
        fontFamily="'SF Mono', 'Courier New', monospace"
        fontWeight="700"
        fontSize="26"
        letterSpacing="0.5"
        animate={{ fill: on ? "#38bdf8" : "#1a3050" }}
        transition={{ duration: 0.8 }}
      >
        22°C
      </motion.text>

      {/* Mode indicator */}
      {on && (
        <motion.text
          x="462" y="92"
          textAnchor="middle"
          fontFamily="system-ui"
          fontSize="9"
          letterSpacing="3"
          fill="#0ea5e9"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          COOLING
        </motion.text>
      )}

      {/* ── IR SENSOR ── */}
      <circle cx="378" cy="60" r="9" fill="#0a111e" />
      <circle cx="378" cy="60" r="6.5" fill="#0f1d30" />
      <circle cx="378" cy="60" r="3.5" fill="rgba(56,189,248,0.18)" />
      <circle cx="376" cy="58" r="1.5" fill="rgba(255,255,255,0.12)" />

      {/* ── POWER LED ── */}
      <motion.circle
        cx="360" cy="75" r="4.5"
        filter="url(#ledGlow)"
        animate={{ fill: on ? "#22c55e" : "#0d1f14" }}
        transition={{ duration: 0.6 }}
      />
      {on && (
        <motion.circle
          cx="360" cy="75" r="4.5"
          fill="#4ade80"
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      )}

      {/* ── BRAND NAME ── */}
      <text
        x="195" y="90"
        textAnchor="middle"
        fontFamily="-apple-system, system-ui, BlinkMacSystemFont, sans-serif"
        fontSize="11"
        fontWeight="500"
        fill="#9aabbe"
        letterSpacing="6"
        opacity="0.8"
      >
        KLIMEON
      </text>

      {/* ── SUBTLE PANEL LINE ── */}
      <rect x="16" y="108" width="330" height="0.8" rx="0.4" fill="rgba(255,255,255,0.5)" />
      <rect x="16" y="109" width="330" height="0.5" fill="rgba(100,130,170,0.15)" />
    </svg>
  )
}

const PARTICLES = [
  { x: 8,  delay: 0.1, duration: 2.8 },
  { x: 18, delay: 0.7, duration: 3.1 },
  { x: 29, delay: 0.3, duration: 2.5 },
  { x: 40, delay: 1.2, duration: 2.9 },
  { x: 52, delay: 0.5, duration: 2.6 },
  { x: 63, delay: 1.5, duration: 3.0 },
  { x: 74, delay: 0.9, duration: 2.7 },
  { x: 84, delay: 0.2, duration: 2.4 },
  { x: 23, delay: 1.8, duration: 3.2 },
  { x: 57, delay: 0.6, duration: 2.8 },
]

export default function HeroCanvas() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(36)

  useEffect(() => {
    const t1 = setTimeout(() => setOn(true), 1000)
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
          initial={{ opacity: 0, scale: 0.85, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 18 }}
          className="absolute z-20 rounded-2xl px-4 py-2.5"
          style={{
            top: "-56px",
            right: "8px",
            background: "rgba(4,6,14,0.9)",
            border: `1px solid ${tempColor}40`,
            boxShadow: `0 0 40px ${tempColor}20, 0 8px 32px rgba(0,0,0,0.5)`,
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            Teplota
          </div>
          <motion.div
            key={temp}
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="text-3xl font-black tabular-nums leading-none"
            style={{ color: tempColor, textShadow: `0 0 30px ${tempColor}60` }}
          >
            {temp}°C
          </motion.div>
        </motion.div>

        {/* COLD AIR PARTICLES */}
        <div className="absolute inset-0 overflow-visible" style={{ zIndex: 15 }}>
          {on && PARTICLES.map((p, i) => <ColdParticle key={i} {...p} />)}
        </div>

        {/* AC UNIT */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ animation: "acFloat 5s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes acFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>
          <PhotorealisticAC on={on} />
        </motion.div>

        {/* STATUS */}
        {on && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full z-20 whitespace-nowrap"
            style={{
              background: "rgba(14,165,233,0.08)",
              border: "1px solid rgba(14,165,233,0.18)",
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
      </div>
    </div>
  )
}
