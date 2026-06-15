import TransitionLink from '@/components/ui/TransitionLink'
import { useTranslations } from 'next-intl'
import { companySNS } from '@/data/company'

const COMPANY_LINKS = [
  { name: 'About', href: '/about' },
  { name: 'Service', href: '/service' },
  { name: 'Member', href: '/member' },
  { name: 'News', href: '/news' },
  { name: 'Contact', href: '/contact' },
]

const CAREER_LINKS = [
  { name: 'Career', href: '/recruit' },
  { name: 'Culture', href: '/recruit/culture' },
  { name: 'Open positions', href: '/recruit/jobs' },
  { name: 'Apply', href: '/recruit/apply' },
]

const SNS_LINKS = [
  { name: 'X (Twitter)', href: companySNS.twitter },
  { name: 'note', href: companySNS.note },
  { name: 'LinkedIn', href: companySNS.linkedin },
]

const ArrowRight = ({ className = 'w-5 h-5 md:w-6 md:h-6' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
)

const ExternalIcon = () => (
  <svg
    className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
)

export default function Footer() {
  const t = useTranslations('footer')
  const legalLinks = [
    { name: t('infoSecurityPolicy'), href: '/information-security-policy' },
    { name: t('recruitmentDisclosure'), href: '/recruitment-disclosure' },
  ]
  return (
    <footer className="relative z-10 bg-black text-white" data-bg="dark">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        {/* ━━━ Top: CTA ━━━ */}
        <div className="border-b border-white/10 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
            {/* Headline */}
            <div className="lg:col-span-5">
              <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] xl:text-9xl font-medium leading-[0.95] tracking-tight">
                Ready to<br />
                <span className="text-gray-500">make impact?</span>
              </h2>
            </div>

            {/* CTA buttons */}
            <div className="lg:col-span-7 flex flex-col gap-3 md:gap-4 lg:justify-end">
              <TransitionLink
                href="/contact"
                className="group flex items-center justify-between border border-white/20 px-6 py-5 md:px-8 md:py-7 hover:bg-white hover:text-black transition-colors"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-gray-600">
                    Inquiry
                  </p>
                  <p className="text-2xl md:text-3xl font-medium tracking-tight mt-2">Contact us</p>
                </div>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
              </TransitionLink>

              <TransitionLink
                href="/recruit"
                className="group flex items-center justify-between border border-white/20 px-6 py-5 md:px-8 md:py-7 hover:bg-white hover:text-black transition-colors"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 group-hover:text-gray-600">
                    Recruit
                  </p>
                  <p className="text-2xl md:text-3xl font-medium tracking-tight mt-2">Join us</p>
                </div>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* ━━━ Site map ━━━ */}
        <div className="py-16 md:py-24 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-x-8 border-b border-white/10">
          {/* Company */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-5">Company</p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.name}>
                  <TransitionLink
                    href={link.href}
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Career */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-5">Career</p>
            <ul className="space-y-3">
              {CAREER_LINKS.map((link) => (
                <li key={link.name}>
                  <TransitionLink
                    href={link.href}
                    className="text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect (SNS) */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-5">Connect</p>
            <ul className="space-y-3">
              {SNS_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-base text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                    <ExternalIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-5">Legal</p>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <TransitionLink
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-white transition-colors leading-relaxed inline-block"
                  >
                    {link.name}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ━━━ Bottom bar ━━━ */}
        <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} STAR UP, Inc.</p>
          <p>Kyoto · Japan</p>
        </div>
      </div>
    </footer>
  )
}
