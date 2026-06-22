"use client"

import dynamic from "next/dynamic"
import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Star, Zap, Clock, CheckCircle } from "lucide-react"

const ACAnimation = dynamic(() => import("./HeroCanvas"), { ssr: false })

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const },
})

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* ── BACKGROUND GLOWS ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left warm glow (heat) */}
        <div
          className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)",
          }}
        />
        {/* Right cool glow */}
        <div
          className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
          }}
        />
        {/* Center bottom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
          style={{
            background: "radial-gradient(ellipse, rgba(14,165,233,0.04) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── NOISE GRAIN ── */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── MAIN GRID LAYOUT ── */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2 items-center max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-16 gap-12 lg:gap-0">

        {/* ══ LEFT: TEXT CONTENT ══ */}
        <div className="flex flex-col justify-center order-2 lg:order-1">

          {/* Badge */}
          <motion.div {...fadeUp(0.1)} className="flex items-center gap-2 mb-7 w-fit">
            <div
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide"
              style={{
                background: "rgba(14,165,233,0.08)",
                border: "1px solid rgba(14,165,233,0.2)",
                color: "#38bdf8",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              Profesionálna montáž na Slovensku
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.2)}
            className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.0] tracking-tight text-white mb-6"
          >
            Komfort,{" "}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ktorý cítite.
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-base md:text-lg leading-relaxed mb-8 max-w-md"
            style={{ color: "rgba(245,245,245,0.5)" }}
          >
            Montáž klimatizácie pre byty, domy a kancelárie.
            Prémiové značky, záruka spokojnosti, odpoveď do 15 minút.
          </motion.p>

          {/* Check list */}
          <motion.ul {...fadeUp(0.38)} className="flex flex-col gap-2 mb-9">
            {["Bezplatná obhliadka a cenová ponuka", "Montáž do 48 hodín", "Záručný servis 5 rokov"].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm" style={{ color: "rgba(245,245,245,0.6)" }}>
                <CheckCircle size={14} className="text-sky-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </motion.ul>

          {/* CTAs */}
          <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-3 mb-10">
            <a
              href="#cenova-ponuka"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                boxShadow: "0 0 32px rgba(14,165,233,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              Získať cenovú ponuku
              <ArrowRight size={15} />
            </a>
            <a
              href="#montaz"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-200 hover:bg-white/8"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Ako prebieha montáž
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex gap-7 pt-7"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            {[
              { icon: Zap, value: "500+", label: "Montáží" },
              { icon: Star, value: "4.9★", label: "Hodnotenie" },
              { icon: Clock, value: "15 min", label: "Odpoveď" },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(14,165,233,0.1)", color: "#38bdf8" }}
                >
                  <Icon size={14} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm leading-none">{value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>{label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══ RIGHT: AC ANIMATION ══ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 lg:order-2 flex items-center justify-center"
          style={{ minHeight: "380px" }}
        >
          {/* Glow behind AC */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 55%, rgba(14,165,233,0.1) 0%, transparent 70%)",
            }}
          />

          {/* The AC animation fills this box */}
          <div className="relative w-full" style={{ maxWidth: "540px" }}>
            <ACAnimation />
          </div>
        </motion.div>
      </div>

      {/* ── SCROLL HINT ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scrollovať</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  )
}
