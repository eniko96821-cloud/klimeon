// FILE: src/components/CTASection.tsx
"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Phone } from "lucide-react"

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section
      ref={ref}
      className="py-28 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Blue glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(14,165,233,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-white">Začnite žiť</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              v komforte
            </span>
          </h2>

          <p className="mt-6 text-lg text-white/50 leading-relaxed max-w-xl mx-auto">
            Bezplatná konzultácia. Rýchla montáž. Záruka spokojnosti.
            <br />
            Vaša klimatizácia môže byť nainštalovaná už tento týždeň.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#cenova-ponuka"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-400 text-white font-bold rounded-full transition-all duration-200 text-base"
              style={{ boxShadow: "0 0 40px rgba(14,165,233,0.4)" }}
            >
              Získať bezplatnú cenovú ponuku
              <ArrowRight size={18} />
            </a>

            <a
              href="tel:+421900123456"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white/80 hover:text-white font-medium rounded-full transition-all duration-200 text-base"
            >
              <Phone size={16} />
              +421 900 123 456
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-white/25"
          >
            <span>✓ Bez záväzkov</span>
            <span>✓ Odpoveď do 15 minút</span>
            <span>✓ Certifikovaní technici</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
