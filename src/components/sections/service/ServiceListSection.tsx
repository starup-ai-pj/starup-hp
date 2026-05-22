"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { servicePageData, ServiceItem } from "@/data/service/servicePageData"
import TransitionLink from "@/components/ui/TransitionLink"

gsap.registerPlugin(ScrollTrigger)

function ServiceSpread({ service, index }: { service: ServiceItem; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)

  // Sync active-feature indicator with the diorama's own auto-rotation
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!iframeRef.current) return
      if (e.source !== iframeRef.current.contentWindow) return
      const d = e.data as { type?: string; index?: number } | null
      if (d?.type === "screen-changed" && typeof d.index === "number") {
        setActiveFeature(d.index)
      }
    }
    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  const sendScreenIndex = (idx: number) => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "set-screen", index: idx },
      "*"
    )
  }
  const sendResume = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: "resume" }, "*")
  }

  // Scroll-triggered reveal
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 78%",
        toggleActions: "play none none reverse",
      },
    })

    const img = el.querySelector("[data-a='img']")
    const meta = el.querySelector("[data-a='meta']")
    const title = el.querySelector("[data-a='title']")
    const subtitle = el.querySelector("[data-a='subtitle']")
    const catch_ = el.querySelector("[data-a='catch']")
    const about = el.querySelector("[data-a='about']")
    const feats = el.querySelectorAll("[data-a='feat-item']")
    const foot = el.querySelector("[data-a='foot']")

    if (img) tl.fromTo(img, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 0)
    if (meta) tl.fromTo(meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.05)
    if (title) tl.fromTo(title, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.15)
    if (subtitle) tl.fromTo(subtitle, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.25)
    if (catch_) tl.fromTo(catch_, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, 0.35)
    if (about) tl.fromTo(about, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.45)
    if (feats.length) tl.fromTo(feats, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power2.out" }, 0.55)
    if (foot) tl.fromTo(foot, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.75)

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const isLast = index === servicePageData.length - 1
  const totalCount = String(servicePageData.length).padStart(2, "0")
  const dioramaOnLeft = index % 2 === 0
  const introCls = dioramaOnLeft
    ? "lg:col-start-8 lg:col-span-5 lg:row-start-1"
    : "lg:col-start-1 lg:col-span-5 lg:row-start-1"
  const dioramaCls = dioramaOnLeft
    ? "lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-2"
    : "lg:col-start-6 lg:col-span-7 lg:row-start-1 lg:row-span-2"
  const outroCls = dioramaOnLeft
    ? "lg:col-start-8 lg:col-span-5 lg:row-start-2 lg:mt-12"
    : "lg:col-start-1 lg:col-span-5 lg:row-start-2 lg:mt-12"

  return (
    <article
      ref={ref}
      id={service.id}
      className="relative scroll-mt-28 md:scroll-mt-32"
    >
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-16 md:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-14 lg:gap-y-0">

          {/* ─── INTRO ── (mobile: 1st, desktop: top side opposite the diorama) ─── */}
          <div className={introCls}>

            {/* meta line */}
            <div
              className="flex items-center gap-3 mb-4 md:mb-5"
              data-a="meta"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400">
                {service.category}
              </span>
              <span className="text-[10px] text-gray-300">·</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400">
                No. {service.number} / {totalCount}
              </span>
            </div>

            {/* title */}
            <h2
              data-a="title"
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-gray-900 leading-[0.95] tracking-tight"
            >
              {service.title}
            </h2>

            {/* italic subtitle */}
            <p
              data-a="subtitle"
              className="mt-3 md:mt-4 text-sm md:text-base text-gray-400 italic"
            >
              {service.subtitle}
            </p>

            {/* catchphrase */}
            <p
              data-a="catch"
              className="mt-8 md:mt-10 text-xl md:text-2xl lg:text-[1.75rem] font-medium text-gray-900 leading-[1.45] tracking-tight"
            >
              {service.catchphrase}
            </p>

            {/* description */}
            <p
              data-a="about"
              className="mt-8 md:mt-10 text-sm md:text-base text-gray-600 leading-[2]"
            >
              {service.description}
            </p>
          </div>

          {/* ─── DIORAMA ── (mobile: 2nd just above features, desktop: alternating left/right per service) ─── */}
          <div
            className={dioramaCls}
            data-a="img"
          >
            <div className="lg:sticky lg:top-24">
              <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:h-[72vh] lg:min-h-[360px]">
                {service.diorama ? (
                  <iframe
                    ref={iframeRef}
                    src={service.diorama}
                    title={service.title}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          </div>

          {/* ─── OUTRO ── (mobile: 3rd, desktop: bottom side opposite the diorama) ─── */}
          <div
            className={outroCls}
            onMouseLeave={() => {
              setIsInteracting(false)
              sendResume()
            }}
          >

            {/* features rows */}
            <div className="border-t border-gray-300">
              {service.previews.map((preview, i) => {
                const isActive = activeFeature === i
                return (
                  <button
                    key={i}
                    type="button"
                    data-a="feat-item"
                    onMouseEnter={() => {
                      setActiveFeature(i)
                      setIsInteracting(true)
                      sendScreenIndex(i)
                    }}
                    onFocus={() => {
                      setActiveFeature(i)
                      setIsInteracting(true)
                      sendScreenIndex(i)
                    }}
                    onClick={() => {
                      setActiveFeature(i)
                      setIsInteracting(true)
                      sendScreenIndex(i)
                    }}
                    className={`group relative w-full text-left border-b border-gray-200 py-5 md:py-6 cursor-pointer transition-colors duration-300 overflow-hidden ${
                      isActive ? "bg-gray-50" : "hover:bg-gray-50/60"
                    }`}
                  >
                    {/* Auto-rotation progress bar — visible only when not actively hovered */}
                    {isActive && !isInteracting && (
                      <span
                        className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-900 origin-left pointer-events-none"
                        style={{ animation: "fillBar 2500ms linear" }}
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-300 shrink-0 ${
                          isActive ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <h3
                        className={`text-base md:text-lg font-medium leading-snug tracking-tight transition-colors duration-300 ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-500 group-hover:text-gray-800"
                        }`}
                      >
                        {preview.label}
                      </h3>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* CTA */}
            <div
              data-a="foot"
              className="mt-10 md:mt-12 flex items-center justify-between gap-4 flex-wrap"
            >
              {service.externalLink ? (
                <a
                  href={service.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <span>{service.externalLink.replace("https://", "")}</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              ) : (
                <span />
              )}
              {service.href && (
                <TransitionLink
                  href={service.href}
                  className="group inline-flex items-center gap-2 text-sm text-gray-900 border-b border-gray-900 pb-1 hover:gap-3 transition-all duration-300"
                  {...(service.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  <span>詳細を見る</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </TransitionLink>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section separator */}
      {!isLast && (
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <div className="h-px bg-gray-200" />
        </div>
      )}
    </article>
  )
}

export default function ServiceListSection() {
  return (
    <section className="bg-white relative z-10">
      {servicePageData.map((service, i) => (
        <ServiceSpread key={service.id} service={service} index={i} />
      ))}
    </section>
  )
}
