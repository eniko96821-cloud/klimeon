"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Thermometer, Moon, Brain, HeartPulse } from "lucide-react"

function HeatGauge({ inView }: { inView: boolean }) {
  const [value, setValue] = useState(18)

  useEffect(() => {
    if (!inView) return
    let v = 18
    const timer = setInterval(() => {
      v += 0.4
      if (v >= 38) { setValue(38); clearInterval(timer) }
      else setValue(Math.round(v * 10) / 10)
    }, 30)
    return () => clearInterval(timer)
  }, [inView])

  const pct = Math.min(100, ((value - 15) / (45 - 15)) * 100)
  const color = value < 24 ? "#22d3ee" : value < 30 ? "#fb923c" : "#ef4444"
  const circumference = 2 * Math.PI * 54

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 128 128" className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
          {/* Track */}
          <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          {/* Progress */}
          <circle
            cx="64" cy="64" r="54"
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - pct / 100)}
            stroke={color}
            style={{ transition: "stroke-dashoffset 0.04s linear, stroke 0.5s ease", filter: `drop-shadow(0 0 6px ${color})` }}
          />
          <defs>
            <radialGradient id="innerGlow">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="64" cy="64" r="44" fill="url(#innerGlow)" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-black tabular-nums leading-none"
            style={{ color, textShadow: `0 0 24px ${color}80` }}
          >
            {Math.round(value)}°
          </span>
          <span className="text-xs text-white/40 mt-1 font-medium tracking-widest uppercase">Celsius</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-white/40 text-sm">Priemerná teplota v byte</p>
        <p className="text-white/20 text-xs mt-1">počas letných horúčav</p>
      </div>
    </div>
  )
}

const problems = [
  {
    icon: Moon,
    title: "Nekvalitný spánok",
    desc: "Nad 22°C mozog nevstúpi do hlbokého spánkového cyklu. Unavení každé ráno.",
    color: "#818cf8",
  },
  {
    icon: Brain,
    title: "Znížená produktivita",
    desc: "Štúdie potvrdzujú: pri 30°C klesá pracovný výkon až o 40%.",
    color: "#fb923c",
  },
  {
    icon: HeartPulse,
    title: "Zdravotné riziká",
    desc: "Prehriatý organizmus zaťažuje srdce a kardiovaskulárny systém.",
    color: "#ef4444",
  },
]

export default function HeatSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })

  return (
    <section
      ref={ref}
      className="relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ background: "#07090c" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(239,68,68,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/8 text-red-400 text-xs font-semibold tracking-wider mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          Realita slovenského leta
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight max-w-2xl mb-6"
        >
          38°C v byte.{" "}
          <span style={{ color: "#ef4444" }}>Bez riešenia.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/50 text-lg max-w-xl mb-16 leading-relaxed"
        >
          Každé leto milióny Slovákov trápia prehriaté byty a domy. Narušený
          spánok, znížená produktivita — to je realita bez klimatizácie.
        </motion.p>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <HeatGauge inView={inView} />
          </motion.div>

          {/* Right: problem cards */}
          <div className="flex flex-col gap-4">
            {problems.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
                  className="flex gap-4 p-5 rounded-2xl border"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: `${p.color}20`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${p.color}15`, color: p.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{p.title}</div>
                    <div className="text-white/45 text-sm leading-relaxed">{p.desc}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 grid grid-cols-3 gap-4 pt-8 border-t border-white/5"
        >
          {[
            { num: "67%", label: "Slovákov bez klimatizácie" },
            { num: "38°C", label: "Max teplota v byte" },
            { num: "40%", label: "Pokles produktivity" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-black" style={{ color: "#ef4444" }}>{s.num}</div>
              <div className="text-white/35 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
