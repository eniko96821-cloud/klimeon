// FILE: src/components/Footer.tsx
"use client"

import { Globe, AtSign, ExternalLink } from "lucide-react"

const columns = [
  {
    title: "Spoločnosť",
    links: [
      { label: "O nás", href: "#" },
      { label: "Náš tím", href: "#" },
      { label: "Kariéra", href: "#" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },
  {
    title: "Služby",
    links: [
      { label: "Montáž klimatizácie", href: "#montaz" },
      { label: "Servis a údržba", href: "#servis" },
      { label: "Čistenie klimatizácie", href: "#" },
      { label: "Poradenstvo", href: "#" },
    ],
  },
  {
    title: "Značky",
    links: [
      { label: "Daikin", href: "#" },
      { label: "Samsung", href: "#" },
      { label: "Gree", href: "#" },
      { label: "Inventor", href: "#" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      { label: "+421 900 123 456", href: "tel:+421900123456" },
      { label: "info@klimeon.sk", href: "mailto:info@klimeon.sk" },
      { label: "Slovenská republika", href: "#" },
      { label: "Po–Pi 8:00–18:00", href: "#" },
    ],
  },
]

export default function Footer() {
  return (
    <footer
      id="kontakt"
      className="border-t border-white/6 pt-16 pb-8"
      style={{ background: "#050505" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-lg font-bold tracking-widest text-white">KLIMEON</span>
              <span
                className="w-1.5 h-1.5 rounded-full bg-sky-400 mb-0.5"
                style={{ boxShadow: "0 0 6px #38bdf8" }}
              />
            </div>
            <p className="text-sm text-white/35 leading-relaxed mb-6">
              Profesionálna montáž klimatizácie na Slovensku. Komfort, ktorý cítite.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Globe, href: "#", label: "Web" },
                { Icon: AtSign, href: "#", label: "Instagram" },
                { Icon: ExternalLink, href: "#", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-white/8 bg-white/3 hover:bg-white/8 hover:border-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white/70 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <div className="text-xs text-white/25">
            © {new Date().getFullYear()} Klimeon s.r.o. · IČO: 12 345 678 · Všetky práva vyhradené
          </div>
          <div className="flex gap-6">
            {["Ochrana osobných údajov", "Obchodné podmienky", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-white/25 hover:text-white/50 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
