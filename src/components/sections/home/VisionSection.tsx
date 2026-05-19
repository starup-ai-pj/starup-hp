"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function VisionSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const lineRef = useRef<HTMLSpanElement>(null)
    const cursorRef = useRef<HTMLSpanElement>(null)
    const scrollPromptRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        const container = containerRef.current
        const line = lineRef.current
        const cursor = cursorRef.current
        const scrollPrompt = scrollPromptRef.current
        if (!section || !container || !line || !cursor || !scrollPrompt) return

        const text = "\"Code the Culture\""
        const cultureStart = text.indexOf("Culture")

        const charsHtml = text.split('').map((char, i) => {
            const isCulture = i >= cultureStart
            return `<span class="char${isCulture ? ' culture-char' : ''}" style="opacity: 0; display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
        }).join('')
        line.innerHTML = charsHtml

        gsap.set(container, { opacity: 1 })
        gsap.set(cursor, { opacity: 1 })
        gsap.set(scrollPrompt, { opacity: 0, y: 20 })

        // カーソル点滅: スクロールと独立して常時ループ
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: "steps(1)"
        })

        // スクロールプロンプト: マウント直後に独立して表示（scrubに乗せない）
        gsap.to(scrollPrompt, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.4,
            ease: "power2.out"
        })

        // スクロールアイコンのループアニメーション
        gsap.to(scrollPrompt.querySelector('.scroll-icon'), {
            y: 5,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=60%",
                scrub: 1,
                pin: true,
            }
        })

        // 0-8%: 背景グレー→白
        tl.to(section, {
            backgroundColor: "#ffffff",
            duration: 0.08
        })

        // 8-80%: 1文字ずつタイピング表示
        const charEls = line.querySelectorAll('.char')
        const typingStart = 0.08
        const typingDuration = 0.72
        const perChar = typingDuration / charEls.length
        charEls.forEach((char, index) => {
            tl.to(char, {
                opacity: 1,
                duration: 0.005,
                ease: "none"
            }, typingStart + index * perChar)
        })

        // 80-95%: "Culture" にグラデーション（シンタックスハイライト風）
        const cultureEls = line.querySelectorAll('.culture-char')
        tl.to(cultureEls, {
            backgroundImage: "linear-gradient(90deg, #8B5CF6 0%, #06B6D4 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            duration: 0.12,
            stagger: 0.005
        }, 0.80)

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill())
        }
    }, [])

    return (
        <section ref={sectionRef} className="relative h-screen flex items-center justify-center">
            <div
                ref={containerRef}
                className="text-center max-w-6xl px-4"
                style={{ opacity: 0 }}
            >
                <div className="text-2xl md:text-4xl lg:text-7xl font-bold text-black leading-tight inline-flex items-baseline">
                    <span ref={lineRef}>&quot;Code the Culture&quot;</span>
                    <span
                        ref={cursorRef}
                        className="ml-1 inline-block w-[0.08em] h-[0.9em] bg-current translate-y-[0.05em]"
                        aria-hidden="true"
                    />
                </div>
            </div>

            {/* スクロールプロンプト */}
            <div
                ref={scrollPromptRef}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ opacity: 0 }}
            >
                <svg
                    className="scroll-icon w-6 h-6 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="7 13 12 18 17 13" />
                    <polyline points="7 6 12 11 17 6" />
                </svg>
                <span className="text-sm text-gray-600 uppercase tracking-wider">Scroll to explore</span>
            </div>
        </section>
    )
}
