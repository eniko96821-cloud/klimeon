// FILE: src/components/TrustSection.tsx
"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"

function CountUp({ target, suffix = "", inView }: { target: number; suffix?: string; inView: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const steps = 60
    const increment = target / steps
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setVal(target)
        clearInterval(timer)
      } else {
        setVal(Math.floor(start))
      }
    }, 25)
    return () => clearInterval(timer)
  }, [inView, target])
  return (
    <span>
      {val}
      {suffix}
    </span>
  )
}

const stats = [
  { label: "Spokojných montáží", value: 500, suffix: "+", color: "#38bdf8" },
  { label: "Priemerné hodnotenie", value: 49, suffix: "★", display: "4.9★", color: "#f59e0b" },
  { label: "Rokov skúseností", value: 8, suffix: " rokov", color: "#34d399" },
  { label: "Minút odpoveď", value: 15, suffix: " min", color: "#a78bfa" },
]

const testimonials = [
  {
    initials: "MN",
    name: "Marta Nováková",
    city: "Bratislava",
    role: "Majiteľka bytu",
    stars: 5,
    text: "Klimeon nainštaloval klimatizáciu Daikin do nášho 3-izbového bytu za jeden deň. Technici boli profesionálni, čistí a všetko vysvetlili. Teraz spíme konečne v pohode aj v júli!",
    color: "#38bdf8",
  },
  {
    initials: "PK",
    name: "Peter Kováč",
    city: "Trnava",
    role: "Majiteľ firmy",
    stars: 5,
    text: "Pre naše kancelárie sme potrebovali riešenie pre 6 miestností. Klimeon ponúkol kompetitívnu cenu, montáž prebehla cez víkend bez narušenia práce. Skvelá investícia!",
    color: "#818cf8",
  },
  {
    initials: "ZH",
    name: "Zuzana Horáková",
    city: "Nitra",
    role: "Majiteľka domu",
    stars: 5,
    text: "Dlho som váhala, ale cena od Klimeon bola férová a reakcia bola okamžitá. Dnes nemôžem uveriť, že sme bez klimatizácie vydržali tak dlho. Odporúčam každému!",
    color: "#34d399",
  },
]

export default function TrustSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-28 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(14,165,233,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-medium tracking-wider mb-6">
            <Star size={12} />
            Overené zákazníkmi
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Stovky spokojných
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              zákazníkov
            </span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className="p-6 rounded-2xl border border-white/6 bg-white/3 text-center"
            >
              <div className="text-4xl font-bold mb-1" style={{ color: s.color }}>
                {s.display ? (
                  s.display
                ) : (
                  <>
                    <CountUp target={s.value} suffix={s.suffix} inView={inView} />
                  </>
                )}
              </div>
              <div className="text-xs text-white/40 leading-snug">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
              className="p-6 rounded-2xl border border-white/6 bg-white/3 backdrop-blur-sm hover:border-white/12 hover:bg-white/5 transition-all duration-300 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }, (_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-white/60 leading-relaxed flex-1 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: `${t.color}25`, border: `1px solid ${t.color}30` }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-white/35">
                    {t.role} · {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
