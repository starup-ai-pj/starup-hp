import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import ServiceHeroSection from "@/components/sections/service/ServiceHeroSection"
import ServiceListSection from "@/components/sections/service/ServiceListSection"
import ServiceCTASection from "@/components/sections/service/ServiceCTASection"

export const metadata = {
  title: "Service | STARUP",
  description:
    "STARUPが展開する3つのサービス。AI開発プラットフォーム、図面データ活用、サプライチェーン最適化で企業のデータドリブンな意思決定を支援します。",
}

export default function ServicePage() {
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
