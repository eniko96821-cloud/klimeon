// FILE: src/components/BrandsSection.tsx
"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award } from "lucide-react"

const brands = [
  {
    name: "Daikin",
    tagline: "Japonská precíznosť. Lídra trhu.",
    color: "#0066cc",
    letter: "D",
  },
  {
    name: "Samsung",
    tagline: "Inovatívne technológie pre domácnosti.",
    color: "#1428A0",
    letter: "S",
  },
  {
    name: "Gree",
    tagline: "Najväčší výrobca klimatizácií na svete.",
    color: "#009a44",
    letter: "G",
  },
  {
    name: "Inventor",
    tagline: "Grécka kvalita za dostupnú cenu.",
    color: "#e84e0f",
    letter: "I",
  },
  {
    name: "Vivax",
    tagline: "Moderný dizajn a tichá prevádzka.",
    color: "#c8102e",
    letter: "V",
  },
  {
    name: "Polar",
    tagline: "Spoľahlivé chladenie pre každého.",
    color: "#38bdf8",
    letter: "P",
  },
]

export default function BrandsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      className="py-28 relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-medium tracking-wider mb-6">
            <Award size={12} />
            Autorizovaný predajca
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Prémiové značky,
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ktorým dôverujeme
            </span>
          </h2>
          <p className="mt-5 text-white/50 max-w-xl mx-auto leading-relaxed">
            Spolupracujeme iba s overenými svetovými značkami. Ako autorizovaný predajca vám garantujeme originálne produkty s plnou zárukou výrobcu.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
              className="group relative p-6 rounded-2xl border border-white/6 bg-white/3 backdrop-blur-sm hover:border-white/15 hover:bg-white/5 transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 100%, ${brand.color}18 0%, transparent 70%)`,
                }}
              />

              <div className="relative flex flex-col items-center text-center gap-4">
                {/* Logo placeholder */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${brand.color}20`,
                    border: `1px solid ${brand.color}30`,
                    color: brand.color,
                  }}
                >
                  {brand.letter}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{brand.name}</h3>
                  <p className="text-xs text-white/40 mt-1 leading-snug">{brand.tagline}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="text-center text-xs text-white/25 mt-10"
        >
          Klimeon je autorizovaný predajca a servisný partner pre všetky uvedené značky
        </motion.p>
      </div>
    </section>
  )
}
