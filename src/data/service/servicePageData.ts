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
  href: string
  externalLink?: string
}

export const servicePageData: ServiceItem[] = [
  {
    id: "starup-ai",
    number: "01",
    category: "AI Platform",
    title: "STAR UP.AI",
    subtitle: "AI開発プラットフォーム",
    catchphrase: "経営・現場・研究を、AIでひとつに。",
    description:
      "経営、現場、研究の各部門をAIで統合し、データドリブンな意思決定を実現する包括的なAI開発プラットフォームです。部署間の壁を取り払い、組織全体のデータを有機的に接続することで、従来は不可能だった横断的なインサイトを生み出します。",
    pillars: [
      {
        label: "経営部門",
        features: [
          { title: "計画管理", description: "戦略的計画立案をAIでサポート。過去のデータパターンから最適な経営判断を提示" },
          { title: "財務分析", description: "リアルタイム財務データの可視化。異常値検知とキャッシュフロー予測を自動化" },
          { title: "需要予測", description: "LLMを活用した高精度予測。市場トレンドと自社データを統合的に分析" },
        ],
      },
      {
        label: "現場部門",
        features: [
          { title: "製造管理", description: "生産工程の最適化。ボトルネックの自動検出と改善提案をリアルタイムで実行" },
          { title: "品質管理", description: "画像処理による自動検査。不良品検出率99%以上の精度を実現" },
          { title: "工程管理", description: "BI機能でリアルタイム監視。現場の状況を一目で把握できるダッシュボード" },
        ],
      },
      {
        label: "研究部門",
        features: [
          { title: "試験・分析", description: "統計処理による高度なデータ分析。実験結果の自動評価と次の仮説を生成" },
          { title: "実証実験", description: "最適化アルゴリズムによる効率化。実験パラメータの自動チューニング" },
        ],
      },
    ],
    previews: [
      { label: "ダッシュボード", image: "" },
      { label: "需要予測", image: "" },
      { label: "分析レポート", image: "" },
    ],
    highlight: { label: "統合のメリット", value: "部署間の連携を強化し、組織全体の生産性向上を実現" },
    image: "/images/services/ai-solution.jpg",
    href: "/service/starup-ai",
  },
  {
    id: "archaive",
    number: "02",
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
    href: "/service/archaive",
    externalLink: "https://archaive.net",
  },
  {
    id: "send-ai",
    number: "03",
    category: "Supply Chain AI",
    title: "SEND AI",
    subtitle: "サプライチェーン支援AI",
    catchphrase: "需要を読み、サプライチェーンを最適化する。",
    description:
      "需要予測を起点として発注に関わるあらゆる指標を最適化し、在庫管理から売上分析までを統合的に支援します。業態ごとにオーダーメイドのアルゴリズムを開発し、PoCから本稼働、運用改善までワンストップで伴走します。",
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
      { label: "需要予測", image: "" },
      { label: "在庫管理", image: "" },
      { label: "売上分析", image: "" },
    ],
    highlight: { label: "導入成果", value: "在庫最適化により売上最大化とコスト削減を同時実現" },
    image: "/images/services/sendai.jpg",
    href: "/service/send-ai",
  },
]
