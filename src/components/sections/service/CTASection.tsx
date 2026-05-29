"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import TransitionLink from "@/components/ui/TransitionLink"

gsap.registerPlugin(ScrollTrigger)

export default function ServiceCTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    })

    if (lineRef.current) tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, 0)
    if (textRef.current) tl.fromTo(textRef.current.children, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, 0.3)

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()) }
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#050508] py-[12vh] md:py-[18vh]" data-bg="dark">
      <div className="max-w-[1500px] mx-auto px-6 md:px-10">
        {/* Accent line */}
        <div
          ref={lineRef}
          className="w-[15%] h-px bg-gradient-to-r from-[#3498db]/50 to-transparent mb-12 md:mb-16 origin-left"
          style={{ transform: "scaleX(0)" }}
        />

        <div ref={textRef}>
          <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] tracking-tight mb-4">
            AIの可能性を、ともに。
          </p>
          <p className="text-sm md:text-base text-gray-500 mb-12 md:mb-16 max-w-[400px]">
            サービスに関するご相談・お問い合わせはこちらから。
          </p>
          <TransitionLink
            href="/contact"
            className="group inline-flex items-center gap-3 text-sm font-medium text-white border-b border-white/40 pb-1 hover:border-white transition-colors"
          >
            <span>Contact</span>
            <span className="inline-block transition-transform group-hover:translate-x-1.5">→</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  )
}
