import Image from 'next/image'

interface ChapterDividerProps {
  number: string
  jaTitle: string
  enTitle: React.ReactNode
  bgImage?: string
}

export default function ChapterDivider({ number, jaTitle, enTitle, bgImage }: ChapterDividerProps) {
  return (
    <section
      className="relative py-20 md:py-28 bg-gray-950 text-white overflow-hidden"
      data-bg="dark"
    >
      {bgImage ? (
        <>
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-60 pointer-events-none select-none"
            priority={false}
          />
          {/* 文字可読性のためのオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 pointer-events-none" />
        </>
      ) : (
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      )}
      <div className="relative z-10 max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-4">Chapter</p>
            <p className="text-[6rem] md:text-[10rem] lg:text-[14rem] font-medium leading-[0.85] tracking-tighter text-white">
              {number}
            </p>
          </div>
          <div className="md:max-w-sm md:text-right md:pb-10 lg:pb-16">
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-3">{jaTitle}</p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-medium leading-[1.3] tracking-tight">
              {enTitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
