// FILE: src/components/SolutionSection.tsx
"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Volume2, Leaf, Wind } from "lucide-react"

const features = [
  {
    icon: <Volume2 size={22} />,
    title: "Tichá prevádzka",
    desc: "Moderné klimatizácie dosahujú hlučnosť iba 19 dB — tichšie ako šepot. Spajte pokojne bez rušivých zvukov.",
    detail: "≤ 19 dB",
    detailLabel: "hladina hluku",
    color: "#38bdf8",
  },
  {
    icon: <Leaf size={22} />,
    title: "Energetická efektívnosť",
    desc: "Trieda A+++ znamená minimálnu spotrebu energie. Klimatizácia chladí efektívnejšie ako ventilátor pri nižších nákladoch.",
    detail: "A+++",
    detailLabel: "energetická trieda",
    color: "#34d399",
  },
  {
    icon: <Wind size={22} />,
    title: "Čistý vzduch",
    desc: "Viacvrstvové filtre zachytávajú prach, peľ, baktérie a vírusy. Ideálne pre alergikov a deti.",
    detail: "99.9%",
    detailLabel: "filtrácia vzduchu",
    color: "#818cf8",
  },
]

function CoolingVisual({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square">
      {/* Outer ring */}
      <motion.div
        animate={inView ? { rotate: 360 } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-sky-500/10"
      />
      {/* Middle ring */}
      <motion.div
        animate={inView ? { rotate: -360 } : {}}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="absolute inset-8 rounded-full border border-sky-400/15"
      />
      {/* Inner ring */}
      <motion.div
        animate={inView ? { rotate: 360 } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-16 rounded-full border border-sky-300/20"
      />

      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={inView ? { scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(14,165,233,0.05) 70%)",
            boxShadow: "0 0 60px rgba(14,165,233,0.2)",
          }}
        >
          <span className="text-3xl font-bold text-sky-300">22°</span>
        </motion.div>
      </div>

      {/* Orbiting dots */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-sky-400/60"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={
            inView
              ? {
                  x: [
                    Math.cos((i / 6) * Math.PI * 2) * 80,
                    Math.cos(((i + 1) / 6) * Math.PI * 2) * 80,
                    Math.cos(((i + 2) / 6) * Math.PI * 2) * 80,
                  ],
                  y: [
                    Math.sin((i / 6) * Math.PI * 2) * 80,
                    Math.sin(((i + 1) / 6) * Math.PI * 2) * 80,
                    Math.sin(((i + 2) / 6) * Math.PI * 2) * 80,
                  ],
                }
              : {}
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: (i / 6) * 8,
          }}
        />
      ))}

      {/* Cool wave lines */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border border-sky-400/8"
          animate={inView ? { scale: [1, 1.8], opacity: [0.4, 0] } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export default function SolutionSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="servis"
      ref={ref}
      className="py-28 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      {/* Cool blue ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(14,165,233,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-medium tracking-wider mb-6">
            <Wind size={12} />
            Riešenie Klimeon
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Chladný vzduch.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ticho. Komfort.
            </span>
          </h2>
          <p className="mt-5 text-white/50 max-w-xl mx-auto leading-relaxed">
            Klimeon inštaluje prémiové klimatizačné systémy, ktoré menia váš domov na oázu pohodlia — tichú, efektívnu a dlhodobú.
          </p>
        </motion.div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: feature cards */}
          <div className="flex flex-col gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="group p-6 rounded-2xl border border-white/6 bg-white/3 backdrop-blur-sm hover:border-white/12 hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${f.color}18`, color: f.color }}
                  >
                    {f.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-white font-semibold">{f.title}</h3>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold" style={{ color: f.color }}>
                          {f.detail}
                        </div>
                        <div className="text-xs text-white/30">{f.detailLabel}</div>
                      </div>
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: animated visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <CoolingVisual inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
