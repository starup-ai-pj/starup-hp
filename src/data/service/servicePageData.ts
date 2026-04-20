export interface ServiceFeature {
  title: string
  description: string
}

export interface ServicePillar {
  label: string
  features: ServiceFeature[]
}

export interface ServicePreview {
  label: string
  image: string // placeholder path — replace later
}

export interface ServiceItem {
  id: string
  number: string
  category: string
  title: string
  subtitle: string
  catchphrase: string
  description: string
  pillars: ServicePillar[]
  previews: ServicePreview[]
  highlight: { label: string; value: string }
  image: string
  href?: string
  externalLink?: string
}

export const servicePageData: ServiceItem[] = [
  {
    id: "archaive",
    number: "01",
    category: "Data Platform",
    title: "ARCHAIVE",
    subtitle: "AIデータ活用プラットフォーム",
    catchphrase: "眠っていた図面データに、AIで命を吹き込む。",
    description:
      "社内に点在した図面データを一元管理し、AIによる類似図面検索とチャット型データ検索で業務効率を革新します。膨大な過去資産を「探せる・使える・活かせる」状態に変え、設計・製造の意思決定を加速させます。",
    pillars: [
      {
        label: "コア機能",
        features: [
          { title: "AI類似図面検索", description: "膨大な過去の図面データから類似度99%以上の精度で瞬時に検索。手描きスケッチからの検索にも対応" },
          { title: "AIチャット型データ検索", description: "自然言語で問いかけるだけで欲しいデータが見つかる。専門知識がなくても誰でも活用可能" },
          { title: "案件管理機能", description: "図面に紐づく情報を自動解析し、関連書類を一元管理。案件の全体像を即座に把握" },
        ],
      },
      {
        label: "導入・運用",
        features: [
          { title: "導入サポート", description: "現場定着までのDXを伴走支援。データ移行から運用定着まで一貫したサポート体制" },
          { title: "データ統合", description: "社内に点在したデータを一元管理。部署間の壁をなくし、全社横断でデータ活用を推進" },
        ],
      },
      {
        label: "対象業界",
        features: [
          { title: "製造業", description: "部品図面・組立図の管理と検索。過去の類似設計を活用した設計工数の大幅削減" },
          { title: "建設・設計業", description: "施工図面・構造図の横断検索。過去プロジェクトの知見を新規案件に即座に活用" },
        ],
      },
    ],
    previews: [
      { label: "類似図面検索", image: "" },
      { label: "チャット検索", image: "" },
      { label: "案件管理", image: "" },
    ],
    highlight: { label: "導入効果", value: "図面検索時間を90%短縮、部署間連携の効率化を実現" },
    image: "/images/services/archaive.jpg",
    href: "https://archaive.net",
  },
  {
    id: "send-ai",
    number: "02",
    category: "Supply Chain AI",
    title: "SEND AI",
    subtitle: "サプライチェーン支援AI",
    catchphrase: "データをつなぎ、サプライチェーンを最適化する。",
    description:
      "散在するデータを統合・可視化し、AIが最適なアクションを提案。在庫管理や販売管理から発注・配分まで、一気通貫で支援します。SaaS導入によるデータ統合から、業務モジュールの段階的な追加、固有のアルゴリズム開発へ。小さく始め成果を見ながら御社だけの意思決定基盤に育てます。",
    pillars: [
      {
        label: "予測・発注",
        features: [
          { title: "需要予測AI", description: "業態やPoCからオーダーメイドの高精度アルゴリズムを開発。先1ヶ月・先半年の売上を高精度で予測" },
          { title: "発注最適化", description: "個社ごとの発注フローをシステム化。過去の補充データから最適な発注タイミングと数量を自動算出" },
          { title: "在庫管理", description: "各店舗の在庫数と在庫週数をリアルタイム表示。在庫切れリスクを事前に検知しアラート" },
        ],
      },
      {
        label: "分析・可視化",
        features: [
          { title: "売上分析", description: "全体店舗分析・新商品分析に対応。過去6ヶ月の平均売上データと前月比の変化を可視化" },
          { title: "BI機能", description: "中長期の戦略策定の材料となる各種データを可視化。経営判断に直結するインサイトを提供" },
        ],
      },
      {
        label: "導入支援",
        features: [
          { title: "PoC支援", description: "小規模な実証実験からスタートし、効果を検証。リスクを最小化しながら段階的に展開" },
          { title: "運用改善", description: "本稼働後も継続的にアルゴリズムを改善。季節変動やトレンド変化に自動適応" },
        ],
      },
    ],
    previews: [
      { label: "あらゆるデータを、ひとつのデータベースに。", image: "/images/services/sendai/product-master.png" },
      { label: "見たいデータを、見たい時に、見たい形で。", image: "/images/services/sendai/dashboard.png" },
      { label: "AIが最適な配分・発注を提案。人は承認するだけ。", image: "/images/services/sendai/ai-suggestion.png" },
    ],
    highlight: { label: "導入成果", value: "在庫最適化により売上最大化とコスト削減を同時実現" },
    image: "/images/services/sendai/hero.png",
    href: "https://send-ai.co.jp/",
  },
  {
    id: "flowerium",
    number: "03",
    category: "AI Workflow",
    title: "Flowerium",
    subtitle: "オントロジー基盤の業務AIシステム",
    catchphrase: "意味をデータ化する。",
    description:
      "業務データを\"意味\"で統合するオントロジーを中心に、業務UIとAIエージェントの実行基盤までを一体で提供するプロダクトです。属人化した判断や手作業のオペレーションを、アクションとして定義し、エージェントが監査可能な形で実行します。データ基盤の上に、現場が使えるアプリを短期間で立ち上げ、継続改善を可能にします。今後のAIの成長に合わせて形を変え続けるシステムです。",
    pillars: [
      {
        label: "データ基盤",
        features: [
          { title: "オントロジー統合", description: "業務データを\"意味\"で統合し、社内に散らばった知識を一元的に扱えるデータ基盤を構築" },
        ],
      },
      {
        label: "業務UI",
        features: [
          { title: "カスタムアプリ", description: "現場で使える業務アプリを短期間で立ち上げ、運用しながら継続的に改善できる基盤を提供" },
        ],
      },
      {
        label: "AIエージェント",
        features: [
          { title: "アクション実行", description: "属人化した判断や手作業をアクションとして定義し、監査可能な形でエージェントが実行" },
        ],
      },
    ],
    previews: [
      { label: "ウィジェットとデータを組み合わせて、自分だけのアプリをノーコードで作成", image: "/images/services/flowerium/CustomAppBuilder.png" },
      { label: "業務をノードの組み合わせでデジタル化し、AIエージェントと協業", image: "/images/services/flowerium/Workflow.png" },
      { label: "業務上の概念をデジタルスキーマに変換し、意味論ベースでデータを統合・活用", image: "/images/services/flowerium/ERD.png" },
    ],
    highlight: { label: "プロダクト特性", value: "AIの成長に合わせて形を変え続ける、適応型の業務AIシステム基盤" },
    image: "/images/services/flowerium/hero.png",
  },
]
