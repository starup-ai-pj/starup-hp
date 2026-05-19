export interface Member {
    id: string
    name: string
    englishName?: string
    position: string
    description: string
    comment?: string
    hasInterview?: boolean
    image?: string
    heroImage?: string
    socialLinks?: {
      twitter?: string
      facebook?: string
      linkedin?: string
    }
  }
  
  export const memberData: Member[] = [
    {
      id: "yuto-ogata",
      name: "緒方 勇斗",
      englishName: "Yuto Ogata",
      position: "代表取締役",
      description:
        "京都大学在学中に教育メディアの会社を大学1年時立ち上げ後、製造業の営業コンサル、商社の新規事業部でのPM、人材会社でのCSを経験。その後、昨年11月に株式会社STARUPを設立し、12ヶ月でメンバーも40名まで拡大させる。",
      comment: "「それ、おもろくね？」を形にする",
      hasInterview: true,
      image: "/images/member/ogata-yuto.png",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "takehiro-kikkawa",
      name: "吉川岳宏",
      englishName: "Takehiro Kikkawa",
      position: "取締役 CPO/CSO",
      description:
        "データサイエンス系ベンチャーにて非財務情報の開示やバックオフィス改善業務に従事。また、大学別の環境報告書の作成や飲食店のGHG排出量の開示等のPJを行う。",
      comment: "データで社会をよりよくする",
      hasInterview: true,
      image: "/images/member/kikkawa-takehiro.png",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "yuki-tanaka",
      name: "田中祐希",
      englishName: "Yuki Tanaka",
      position: "執行役員/最高技術責任者",
      description:
        "大手IT企業をはじめとする3社にてPM・リードエンジニアを経験した後フリーランスエンジニアとして数十件の案件に携わる。生成AIを活用した新規事業立ち上げ、業務効率化、システム開発などを経験する。",
      comment: "技術で可能性を広げる",
      hasInterview: true,
      image: "/images/member/tanaka-yuki.png",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    // {
    //   id: "hachiki-ikeda",
    //   name: "池田八輝",
    //   englishName: "Hachiki Ikeda",
    //   position: "執行役員",
    //   description:
    //     "受託開発事業部の統括と主に物流部門のプロジェクトを担当。「倉庫シェアリングサービスのマッチングモデルの構築」「特殊車両経路選択モデルの構築」などの物流システムの研究を経て、「需要予測ツールの開発」や「配送経路最適化ツール」の開発に取り組んでいる。",
    //   image: "/images/member/ikeda-hatchiki.png",
    //   socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    // },
    {
      id: "daigo-fujii",
      name: "藤井大悟",
      englishName: "Daigo Fujii",
      position: "執行役員 コーポレート統括",
      description:
        "京都大学経済学部出身。京都のスタートアップで事業開発を行ったのち、上場企業のM&A・アライアンス部署でソーシングや出資・協業検討を行う。STARUPでは、2度の銀行調達など経理・ファイナンスの統括を担当。",
      comment: "経営基盤をつくる",
      hasInterview: true,
      image: "/images/member/fuji-daigo.png",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "naoki-kadokura",
      name: "門倉尚紀",
      englishName: "Naoki Kadokura",
      position: "AIソリューション事業部 事業部長 兼 PM統括",
      description:
        "京都大学大学院情報学研究科卒。京大在学中にエンジニアサークルを立ち上げ後、STAR UP初期メンバーとして参画。一度リクルートにデータスペシャリストとして入社しデータ解析の力を磨いた後、STAR UPへ復帰。現在はAIソリューション事業部を統括し、製造業から行政まで多種多様な現場データの社会実装を推進。",
      comment: "現場でデータを社会実装する",
      hasInterview: true,
      image: "/images/member/kadokura-naoki.png",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "haruki-kimura",
      name: "木村遥輝",
      englishName: "Haruki Kimura",
      position: "執行役員/ARCHAIVE事業CEO",
      description:
        "京都大学工学部出身。在学時には、新規事業開発、人材事業での営業・CSを経験。STARUPではSaaS事業の立ち上げを行い、現在は営業組織構築や販売戦略立案など営業の統括を担当。",
      comment: "事業を前に進める",
      hasInterview: true,
      image: "/images/member/kimura-haruki.png",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "jiho-ryu",
      name: "柳 智浩",
      englishName: "Jiho Ryu",
      position: "ARCHAIVE 開発統括",
      description:
        "京都大学工学部情報学科卒。ARCHAIVE開発統括として、プロダクト全体の要件定義からエンジニアへのタスク割り振り、高難度の実装までをリードする。",
      comment: "大人の青春を全力で",
      hasInterview: true,
      image: "/images/member/ryu-jiho.jpg",
      heroImage: "/images/member/ryu-jiho-hero.jpg",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "shota-yamashita",
      name: "山下 翔大",
      englishName: "Shota Yamashita",
      position: "ARCHAIVE プロダクトマネージャー",
      description:
        "京都大学工学部建築学科卒。建築からエンジニアへ転身し、インドでの修行を経てSTARUPに参画。デザインと実装を一人で完結させるスピード感が強み。",
      comment: "デザイン駆動で価値を届ける",
      hasInterview: true,
      image: "/images/member/yamashita-shota.jpg",
      heroImage: "/images/member/yamashita-shota-hero.jpg",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "shunsuke-kimura",
      name: "木村 俊介",
      englishName: "Shunsuke Kimura",
      position: "PM / AIエンジニア",
      description:
        "京都大学工学部情報学科卒。2026年4月新卒入社。AIソリューション部のPMとして『SENDAI』（小売業界向け発注最適化AI）のプロダクト責任者を担当。",
      comment: "Code The Culture",
      hasInterview: true,
      image: "/images/member/kimura-shunsuke.jpg",
      heroImage: "/images/member/kimura-shunsuke-hero.jpg",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "namiki-chikusa",
      name: "千種 直幹",
      englishName: "Namiki Chikusa",
      position: "AIソリューション事業部 エンジニア",
      description:
        "京都大学工学部情報学科卒。2026年4月新卒入社。『SENDAI』（小売業界向け発注最適化AI）のバックエンド設計とAI実装を担当。",
      comment: "理論をプロダクトの骨組みへ",
      hasInterview: true,
      image: "/images/member/chikusa-namiki.jpg",
      heroImage: "/images/member/chikusa-namiki-hero.jpg",
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    {
      id: "sota-nagai",
      name: "永井 奏多",
      englishName: "Sota Nagai",
      position: "ARCHAIVE事業部 営業担当",
      description:
        "國學院大学卒。木村遥輝との再会をきっかけにSTAR UPへ参画し、ARCHAIVE（製造業向けAIプラットフォーム）の営業を担当。関西を中心に泥臭く現場へ足を運び続け、2026年度開設予定の東京オフィスを拠点に関東圏の市場開拓を進める。ニックネームは「ケヴィン」。",
      comment: "課題に寄り添い、未来を売る",
      hasInterview: true,
      socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    },
    // {
    //   id: "takuma-tsuji",
    //   name: "辻拓真",
    //   englishName: "Takuma Tsuji",
    //   position: "ARCHAIVE事業部 CS責任者",
    //   description:
    //     "京都大学教育学部出身。大学では生涯教育に関して研究。2社でインターン経験を積んだのち、STAR UPに参画。SaaS事業の営業・展示会マーケ・カスタマーサクセス・事業開発・そして採用などにも幅広く携わる。",
    //   image: "/images/member/tsuji-takuma.png",
    //   socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    // },
    // {
    //   id: "sho-takada",
    //   name: "高田尚",
    //   englishName: "Sho Takada",
    //   position: "受託開発事業部 PM",
    //   description:
    //     "京都大学教育学部出身。在学中に大喜利AIを個人開発しながら、営業インターンにも携わる。面白さが形になっていく過程に惹かれ、株式会社STARUPに参画。現在はPMとして需要予測ツールの開発を推進している。",
    //   image: "/images/member/takada-sho.png",
    //   socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    // },
    // {
    //   id: "takumi-kodama",
    //   name: "小玉拓未",
    //   englishName: "Takumi Kodama",
    //   position: "コーポレート",
    //   description:
    //     "京都大学理学部出身。大学では細胞生物学を研究。STAR UP参画後は、広報として当HPやSaaS LP、記事の作成等を行い、受託開発や経理、人材事業といった業務にも携わる。",
    //   image: "/images/member/kodama-takumi.png",
    //   socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    // },
    // {
    //   id: "rick-huang",
    //   name: "ファンリック",
    //   englishName: "Rick Huang",
    //   position: "VPoE",
    //   description:
    //     "量子技術の世界的研究機関でのインターンやテック系スタートアップの創業と成長に従事。日本語と英語の両方に堪能であり、量子・ソフトウェア・AI開発など幅広い分野に知見をもつ。",
    //   image: "/images/member/huang-rick.png",
    //   socialLinks: { twitter: "#", facebook: "#", linkedin: "#" }
    // }
  ]
  