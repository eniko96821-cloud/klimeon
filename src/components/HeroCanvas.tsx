"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react"

/* ── SNOWFLAKE PARTICLE ── */
function Snowflake({ x, delay, duration }: { x: number; delay: number; duration: number }) {
  return (
    <motion.div
      className="absolute text-sky-300 select-none pointer-events-none"
      style={{ left: `${x}%`, top: "62%", fontSize: "14px", opacity: 0 }}
      animate={{
        y: ["0%", "280%"],
        x: [`${x}%`, `${x + (Math.random() - 0.5) * 8}%`],
        opacity: [0, 0.8, 0.6, 0],
        rotate: [0, 180],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeIn",
      }}
    >
      ❄
    </motion.div>
  )
}

/* ── AIR WAVE LINE ── */
function AirWave({ y, delay, width }: { y: number; delay: number; width: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        height: "2px",
        width,
        top: `${y}%`,
        left: "12%",
        background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.5), rgba(56,189,248,0.3), transparent)",
        opacity: 0,
      }}
      animate={{
        x: ["-10%", "30%"],
        opacity: [0, 0.7, 0.5, 0],
        scaleX: [0.6, 1, 0.8],
      }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

/* ── TEMP BADGE ── */
function TempBadge({ temp }: { temp: number }) {
  const color = temp > 30 ? "#ef4444" : temp > 26 ? "#fb923c" : "#38bdf8"
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring" }}
      className="absolute -top-8 right-4 rounded-2xl px-4 py-2 border backdrop-blur-xl"
      style={{
        background: "rgba(5,5,5,0.7)",
        borderColor: `${color}40`,
        boxShadow: `0 0 24px ${color}30`,
      }}
    >
      <div className="text-xs text-white/40 font-medium tracking-widest uppercase mb-0.5">Teplota</div>
      <motion.div
        key={temp}
        initial={{ y: -6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="text-3xl font-black tabular-nums"
        style={{ color, textShadow: `0 0 16px ${color}60` }}
      >
        {temp}°C
      </motion.div>
    </motion.div>
  )
}

/* ── MAIN AC ILLUSTRATION ── */
function ACSvg({ on }: { on: boolean }) {
  return (
    <svg
      viewBox="0 0 480 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg drop-shadow-2xl"
      style={{ filter: on ? "drop-shadow(0 0 28px rgba(56,189,248,0.18))" : "none" }}
    >
      {/* ── Shadow ── */}
      <ellipse cx="240" cy="174" rx="180" ry="8" fill="rgba(0,0,0,0.25)" />

      {/* ── Main body ── */}
      {/* Background white body */}
      <rect x="12" y="22" width="456" height="142" rx="28" fill="url(#bodyGrad)" />

      {/* Top gloss highlight */}
      <rect x="20" y="24" width="440" height="48" rx="22"
        fill="url(#gloss)" opacity="0.7" />

      {/* ── Silver accent band ── */}
      <rect x="14" y="128" width="452" height="20" rx="4" fill="url(#silverBand)" />

      {/* ── Bottom vent area ── */}
      <rect x="14" y="142" width="452" height="22" rx="6" fill="#dde4ed" />
      {/* Louver slats */}
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={28 + i * 31} y="144" width="20" height="18" rx="2" fill="#c8d2de" />
      ))}

      {/* ── Vent flap (animated open) ── */}
      <motion.rect
        x="14" y="158" width="452" height="6" rx="3"
        fill="#b8c4d2"
        animate={{ y: on ? 164 : 158, scaleY: on ? 0.6 : 1 }}
        transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 60 }}
      />

      {/* ── Digital display (top right) ── */}
      <rect x="368" y="38" width="80" height="52" rx="8" fill="#0a1420" />
      <rect x="371" y="41" width="74" height="46" rx="6" fill="#0d1c2e" />
      {/* Display glow when on */}
      {on && (
        <rect x="371" y="41" width="74" height="46" rx="6"
          fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.6" />
      )}
      {/* Temperature digits in display */}
      <motion.text
        x="408"
        y="70"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="bold"
        fontSize="20"
        animate={{ fill: on ? "#38bdf8" : "#334455" }}
        transition={{ duration: 0.5 }}
      >
        22°
      </motion.text>

      {/* LED dot */}
      <motion.circle
        cx="398" cy="78" r="3"
        animate={{ fill: on ? "#38bdf8" : "#223", opacity: on ? 1 : 0.3 }}
        transition={{ duration: 0.4 }}
      />

      {/* LED blink */}
      {on && (
        <motion.circle cx="398" cy="78" r="5"
          animate={{ opacity: [0.4, 0, 0.4], r: [3, 7, 3] }}
          transition={{ duration: 2, repeat: Infinity }}
          fill="none" stroke="#38bdf8" strokeWidth="1"
        />
      )}

      {/* ── Logo text ── */}
      <text x="200" y="90" textAnchor="middle"
        fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="600"
        fill="#a0adb8" letterSpacing="4">
        KLIMEON
      </text>

      {/* ── Subtle crease line ── */}
      <line x1="20" y1="108" x2="460" y2="108" stroke="#d0d8e4" strokeWidth="0.8" />

      {/* ── Blue glow stripe when on ── */}
      <motion.rect
        x="14" y="126" width="452" height="3" rx="1.5"
        animate={{ fill: on ? "#0ea5e9" : "#b0bcc8", opacity: on ? 0.8 : 0.4 }}
        transition={{ duration: 0.6 }}
      />
      {on && (
        <motion.rect
          x="14" y="126" width="452" height="3" rx="1.5"
          fill="#38bdf8"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}

      {/* ── Gradients ── */}
      <defs>
        <linearGradient id="bodyGrad" x1="240" y1="22" x2="240" y2="164" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fafd" />
          <stop offset="60%" stopColor="#f0f4f9" />
          <stop offset="100%" stopColor="#e4eaf2" />
        </linearGradient>
        <linearGradient id="gloss" x1="240" y1="24" x2="240" y2="72" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
        </linearGradient>
        <linearGradient id="silverBand" x1="14" y1="138" x2="466" y2="138" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b0bcc8" />
          <stop offset="30%" stopColor="#d0dae4" />
          <stop offset="50%" stopColor="#e0e8f0" />
          <stop offset="70%" stopColor="#d0dae4" />
          <stop offset="100%" stopColor="#b0bcc8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ── SNOWFLAKES CONFIG ── */
const FLAKES = [
  { x: 18, delay: 0.2, duration: 2.8 },
  { x: 30, delay: 0.8, duration: 3.2 },
  { x: 42, delay: 0.0, duration: 2.5 },
  { x: 55, delay: 1.2, duration: 3.0 },
  { x: 66, delay: 0.4, duration: 2.7 },
  { x: 74, delay: 1.6, duration: 3.4 },
  { x: 24, delay: 1.0, duration: 2.9 },
  { x: 60, delay: 0.6, duration: 2.6 },
]

const WAVES = [
  { y: 67, delay: 0,   width: 120 },
  { y: 71, delay: 0.4, width: 90  },
  { y: 75, delay: 0.8, width: 140 },
  { y: 69, delay: 1.2, width: 80  },
  { y: 73, delay: 0.2, width: 110 },
]

/* ── MAIN EXPORT ── */
export default function HeroCanvas() {
  const [on, setOn] = useState(false)
  const [temp, setTemp] = useState(36)

  useEffect(() => {
    const t1 = setTimeout(() => setOn(true), 1400)
    let t = 36
    const iv = setInterval(() => {
      t = Math.max(22, t - 0.5)
      setTemp(Math.round(t))
      if (t <= 22) clearInterval(iv)
    }, 120)
    return () => { clearTimeout(t1); clearInterval(iv) }
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-full max-w-xl px-6">

        {/* TEMP BADGE */}
        <TempBadge temp={temp} />

        {/* AIR WAVES */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {on && WAVES.map((w, i) => (
            <AirWave key={i} {...w} />
          ))}
        </div>

        {/* AC UNIT */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            animation: "float 4s ease-in-out infinite",
          }}
        >
          <style>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>
          <ACSvg on={on} />
        </motion.div>

        {/* SNOWFLAKES */}
        <div className="absolute inset-0 overflow-visible pointer-events-none">
          {on && FLAKES.map((f, i) => (
            <Snowflake key={i} {...f} />
          ))}
        </div>

        {/* ON label */}
        {on && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-sky-400/70 font-medium"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block"
            />
            Klimeon beží · Chladenie aktívne
          </motion.div>
        )}
      </div>
    </div>
  )
}
