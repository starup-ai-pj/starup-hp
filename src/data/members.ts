export interface Member {
  id: string
  name: string
  englishName?: string
  position: string
  description: string
  image?: string
  heroImage?: string
}

export const memberData: Member[] = [
  {
    id: "yuto-ogata",
    name: "緒方 勇斗",
    englishName: "Yuto Ogata",
    position: "代表取締役",
    description:
      "京都大学在学中に教育メディアの会社を大学1年時立ち上げ後、製造業の営業コンサル、商社の新規事業部でのPM、人材会社でのCSを経験。",
    image: "/images/member/ogata-yuto.jpg",
    heroImage: "/images/member/ogata-yuto-hero.jpg",
  },
  {
    id: "takehiro-kikkawa",
    name: "吉川岳宏",
    englishName: "Takehiro Kikkawa",
    position: "取締役 CPO/CSO",
    description:
      "データサイエンス系ベンチャーにて非財務情報の開示やバックオフィス改善業務に従事。また、大学別の環境報告書の作成や飲食店のGHG排出量の開示等のPJを行う。",
    image: "/images/member/kikkawa-takehiro.jpg",
    heroImage: "/images/member/kikkawa-takehiro-hero.jpg",
  },
  {
    id: "yuki-tanaka",
    name: "田中祐希",
    englishName: "Yuki Tanaka",
    position: "執行役員/最高技術責任者",
    description:
      "大手IT企業をはじめとする数社にてPM・リードエンジニアを経験した後、フリーランスエンジニアとして数十件の案件に携わる。生成AIを活用した新規事業立ち上げ、業務効率化、システム開発などを経験する。",
    image: "/images/member/tanaka-yuki.jpg",
    heroImage: "/images/member/tanaka-yuki-hero.jpg",
  },
  {
    id: "daigo-fujii",
    name: "藤井大悟",
    englishName: "Daigo Fujii",
    position: "執行役員 コーポレート統括",
    description:
      "京都大学経済学部出身。京都のスタートアップで事業開発を行ったのち、上場企業のM&A・アライアンス部署でソーシングや出資・協業検討を行う。STARUPでは、2度の銀行調達など経理・ファイナンスの統括を担当。",
    image: "/images/member/fujii-daigo.jpg",
    heroImage: "/images/member/fujii-daigo-hero.jpg",
  },
  {
    id: "naoki-kadokura",
    name: "門倉尚紀",
    englishName: "Naoki Kadokura",
    position: "AIソリューション事業部 事業部長 兼 PM統括",
    description:
      "京都大学大学院情報学研究科卒。京大在学中にエンジニアサークルを立ち上げ後、STAR UP初期メンバーとして参画。一度リクルートにデータスペシャリストとして入社しデータ解析の力を磨いた後、STAR UPへ復帰。現在はAIソリューション事業部を統括し、製造業から行政まで多種多様な現場データの社会実装を推進。",
    image: "/images/member/kadokura-naoki.jpg",
    heroImage: "/images/member/kadokura-naoki-hero.jpg",
  },
  {
    id: "haruki-kimura",
    name: "木村遥輝",
    englishName: "Haruki Kimura",
    position: "執行役員/ARCHAIVE事業CEO",
    description:
      "京都大学工学部出身。在学時には、新規事業開発、人材事業での営業・CSを経験。STARUPではSaaS事業の立ち上げを行い、現在は営業組織構築や販売戦略立案など営業の統括を担当。",
    image: "/images/member/kimura-haruki.jpg",
    heroImage: "/images/member/kimura-haruki-hero.jpg",
  },
  {
    id: "jiho-ryu",
    name: "柳 智浩",
    englishName: "Jiho Ryu",
    position: "ARCHAIVE 開発統括",
    description:
      "京都大学工学部情報学科卒。ARCHAIVE開発統括として、プロダクト全体の要件定義からエンジニアへのタスク割り振り、高難度の実装までをリードする。",
    image: "/images/member/ryu-jiho.jpg",
    heroImage: "/images/member/ryu-jiho-hero.jpg",
  },
  {
    id: "shota-yamashita",
    name: "山下 翔大",
    englishName: "Shota Yamashita",
    position: "ARCHAIVE プロダクトマネージャー",
    description:
      "京都大学工学部建築学科卒。建築からエンジニアへ転身し、インドでの修行を経てSTARUPに参画。デザインと実装を一人で完結させるスピード感が強み。",
    image: "/images/member/yamashita-shota.jpg",
    heroImage: "/images/member/yamashita-shota-hero.jpg",
  },
  {
    id: "shunsuke-kimura",
    name: "木村 俊介",
    englishName: "Shunsuke Kimura",
    position: "SENDAIプロダクトマネージャー",
    description:
      "京都大学工学部情報学科卒。2026年4月新卒入社。AIソリューション部のPMとして『SENDAI』（小売業界向け発注最適化AI）のプロダクト責任者を担当。",
    image: "/images/member/kimura-shunsuke.jpg",
    heroImage: "/images/member/kimura-shunsuke-hero.jpg",
  },
  {
    id: "namiki-chikusa",
    name: "千種 直幹",
    englishName: "Namiki Chikusa",
    position: "SENDAI開発統括",
    description:
      "京都大学工学部情報学科卒。2026年4月新卒入社。『SENDAI』（小売業界向け発注最適化AI）のバックエンド設計とAI実装を担当。",
    image: "/images/member/chikusa-namiki.jpg",
    heroImage: "/images/member/chikusa-namiki-hero.jpg",
  },
  {
    id: "sota-nagai",
    name: "永井 奏多",
    englishName: "Sota Nagai",
    position: "ARCHAIVE事業部 営業担当",
    description:
      "國學院大学卒。木村遥輝との再会をきっかけにSTAR UPへ参画し、ARCHAIVE（製造業向けAIプラットフォーム）の営業を担当。関西を中心に泥臭く現場へ足を運び続け、2026年度開設予定の東京オフィスを拠点に関東圏の市場開拓を進める。ニックネームは「ケヴィン」。",
    image: "/images/member/nagai-sota.jpg",
    heroImage: "/images/member/nagai-sota-hero.jpg",
  },
]
