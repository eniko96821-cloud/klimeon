"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

/* ── WIND LINE ── */
function WindLine({ y, delay, len, opacity = 1 }: { y: number; delay: number; len: number; opacity?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, left: "50%", translateX: "-50%", opacity: 0 }}
      animate={{ opacity: [0, opacity, opacity * 0.6, 0], x: ["-8%", "6%"] }}
      transition={{ duration: 2.0, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={len} height="14" viewBox={`0 0 ${len} 14`} fill="none">
        <path
          d={`M4,7 Q${len * 0.25},3 ${len * 0.5},7 Q${len * 0.75},11 ${len - 4},7`}
          stroke="#7dd3fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  )
}

/* ── SNOWFLAKE ── */
function Flake({ x, delay, dur, size }: { x: number; delay: number; dur: number; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: "74%", opacity: 0 }}
      animate={{ y: [0, 130], opacity: [0, 0.9, 0.7, 0], rotate: [0, 240] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="2" x2="12" y2="22" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="2" y1="12" x2="22" y2="12" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="5" x2="19" y2="19" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="5" x2="5" y2="19" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="2" r="1.5" fill="#93c5fd" />
        <circle cx="12" cy="22" r="1.5" fill="#93c5fd" />
        <circle cx="2" cy="12" r="1.5" fill="#93c5fd" />
        <circle cx="22" cy="12" r="1.5" fill="#93c5fd" />
      </svg>
    </motion.div>
  )
}

/* ── MAIN ILLUSTRATION ── */
function ACIllustration({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 480 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
      <defs>
        <linearGradient id="body" x1="240" y1="10" x2="240" y2="155" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f5f8fe" />
          <stop offset="100%" stopColor="#e8eef8" />
        </linearGradient>

        <linearGradient id="topBar" x1="240" y1="10" x2="240" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60c8f0" />
          <stop offset="100%" stopColor="#1e9fd4" />
        </linearGradient>

        <linearGradient id="ventBg" x1="240" y1="140" x2="240" y2="166" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dde8f8" />
          <stop offset="100%" stopColor="#c8d8ee" />
        </linearGradient>

        <linearGradient id="displayBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f2040" />
          <stop offset="100%" stopColor="#081428" />
        </linearGradient>

        <linearGradient id="bodyShad" x1="240" y1="80" x2="240" y2="155" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0,20,60,0)" />
          <stop offset="100%" stopColor="rgba(0,20,60,0.07)" />
        </linearGradient>

        <filter id="drop" x="-6%" y="-10%" width="112%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="rgba(0,20,80,0.22)" />
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="rgba(0,20,80,0.12)" />
        </filter>

        <filter id="glowBlue" x="-50%" y="-200%" width="200%" height="600%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        <filter id="glowLed">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ── SHADOW ── */}
      <ellipse cx="240" cy="176" rx="185" ry="8" fill="rgba(0,30,100,0.15)" />

      {/* ── BODY ── */}
      <rect x="10" y="10" width="460" height="155" rx="30" fill="url(#body)" filter="url(#drop)" />
      {/* Bottom inner shadow */}
      <rect x="10" y="60" width="460" height="105" rx="30" fill="url(#bodyShad)" />

      {/* ── BLUE TOP STRIPE ── */}
      <rect x="10" y="10" width="460" height="24" rx="20" fill="url(#topBar)" />
      {/* White sheen on blue */}
      <rect x="10" y="10" width="460" height="11" rx="20" fill="rgba(255,255,255,0.28)" />
      {/* Transition to white body */}
      <rect x="10" y="30" width="460" height="8" rx="4" fill="rgba(200,225,248,0.35)" />

      {/* ── TOP GLOSS ── */}
      <rect x="18" y="34" width="444" height="38" rx="14" fill="rgba(255,255,255,0.6)" />

      {/* ── DISPLAY ── */}
      <rect x="350" y="26" width="106" height="78" rx="12" fill="#08111e" />
      <rect x="353" y="29" width="100" height="72" rx="10" fill="url(#displayBg)" />
      {/* Display top gloss */}
      <rect x="353" y="29" width="100" height="14" rx="10" fill="rgba(255,255,255,0.06)" />
      {on && (
        <motion.rect x="353" y="29" width="100" height="72" rx="10"
          fill="none" stroke="#38bdf8" strokeWidth="1"
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}
      <motion.text x="403" y="74" textAnchor="middle"
        fontFamily="'SF Mono','Courier New',monospace" fontWeight="700" fontSize="24" letterSpacing="1"
        animate={{ fill: on ? "#38bdf8" : "#1a3558" }}
        transition={{ duration: 0.8 }}
      >22°C</motion.text>
      {on && (
        <motion.text x="403" y="89" textAnchor="middle"
          fontFamily="system-ui" fontSize="8.5" letterSpacing="3" fill="#0ea5e9"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >COOL</motion.text>
      )}

      {/* ── IR SENSOR ── */}
      <circle cx="334" cy="56" r="9" fill="#0e1a2e" />
      <circle cx="334" cy="56" r="6" fill="#121e32" />
      <circle cx="334" cy="56" r="3" fill="rgba(56,189,248,0.2)" />
      <circle cx="332.5" cy="54.5" r="1.2" fill="rgba(255,255,255,0.15)" />

      {/* ── POWER LED ── */}
      <motion.circle cx="316" cy="72" r="5"
        filter="url(#glowLed)"
        animate={{ fill: on ? "#22c55e" : "#0f1e10" }}
        transition={{ duration: 0.6 }}
      />
      {on && (
        <motion.circle cx="316" cy="72" r="5" fill="#4ade80"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />
      )}

      {/* ── BRAND ── */}
      <text x="175" y="88" textAnchor="middle"
        fontFamily="-apple-system,system-ui,sans-serif" fontSize="11" fontWeight="500"
        fill="#94a8c4" letterSpacing="6" opacity="0.9"
      >KLIMEON</text>

      {/* ── PANEL LINE ── */}
      <rect x="18" y="110" width="286" height="1" rx="0.5" fill="rgba(180,200,230,0.7)" />

      {/* ── LED STRIP ── */}
      <rect x="12" y="133" width="456" height="5" rx="2.5" fill="rgba(180,200,230,0.5)" />
      <motion.rect x="12" y="133" width="456" height="5" rx="2.5"
        animate={{ fill: on ? "#29b6f6" : "transparent", opacity: on ? 1 : 0 }}
        transition={{ duration: 1 }}
        filter={on ? "url(#glowBlue)" : undefined}
      />
      {on && (
        <motion.rect x="12" y="133" width="456" height="5" rx="2.5" fill="#7dd3fc"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* ── VENT BACKGROUND ── */}
      <rect x="12" y="140" width="456" height="24" rx="6" fill="url(#ventBg)" />
      <rect x="12" y="140" width="456" height="4" fill="rgba(0,40,100,0.06)" />

      {/* ── VENT FLAP ── */}
      <motion.g
        style={{ transformOrigin: "240px 164px" }}
        animate={{ rotate: on ? -20 : 0 }}
        transition={{ duration: 1.4, delay: 0.5, type: "spring", stiffness: 35, damping: 10 }}
      >
        <rect x="14" y="158" width="452" height="8" rx="4" fill="#c0cfe4" />
        <rect x="14" y="158" width="452" height="3" rx="3" fill="rgba(255,255,255,0.5)" />
      </motion.g>

      {/* ── VENT SLATS ── */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.g key={i}
          animate={on ? { y: [0, 4, 0] } : { y: 0 }}
          transition={{ duration: 2.4, delay: i * 0.045, repeat: on ? Infinity : 0, ease: "easeInOut" }}
        >
          <rect x={20 + i * 31} y={142} width={22} height={18} rx={3} fill="#c8d8ec" />
          <rect x={20 + i * 31} y={142} width={22} height={5} rx={3} fill="rgba(255,255,255,0.5)" />
        </motion.g>
      ))}
    </svg>
  )
}

const FLAKES = [
  { x: 8,  delay: 0.1, dur: 2.7, size: 18 },
  { x: 20, delay: 0.8, dur: 3.1, size: 14 },
  { x: 33, delay: 0.3, dur: 2.5, size: 20 },
  { x: 46, delay: 1.2, dur: 2.8, size: 16 },
  { x: 58, delay: 0.6, dur: 2.6, size: 22 },
  { x: 70, delay: 1.6, dur: 3.0, size: 15 },
  { x: 81, delay: 0.4, dur: 2.9, size: 18 },
  { x: 26, delay: 1.9, dur: 2.4, size: 13 },
  { x: 55, delay: 1.0, dur: 3.2, size: 20 },
]

const WINDS = [
  { y: 76, delay: 0.0, len: 160 },
  { y: 80, delay: 0.3, len: 120, opacity: 0.75 },
  { y: 84, delay: 0.6, len: 180 },
  { y: 72, delay: 1.0, len: 100, opacity: 0.6 },
  { y: 88, delay: 0.5, len: 140, opacity: 0.8 },
  { y: 68, delay: 1.4, len: 90, opacity: 0.5 },
]

export default function HeroCanvas() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(36)

  useEffect(() => {
    const t1 = setTimeout(() => setOn(true), 900)
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
          <div className="text-[9px] font-semibold tracking-[0.22em] uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            Teplota
          </div>
          <motion.div key={temp}
            initial={{ y: -4, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="text-3xl font-black tabular-nums leading-none"
            style={{ color: tempColor, textShadow: `0 0 28px ${tempColor}55` }}
          >
            {temp}°C
          </motion.div>
        </motion.div>

        {/* WIND LINES */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 5 }}>
          {on && WINDS.map((w, i) => <WindLine key={i} {...w} />)}
        </div>

        {/* AC */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{ animation: "acFloat 5s ease-in-out infinite" }}
        >
          <style>{`@keyframes acFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }`}</style>
          <ACIllustration on={on} />
        </motion.div>

        {/* SNOWFLAKES */}
        <div className="absolute inset-0 overflow-visible" style={{ zIndex: 15 }}>
          {on && FLAKES.map((f, i) => <Flake key={i} {...f} />)}
        </div>

        {/* STATUS */}
        {on && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
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
