# starup-hp

株式会社STAR UP コーポレートサイト（[starup01.jp](https://www.starup01.jp/)）のソースコード。

会社紹介・メンバー・サービス・採用・お知らせを掲載する Next.js 製の企業サイト。
お知らせ（News）と採用情報（Recruit）は Notion をヘッドレス CMS として運用し、
非エンジニアでも Notion 上で記事を追加・編集できる。

## 技術スタック

| 領域 | 採用技術 |
|---|---|
| フレームワーク | Next.js 15（App Router, Turbopack） |
| 言語 / UI | TypeScript 5 / React 19 |
| スタイル | Tailwind CSS v4 |
| アニメーション | GSAP（ScrollTrigger）、three.js（3D演出） |
| CMS / データ | Notion API（`@notionhq/client`）、Markdown（インタビュー）、静的データ（`src/data`） |
| 通知 | Slack（お問い合わせ受信時） |

## セットアップ

前提: Node.js 20 以上。

```bash
npm install
cp .env.local.example .env.local   # 値を埋める（下記参照）
npm run dev                         # http://localhost:3000
```

### 環境変数（`.env.local`）

Notion へのアクセスには、Notion で作成した Integration を対象データベースに接続（Connections に追加）しておく必要がある。

| 変数 | 用途 |
|---|---|
| `NOTION_API_KEY` | Notion Integration トークン（全 Notion 連携で使用） |
| `NOTION_NEWS_DATABASE_ID` | お知らせ一覧・詳細の取得元 DB（表示） |
| `NOTION_RECRUIT_DATABASE_ID` | 採用情報一覧・詳細の取得元 DB（表示） |
| `NOTION_DATA_SOURCE_ID` | お問い合わせフォームの登録先（`/api/contact`） |
| `NOTION_RECRUIT_DATA_SOURCE_ID` | 採用応募フォームの登録先（`/api/recruit`） |
| `SLACK_BOT_TOKEN` | お問い合わせ受信を Slack 通知する Bot トークン |
| `SLACK_CHANNEL_ID` | 通知先 Slack チャンネル ID |
| `NEXT_PUBLIC_SITE_URL` | 絶対 URL 生成（OGP 画像・Slack 通知アイコン等） |

## スクリプト

```bash
npm run dev     # 開発サーバー（0.0.0.0 で待受）
npm run build   # 本番ビルド（Turbopack）
npm run start   # ビルド成果物を起動
npm run lint    # ESLint
```

## ディレクトリ構成

```
src/
  app/                     # App Router（ルーティング・各ページ・メタデータ）
    api/contact/           #   お問い合わせ送信 → Notion 登録 + Slack 通知
    api/recruit/           #   採用応募送信 → Notion 登録
  components/
    layout/                # アプリ外枠（Header / Footer / PageTransition / CustomCursor）
    ui/                    # 汎用プリミティブ（Breadcrumb / Select / TransitionLink / TypingText / ShareButtons）
    notion/                # Notion 本文レンダリング（NotionBlockRenderer / CodeBlock）
    animation/             # 重めの 3D 演出（interactive-blackhole）
    sections/              # 画面単位のセクション
      common/              #   複数ページ共有（ContactSection / JoinUsSection）
      home/ about/ member/ news/ service/
      recruit/             #   landing / jobs / apply / detail / culture（URL構造をミラー）
  data/                    # 静的コンテンツ（members / services / company / history / culture）
  lib/
    notion/                # 汎用 Notion カーネル（client / fields / repository / types）
    news/  recruit/        # Notion 由来のデータ層（index + types）— DB 構造の知識を各ドメインに閉じる
    interview/             # content/interview/*.md のパース
content/interview/         # メンバーインタビュー本文（Markdown）
public/                    # 画像・フォント・iframe 演出 HTML・規程 PDF
```

## ページ一覧

| ルート | 内容 |
|---|---|
| `/` | トップ |
| `/about` | 会社紹介・沿革・会社情報 |
| `/service` | サービス（ARCHAIVE / SEND AI / Flowerium） |
| `/member`, `/member/[id]` | メンバー一覧・詳細（インタビュー付き） |
| `/news`, `/news/[slug]` | お知らせ一覧・詳細（Notion） |
| `/recruit` | 採用トップ |
| `/recruit/jobs` | 募集職種一覧（Notion） |
| `/recruit/[slug]` | 募集職種詳細（Notion） |
| `/recruit/culture` | カルチャー |
| `/recruit/apply` | 応募フォーム |
| `/contact` | お問い合わせフォーム |
| `/information-security-policy` | 情報セキュリティ方針 |
| `/recruitment-disclosure` | 有料職業紹介事業 情報公開 |

## コンテンツの編集

- **お知らせ / 採用情報** … Notion のデータベースを編集すると即時に反映（`no-store` で都度取得）。
- **メンバーインタビュー** … `content/interview/<member-id>.md` を追加・編集。`src/data/members.ts` の `id` と一致させると、メンバー詳細にインタビューが表示される。
- **メンバー / サービス / 会社情報 / 沿革 / カルチャー** … `src/data/` 配下の各ファイルを編集。

## デプロイ

`npm run build` の成果物を Node サーバー（`npm run start`）または Vercel 等のホスティングにデプロイする。
お知らせ・採用は動的取得（SSR）のため、ビルド時に上記の環境変数が利用可能である必要がある。
