---
name: deploy
description: starup-hp を Vercel 本番へデプロイする。GitHub 自動デプロイが切れている間の手動デプロイフロー。「デプロイして」「本番に出して」「本番反映して」「vercel prod」等で発火。
allowed-tools: Bash(vercel *), Bash(npm i -g vercel), Bash(git checkout *), Bash(git pull *), Bash(git status *), Bash(git log *), Bash(git branch *), Bash(gh api *)
---

現在の `main` を Vercel の本番（`https://www.starup01.jp`）へ手動デプロイする。

## なぜ手動か

リポジトリを個人（`ShotaGhoona`）から Org（`starup-ai-pj`）へ移管した際に、Vercel の GitHub App 連携が切れ、push での自動デプロイがトリガーされなくなっている。復旧するまでは CLI から手動デプロイする（連携は GitHub 側で Vercel App に `starup-ai-pj/starup-hp` へのアクセスを承認 → `vercel git connect` で復旧できる）。

## 前提情報

- Vercel プロジェクト: `starup-hp`
- スコープ（チーム）: `shota-yamashitas-projects-c5da0fce`
- 本番エイリアス: `https://www.starup01.jp`
- `.vercel` は gitignore 済み。`vercel link` 時に `.env.local` へ `VERCEL_OIDC_TOKEN` が追記されることがある（コミット不要）。

## 引数

`$ARGUMENTS` は任意。省略時は現在の `main` をそのまま本番デプロイする。`preview` が渡された場合はプレビューデプロイ（`--prod` を付けない）。

## 手順

1. **CLI とログインの確認**
   ```
   vercel --version || npm i -g vercel
   vercel whoami
   ```
   - 未ログインなら、ユーザーに `! vercel login`（プロンプトに直接入力）を依頼する。対話ログインはこちらでは実行できない。
   - `command not found` 等で PATH が崩れている場合は
     `export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"` を前置する。

2. **プロジェクトのリンク確認**（`.vercel/project.json` が無ければ）
   ```
   vercel link --yes --project starup-hp --scope shota-yamashitas-projects-c5da0fce
   ```

3. **main を最新化**（別ブランチにいる/未マージがある場合）
   ```
   git checkout main
   git pull --ff-only
   git log --oneline -3
   ```
   - デプロイ対象コミットをユーザーに一言示す。

4. **本番デプロイ**
   ```
   vercel --prod --yes
   ```
   - `preview` 指定時は `vercel --yes`（`--prod` なし）。
   - 出力の `readyState: READY` と Production URL を確認。

5. **完了報告**
   - 本番URL（`https://www.starup01.jp`）と、反映したコミット（`git log` の先頭）を簡潔に報告。
   - 数分で反映される旨を添える。

## 注意

- ビルドは Vercel 側で走る。`readyState` が `READY` 以外（`ERROR` 等）ならログ URL（`inspectorUrl`）を提示し、原因を確認する。
- 未コミットのローカル変更は `vercel --prod` の対象になる（CLI はワークツリーをアップロードする）。意図しない差分が無いか `git status` を先に確認する。
- 自動デプロイが復旧済み（`vercel git connect` 成功）の場合は、この手動フローは不要。main への push/マージで自動デプロイされる。
