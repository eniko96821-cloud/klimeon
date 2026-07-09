"use client"

import dynamic from "next/dynamic"
import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Environment, ContactShadows, PresentationControls } from "@react-three/drei"
import { AirconModel } from "./AirconModel"

const STORY_STEPS = [
  {
    step: 0,
    badge: "Výkon",
    title: "Chladenie,\nktoré cítite.",
    body: "Moderná inverterová technológia chladí váš priestor na 22°C za menej ako 15 minút.",
    stat: { value: "22°C", label: "za 15 minút" },
    color: "#38bdf8",
  },
  {
    step: 1,
    badge: "Tichosť",
    title: "Ticho ako\nšepot.",
    body: "Iba 19 dB hluku — tichší ako šepot. Perfektný spánok každú noc, aj v lete.",
    stat: { value: "19 dB", label: "hluk prevádzky" },
    color: "#818cf8",
  },
  {
    step: 2,
    badge: "Úspora",
    title: "Šetrí energiu,\nnie komfort.",
    body: "Trieda A+++ — spotrebuje o 60% menej energie oproti starším modelom. Nižší účet každý mesiac.",
    stat: { value: "A+++", label: "energetická trieda" },
    color: "#34d399",
  },
  {
    step: 3,
    badge: "Montáž",
    title: "Namontované\ndo 48 hodín.",
    body: "Náš tím príde, nainštaluje a nastaví všetko za vás. Bezplatná obhliadka, záruka 5 rokov.",
    stat: { value: "48h", label: "montáž" },
    color: "#fb923c",
  },
]

function Scene({ progress }: { progress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 40 }}
      shadows
      dpr={[1, 2]}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={0.4} color="#60c8f0" />
      <pointLight position={[0, -2, 3]} intensity={0.3} color="#818cf8" />

      <PresentationControls
        global
        polar={[-0.2, 0.2]}
        azimuth={[-0.4, 0.4]}
      >
        <AirconModel scrollProgress={progress} />
      </PresentationControls>

      <ContactShadows
        position={[0, -1.8, 0]}
        opacity={0.35}
        scale={6}
        blur={2.5}
        far={4}
        color="#000820"
      />
      <Environment preset="city" />
    </Canvas>
  )
}

export default function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // Update active step based on scroll
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        STORY_STEPS.length - 1,
        Math.floor(v * STORY_STEPS.length)
      )
      setActiveStep(idx)
    })
    return unsub
  }, [scrollYProgress])

  const step = STORY_STEPS[activeStep]

  // Canvas subtle movement from scroll
  const canvasY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${STORY_STEPS.length * 100}vh`, background: "#050505" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        {/* Background glow that follows color */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: `radial-gradient(ellipse 60% 60% at 60% 40%, ${step.color}08 0%, transparent 70%)`,
          }}
          transition={{ duration: 0.8 }}
        />

        {/* Grid layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-16 grid lg:grid-cols-2 items-center gap-8 lg:gap-0">

          {/* LEFT: Text */}
          <div className="order-2 lg:order-1 flex flex-col">

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-8">
              {STORY_STEPS.map((s, i) => (
                <motion.div
                  key={i}
                  className="rounded-full"
                  animate={{
                    width: i === activeStep ? 28 : 8,
                    background: i === activeStep ? step.color : "rgba(255,255,255,0.15)",
                    opacity: i <= activeStep ? 1 : 0.4,
                  }}
                  style={{ height: 8 }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>

            {/* Badge */}
            <motion.div
              key={`badge-${activeStep}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="w-fit mb-5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{
                background: `${step.color}15`,
                border: `1px solid ${step.color}30`,
                color: step.color,
              }}
            >
              {step.badge}
            </motion.div>

            {/* Title */}
            <motion.h2
              key={`title-${activeStep}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white mb-5"
              style={{ whiteSpace: "pre-line" }}
            >
              {step.title}
            </motion.h2>

            {/* Body */}
            <motion.p
              key={`body-${activeStep}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base md:text-lg leading-relaxed max-w-md mb-8"
              style={{ color: "rgba(245,245,245,0.5)" }}
            >
              {step.body}
            </motion.p>

            {/* Stat */}
            <motion.div
              key={`stat-${activeStep}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex items-end gap-2"
            >
              <span
                className="text-6xl font-black tabular-nums leading-none"
                style={{ color: step.color, textShadow: `0 0 40px ${step.color}50` }}
              >
                {step.stat.value}
              </span>
              <span className="text-sm mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                {step.stat.label}
              </span>
            </motion.div>

            {/* CTA on last step */}
            {activeStep === STORY_STEPS.length - 1 && (
              <motion.a
                href="#cenova-ponuka"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 w-fit inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  boxShadow: "0 0 32px rgba(14,165,233,0.35)",
                }}
              >
                Získať cenovú ponuku →
              </motion.a>
            )}
          </div>

          {/* RIGHT: 3D Model */}
          <motion.div
            className="order-1 lg:order-2 relative"
            style={{ height: "520px", y: canvasY }}
          >
            {/* Color glow behind model */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: `radial-gradient(ellipse 80% 60% at 50% 55%, ${step.color}12 0%, transparent 70%)`,
              }}
              transition={{ duration: 0.8 }}
            />
            <Scene progress={activeStep / (STORY_STEPS.length - 1)} />
          </motion.div>
        </div>

        {/* Scroll hint (only first step) */}
        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scrollovať</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
