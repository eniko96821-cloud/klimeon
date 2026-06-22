"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronDown, Star, Zap, Clock } from "lucide-react"

// Dynamic import – no SSR for Three.js
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false })

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
      }, 70)
      return () => clearInterval(interval)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  const isHot = phase === "hot"
  const isCool = phase === "cool"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.7, type: "spring", stiffness: 120 }}
      className="inline-flex flex-col items-center"
    >
      <div
        className="rounded-2xl px-6 py-4 backdrop-blur-2xl border transition-all duration-500 relative overflow-hidden"
        style={{
          background: isCool
            ? "rgba(14,165,233,0.1)"
            : isHot
            ? "rgba(239,68,68,0.1)"
            : "rgba(251,146,60,0.08)",
          borderColor: isCool
            ? "rgba(14,165,233,0.3)"
            : isHot
            ? "rgba(239,68,68,0.25)"
            : "rgba(251,146,60,0.25)",
          boxShadow: isCool
            ? "0 0 40px rgba(14,165,233,0.2), inset 0 1px 0 rgba(255,255,255,0.08)"
            : "0 0 40px rgba(239,68,68,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        {/* Animated shimmer */}
        {!isCool && (
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
          />
        )}
        <div className="text-xs text-white/50 font-semibold tracking-widest uppercase mb-2">
          Teplota v byte
        </div>
        <motion.div
          key={temp}
          className="text-5xl font-black tabular-nums"
          style={{
            color: isCool ? "#38bdf8" : isHot ? "#ef4444" : "#fb923c",
            textShadow: isCool
              ? "0 0 20px rgba(56,189,248,0.5)"
              : "0 0 20px rgba(239,68,68,0.4)",
          }}
        >
          {temp}°C
        </motion.div>
        <div className="text-xs mt-2 font-medium" style={{ color: isCool ? "#38bdf8" : "#fb923c" }}>
          {isCool ? "✓ Ideálna teplota" : isHot ? "Prehriatý vzduch" : "Klimeon chladí…"}
        </div>
      </div>
      {/* Arrow down */}
      {isCool && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          className="w-px h-8 mt-2"
          style={{ background: "linear-gradient(180deg, rgba(56,189,248,0.4), transparent)" }}
        />
      )}
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Full-screen 3D Canvas — behind everything */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Gradient overlay — fades canvas at bottom */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, #050505 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #050505, transparent)",
        }}
      />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top: badge row (mobile center, desktop top-right) */}
        <div className="flex justify-center md:justify-end px-6 pt-28 md:pt-32 md:pr-16">
          <TempBadge />
        </div>

        {/* Middle: main text */}
        <div className="flex-1 flex flex-col justify-end pb-12 px-6 md:px-12 lg:px-20 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/8 text-sky-400 text-xs font-semibold tracking-wider mb-6 w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            Profesionálna montáž na Slovensku
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.02] tracking-tight text-white"
          >
            Komfort,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 20%, #38bdf8 100%)",
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
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-5 text-base md:text-lg text-white/50 max-w-lg leading-relaxed"
          >
            Profesionálna montáž klimatizácie pre domy, byty a kancelárie na Slovensku.
            Rýchlo, spoľahlivo a s plnou zárukou.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#cenova-ponuka"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-bold rounded-full transition-all duration-200 text-sm"
              style={{ boxShadow: "0 0 30px rgba(14,165,233,0.4)" }}
            >
              Získať cenovú ponuku
              <ArrowRight size={16} />
            </a>
            <a
              href="#referencie"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5 active:scale-95 font-medium rounded-full transition-all duration-200 text-sm"
            >
              Pozrieť referencie
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap gap-6 md:gap-10"
          >
            {[
              { icon: <Zap size={15} />, stat: "500+", label: "montáží" },
              { icon: <Star size={15} />, stat: "4.9★", label: "hodnotenie" },
              { icon: <Clock size={15} />, stat: "15 min", label: "odpoveď" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sky-400"
                  style={{ background: "rgba(14,165,233,0.1)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-white font-bold text-base leading-none">{item.stat}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="relative z-10 flex flex-col items-center gap-2 pb-6 text-white/25"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scrollovať</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
