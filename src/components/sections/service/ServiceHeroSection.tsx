"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function ServiceHeroSection() {
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
            深い技術力を核に、3つの領域でAIの価値を届ける。
          </p>
          <p
            ref={subRef}
            className="text-2xl md:text-3xl lg:text-5xl font-normal text-gray-900 leading-snug opacity-0"
          >
            Delivering AI value across three domains,
            <br className="hidden md:block" />
            powered by deep technological expertise.
          </p>
        </div>
        <div ref={descRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-32 mt-12 md:mt-16 opacity-0">
          <div className="text-sm md:text-base text-gray-900 leading-relaxed space-y-4 md:space-y-6">
            <p className="text-base md:text-lg font-bold">
              プロダクトで産業構造を変える
            </p>
            <p className="leading-relaxed">
              STARUPは、AIプラットフォーム・図面データ活用・サプライチェーン最適化の3つの領域で、
              企業が抱える構造的な課題に向き合います。
              単なるツール提供ではなく、業務の深部に入り込み、
              データとアルゴリズムの力で意思決定そのものを変革する。
              それが私たちのサービスの根幹です。
            </p>
          </div>
          <div className="text-sm md:text-base text-gray-900 leading-relaxed space-y-4 md:space-y-6">
            <p className="leading-relaxed">
              We address structural challenges across three domains:
              AI platforms, engineering data utilization, and supply chain optimization.
              Rather than offering surface-level tools, we embed deeply into business operations,
              transforming decision-making itself through the power of data and algorithms.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
