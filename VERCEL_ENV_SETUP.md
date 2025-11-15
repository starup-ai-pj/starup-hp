# Vercel環境変数設定ガイド

## 現在のエラー
```
Application error: a server-side exception has occurred
```

## 原因
Vercelの環境変数が設定されていないため、Notion APIにアクセスできない。

## 解決手順

### 1. Vercelダッシュボードにアクセス
https://vercel.com/shota-yamashitas-projects-c5da0fce/starup-hp

### 2. Settings → Environment Variables に移動

### 3. 以下の環境変数を追加

#### 必須の環境変数（本番環境用）

```bash
# Notion API Key
NOTION_API_KEY=your_notion_api_key_here

# データベースID（本番環境用）
# ✅ アクセス可能なID（scripts/list-accessible-databases.ts で確認済み）
NOTION_NEWS_DATABASE_ID=your_news_database_id_here
NOTION_RECRUIT_DATABASE_ID=your_recruit_database_id_here
NOTION_MEMBER_DATABASE_ID=your_member_database_id_here

# Slack（オプショナル）
SLACK_BOT_TOKEN=your_slack_bot_token_here
SLACK_CHANNEL_ID=your_slack_channel_id_here

# Site URL（本番環境）
NEXT_PUBLIC_SITE_URL=https://starup-hp.vercel.app
```

### 4. 環境の選択
- **Production** ✅ チェック
- **Preview** ✅ チェック
- **Development** ⬜ チェックなし（ローカルは .env.local を使用）

### 5. 保存後、再デプロイ

**方法1: Vercelダッシュボードから**
- Deployments タブ → 最新のデプロイ → "Redeploy" ボタン

**方法2: GitHubから**
```bash
git commit --allow-empty -m "chore: trigger redeploy"
git push
```

---

## 環境変数確認用スクリプト

ローカルで以下を実行して、正しいIDか確認：

```bash
npx tsx --env-file=.env.local scripts/list-accessible-databases.ts
```

---

## トラブルシューティング

### エラーが続く場合

1. **Vercelのログ確認**
   - Deployments → 該当デプロイ → "View Function Logs"
   - Runtime Logs でエラーメッセージを確認

2. **環境変数の確認**
   ```bash
   # Vercel CLIでログイン
   vercel login

   # 環境変数を確認
   vercel env ls
   ```

3. **Notionのアクセス権限確認**
   - Notionで各データベースを開く
   - 右上「...」→「Connections」
   - Integrationが追加されているか確認

---

## 注意事項

⚠️ **本番環境では本番用のデータベースIDを使用すること**

現在のローカル `.env.local` は開発用IDを使っているため、
本番環境には本番用のIDを設定する必要があります。

開発用: `your_dev_database_id` (STAR UP hp-news-contents (develop))
本番用: `your_prod_database_id` (STAR UP hp-news-contents)

必要に応じて使い分けてください。
