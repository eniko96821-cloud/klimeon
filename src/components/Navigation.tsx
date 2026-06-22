// FILE: src/components/Navigation.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Domov", href: "#" },
  { label: "Klimatizácie", href: "#klimatizacie" },
  { label: "Montáž", href: "#montaz" },
  { label: "Servis", href: "#servis" },
  { label: "Referencie", href: "#referencie" },
  { label: "Kontakt", href: "#kontakt" },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 30)
      if (currentY < 80) {
        setIsVisible(true)
      } else if (currentY > lastScrollY.current + 5) {
        setIsVisible(false)
        setMobileOpen(false)
      } else if (currentY < lastScrollY.current - 5) {
        setIsVisible(true)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 pt-4"
    >
      <nav
        className={cn(
          "mx-auto max-w-7xl rounded-2xl px-6 py-3 transition-all duration-500",
          isScrolled
            ? "bg-white/5 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-black/40"
            : "bg-transparent border border-transparent"
        )}
      >
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1 shrink-0">
            <span className="text-xl font-bold tracking-widest text-white">KLIMEON</span>
            <span
              className="w-1.5 h-1.5 rounded-full bg-sky-400 mb-0.5"
              style={{ boxShadow: "0 0 8px #38bdf8" }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#cenova-ponuka"
            className="hidden lg:inline-flex items-center px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-full transition-all duration-200 shrink-0"
            style={{ boxShadow: "0 0 20px rgba(14,165,233,0.3)" }}
          >
            Získať cenovú ponuku
          </a>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden"
            >
              <div className="pt-4 pb-2 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#cenova-ponuka"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 px-5 py-3 bg-sky-500 hover:bg-sky-400 text-white text-sm font-semibold rounded-full text-center transition-all"
                >
                  Získať cenovú ponuku
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
