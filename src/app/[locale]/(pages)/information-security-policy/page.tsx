import { setRequestLocale } from 'next-intl/server'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import InformationSecurityPolicySection from '@/components/sections/information-security-policy/InformationSecurityPolicySection'

export const metadata = {
  title: 'Information Security Policy | STAR UP',
  description: '株式会社STAR UPの情報セキュリティ基本方針',
}

interface InformationSecurityPolicyPageProps {
  params: Promise<{ locale: string }>
}

export default async function InformationSecurityPolicyPage({ params }: InformationSecurityPolicyPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="min-h-screen">
      <Header />
      <InformationSecurityPolicySection locale={locale} />
      <Footer />
    </div>
  )
}
