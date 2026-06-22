// FILE: src/components/ConfiguratorSection.tsx
"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Building2,
  BriefcaseBusiness,
  Plus,
  Minus,
  Sun,
  ChevronLeft,
  ChevronRight,
  Check,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  MessageSquare,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ——— Types ———
interface FormState {
  propertyType: "byt" | "dom" | "kancelaria" | ""
  roomCount: number
  avgRoomSize: number
  windowOrientation: string
  insulation: string
  brands: string[]
  budget: number
  timing: string
  locality: string
  name: string
  phone: string
  email: string
  message: string
  consent: boolean
}

const initialForm: FormState = {
  propertyType: "",
  roomCount: 1,
  avgRoomSize: 20,
  windowOrientation: "",
  insulation: "",
  brands: [],
  budget: 1500,
  timing: "",
  locality: "",
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
}

// ——— Price estimate logic ———
function estimatePrice(form: FormState): { low: number; high: number; power: number } {
  const basePerRoom = 600
  const rooms = form.roomCount || 1
  const size = form.avgRoomSize || 20
  const powerPerRoom = Math.ceil((size * 35) / 1000) * 0.5 // rough kW
  const totalPower = powerPerRoom * rooms

  let base = basePerRoom * rooms
  if (form.insulation === "stare") base *= 1.15
  if (form.insulation === "moderne") base *= 0.9
  if (form.windowOrientation === "juh") base *= 1.1
  if (form.brands.includes("Daikin") || form.brands.includes("Samsung")) base *= 1.2
  if (form.brands.includes("Gree") || form.brands.includes("Vivax")) base *= 0.95

  return {
    low: Math.round(base * 0.85 / 50) * 50,
    high: Math.round(base * 1.2 / 50) * 50,
    power: Math.round(totalPower * 10) / 10,
  }
}

// ——— Step tips ———
const stepTips: Record<number, string> = {
  1: "Typ nehnuteľnosti ovplyvní odporúčaný výkon a počet jednotiek.",
  2: "Pre každú miestnosť odporúčame samostatnú klimatizačnú jednotku.",
  3: "Väčšia miestnosť vyžaduje vyšší výkon. Na 20m² stačí 2kW.",
  4: "Miestnosti na juh vyžadujú až o 20% vyšší výkon klimatizácie.",
  5: "Dobré zateplenie znižuje potrebný výkon klimatizácie.",
  6: "Daikin a Samsung sú prémiové, Gree a Vivax ponúkajú skvelý pomer ceny/výkonu.",
  7: "Cena zahŕňa klimatizáciu, montáž, uvedenie do prevádzky a záruku.",
  8: "Montáž zvyčajne trvá 4–6 hodín a nezanecháva neporiadok.",
  9: "Vieme obsluhovať celé Slovensko — aj menšie mestá.",
  10: "Vaše kontaktné údaje sú v bezpečí. Kontaktujeme vás do 15 minút.",
}

// ——— Step components ———

function Step1({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const options = [
    { value: "byt" as const, label: "Byt", Icon: Home, desc: "Bytová jednotka" },
    { value: "dom" as const, label: "Dom", Icon: Building2, desc: "Rodinný dom" },
    { value: "kancelaria" as const, label: "Kancelária", Icon: BriefcaseBusiness, desc: "Firemné priestory" },
  ]
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white/50 text-sm mb-2">Vyberte typ vašej nehnuteľnosti</p>
      {options.map(({ value, label, Icon, desc }) => (
        <button
          key={value}
          onClick={() => setForm({ ...form, propertyType: value })}
          className={cn(
            "flex items-center gap-4 p-5 rounded-2xl border transition-all duration-200 text-left",
            form.propertyType === value
              ? "border-sky-500/60 bg-sky-500/10"
              : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
          )}
        >
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
              form.propertyType === value ? "bg-sky-500/20 text-sky-400" : "bg-white/5 text-white/40"
            )}
          >
            <Icon size={22} />
          </div>
          <div className="flex-1">
            <div className={cn("font-semibold", form.propertyType === value ? "text-white" : "text-white/70")}>
              {label}
            </div>
            <div className="text-xs text-white/40 mt-0.5">{desc}</div>
          </div>
          {form.propertyType === value && (
            <div className="w-6 h-6 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
              <Check size={13} className="text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function Step2({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const count = form.roomCount
  return (
    <div className="flex flex-col gap-6">
      <p className="text-white/50 text-sm">Koľko miestností chcete klimatizovať?</p>
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => setForm({ ...form, roomCount: Math.max(1, count - 1) })}
          className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all"
          aria-label="Znížiť počet"
        >
          <Minus size={18} />
        </button>
        <div className="text-center">
          <div className="text-6xl font-bold text-white">{count}</div>
          <div className="text-sm text-white/40 mt-1">{count === 1 ? "miestnosť" : count < 5 ? "miestnosti" : "miestností"}</div>
        </div>
        <button
          onClick={() => setForm({ ...form, roomCount: Math.min(10, count + 1) })}
          className="w-12 h-12 rounded-full border border-sky-500/40 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 flex items-center justify-center transition-all"
          aria-label="Zvýšiť počet"
        >
          <Plus size={18} />
        </button>
      </div>
      {/* Visual room grid */}
      <div className="grid grid-cols-5 gap-2 max-w-[200px] mx-auto">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "w-8 h-8 rounded-lg border transition-all duration-200",
              i < count
                ? "border-sky-500/50 bg-sky-500/20"
                : "border-white/8 bg-white/3"
            )}
          />
        ))}
      </div>
      <p className="text-xs text-white/30 text-center">Každá miestnosť = 1 klimatizačná jednotka</p>
    </div>
  )
}

function Step3({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const size = form.avgRoomSize
  const power = Math.max(1.5, Math.ceil((size * 35) / 1000 * 2) / 2)
  return (
    <div className="flex flex-col gap-6">
      <p className="text-white/50 text-sm">Aká je priemerná veľkosť miestnosti?</p>
      <div className="text-center">
        <span className="text-5xl font-bold text-white">{size}</span>
        <span className="text-2xl text-white/40 ml-1">m²</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/30">10 m²</span>
        <input
          type="range"
          min={10}
          max={80}
          value={size}
          onChange={(e) => setForm({ ...form, avgRoomSize: Number(e.target.value) })}
          className="flex-1 accent-sky-500 h-1 rounded-full bg-white/10 cursor-pointer"
          aria-label="Veľkosť miestnosti"
        />
        <span className="text-xs text-white/30">80 m²</span>
      </div>
      <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-500/5 text-center">
        <div className="text-xs text-sky-400/70 mb-1">Odporúčaný výkon na miestnosť</div>
        <div className="text-2xl font-bold text-sky-400">{power} kW</div>
      </div>
    </div>
  )
}

function Step4({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const opts = [
    { value: "sever", label: "Sever", desc: "Málo slnka" },
    { value: "juh", label: "Juh", desc: "Veľa slnka" },
    { value: "vychod", label: "Východ", desc: "Ranné slnko" },
    { value: "zapad", label: "Západ", desc: "Večerné slnko" },
    { value: "kombinovana", label: "Kombinovaná", desc: "Rôzne strany" },
  ]
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white/50 text-sm">Na ktorú stranu smerujú hlavné okná?</p>
      <div className="grid grid-cols-2 gap-3">
        {opts.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setForm({ ...form, windowOrientation: opt.value })}
            className={cn(
              "p-4 rounded-xl border text-left transition-all duration-200",
              form.windowOrientation === opt.value
                ? "border-sky-500/60 bg-sky-500/10"
                : "border-white/8 bg-white/3 hover:border-white/15"
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <Sun
                size={14}
                className={form.windowOrientation === opt.value ? "text-sky-400" : "text-white/30"}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  form.windowOrientation === opt.value ? "text-white" : "text-white/60"
                )}
              >
                {opt.label}
              </span>
            </div>
            <div className="text-xs text-white/30">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Step5({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const opts = [
    { value: "stare", label: "Staré / bez zateplenia", desc: "+15% spotreby", color: "#f97316" },
    { value: "standardne", label: "Štandardné zateplenie", desc: "Bežná spotreba", color: "#38bdf8" },
    { value: "moderne", label: "Nové / pasívny štandard", desc: "-10% spotreby", color: "#34d399" },
  ]
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white/50 text-sm">Aké je zateplenie vašej budovy?</p>
      {opts.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setForm({ ...form, insulation: opt.value })}
          className={cn(
            "flex items-center justify-between p-5 rounded-xl border transition-all duration-200 text-left",
            form.insulation === opt.value
              ? "border-sky-500/50 bg-sky-500/8"
              : "border-white/8 bg-white/3 hover:border-white/12"
          )}
        >
          <div>
            <div className={cn("font-medium text-sm", form.insulation === opt.value ? "text-white" : "text-white/60")}>
              {opt.label}
            </div>
            <div className="text-xs mt-0.5" style={{ color: opt.color }}>
              {opt.desc}
            </div>
          </div>
          {form.insulation === opt.value && (
            <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
              <Check size={11} className="text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function Step6({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const allBrands = ["Daikin", "Samsung", "Gree", "Inventor", "Vivax", "Polar", "Poraďte mi"]
  const toggle = (b: string) => {
    const has = form.brands.includes(b)
    setForm({ ...form, brands: has ? form.brands.filter((x) => x !== b) : [...form.brands, b] })
  }
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white/50 text-sm">Ktoré značky preferujete? (viacero možností)</p>
      <div className="flex flex-wrap gap-3">
        {allBrands.map((b) => {
          const selected = form.brands.includes(b)
          return (
            <button
              key={b}
              onClick={() => toggle(b)}
              className={cn(
                "px-4 py-2.5 rounded-full border text-sm font-medium transition-all duration-200",
                selected
                  ? "border-sky-500/60 bg-sky-500/15 text-sky-300"
                  : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/70"
              )}
            >
              {b}
            </button>
          )
        })}
      </div>
      {form.brands.length === 0 && (
        <p className="text-xs text-white/25">Vyberte aspoň jednu značku alebo &quot;Poraďte mi&quot;</p>
      )}
    </div>
  )
}

function Step7({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const budget = form.budget
  const includes = budget < 800
    ? "1 klimatizácia, základná montáž"
    : budget < 1500
    ? "1–2 klimatizácie, montáž, záruka"
    : budget < 3000
    ? "2–3 klimatizácie, montáž, servisný plán"
    : "Multi-split systém, full servis, priorita"

  return (
    <div className="flex flex-col gap-6">
      <p className="text-white/50 text-sm">Aký je váš orientačný rozpočet?</p>
      <div className="text-center">
        <span className="text-5xl font-bold text-white">{budget.toLocaleString("sk")}</span>
        <span className="text-2xl text-white/40 ml-1">€</span>
        {budget >= 5000 && <span className="text-white/40 text-xl">+</span>}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-white/30">500€</span>
        <input
          type="range"
          min={500}
          max={5000}
          step={100}
          value={budget}
          onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
          className="flex-1 accent-sky-500 h-1 rounded-full bg-white/10 cursor-pointer"
          aria-label="Rozpočet"
        />
        <span className="text-xs text-white/30">5000€+</span>
      </div>
      <div className="p-4 rounded-xl border border-sky-500/15 bg-sky-500/5">
        <div className="text-xs text-sky-400/70 mb-1">V tejto cene dostanete:</div>
        <div className="text-sm text-white/70">{includes}</div>
      </div>
    </div>
  )
}

function Step8({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const opts = [
    { value: "asap", label: "Čo najskôr", desc: "Do 1 týždňa", icon: <Zap size={16} /> },
    { value: "mesiac", label: "Tento mesiac", desc: "Flexibilný termín", icon: <Calendar size={16} /> },
    { value: "bez_zhonu", label: "Bez zhonu", desc: "Kedykoľvek mi vyhovuje", icon: <Check size={16} /> },
  ]
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white/50 text-sm">Kedy chcete uskutočniť montáž?</p>
      {opts.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setForm({ ...form, timing: opt.value })}
          className={cn(
            "flex items-center gap-4 p-5 rounded-xl border transition-all duration-200 text-left",
            form.timing === opt.value
              ? "border-sky-500/60 bg-sky-500/10"
              : "border-white/8 bg-white/3 hover:border-white/12"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
              form.timing === opt.value ? "bg-sky-500/20 text-sky-400" : "bg-white/5 text-white/30"
            )}
          >
            {opt.icon}
          </div>
          <div>
            <div className={cn("font-medium text-sm", form.timing === opt.value ? "text-white" : "text-white/60")}>
              {opt.label}
            </div>
            <div className="text-xs text-white/35 mt-0.5">{opt.desc}</div>
          </div>
          {form.timing === opt.value && (
            <div className="ml-auto w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
              <Check size={11} className="text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

function Step9({ form, setForm }: { form: FormState; setForm: (f: FormState) => void }) {
  const regions = [
    "Bratislava", "Trnava", "Nitra", "Trenčín",
    "Žilina", "Banská Bystrica", "Prešov", "Košice",
  ]
  return (
    <div className="flex flex-col gap-5">
      <p className="text-white/50 text-sm">V ktorej lokalite sa nehnuteľnosť nachádza?</p>
      <div className="relative">
        <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={form.locality}
          onChange={(e) => setForm({ ...form, locality: e.target.value })}
          placeholder="Zadajte mesto alebo obec…"
          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-500/50 focus:bg-white/8 transition-all"
        />
      </div>
      <div>
        <p className="text-xs text-white/30 mb-3">Alebo vyberte kraj:</p>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setForm({ ...form, locality: r })}
              className={cn(
                "px-3 py-1.5 rounded-full border text-xs transition-all",
                form.locality === r
                  ? "border-sky-500/50 bg-sky-500/10 text-sky-300"
                  : "border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/60"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step10({
  form,
  setForm,
  onSubmit,
  submitting,
  submitted,
}: {
  form: FormState
  setForm: (f: FormState) => void
  onSubmit: () => void
  submitting: boolean
  submitted: boolean
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-white/50 text-sm">Vaše kontaktné údaje — odošleme vám ponuku do 15 minút.</p>

      <div className="relative">
        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Meno a priezvisko"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
        />
      </div>

      <div className="relative">
        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Telefónne číslo *"
          required
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
        />
      </div>

      <div className="relative">
        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="E-mailová adresa *"
          required
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-500/50 transition-all"
        />
      </div>

      <div className="relative">
        <MessageSquare size={15} className="absolute left-3.5 top-4 text-white/30" />
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Správa / poznámka (voliteľné)"
          rows={3}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-sky-500/50 transition-all resize-none"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative mt-0.5">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="sr-only"
          />
          <div
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-all",
              form.consent ? "border-sky-500 bg-sky-500" : "border-white/20 bg-white/5 group-hover:border-white/30"
            )}
          >
            {form.consent && <Check size={11} className="text-white" />}
          </div>
        </div>
        <span className="text-xs text-white/40 leading-relaxed">
          Súhlasím so spracovaním osobných údajov za účelom vypracovania cenovej ponuky v súlade s GDPR.
        </span>
      </label>

      {submitted ? (
        <div className="p-5 rounded-xl border border-green-500/30 bg-green-500/10 text-center">
          <Check size={24} className="text-green-400 mx-auto mb-2" />
          <div className="text-green-300 font-semibold">Žiadosť odoslaná!</div>
          <div className="text-xs text-white/40 mt-1">Kontaktujeme vás do 15 minút.</div>
        </div>
      ) : (
        <button
          onClick={onSubmit}
          disabled={!form.phone || !form.email || !form.consent || submitting}
          className="w-full py-4 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
          style={!(!form.phone || !form.email || !form.consent || submitting) ? { boxShadow: "0 0 25px rgba(14,165,233,0.35)" } : {}}
        >
          {submitting ? (
            <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            "Odoslať žiadosť o cenovú ponuku"
          )}
        </button>
      )}
    </div>
  )
}

// ——— Summary Panel ———
function SummaryPanel({ form, step }: { form: FormState; step: number }) {
  const est = estimatePrice(form)
  const typeLabel = form.propertyType === "byt" ? "Byt" : form.propertyType === "dom" ? "Dom" : form.propertyType === "kancelaria" ? "Kancelária" : "—"

  return (
    <div className="flex flex-col gap-4 sticky top-24">
      <div className="p-5 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-xl">
        <div className="text-xs text-white/30 uppercase tracking-wider mb-4 font-medium">Vaša konfigurácia</div>
        <div className="space-y-2.5">
          {[
            { label: "Typ", value: typeLabel, show: !!form.propertyType },
            { label: "Miestnosti", value: `${form.roomCount}x`, show: step >= 2 },
            { label: "Veľkosť", value: `∅ ${form.avgRoomSize} m²`, show: step >= 3 },
            { label: "Okná", value: form.windowOrientation || "—", show: step >= 4 },
            { label: "Zateplenie", value: form.insulation || "—", show: step >= 5 },
            { label: "Značky", value: form.brands.length > 0 ? form.brands.join(", ") : "—", show: step >= 6 },
            { label: "Rozpočet", value: `${form.budget.toLocaleString("sk")}€`, show: step >= 7 },
            { label: "Termín", value: form.timing || "—", show: step >= 8 },
            { label: "Lokalita", value: form.locality || "—", show: step >= 9 },
          ]
            .filter((r) => r.show)
            .map((r) => (
              <div key={r.label} className="flex justify-between gap-2">
                <span className="text-xs text-white/35">{r.label}</span>
                <span className="text-xs text-white/70 text-right">{r.value}</span>
              </div>
            ))}
        </div>
      </div>

      {step >= 3 && (
        <div
          className="p-5 rounded-2xl border border-sky-500/25 bg-sky-500/8"
          style={{ boxShadow: "0 0 30px rgba(14,165,233,0.08)" }}
        >
          <div className="text-xs text-sky-400/70 mb-3 uppercase tracking-wider font-medium">Odhad ceny</div>
          <div className="text-2xl font-bold text-white">
            {est.low.toLocaleString("sk")}€ – {est.high.toLocaleString("sk")}€
          </div>
          <div className="text-xs text-white/30 mt-1 mb-3">Vrátane montáže a záruky</div>
          <div className="flex items-center gap-2 pt-3 border-t border-white/8">
            <Zap size={13} className="text-sky-400" />
            <span className="text-xs text-white/50">
              Odporúčaný výkon: <span className="text-sky-400 font-medium">{est.power} kW</span>
            </span>
          </div>
        </div>
      )}

      {step <= 10 && (
        <div className="p-4 rounded-xl border border-white/5 bg-white/2">
          <div className="text-xs text-white/25 mb-1">Tip</div>
          <div className="text-xs text-white/45 leading-relaxed">{stepTips[step]}</div>
        </div>
      )}
    </div>
  )
}

// ——— Main component ———
const TOTAL_STEPS = 10

export default function ConfiguratorSection() {
  const [step, setStep] = useState(1)
  const [form, setFormState] = useState<FormState>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const setForm = useCallback((f: FormState) => setFormState(f), [])

  const handleSubmit = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  const canNext = () => {
    if (step === 1) return !!form.propertyType
    if (step === 4) return !!form.windowOrientation
    if (step === 5) return !!form.insulation
    if (step === 6) return form.brands.length > 0
    if (step === 8) return !!form.timing
    if (step === 9) return !!form.locality
    return true
  }

  const stepTitles = [
    "Typ nehnuteľnosti",
    "Počet miestností",
    "Veľkosť miestností",
    "Orientácia okien",
    "Zateplenie budovy",
    "Preferovaná značka",
    "Rozpočet",
    "Termín montáže",
    "Lokalita",
    "Kontaktné údaje",
  ]

  return (
    <section
      id="cenova-ponuka"
      className="py-28 relative overflow-hidden"
      style={{ background: "#050505" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(14,165,233,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 text-sky-400 text-xs font-medium tracking-wider mb-6">
            <Zap size={12} />
            Ako konfigurátor Tesla vozidla
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Vypočítajte svoju
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              cenovú ponuku
            </span>
          </h2>
          <p className="mt-5 text-white/50 max-w-xl mx-auto">
            10 jednoduchých krokov. Presná cena. Žiadne záväzky.
          </p>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Main card */}
          <div className="rounded-3xl border border-white/8 bg-white/3 backdrop-blur-xl overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-500 to-violet-500"
                animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>

            <div className="p-6 md:p-8">
              {/* Step header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs text-white/30 mb-0.5">
                    Krok {step} z {TOTAL_STEPS}
                  </div>
                  <h3 className="text-lg font-bold text-white">{stepTitles[step - 1]}</h3>
                </div>
                <div className="text-3xl font-bold text-white/10 font-mono">{String(step).padStart(2, "0")}</div>
              </div>

              {/* Step content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 1 && <Step1 form={form} setForm={setForm} />}
                  {step === 2 && <Step2 form={form} setForm={setForm} />}
                  {step === 3 && <Step3 form={form} setForm={setForm} />}
                  {step === 4 && <Step4 form={form} setForm={setForm} />}
                  {step === 5 && <Step5 form={form} setForm={setForm} />}
                  {step === 6 && <Step6 form={form} setForm={setForm} />}
                  {step === 7 && <Step7 form={form} setForm={setForm} />}
                  {step === 8 && <Step8 form={form} setForm={setForm} />}
                  {step === 9 && <Step9 form={form} setForm={setForm} />}
                  {step === 10 && (
                    <Step10
                      form={form}
                      setForm={setForm}
                      onSubmit={handleSubmit}
                      submitting={submitting}
                      submitted={submitted}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/6">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
                >
                  <ChevronLeft size={16} />
                  Späť
                </button>

                {step < TOTAL_STEPS ? (
                  <button
                    onClick={() => setStep((s) => Math.min(TOTAL_STEPS, s + 1))}
                    disabled={!canNext()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-sky-500 hover:bg-sky-400 disabled:bg-white/10 disabled:text-white/30 text-white font-semibold transition-all text-sm"
                  >
                    Ďalej
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="text-xs text-white/25">Odošlite formulár vyššie</div>
                )}
              </div>

              {/* Step dots */}
              <div className="flex justify-center gap-1.5 mt-5">
                {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i + 1)}
                    aria-label={`Krok ${i + 1}`}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i + 1 === step
                        ? "w-5 h-1.5 bg-sky-400"
                        : i + 1 < step
                        ? "w-1.5 h-1.5 bg-sky-600/60"
                        : "w-1.5 h-1.5 bg-white/15"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="hidden lg:block">
            <SummaryPanel form={form} step={step} />
          </div>
        </div>
      </div>
    </section>
  )
}
