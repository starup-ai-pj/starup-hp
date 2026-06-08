import Image from 'next/image'
import { useTranslations } from 'next-intl'

export default function HeroSection() {
  const t = useTranslations('sections.about.hero')
  return (
    <section className="relative h-[55vh] md:h-[70vh] overflow-hidden">
      <Image
        src="/images/about/about-hero.jpg"
        alt="About"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-12 md:bottom-20 left-0 w-full px-4">
        <div className="max-w-[1500px] mx-auto">
          <p className="text-sm text-white/70 uppercase tracking-widest mb-4">{t('eyebrow')}</p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-medium text-white leading-[0.95]">
            {t('title')}
          </h1>
        </div>
      </div>
    </section>
  )
}
