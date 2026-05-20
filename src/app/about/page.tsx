import HeroSection from '@/components/sections/about/HeroSection'
import VisionSection from '@/components/sections/about/VisionSection'
import InformationSection from '@/components/sections/about/InformationSection'
import HistorySection from '@/components/sections/about/HistorySection'
import JoinUsSection from '@/components/sections/home/JoinUsSection'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function About() {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <VisionSection />
      <InformationSection />
      <HistorySection />
      <JoinUsSection />
      <Footer />
    </div>
  );
}
