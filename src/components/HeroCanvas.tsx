"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

/* ── SNOWFLAKE ── */
function Snowflake({ x, delay, duration, size = 18 }: { x: number; delay: number; duration: number; size?: number }) {
  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{ left: `${x}%`, top: "72%", fontSize: size, opacity: 0, zIndex: 10 }}
      animate={{
        y: ["0px", "160px"],
        x: [`0px`, `${(Math.random() - 0.5) * 40}px`],
        opacity: [0, 1, 0.8, 0],
        rotate: [0, 180],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeIn" }}
    >
      <span style={{ color: "#7dd3fc" }}>❄</span>
    </motion.div>
  )
}

/* ── WAVY AIR LINES ── */
function AirLine({ y, delay, color = "#7dd3fc" }: { y: number; delay: number; color?: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, left: "10%", right: "10%", height: 3, opacity: 0 }}
      animate={{ opacity: [0, 0.9, 0], x: ["-5%", "8%"] }}
      transition={{ duration: 1.8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="100%" height="10" viewBox="0 0 200 10" preserveAspectRatio="none">
        <path
          d="M0,5 C20,2 40,8 60,5 C80,2 100,8 120,5 C140,2 160,8 180,5 C190,3 200,5 200,5"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  )
}

/* ── MAIN CARTOON AC SVG ── */
function CartoonAC({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      {/* Drop shadow */}
      <ellipse cx="210" cy="210" rx="160" ry="10" fill="rgba(0,0,0,0.18)" />

      {/* ── MAIN BODY ── thick cartoon outline */}
      <rect x="10" y="10" width="400" height="150" rx="32" fill="#ffffff" />
      <rect x="10" y="10" width="400" height="150" rx="32"
        fill="none" stroke="#1e293b" strokeWidth="5" />

      {/* Top gloss band */}
      <rect x="16" y="14" width="388" height="50" rx="26"
        fill="url(#gloss)" opacity="0.6" />

      {/* Blue accent stripe at top */}
      <rect x="10" y="10" width="400" height="22" rx="16"
        fill={on ? "#38bdf8" : "#cbd5e1"} />
      <rect x="10" y="10" width="400" height="22" rx="16"
        fill="none" stroke="#1e293b" strokeWidth="5" />

      {/* ── VENTS AREA ── */}
      <rect x="10" y="148" width="400" height="32" rx="18" fill="#e0e7ef" />
      <rect x="10" y="148" width="400" height="32" rx="18"
        fill="none" stroke="#1e293b" strokeWidth="5" />

      {/* Vent slats */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.rect
          key={i}
          x={24 + i * 37}
          y="152"
          width="26"
          height="24"
          rx="5"
          fill={on ? "#bae6fd" : "#c8d2de"}
          animate={on ? { y: [152, 158, 152] } : { y: 152 }}
          transition={{ duration: 2, delay: i * 0.05, repeat: on ? Infinity : 0, ease: "easeInOut" }}
        />
      ))}

      {/* ── DISPLAY PANEL (right side) ── */}
      <rect x="310" y="32" width="90" height="65" rx="14" fill="#0f172a" />
      <rect x="313" y="35" width="84" height="59" rx="11"
        fill={on ? "#0c2a40" : "#0f172a"} />
      {on && (
        <rect x="313" y="35" width="84" height="59" rx="11"
          fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
      )}

      {/* Display temp */}
      <motion.text
        x="355" y="72"
        textAnchor="middle"
        fontFamily="'Courier New', monospace"
        fontWeight="900"
        fontSize="22"
        animate={{ fill: on ? "#38bdf8" : "#334466" }}
        transition={{ duration: 0.6 }}
      >
        22°C
      </motion.text>

      {/* LED dot */}
      <motion.circle cx="345" cy="83" r="4"
        animate={{ fill: on ? "#4ade80" : "#1e293b" }}
        transition={{ duration: 0.4 }}
      />
      {on && (
        <motion.circle cx="345" cy="83" r="4"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          fill="#4ade80"
        />
      )}

      {/* ── BRAND TEXT ── */}
      <text x="180" y="100"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        fill="#64748b"
        letterSpacing="5"
      >
        KLIMEON
      </text>

      {/* ── POWER LED stripe ── */}
      <motion.rect
        x="18" y="142" width="384" height="6" rx="3"
        animate={{ fill: on ? "#0ea5e9" : "#94a3b8", opacity: on ? 0.9 : 0.4 }}
        transition={{ duration: 0.7 }}
      />
      {on && (
        <motion.rect
          x="18" y="142" width="384" height="6" rx="3"
          fill="#7dd3fc"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      {/* ── CARTOON CHEEKS (character vibes) ── */}
      <circle cx="80" cy="95" r="18" fill="rgba(251,146,60,0.12)" />
      <circle cx="280" cy="95" r="18" fill="rgba(251,146,60,0.12)" />

      <defs>
        <linearGradient id="gloss" x1="210" y1="14" x2="210" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const FLAKES = [
  { x: 12, delay: 0.1, duration: 2.4, size: 20 },
  { x: 24, delay: 0.7, duration: 2.8, size: 16 },
  { x: 36, delay: 0.3, duration: 2.6, size: 22 },
  { x: 48, delay: 1.1, duration: 2.3, size: 18 },
  { x: 60, delay: 0.5, duration: 2.9, size: 20 },
  { x: 72, delay: 1.4, duration: 2.5, size: 16 },
  { x: 82, delay: 0.9, duration: 2.7, size: 24 },
  { x: 20, delay: 1.7, duration: 2.4, size: 18 },
  { x: 55, delay: 0.2, duration: 3.0, size: 14 },
]

const AIRLINES = [
  { y: 74, delay: 0.0 },
  { y: 78, delay: 0.3 },
  { y: 82, delay: 0.6 },
  { y: 70, delay: 0.9 },
  { y: 86, delay: 1.2 },
]

export default function HeroCanvas() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(36)

  useEffect(() => {
    const t1 = setTimeout(() => setOn(true), 1200)
    let t = 36
    const iv = setInterval(() => {
      t = Math.max(22, t - 0.6)
      setTemp(Math.round(t * 10) / 10)
      if (t <= 22) clearInterval(iv)
    }, 100)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [])

  const tempColor = temp > 30 ? "#ef4444" : temp > 26 ? "#fb923c" : "#38bdf8"

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <div className="relative w-full max-w-lg px-4">

        {/* TEMP BADGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="absolute -top-12 right-6 z-20 rounded-2xl px-4 py-2.5"
          style={{
            background: "rgba(5,5,5,0.85)",
            border: `2px solid ${tempColor}50`,
            boxShadow: `0 0 28px ${tempColor}30`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
            Teplota
          </div>
          <motion.div
            key={Math.round(temp)}
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-black tabular-nums leading-none"
            style={{ color: tempColor, textShadow: `0 0 20px ${tempColor}80` }}
          >
            {Math.round(temp)}°C
          </motion.div>
        </motion.div>

        {/* AIR WAVES */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
          {on && AIRLINES.map((a, i) => <AirLine key={i} {...a} />)}
        </div>

        {/* AC UNIT */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ animation: "acFloat 4s ease-in-out infinite" }}
        >
          <style>{`
            @keyframes acFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-12px); }
            }
          `}</style>
          <CartoonAC on={on} />
        </motion.div>

        {/* SNOWFLAKES */}
        <div className="absolute inset-0 overflow-visible pointer-events-none" style={{ zIndex: 15 }}>
          {on && FLAKES.map((f, i) => <Snowflake key={i} {...f} />)}
        </div>

        {/* STATUS PILL */}
        {on && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full z-20"
            style={{
              background: "rgba(14,165,233,0.12)",
              border: "1px solid rgba(14,165,233,0.25)",
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block"
            />
            <span className="text-xs font-medium text-sky-400">Klimeon beží · Chladenie aktívne</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
