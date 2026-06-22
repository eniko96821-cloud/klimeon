// FILE: src/components/HeatSection.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Thermometer, AlertTriangle, Users } from "lucide-react"

function HeatGauge({ target, inView }: { target: number; inView: boolean }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let v = 0
    const step = target / 60
    const timer = setInterval(() => {
      v += step
      if (v >= target) {
        setValue(target)
        clearInterval(timer)
      } else {
        setValue(Math.round(v))
      }
    }, 30)
    return () => clearInterval(timer)
  }, [inView, target])

  const pct = (value / 50) * 100

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
            stroke="url(#heatGrad)"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
          <defs>
            <linearGradient id="heatGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold"
            style={{ color: "#ef4444", textShadow: "0 0 20px rgba(239,68,68,0.5)" }}
          >
            {value}°
          </span>
          <span className="text-xs text-white/40">Celsius</span>
        </div>
      </div>
      <span className="text-sm text-white/50">Priemerná letná teplota bytu</span>
    </div>
  )
}

function HeatRoom({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full max-w-xs mx-auto aspect-square rounded-2xl overflow-hidden border border-white/5">
      {/* Room walls */}
      <div className="absolute inset-0" style={{ background: "#0a0a0a" }} />
      {/* Heat gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(239,68,68,0.35) 0%, rgba(251,146,60,0.2) 40%, transparent 70%)",
        }}
      />
      <motion.div
        animate={inView ? { opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 80% 80%, rgba(239,68,68,0.2) 0%, transparent 60%)",
        }}
      />
      {/* Heat shimmer lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute left-0 right-0 h-px"
          style={{ top: `${20 + i * 15}%`, background: "rgba(239,68,68,0.15)" }}
          animate={inView ? { scaleX: [0.6, 1, 0.8, 1, 0.6], opacity: [0, 0.4, 0] } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Window */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-12 rounded border border-white/10"
        style={{ background: "rgba(251,146,60,0.08)" }}
      />
      {/* Sun rays */}
      {inView && (
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-16"
          style={{
            background: "linear-gradient(to bottom, rgba(251,146,60,0.3), transparent)",
          }}
        />
      )}
      {/* Temp label */}
      <div className="absolute bottom-4 right-4 text-2xl font-bold" style={{ color: "#ef4444" }}>
        38°C
      </div>
      {/* Person icon */}
      <div className="absolute bottom-8 left-8 text-white/20">
        <Users size={32} />
      </div>
    </div>
  )
}

const stats = [
  { icon: <Thermometer size={20} />, value: "38°C", label: "Priemerná letná teplota", color: "#ef4444" },
  { icon: <Users size={20} />, value: "67%", label: "Domácností bez klimatizácie", color: "#f97316" },
  { icon: <AlertTriangle size={20} />, value: "40%", label: "Pokles produktivity v horúčave", color: "#fb923c" },
]

export default function HeatSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      id="klimatizacie"
      ref={ref}
      className="py-28 relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Warm ambient glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-orange-400 text-xs font-medium tracking-wider mb-6">
            <AlertTriangle size={12} />
            Realita slovenského leta
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #ef4444 60%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            38°C v byte.
            <br />
            Bez riešenia.
          </h2>
          <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            Každé leto milióny Slovákov trpia v prehriatych bytoch a domoch. Narušený spánok, znížená produktivita a zdravotné riziká — to je realita bez klimatizácie.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: heat room visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <HeatRoom inView={inView} />
            <p className="text-sm text-white/30 text-center max-w-xs">
              Vizualizácia typického bytu počas letných horúčav na Slovensku
            </p>
          </motion.div>

          {/* Right: gauge + text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-8"
          >
            <HeatGauge target={38} inView={inView} />

            <div className="space-y-4">
              {[
                "Narušený a nekvalitný spánok pri teplotách nad 25°C",
                "Pokles kognitívnych schopností až o 40% pri práci z domu",
                "Zvýšené riziko dehydratácie a tepelného vyčerpania",
                "Starí ľudia a deti sú obzvlášť ohrození horúčavami",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl border border-orange-500/10 bg-orange-500/5"
                >
                  <span className="text-orange-400 mt-0.5 shrink-0">
                    <AlertTriangle size={14} />
                  </span>
                  <span className="text-sm text-white/60 leading-relaxed">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm text-center"
            >
              <div className="flex justify-center mb-3" style={{ color: s.color }}>
                {s.icon}
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-sm text-white/40">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
