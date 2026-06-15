import { useTranslations } from 'next-intl'
import TypingText from "@/components/ui/TypingText"

export default function VisionSection() {
  const t = useTranslations('sections.about.vision')
  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 py-20 md:py-40">
      <div className="max-w-[1500px] mx-auto px-4">
        <h2 className="text-4xl md:text-7xl text-gray-900 leading-relaxed">{t('heading')}</h2>
        <div className="my-6 md:my-8">
          <p className="text-sm lg:text-base text-gray-600">{t('missionLead')}</p>
          <TypingText
            text={t('missionStatement')}
            className="text-2xl md:text-3xl lg:text-6xl"
          />
        </div>
      </div>
      <div className="w-full mb-12 md:mb-16" style={{ height: 400 }}>
          <iframe
            src="/html/scan-line.html"
            className="w-full h-full block"
            style={{ border: 0 }}
            aria-hidden="true"
          />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32 max-w-[1500px] mx-auto px-4">
        <div className="text-sm md:text-base text-gray-900 leading-relaxed space-y-4 md:space-y-6">
          <p className="text-base md:text-lg font-bold">{t('philosophyTitle')}</p>
          <p className="leading-relaxed">
            {t.rich('philosophyPrimary', { ldquo: () => <>&ldquo;</>, rdquo: () => <>&rdquo;</> })}
          </p>
        </div>
        <div className="text-sm md:text-base text-gray-900 leading-relaxed space-y-4 md:space-y-6">
          <p className="leading-relaxed">
            {t('philosophySecondary')}
          </p>
        </div>
      </div>
    </section>
  )
}
