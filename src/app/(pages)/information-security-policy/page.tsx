import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import InformationSecurityPolicySection from '@/components/sections/information-security-policy/InformationSecurityPolicySection'

export const metadata = {
  title: 'Information Security Policy | STAR UP',
  description: '株式会社STAR UPの情報セキュリティ基本方針',
}

export default function InformationSecurityPolicyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <InformationSecurityPolicySection />
      <Footer />
    </div>
  )
}
