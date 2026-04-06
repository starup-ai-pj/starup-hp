"use client"

import TransitionLink from "./TransitionLink"

interface SeeMoreButtonProps {
  href: string
  label?: string
  className?: string
  external?: boolean
}

export default function SeeMoreButton({ href, label = "See More", className = "", external }: SeeMoreButtonProps) {
  return (
    <TransitionLink
      href={href}
      className={`group inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full text-sm font-medium text-black hover:bg-gray-50 transition-colors shadow-sm ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{label}</span>
      <span className="inline-flex items-center justify-center w-6 h-6 bg-black rounded-full text-white text-xs transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </TransitionLink>
  )
}
