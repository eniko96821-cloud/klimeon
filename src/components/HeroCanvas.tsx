"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function Snowflake({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none text-sky-200"
      style={{ left: `${x}%`, top: "78%", fontSize: 13, opacity: 0 }}
      animate={{
        y: ["0px", "140px"],
        opacity: [0, 0.9, 0.6, 0],
        rotate: [0, 200],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeIn" }}
    >
      ❄
    </motion.div>
  )
}

function AirStream({ y, delay, width }: { y: number; delay: number; width: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, left: "8%", opacity: 0 }}
      animate={{ opacity: [0, 0.6, 0], x: [0, width * 0.4] }}
      transition={{ duration: 2.4, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={width} height="8" viewBox={`0 0 ${width} 8`}>
        <path
          d={`M0,4 Q${width * 0.25},1 ${width * 0.5},4 Q${width * 0.75},7 ${width},4`}
          fill="none"
          stroke="rgba(186,230,253,0.7)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}

function RealisticAC({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 500 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full drop-shadow-2xl"
    >
      <defs>
        {/* Main body gradient - pearl white with subtle blue tint */}
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4f7fb" />
          <stop offset="30%" stopColor="#edf1f7" />
          <stop offset="70%" stopColor="#e2e8f2" />
          <stop offset="100%" stopColor="#d8e0ec" />
        </linearGradient>

        {/* Top gloss */}
        <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.3)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Side highlight */}
        <linearGradient id="sideLight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
          <stop offset="8%" stopColor="rgba(255,255,255,0)" />
          <stop offset="92%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(200,210,230,0.4)" />
        </linearGradient>

        {/* Bottom shadow gradient */}
        <linearGradient id="bottomShadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.12)" />
        </linearGradient>

        {/* Display screen */}
        <linearGradient id="display" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1628" />
          <stop offset="100%" stopColor="#071020" />
        </linearGradient>

        {/* Vent gradient */}
        <linearGradient id="ventGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cfd8e8" />
          <stop offset="100%" stopColor="#b8c4d8" />
        </linearGradient>

        {/* Silver accent */}
        <linearGradient id="silver" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a0aabf" />
          <stop offset="20%" stopColor="#c8d0e0" />
          <stop offset="50%" stopColor="#dde4f0" />
          <stop offset="80%" stopColor="#c8d0e0" />
          <stop offset="100%" stopColor="#a0aabf" />
        </linearGradient>

        {/* Drop shadow filter */}
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,40,0.35)" />
        </filter>

        {/* Glow filter for LED */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Blue glow filter */}
        <filter id="blueGlow" x="-20%" y="-100%" width="140%" height="400%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── GROUND SHADOW ── */}
      <ellipse cx="250" cy="196" rx="190" ry="7" fill="rgba(0,0,0,0.2)" />

      {/* ── MAIN BODY ── */}
      <rect x="8" y="12" width="484" height="160" rx="26" fill="url(#body)" filter="url(#shadow)" />

      {/* Body bottom shadow */}
      <rect x="8" y="90" width="484" height="82" rx="26" fill="url(#bottomShadow)" />

      {/* Side light reflections */}
      <rect x="8" y="12" width="484" height="160" rx="26" fill="url(#sideLight)" />

      {/* ── TOP GLOSS HIGHLIGHT ── */}
      <rect x="16" y="14" width="468" height="62" rx="20" fill="url(#gloss)" opacity="0.8" />

      {/* Subtle crease line at top */}
      <line x1="18" y1="52" x2="482" y2="52" stroke="rgba(255,255,255,0.9)" strokeWidth="0.7" />
      <line x1="18" y1="53.5" x2="482" y2="53.5" stroke="rgba(140,160,190,0.3)" strokeWidth="0.7" />

      {/* ── SILVER ACCENT BAND ── */}
      <rect x="10" y="132" width="480" height="16" rx="4" fill="url(#silver)" />
      <line x1="10" y1="132" x2="490" y2="132" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
      <line x1="10" y1="148" x2="490" y2="148" stroke="rgba(100,120,150,0.3)" strokeWidth="0.8" />

      {/* ── VENT AREA ── */}
      <rect x="10" y="147" width="480" height="26" rx="6" fill="url(#ventGrad)" />

      {/* Vent slat shadows */}
      {Array.from({ length: 13 }).map((_, i) => (
        <g key={i}>
          <rect x={18 + i * 35} y="149" width="28" height="22" rx="3" fill="#b8c8dc" />
          <rect x={18 + i * 35} y="149" width="28" height="4" rx="2" fill="rgba(255,255,255,0.5)" />
        </g>
      ))}

      {/* ── ANIMATED VENT FLAP ── */}
      <motion.g
        animate={{ rotate: on ? -18 : 0, originX: "250", originY: "168" }}
        transition={{ duration: 1.2, delay: 0.6, type: "spring", stiffness: 40, damping: 12 }}
        style={{ transformOrigin: "250px 168px" }}
      >
        <rect x="14" y="165" width="472" height="9" rx="4.5" fill="#c8d4e4" />
        <rect x="14" y="165" width="472" height="2.5" rx="1.5" fill="rgba(255,255,255,0.55)" />
      </motion.g>

      {/* ── DIGITAL DISPLAY ── */}
      <rect x="360" y="26" width="110" height="68" rx="10" fill="#080f1e" />
      <rect x="363" y="29" width="104" height="62" rx="8" fill="url(#display)" />

      {/* Display inner bezel reflection */}
      <rect x="363" y="29" width="104" height="10" rx="8" fill="rgba(255,255,255,0.04)" />

      {on && (
        <motion.rect
          x="363" y="29" width="104" height="62" rx="8"
          fill="none" stroke="#0ea5e9" strokeWidth="1"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      {/* Display temperature text */}
      <motion.text
        x="415" y="67"
        textAnchor="middle"
        fontFamily="'Courier New', Courier, monospace"
        fontWeight="700"
        fontSize="22"
        letterSpacing="1"
        animate={{ fill: on ? "#38bdf8" : "#1e3a50" }}
        transition={{ duration: 0.8 }}
      >
        22°C
      </motion.text>

      {/* Display mode text */}
      {on && (
        <motion.text
          x="415" y="82"
          textAnchor="middle"
          fontFamily="system-ui"
          fontSize="8"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          fill="#0ea5e9"
        >
          COOL
        </motion.text>
      )}

      {/* ── SENSOR / IR RECEIVER ── */}
      <circle cx="344" cy="100" r="7" fill="#0a1020" />
      <circle cx="344" cy="100" r="4.5" fill="#12263a" />
      <circle cx="344" cy="100" r="2" fill="rgba(56,189,248,0.3)" />

      {/* ── POWER LED ── */}
      <motion.circle
        cx="328" cy="86" r="4"
        filter="url(#glow)"
        animate={{ fill: on ? "#22c55e" : "#1a2a1a" }}
        transition={{ duration: 0.5 }}
      />
      {on && (
        <motion.circle
          cx="328" cy="86" r="4"
          fill="#4ade80"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      {/* ── BRAND LOGO ── */}
      <text
        x="168" y="86"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="600"
        fill="#8899b0"
        letterSpacing="5"
      >
        KLIMEON
      </text>

      {/* ── BLUE LED STRIP ── */}
      <motion.rect
        x="14" y="129" width="476" height="3.5" rx="1.8"
        animate={{
          fill: on ? "#0ea5e9" : "#8899b0",
          opacity: on ? 1 : 0.3,
        }}
        transition={{ duration: 0.8 }}
        filter={on ? "url(#blueGlow)" : undefined}
      />
      {on && (
        <motion.rect
          x="14" y="129" width="476" height="3.5" rx="1.8"
          fill="#38bdf8"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* ── PANEL DETAIL LINES ── */}
      <line x1="16" y1="110" x2="484" y2="110" stroke="rgba(255,255,255,0.45)" strokeWidth="0.6" />
      <line x1="16" y1="111.5" x2="484" y2="111.5" stroke="rgba(120,140,170,0.2)" strokeWidth="0.6" />
    </svg>
  )
}

const FLAKES = [
  { x: 10, delay: 0.2, duration: 2.6 },
  { x: 22, delay: 0.9, duration: 3.0 },
  { x: 35, delay: 0.4, duration: 2.4 },
  { x: 48, delay: 1.3, duration: 2.8 },
  { x: 60, delay: 0.6, duration: 2.5 },
  { x: 72, delay: 1.7, duration: 3.1 },
  { x: 83, delay: 0.1, duration: 2.7 },
  { x: 26, delay: 1.5, duration: 2.9 },
  { x: 55, delay: 0.8, duration: 2.3 },
]

const STREAMS = [
  { y: 76, delay: 0.0, width: 130 },
  { y: 80, delay: 0.35, width: 100 },
  { y: 84, delay: 0.7, width: 150 },
  { y: 72, delay: 1.05, width: 90 },
  { y: 88, delay: 0.5, width: 120 },
]

export default function HeroCanvas() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(36)

  useEffect(() => {
    const t1 = setTimeout(() => setOn(true), 1200)
    let t = 36
    const iv = setInterval(() => {
      t = Math.max(22, t - 0.5)
      setTemp(Math.round(t * 2) / 2)
      if (t <= 22) clearInterval(iv)
    }, 110)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [])

  const tempColor = temp > 31 ? "#ef4444" : temp > 26 ? "#fb923c" : "#38bdf8"

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <div className="relative w-full max-w-xl px-4">

        {/* TEMP BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 180 }}
          className="absolute z-20 rounded-2xl px-4 py-2.5"
          style={{
            top: "-52px",
            right: "16px",
            background: "rgba(4,4,8,0.88)",
            border: `1.5px solid ${tempColor}45`,
            boxShadow: `0 0 32px ${tempColor}25, 0 8px 24px rgba(0,0,0,0.4)`,
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="text-[9px] font-semibold tracking-[0.2em] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            Teplota
          </div>
          <motion.div
            key={Math.round(temp)}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.12 }}
            className="text-3xl font-black tabular-nums leading-none"
            style={{ color: tempColor, textShadow: `0 0 24px ${tempColor}70` }}
          >
            {Math.round(temp)}°C
          </motion.div>
        </motion.div>

        {/* AIR STREAMS */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
          {on && STREAMS.map((s, i) => <AirStream key={i} {...s} />)}
        </div>

        {/* AC UNIT */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ animation: "acFloat 5s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes acFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>
          <RealisticAC on={on} />
        </motion.div>

        {/* SNOWFLAKES */}
        <div className="absolute inset-0 overflow-visible pointer-events-none" style={{ zIndex: 15 }}>
          {on && FLAKES.map((f, i) => <Snowflake key={i} {...f} />)}
        </div>

        {/* STATUS */}
        {on && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-9 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full z-20 whitespace-nowrap"
            style={{
              background: "rgba(14,165,233,0.1)",
              border: "1px solid rgba(14,165,233,0.2)",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block"
            />
            <span className="text-xs font-medium text-sky-400/80">Klimeon beží · Chladenie aktívne</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
