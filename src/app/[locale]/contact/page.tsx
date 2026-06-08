import { setRequestLocale } from "next-intl/server"
import Header from "@/components/layout/Header"
import ContactSection from "@/components/sections/common/ContactSection"
import Footer from "@/components/layout/Footer"

interface ContactPageProps {
  params: Promise<{ locale: string }>
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div>
      <Header />
      <div className="mt-20 md:mt-40">
        <ContactSection />

      </div>
      <Footer />
    </div>
  )
}
