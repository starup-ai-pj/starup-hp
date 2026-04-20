---
name: bg
description: Issueをバックグラウンドで自動実装しPRまで出す
allowed-tools: Bash(git *), Bash(gh *), Read, Edit, Write, Glob, Grep
---

Issue番号を受け取り、worktree上でバックグラウンド実行し、実装→コミット→PR作成→セルフレビューまで自動完結する。

## 引数

`$ARGUMENTS` にIssue番号が渡される（例: `92`）

## 動作

このスキルは **Agent ツールを `isolation: "worktree"` かつ `run_in_background: true`** で起動し、以下のすべてを自律的に実行させる。ユーザーの操作は不要。

## Agent に渡すプロンプトの構成

以下の手順をすべて含むプロンプトを Agent に渡すこと。

### 1. Issueの内容を取得

```
gh issue view {番号} --repo starup-ai-pj/archaive-flowerium
```

### 2. ブランチを切る

- `git fetch origin main`
- ブランチ名はIssueの種別と内容から決める:
  - Feature → `feat/issue-{番号}-{短い英語の説明}`
  - Bug → `fix/issue-{番号}-{短い英語の説明}`
  - Task（リファクタ） → `refact/issue-{番号}-{短い英語の説明}`
  - Task（ドキュメント） → `docs/issue-{番号}-{短い英語の説明}`
  - その他 → `chore/issue-{番号}-{短い英語の説明}`
- `git checkout -b {ブランチ名} origin/main --no-track`

### 3. 関連コードを調査して実装する

- Issueの内容から影響範囲を特定し、関連ファイルを読む
- Issueに書かれた要件を満たすコードを書く
- 既存のコードスタイル・パターンに従う
- 最小限の変更にする

### 4. コミットする

- `git add` で変更をステージング
- コミットメッセージのルール:
  - 一行で簡潔に（50文字以内を目安）
  - prefixを必ず付ける（`feat:`, `fix:`, `refact:`, `chore:` 等）
  - 日本語で書く
  - 末尾に `(#{番号})` を付ける
  - **AI生成フッターは絶対に付けない**（Co-Authored-By等）

### 5. PRを作成する

- `git push -u origin {ブランチ名}`
- `gh pr create` でPR作成:
  - `--repo starup-ai-pj/archaive-flowerium`
  - `--base main`
  - `--title "{prefix}: {タイトル日本語}"`
  - `--body` に以下を含める:
    - `## やったこと` — 変更内容を箇条書き
    - `## 影響範囲` — 変更したファイルと影響
    - `Closes #{番号}`
    - チェックリスト

### 6. セルフレビューする

- `gh pr diff` で差分を確認
- `gh pr view` で作成者を確認（自分のPRなので `--comment`）
- `gh pr review {PR番号} --comment --body` でレビューコメント投稿:
  - `## レビュー結果`
  - `### 良い点`
  - `### 指摘事項`
  - `### 影響範囲の確認`

### 7. PRのURLを返す

## 呼び出し側の実装

スキルを受け取った親Agentは以下のように実行する:

```
Agent({
  description: "Dev issue {番号} in background",
  prompt: "（上記の手順をすべて含むプロンプト）",
  isolation: "worktree",
  run_in_background: true
})
```

完了通知を受けたら、結果のPR URLをユーザーに伝える。

## 注意

- このスキルは小〜中規模のタスク向け（1-3ファイル程度の変更）
- 大きなIssueの場合はユーザーに警告して `/dev` の使用を促す
- AskUserQuestion は使わない（バックグラウンド実行のため対話不可）
- 要件が曖昧なIssueの場合でも、Issueの記述から最善の判断で実装する
