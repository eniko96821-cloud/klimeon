// FILE: src/app/page.tsx
"use client"

import Navigation from "@/components/Navigation"
import HeroSection from "@/components/HeroSection"
import HeatSection from "@/components/HeatSection"
import SolutionSection from "@/components/SolutionSection"
import ProcessSection from "@/components/ProcessSection"
import ComparisonSection from "@/components/ComparisonSection"
import BrandsSection from "@/components/BrandsSection"
import ConfiguratorSection from "@/components/ConfiguratorSection"
import TrustSection from "@/components/TrustSection"
import CTASection from "@/components/CTASection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <main style={{ background: "#050505" }}>
      <Navigation />
      <HeroSection />
      <HeatSection />
      <SolutionSection />
      <ProcessSection />
      <ComparisonSection />
      <BrandsSection />
      <ConfiguratorSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </main>
  )
}
