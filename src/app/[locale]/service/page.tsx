import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ServiceHeroSection from "@/components/sections/service/HeroSection"
import ServiceListSection from "@/components/sections/service/ListSection"
import ServiceCTASection from "@/components/sections/service/CTASection"
import { getTranslations, setRequestLocale } from "next-intl/server"

interface ServicePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "sections.service.meta" })
  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="relative">
      <Header />
      <ServiceHeroSection />
      <ServiceListSection />
      <ServiceCTASection />
      <Footer />
    </div>
  )
}
