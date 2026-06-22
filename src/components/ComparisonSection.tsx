// FILE: src/components/ComparisonSection.tsx
"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { X, Check } from "lucide-react"

const rows = [
  { label: "Teplota v byte", bad: "38°C – neznesiteľné horúco", good: "22°C – ideálny komfort" },
  { label: "Kvalita spánku", bad: "Nekvalitný, prerušovaný", good: "Hlboký a regeneračný" },
  { label: "Produktivita", bad: "Znížená o 40%", good: "Plný výkon celý deň" },
  { label: "Kvalita vzduchu", bad: "Horúci, prašný, vydýchaný", good: "Čistý, filtrovaný" },
  { label: "Hluk", bad: "Vonkajší ruch cez okno", good: "Ticho — 19 dB" },
  { label: "Spotreba energie", bad: "Ventilátor nonstop, bez efektu", good: "Efektívne chladenie A+++" },
]

export default function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="referencie"
      ref={ref}
      className="py-28 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Rozdiel, ktorý{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              cítite každý deň
            </span>
          </h2>
          <p className="mt-5 text-white/50 max-w-xl mx-auto">
            Bez klimatizácie vs. s Klimeon — reálny rozdiel v každodennom živote.
          </p>
        </motion.div>

        {/* Column headers */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-center py-3 px-4 rounded-xl border border-red-500/20 bg-red-500/5"
          >
            <span className="text-sm font-semibold text-red-400">Bez klimatizácie</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center py-3 px-4 rounded-xl border border-sky-500/20 bg-sky-500/5"
          >
            <span className="text-sm font-semibold text-sky-400">S Klimeon</span>
          </motion.div>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-2">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="grid grid-cols-3 gap-4 items-stretch"
            >
              {/* Label */}
              <div className="flex items-center px-4 py-3 rounded-xl border border-white/5 bg-white/2">
                <span className="text-sm text-white/50 font-medium">{row.label}</span>
              </div>

              {/* Bad */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/10 bg-red-500/5 group hover:border-red-500/20 transition-all">
                <X size={14} className="text-red-400 shrink-0" />
                <span className="text-sm text-red-300/70 leading-snug">{row.bad}</span>
              </div>

              {/* Good */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-sky-500/15 bg-sky-500/5 group hover:border-sky-500/25 transition-all">
                <Check size={14} className="text-sky-400 shrink-0" />
                <span className="text-sm text-sky-300/80 leading-snug">{row.good}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center mt-12"
        >
          <p className="text-white/40 text-sm mb-6">Rozhodnite sa pre komfort. Získajte ponuku ešte dnes.</p>
          <a
            href="#cenova-ponuka"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-full transition-all duration-200 text-sm"
            style={{ boxShadow: "0 0 30px rgba(14,165,233,0.3)" }}
          >
            Získať bezplatnú ponuku
          </a>
        </motion.div>
      </div>
    </section>
  )
}
