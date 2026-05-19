import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
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
          <p className="text-sm text-white/70 uppercase tracking-widest mb-4">About</p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-medium text-white leading-[0.95]">
            Who We Are
          </h1>
        </div>
      </div>
    </section>
  )
}
