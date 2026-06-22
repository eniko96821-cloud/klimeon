// FILE: src/components/ProcessSection.tsx
"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FileText, Phone, MapPin, Wrench, Smile } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: <FileText size={22} />,
    title: "Cenová ponuka",
    desc: "Vyplňte jednoduchý formulár online. Do 15 minút dostanete predbežnú cenovú ponuku prispôsobenú vašim potrebám.",
    color: "#38bdf8",
  },
  {
    number: "02",
    icon: <Phone size={22} />,
    title: "Konzultácia",
    desc: "Náš odborník vám zavolá, prekonzultuje vaše požiadavky a odporučí optimálne riešenie pre váš priestor.",
    color: "#60a5fa",
  },
  {
    number: "03",
    icon: <MapPin size={22} />,
    title: "Obhliadka",
    desc: "Technik príde k vám domov, zmeria priestor a vypracuje finálny projekt s presnou cenou montáže.",
    color: "#818cf8",
  },
  {
    number: "04",
    icon: <Wrench size={22} />,
    title: "Montáž",
    desc: "Profesionálna inštalácia certifikovanými technikmi. Montáž trvá väčšinou 4–6 hodín, bez bordelu a stresu.",
    color: "#a78bfa",
  },
  {
    number: "05",
    icon: <Smile size={22} />,
    title: "Komfort",
    desc: "Užívajte si dokonalý komfort! Poskytujeme 3-ročnú záruku na montáž a servisný plán podľa vašich prianí.",
    color: "#34d399",
  },
]

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section
      id="montaz"
      ref={ref}
      className="py-28 relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(14,165,233,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-medium tracking-wider mb-6">
            <Wrench size={12} />
            Postup montáže
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ako prebieha
            <span
              className="block"
              style={{
                background: "linear-gradient(135deg, #38bdf8, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              montáž?
            </span>
          </h2>
          <p className="mt-5 text-white/50 max-w-lg mx-auto leading-relaxed">
            Od prvého kontaktu po funkčnú klimatizáciu — náš proces je navrhnutý tak, aby bol pre vás čo najjednoduchší.
          </p>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting line */}
          <div className="absolute top-14 left-0 right-0 h-px bg-white/5" />
          <motion.div
            className="absolute top-14 left-0 h-px bg-gradient-to-r from-sky-500/50 to-violet-500/50"
            initial={{ width: "0%" }}
            animate={inView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />

          <div className="grid grid-cols-5 gap-4 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Circle */}
                <div
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center mb-6 bg-[#0a0a0a] relative z-10"
                  style={{ borderColor: step.color }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: step.color, boxShadow: `0 0 10px ${step.color}` }}
                  />
                </div>

                {/* Card */}
                <div
                  className="w-full p-5 rounded-2xl border border-white/6 bg-white/3 backdrop-blur-sm hover:border-white/12 hover:bg-white/5 transition-all duration-300 group"
                >
                  <div
                    className="text-xs font-mono mb-3 font-bold"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </div>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${step.color}15`, color: step.color }}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/5" />
          <motion.div
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-sky-500/50 to-violet-500/50"
            initial={{ height: "0%" }}
            animate={inView ? { height: "100%" } : { height: "0%" }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />

          <div className="flex flex-col gap-6 pl-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className="absolute -left-10 top-5 w-5 h-5 rounded-full border-2 bg-[#0a0a0a] flex items-center justify-center"
                  style={{ borderColor: step.color }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: step.color }}
                  />
                </div>

                <div className="p-5 rounded-2xl border border-white/6 bg-white/3">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${step.color}15`, color: step.color }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono" style={{ color: step.color }}>
                        {step.number}
                      </div>
                      <h3 className="text-white font-semibold text-sm">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-16"
        >
          <a
            href="#cenova-ponuka"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-full transition-all duration-200 text-sm"
            style={{ boxShadow: "0 0 30px rgba(14,165,233,0.3)" }}
          >
            Začať krok 1 — Cenová ponuka
          </a>
        </motion.div>
      </div>
    </section>
  )
}
