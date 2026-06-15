// お問い合わせ・求人応募フォームで共通利用する「知ったきっかけ」の選択肢。
// value はフォーム送信値（分析の一貫性のため言語に関わらず正規の日本語で固定）。
// key は表示ラベルの翻訳キー（messages の sourceOptions.* に対応）。
export const sourceOptions = [
  { key: 'bizreach', value: 'ビズリーチ' },
  { key: 'wantedly', value: 'Wantedly' },
  { key: 'otherJobSite', value: 'その他求人サイト' },
  { key: 'referral', value: '社員・知人からの紹介' },
  { key: 'x', value: 'X' },
  { key: 'linkedin', value: 'LinkedIn' },
  { key: 'note', value: 'note' },
  { key: 'mediaArticle', value: '各種メディア掲載記事' },
  { key: 'event', value: '就活イベント・合同説明会・ミートアップ' },
  { key: 'alumni', value: 'アルムナイコミュニティ案内' },
  { key: 'searchEngine', value: 'Google・Yahoo!等の検索エンジン' },
  { key: 'other', value: 'その他' },
]
