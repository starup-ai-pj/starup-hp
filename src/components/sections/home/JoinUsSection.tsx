"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SeeMoreButton from "@/components/ui/SeeMoreButton"
import WaveCanvas from "@/components/animation/WaveCanvas"
gsap.registerPlugin(ScrollTrigger)

export default function JoinUsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        toggleActions: "play none none reverse",
      },
    })

    const title = el.querySelector("[data-a='title']")
    const img = el.querySelector("[data-a='img']")
    const foot = el.querySelector("[data-a='foot']")

    if (title) tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0)
    if (img) tl.fromTo(img, { opacity: 0, scale: 1.02 }, { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }, 0.1)
    if (foot) tl.fromTo(foot, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0.5)

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()) }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-gray-100 pt-16 md:pt-24 pb-12 md:pb-20 overflow-hidden"
      data-bg="light"
    >
      {/* Wave background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <WaveCanvas hue={220} />
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-10">
        {/* Main area: title overlapping image */}
        <div className="relative mb-12 md:mb-16">
          {/* Image frame — reserved for future image; kept for title positioning */}
          <div
            data-a="img"
            aria-hidden="true"
            className="ml-auto w-full md:w-[65%] aspect-[2/1] overflow-hidden opacity-0"
          />

          {/* "Join Us" — overlaps image bottom-left */}
          <h2
            data-a="title"
            className="absolute bottom-[15%] left-0 text-[clamp(3.5rem,10vw,9rem)] font-bold text-black leading-none tracking-tight opacity-0"
          >
            Join Us
          </h2>
        </div>

        {/* Footer row: line + label + description | CTA */}
        <div
          data-a="foot"
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 opacity-0"
        >
          <div className="flex items-center gap-4 md:gap-6">
            <span className="hidden md:block w-12 h-px bg-black/30" />
            <span className="text-xs text-black/40 tracking-widest">採用情報</span>
            <p className="text-sm md:text-base text-black/70">
              STARUPでは、共に働く仲間を募集しています
            </p>
          </div>

          <SeeMoreButton href="/recruit" />
        </div>
      </div>
    </section>
  )
}
