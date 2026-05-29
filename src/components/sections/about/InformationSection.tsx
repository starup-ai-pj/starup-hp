import { Fragment } from 'react'
import { companyProfile, partners } from '@/data/company'

export default function InformationSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1500px] mx-auto px-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">Information</p>
        <h2 className="text-3xl md:text-5xl font-medium text-gray-900 mb-12 md:mb-20">
          会社情報
        </h2>

        <div className="border-t border-gray-200">
          {companyProfile.map((item) => (
            <InfoRow key={item.label} label={item.label}>
              {item.lines.map((line, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {line}
                </Fragment>
              ))}
            </InfoRow>
          ))}

          <InfoRow label="Partners">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {partners.map((name) => (
                <p key={name}>{name}</p>
              ))}
            </div>
          </InfoRow>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-8 py-6 md:py-8 border-b border-gray-200">
      <p className="col-span-12 md:col-span-3 text-xs md:text-sm text-gray-400 uppercase tracking-widest pt-1">
        {label}
      </p>
      <div className="col-span-12 md:col-span-9 text-sm md:text-base text-gray-900 leading-relaxed">
        {children}
      </div>
    </div>
  )
}
