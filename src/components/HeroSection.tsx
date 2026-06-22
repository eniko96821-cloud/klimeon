// FILE: src/components/HeroSection.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Star, Zap, Clock } from "lucide-react"

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  duration: Math.random() * 10 + 8,
  delay: Math.random() * 5,
}))

function TempBadge() {
  const [temp, setTemp] = useState(38)
  const [phase, setPhase] = useState<"hot" | "cooling" | "cool">("hot")

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("cooling")
      let t = 38
      const interval = setInterval(() => {
        t -= 1
        setTemp(t)
        if (t <= 22) {
          setTemp(22)
          setPhase("cool")
          clearInterval(interval)
        }
      }, 80)
      return () => clearInterval(interval)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6, type: "spring" }}
      className="absolute top-32 right-8 lg:right-24 z-10"
    >
      <div
        className="rounded-2xl px-5 py-4 backdrop-blur-xl border transition-all duration-500"
        style={{
          background:
            phase === "hot"
              ? "rgba(239,68,68,0.12)"
              : phase === "cooling"
              ? "rgba(251,146,60,0.1)"
              : "rgba(14,165,233,0.12)",
          borderColor:
            phase === "hot"
              ? "rgba(239,68,68,0.2)"
              : phase === "cooling"
              ? "rgba(251,146,60,0.2)"
              : "rgba(14,165,233,0.25)",
          boxShadow:
            phase === "cool"
              ? "0 0 30px rgba(14,165,233,0.15)"
              : "0 0 30px rgba(239,68,68,0.1)",
        }}
      >
        <div className="text-xs text-white/50 mb-1 font-medium tracking-widest uppercase">
          Teplota v byte
        </div>
        <div
          className="text-4xl font-bold transition-all duration-300"
          style={{
            color:
              phase === "hot"
                ? "#ef4444"
                : phase === "cooling"
                ? "#fb923c"
                : "#38bdf8",
          }}
        >
          {temp}°C
        </div>
        <div className="text-xs text-white/40 mt-1">
          {phase === "cool" ? "✓ Ideálna teplota" : "Klimeon rieši →"}
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)",
          }}
        />
        {/* Top right warm glow (heat source) */}
        <motion.div
          animate={{ opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-sky-400/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Temperature badge */}
      <TempBadge />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-medium tracking-wider mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          Profesionálna montáž na Slovensku
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-[90px] font-bold leading-[1.05] tracking-tight text-white max-w-4xl"
        >
          Komfort,
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 30%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ktorý cítite.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-white/50 max-w-xl leading-relaxed"
        >
          Profesionálna montáž klimatizácie pre domy, byty a kancelárie na Slovensku. Rýchlo, spoľahlivo a s plnou zárukou.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#cenova-ponuka"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-full transition-all duration-200 text-sm"
            style={{ boxShadow: "0 0 30px rgba(14,165,233,0.35)" }}
          >
            Získať cenovú ponuku
            <ArrowRight size={16} />
          </a>
          <a
            href="#referencie"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 font-medium rounded-full transition-all duration-200 text-sm"
          >
            Pozrieť referencie
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 flex flex-wrap gap-8"
        >
          {[
            { icon: <Zap size={16} />, stat: "500+", label: "montáží" },
            { icon: <Star size={16} />, stat: "4.9★", label: "hodnotenie" },
            { icon: <Clock size={16} />, stat: "15 min", label: "odpoveď" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-sky-400">{item.icon}</span>
              <div>
                <div className="text-white font-bold text-lg leading-none">{item.stat}</div>
                <div className="text-white/40 text-xs mt-0.5">{item.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs tracking-widest uppercase">Scrollovať</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
