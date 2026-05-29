import TransitionLink from "@/components/ui/TransitionLink"
import TypingText from "@/components/ui/TypingText"

export default function MissionSection() {

    return (
    <section
        className="flex flex-col items-center justify-center bg-gray-100 relative z-10 py-12 md:py-16"
        data-bg="light"
    >
      <div className="max-w-[1500px] mx-auto px-4">
        <h2 className="text-4xl md:text-7xl text-gray-900 leading-relaxed">Mission</h2>
        <div className="my-8 md:my-16">
          <p className="text-sm lg:text-base text-gray-600">産業と文化の構造を再構築する。</p>
          <TypingText
            text="Redesigning the structures of industry and culture."
            className="text-2xl md:text-3xl lg:text-6xl"
          />
        </div>
      </div>
        <div className="w-full mb-8 md:mb-16" style={{ height: 400 }}>
            <iframe
              src="/html/scan-line.html"
              className="w-full h-full block"
              style={{ border: 0 }}
              aria-hidden="true"
            />
        </div>
        <div className="flex justify-center">
          <TransitionLink
            href="/about"
            className="text-sm text-gray-800 hover:text-black transition-colors font-medium flex items-center gap-2 border-b border-gray-300 hover:border-black pb-1"
          >
            Learn More About Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </TransitionLink>
        </div>
    </section>
    )
}