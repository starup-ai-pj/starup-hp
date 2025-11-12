"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TypingTextProps {
  text: string
  className?: string
}

export default function TypingText({ text, className = "" }: TypingTextProps) {
  const typingTextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!typingTextRef.current) return

    // テキストを単語とスペースに分割
    const words = text.split(/(\s+)/)

    // 各単語を個別のspanでラップし、単語内の文字を分割
    const wordsHtml = words.map((word) => {
      if (word.match(/^\s+$/)) {
        // スペースの場合はそのまま
        return word.split('').map(() => '&nbsp;').join('')
      } else {
        // 単語の場合は、単語全体を1つのspanでラップし、内部の文字を分割
        const chars = word.split('').map((char) =>
          `<span class="char" style="opacity: 0;">${char}</span>`
        ).join('')
        return `<span class="word" style="display: inline-block; white-space: nowrap;">${chars}</span>`
      }
    }).join('')

    typingTextRef.current.innerHTML = wordsHtml
    const charElements = typingTextRef.current.querySelectorAll('.char')

    gsap.timeline({
      scrollTrigger: {
        trigger: typingTextRef.current,
        start: "top 80%",
        end: "top 60%",
        toggleActions: "play none none reverse"
      }
    })
    .to(charElements, {
      opacity: 1,
      duration: 0.05,
      stagger: 0.02,
      ease: "none"
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [text])

  return <p ref={typingTextRef} className={className}></p>
}
