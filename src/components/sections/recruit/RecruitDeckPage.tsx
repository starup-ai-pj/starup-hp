import { PhotoGalleryWall } from '@/components/animation/photo-wall/PhotoGalleryWall'
import HeroAiMakerSection from './deck/HeroAiMakerSection'
import ChapterDivider from './deck/ChapterDivider'
import MissionSection from './deck/MissionSection'
import WorkplaceSection from './deck/WorkplaceSection'
import JobsSection from './deck/JobsSection'
import CtaSection from './deck/CtaSection'

export default function RecruitDeckPage() {
  return (
    <div className="bg-white">
      {/* 表紙 + §0 Prologue: STARUP=AIメーカー (右側Pinterest風ギャラリー付き) */}
      <HeroAiMakerSection />

      {/* ━━━ 01. Mission + Values ━━━ */}
      <ChapterDivider
        number="01"
        jaTitle="わたしたちがやろうとしていること"
        enTitle={
          <>
            What we&apos;re<br />trying to do.
          </>
        }
        bgImage="/images/recruit/chapters/chapter-01.jpg"
      />
      <MissionSection />

      {/* ━━━ 02. ここで働くということ ━━━ */}
      <ChapterDivider
        number="02"
        jaTitle="ここで働くということ"
        enTitle={
          <>
            How we<br />work.
          </>
        }
        bgImage="/images/recruit/chapters/chapter-02.jpg"
      />
      <WorkplaceSection />

      {/* ━━━ 03. 募集中のポジション ━━━ */}
      <ChapterDivider
        number="03"
        jaTitle="募集中のポジション"
        enTitle={
          <>
            Open<br />positions.
          </>
        }
        bgImage="/images/recruit/chapters/chapter-03.jpg"
      />
      <JobsSection />

      {/* CTA → photo wall */}
      <CtaSection />
      {/* <PhotoGalleryWall /> */}
    </div>
  )
}
