"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { servicePageData, ServiceItem } from "@/data/service/servicePageData"
import TransitionLink from "@/components/ui/TransitionLink"

gsap.registerPlugin(ScrollTrigger)

function ServiceSpread({ service }: { service: ServiceItem }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    })

    const q = (s: string) => el.querySelector(s)
    const qa = (s: string) => el.querySelectorAll(s)

    const num = q("[data-a='num']")
    const rule = q("[data-a='rule']")
    const head = q("[data-a='head']")
    const catchEl = q("[data-a='catch']")
    const img = q("[data-a='img']")
    const desc = q("[data-a='desc']")
    const features = qa("[data-a='feat']")
    const foot = q("[data-a='foot']")

    if (num) tl.fromTo(num, { opacity: 0 }, { opacity: 0.05, duration: 0.8, ease: "power2.out" }, 0)
    if (rule) tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.1)
    if (head) tl.fromTo(head, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.15)
    if (catchEl) tl.fromTo(catchEl, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.25)
    if (img) tl.fromTo(img, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }, 0.2)
    if (desc) tl.fromTo(desc, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.35)
    if (features.length) tl.fromTo(features, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" }, 0.45)
    if (foot) tl.fromTo(foot, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0.7)

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()) }
  }, [])

  return (
    <div ref={ref} className="relative pt-[6vh] md:pt-[10vh] pb-[6vh] md:pb-[10vh]">
      {/* ── Massive decorative number ── */}
      <span
        data-a="num"
        aria-hidden="true"
        className="absolute top-[2vh] md:top-[4vh] left-[-3%] md:left-[-2%] font-inter font-black text-black leading-none select-none pointer-events-none opacity-0"
        style={{ fontSize: "clamp(7rem, 16vw, 16rem)" }}
      >
        {service.number}
      </span>

      {/* ── Row 1: Category + Title | Catchphrase ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-16 mb-8 md:mb-12">
        <div data-a="head" className="opacity-0">
          <span className="font-mono text-[11px] tracking-[0.25em] text-gray-400 uppercase block mb-2">
            {service.category}
          </span>
          {/* Rule — visual rail */}
          <div
            data-a="rule"
            className="w-24 md:w-32 h-px bg-black mb-4 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-black leading-[1.05] tracking-tight">
            {service.title}
          </h2>
        </div>

        <div data-a="catch" className="lg:max-w-[400px] lg:text-right opacity-0 lg:pb-2">
          <p className="text-lg md:text-xl lg:text-2xl font-bold text-black leading-[1.4]">
            {service.catchphrase}
          </p>
        </div>
      </div>

      {/* ── Row 2: Image | Description ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10 md:mb-14">
        {/* Image — environment, muted */}
        <div
          data-a="img"
          className="lg:col-span-7 relative aspect-[16/10] bg-gray-100 overflow-hidden opacity-0"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover brightness-[0.88] grayscale-[35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/10" />
        </div>

        {/* Description */}
        <div data-a="desc" className="lg:col-span-5 flex flex-col justify-end opacity-0">
          <p className="text-sm md:text-base text-gray-500 leading-[2] mb-6">
            {service.description}
          </p>
          <div className="h-px w-full bg-gray-200" />
        </div>
      </div>

      {/* ── Row 3: UI Previews — 3 columns, uniform 16:10 ── */}
      <div data-a="feat" className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8 md:mb-12 opacity-0">
        {service.previews.map((preview, pi) => (
          <div key={pi}>
            <div className="aspect-[16/10] relative bg-gray-100 border border-gray-200 overflow-hidden group hover:border-gray-300 transition-colors">
              {preview.image ? (
                <img
                  src={preview.image}
                  alt={preview.label}
                  className="w-full h-full object-cover grayscale brightness-[0.92] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <span className="text-xs text-gray-300 font-mono tracking-wider">UI</span>
                </div>
              )}
            </div>
            <span className="block mt-2 text-[11px] text-gray-400 tracking-wide">
              {preview.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Row 4: CTA row ── */}
      <div
        data-a="foot"
        className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-gray-100 opacity-0"
      >
        <p className="text-sm text-gray-400 max-w-[400px]">
          {service.highlight.value}
        </p>

        <div className="flex items-center gap-5">
          <TransitionLink
            href={service.href}
            className="group inline-flex items-center gap-2 text-sm font-medium text-black border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors"
          >
            <span>詳細を見る</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </TransitionLink>
          {service.externalLink && (
            <a
              href={service.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span>{service.externalLink.replace("https://", "")}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* ── Section separator ── */}
      <div className="mt-[6vh] md:mt-[10vh] h-px w-full bg-gray-200" />
    </div>
  )
}

export default function ServiceListSection() {
  return (
    <section className="bg-white relative z-10">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10">
        {servicePageData.map((service) => (
          <ServiceSpread key={service.id} service={service} />
        ))}
      </div>
    </section>
  )
}
