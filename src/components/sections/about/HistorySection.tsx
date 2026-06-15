'use client'

import { useEffect, useRef, useState } from 'react'
// import Image from 'next/image' // Historyの画像が揃うまで非表示
import { useTranslations } from 'next-intl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { type HistoryEvent } from '@/data/history'

gsap.registerPlugin(ScrollTrigger)

export default function HistorySection({ events }: { events: HistoryEvent[] }) {
  const t = useTranslations('sections.about.history')
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const dotRefs = useRef<(HTMLDivElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || !timelineRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 0.5,
          },
        }
      )

      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[]
      const dots = dotRefs.current.filter(Boolean) as HTMLDivElement[]
      const images = imageRefs.current.filter(Boolean) as HTMLDivElement[]

      items.forEach((item, index) => {
        const isEven = index % 2 === 0
        gsap.fromTo(
          item,
          { opacity: 0, x: isEven ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      images.forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      dots.forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            ease: 'back.out(3)',
            scrollTrigger: {
              trigger: dot,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-gray-100 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <p className="text-sm lg:text-base text-gray-600 mb-2">
            {t('lead')}
          </p>
          <p className="text-2xl md:text-3xl lg:text-6xl">
            {t('heading')}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 md:-ml-[1px]">
            <div className="w-[2px] h-full bg-gray-300" />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-[2px] h-full bg-gray-900"
              style={{ transformOrigin: 'top center' }}
            />
          </div>

          {events.map((event, index) => {
            const isEven = index % 2 === 0
            // Image offset: how much it crosses the center line (in %) — Historyの画像が揃うまで未使用
            // const imageOverlap = [20, 25, 15, 22, 18, 28, 20][index % 7]

            return (
              <div
                key={index}
                ref={(el) => { rowRefs.current[index] = el }}
                className="relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* ===== DESKTOP ===== */}
                <div className="hidden md:grid md:grid-cols-[1fr_2px_1fr] relative">
                  {/* Left column */}
                  <div className="flex">
                    {isEven ? (
                      /* Text on left - pushed to outer edge */
                      <div
                        ref={(el) => { itemRefs.current[index] = el }}
                        className="w-full py-14 pr-24 pl-4 relative z-20"
                      >
                        <TimelineCard event={event} align="right" isHovered={hoveredIndex === index} />
                      </div>
                    ) : (
                      /* Image on left — Historyの画像が揃うまで非表示 */
                      <div className="w-full py-14" />
                      // <div className="relative w-full py-14 flex justify-center">
                      //   <div
                      //     ref={(el) => { imageRefs.current[index] = el }}
                      //     className="relative z-0"
                      //     style={{ marginRight: `-${imageOverlap}%` }}
                      //   >
                      //     <div className={`relative w-[520px] h-[170px] overflow-hidden transition-all duration-700 ${
                      //       hoveredIndex === index ? 'opacity-40' : 'opacity-[0.12]'
                      //     }`}>
                      //       <Image
                      //         src={event.image}
                      //         alt=""
                      //         fill
                      //         className="object-cover grayscale"
                      //         sizes="520px"
                      //       />
                      //     </div>
                      //   </div>
                      // </div>
                    )}
                  </div>

                  {/* Dot column */}
                  <div className="relative flex items-center justify-center">
                    <div
                      ref={(el) => { dotRefs.current[index] = el }}
                      className="relative z-30"
                    >
                      <div className={`w-[10px] h-[10px] rounded-full bg-gray-900 transition-all duration-300 ${
                        hoveredIndex === index ? 'scale-[2]' : ''
                      }`} />
                      {hoveredIndex === index && (
                        <div className="absolute -inset-1 rounded-full border border-gray-400 animate-ping" />
                      )}
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex">
                    {!isEven ? (
                      /* Text on right - pushed to outer edge */
                      <div
                        ref={(el) => { itemRefs.current[index] = el }}
                        className="w-full py-14 pl-24 pr-4 relative z-20"
                      >
                        <TimelineCard event={event} align="left" isHovered={hoveredIndex === index} />
                      </div>
                    ) : (
                      /* Image on right — Historyの画像が揃うまで非表示 */
                      <div className="w-full py-14" />
                      // <div className="relative w-full py-14 flex justify-center">
                      //   <div
                      //     ref={(el) => { imageRefs.current[index] = el }}
                      //     className="relative z-0"
                      //     style={{ marginLeft: `-${imageOverlap}%` }}
                      //   >
                      //     <div className={`relative w-[520px] h-[170px] overflow-hidden transition-all duration-700 ${
                      //       hoveredIndex === index ? 'opacity-40' : 'opacity-[0.12]'
                      //     }`}>
                      //       <Image
                      //         src={event.image}
                      //         alt=""
                      //         fill
                      //         className="object-cover grayscale"
                      //         sizes="520px"
                      //       />
                      //     </div>
                      //   </div>
                      // </div>
                    )}
                  </div>
                </div>

                {/* ===== MOBILE ===== */}
                <div className="md:hidden relative pl-10 py-5">
                  <div
                    ref={(el) => {
                      if (typeof window !== 'undefined' && window.innerWidth < 768) {
                        dotRefs.current[index] = el
                      }
                    }}
                    className="absolute left-[11px] top-[28px] w-[9px] h-[9px] rounded-full bg-gray-900 z-10"
                  />
                  <div
                    ref={(el) => {
                      if (typeof window !== 'undefined' && window.innerWidth < 768) {
                        itemRefs.current[index] = el
                      }
                    }}
                  >
                    <TimelineCard event={event} align="left" isHovered={false} isMobile />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TimelineCard({
  event,
  align,
  isHovered,
  isMobile = false,
}: {
  event: HistoryEvent
  align: 'left' | 'right'
  isHovered: boolean
  isMobile?: boolean
}) {
  return (
    <div className={`${align === 'right' ? 'text-right' : 'text-left'}`}>
      {/* Year */}
      <div
        className="flex items-baseline gap-0.5 mb-2"
        style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}
      >
        <span className={`font-bold tracking-tighter transition-colors duration-300 ${
          isMobile ? 'text-4xl text-gray-300' :
          isHovered ? 'text-7xl text-gray-900' : 'text-7xl text-gray-300'
        }`}>
          {event.year}
        </span>
        <span className={`font-medium transition-colors duration-300 ${
          isMobile ? 'text-base text-gray-400' :
          isHovered ? 'text-xl text-gray-700' : 'text-xl text-gray-400'
        }`}>
          .{event.month}
        </span>
      </div>

      {/* Title */}
      <h3 className={`font-medium text-gray-900 transition-all duration-300 ${
        isMobile ? 'text-base' : 'text-xl'
      } ${!isMobile && isHovered ? (align === 'right' ? '-translate-x-1' : 'translate-x-1') : ''}`}>
        {event.title}
      </h3>

      {/* Description */}
      {event.description && (
        <p className={`text-sm text-gray-500 mt-1 leading-relaxed transition-colors duration-300 ${
          isHovered ? 'text-gray-600' : ''
        }`}>
          {event.description}
        </p>
      )}

      {/* Underline accent */}
      <div className={`mt-4 h-px transition-all duration-500 ease-out ${
        align === 'right' ? 'ml-auto' : 'mr-auto'
      } ${isHovered ? 'w-full bg-gray-900' : `${isMobile ? 'w-8' : 'w-12'} bg-gray-300`}`} />
    </div>
  )
}
