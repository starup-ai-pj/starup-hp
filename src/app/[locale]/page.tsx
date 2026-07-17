import { setRequestLocale } from "next-intl/server"
import Header from "@/components/layout/Header"
import HeroSection from "@/components/sections/home/HeroSection"
import VisionSection from "@/components/sections/home/VisionSection"
import ServiceDetailSection from "@/components/sections/home/ServiceDetailSection"
import Footer from "@/components/layout/Footer"
import ContactSection from "@/components/sections/common/ContactSection"
import JoinUsSection from "@/components/sections/common/JoinUsSection"
import MissionSection from "@/components/sections/home/MissionSection"
import NewsSection from "@/components/sections/home/NewsSection"
import TechBlogCta from "@/components/sections/common/TechBlogCta"

interface HomeProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="relative">
      <div className="overflow-x-hidden">
        <Header />
        <HeroSection />
        <VisionSection />
        <MissionSection locale={locale} />
      </div>
      <ServiceDetailSection />
      <NewsSection locale={locale} />
      <TechBlogCta locale={locale} />
      <JoinUsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
