"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"

export default function ServiceHeroSection() {
  const t = useTranslations("sections.service.hero")
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current) return

    const text = "Service"
    const chars = text
      .split("")
      .map(
        (char) =>
          `<span class="char" style="opacity: 0; display: inline-block;">${char}</span>`
      )
      .join("")
    titleRef.current.innerHTML = chars

    const charElements = titleRef.current.querySelectorAll(".char")

    const tl = gsap.timeline({ delay: 0.3 })

    tl.to(charElements, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.06,
      ease: "none",
    })

    if (subRef.current) {
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.4
      )
    }

    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.6
      )
    }
  }, [])

  return (
    <section className="flex flex-col items-center justify-center bg-gray-100 py-20 md:py-40">
      <div className="max-w-[1500px] mx-auto px-4 w-full">
        <h1
          ref={titleRef}
          className="text-4xl md:text-7xl text-gray-900 leading-relaxed"
        >
          Service
        </h1>
        <div className="my-6 md:my-8">
          <p ref={subRef} className="text-sm lg:text-base text-gray-600 mb-2 opacity-0">
            {t("tagline")}
          </p>
          <p
            ref={subRef}
            className="text-2xl md:text-3xl lg:text-5xl font-normal text-gray-900 leading-snug opacity-0"
          >
            {t.rich("headline", { br: () => <br className="hidden md:block" /> })}
          </p>
        </div>
        <div ref={descRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32 mt-12 md:mt-16 opacity-0">
          <div className="text-sm md:text-base text-gray-900 leading-relaxed space-y-4 md:space-y-6">
            <p className="text-base md:text-lg font-bold">
              {t("body.title")}
            </p>
            <p className="leading-relaxed">
              {t("body.primary")}
            </p>
          </div>
          <div className="text-sm md:text-base text-gray-900 leading-relaxed space-y-4 md:space-y-6">
            <p className="leading-relaxed">
              {t("body.secondary")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
