# ISR実装サマリー

## 問題の概要

Vercel本番環境でNotionから取得した画像が表示されず、alt textのみが表示される問題が発生していました。

### 根本原因

1. **NotionのS3署名付きURL**: Notionから取得される画像URLは、約1時間で期限切れになるAWS S3の署名付きURLです
2. **完全な静的生成の問題**: 以前は完全な静的生成を使用していたため、ビルド時に取得したURLがキャッシュされ、期限切れになっていました

## 解決策: ISR（Incremental Static Regeneration）への移行

### 実装した変更点

#### 1. Notion APIクライアントの変更 (`src/lib/notion/client.ts`)

**変更前**: キャッシュなし（SSR）
```typescript
const response = await fetch(
  `${NOTION_API_BASE_URL}/databases/${databaseId}/query`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_API_VERSION,
    },
    body: JSON.stringify({
      sorts: options?.sorts,
      filter: options?.filter,
    }),
    cache: 'no-store', // 毎回新しいデータを取得
  }
)
```

**変更後**: ISRを使用（1時間ごとに再検証）
```typescript
const response = await fetch(
  `${NOTION_API_BASE_URL}/databases/${databaseId}/query`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_API_VERSION,
    },
    body: JSON.stringify({
      sorts: options?.sorts,
      filter: options?.filter,
    }),
    next: { revalidate: 3600 }, // ISR: 1時間ごとに再検証
  }
)
```

#### 2. ページレベルのrevalidate設定

以下のページに `export const revalidate = 3600` を追加:
- `src/app/page.tsx` (ホームページ)
- `src/app/news/page.tsx` (ニュース一覧)
- `src/app/news/[slug]/page.tsx` (ニュース詳細)
- `src/app/recruit/page.tsx` (採用情報一覧)
- `src/app/recruit/[slug]/page.tsx` (採用情報詳細)

## 次のステップ

### 1. Vercelの環境変数を設定

`VERCEL_ENV_SETUP.md`のガイドに従って、以下の環境変数をVercelダッシュボードで設定:

```bash
NOTION_API_KEY=your_notion_api_key_here
NOTION_NEWS_DATABASE_ID=your_news_database_id_here
NOTION_RECRUIT_DATABASE_ID=your_recruit_database_id_here
NOTION_MEMBER_DATABASE_ID=your_member_database_id_here
```

**重要**: Production と Preview の両方にチェックを入れる

### 2. 再デプロイ

環境変数設定後、以下のいずれかの方法で再デプロイ:

**方法A: Vercelダッシュボード**
- Deployments → 最新のデプロイ → "Redeploy"

**方法B: GitHubプッシュ**
```bash
git push origin fix/isr-implementation
```

## 技術的な利点

### ISRアプローチの利点
1. **バランスの取れたパフォーマンス**: 初回リクエストは静的ページで高速、バックグラウンドで更新
2. **URL期限切れ対策**: 1時間ごとに再検証されるため、署名付きURLの期限切れを防ぐ
3. **スケーラビリティ**: 静的生成のパフォーマンスとSSRの柔軟性の良いとこ取り
4. **Notion API制限への配慮**: 毎リクエストではなく、1時間ごとの更新でAPI呼び出しを削減

### 完全SSRと比較したトレードオフ
- **パフォーマンス向上**: ほとんどのリクエストは静的ページで応答（高速）
- **データの鮮度**: 最大1時間の遅延がある（許容範囲内）
- **コスト効率**: サーバーレス関数の実行回数を大幅に削減

## 検証コマンド

ローカルでNotionデータ取得をテスト:
```bash
npx tsx --env-file=.env.local scripts/check-notion-images.ts
```

アクセス可能なデータベースを確認:
```bash
npx tsx --env-file=.env.local scripts/list-accessible-databases.ts
```

## ビルド確認

```bash
npm run build
```

ISRルートは`○`記号で表示され、Revalidate列に時間が表示されます:
```
○  /                             158 kB         341 kB  1h  1y
○  /news                        1.47 kB         185 kB  1h  1y
○  /recruit                     8.58 kB         192 kB  1h  1y
```

## 参考ファイル

- `VERCEL_ENV_SETUP.md` - Vercel環境変数設定ガイド
