// FILE: src/app/layout.tsx
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Klimeon – Klimatizácia s montážou | Slovensko",
  description:
    "Klimeon ponúka profesionálnu montáž klimatizácie pre domy, byty a kancelárie na Slovensku. Rýchla montáž, prémiové značky, záruka spokojnosti. Získajte bezplatnú cenovú ponuku.",
  keywords: [
    "klimatizácia",
    "montáž klimatizácie",
    "servis klimatizácie",
    "klimatizácia Bratislava",
    "klimatizácia Slovensko",
    "inštalácia klimatizácie",
    "Daikin",
    "Samsung klimatizácia",
    "Gree",
    "chladenie",
  ],
  authors: [{ name: "Klimeon" }],
  robots: "index, follow",
  openGraph: {
    title: "Klimeon – Klimatizácia s montážou | Slovensko",
    description:
      "Profesionálna montáž klimatizácie pre domy, byty a kancelárie na Slovensku. Rýchla montáž, prémiové značky.",
    type: "website",
    locale: "sk_SK",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sk" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body
        className="antialiased min-h-screen"
        style={{ background: "#050505", color: "#f5f5f5" }}
      >
        {children}
      </body>
    </html>
  )
}
