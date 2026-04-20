---
name: issue
description: 説明文からGitHub Issueを作成する
allowed-tools: Bash(gh issue *), Bash(gh project *), Bash(gh api *), Bash(gh label *)
---

ユーザーの説明文から適切なGitHub Issueを作成してください。

## リポジトリ・プロジェクト設定

- **リポジトリ**: `ShotaGhoona/starup-hp`
- **プロジェクト**: `STARUP HP` (番号 `1`, owner `ShotaGhoona` — user project)
- **プロジェクトID**: `PVT_kwHOC-n7rs4BTLoM`
- **Statusフィールド**: フィールドID `PVTSSF_lAHOC-n7rs4BTLoMzhAf0Bo`
  - Todo=`f75ad846`, In Progress=`47fc9ee4`, Done=`98236657`, waiting=`7b35ec54`
- このプロジェクトには Priority/Area のカスタムフィールドは無い。**ラベルで管理する。**

## 手順

1. ユーザーの説明文を分析し、以下を判断する:
   - **種別ラベル**:
     - `type: feature` — 新機能追加
     - `type: improvement` — 既存機能の改善
     - `type: performance` — パフォーマンス改善
     - `type: infrastructure` — 共通基盤・ナビ・リダイレクト等
     - `bug` — 不具合修正
   - **対象ページラベル**（該当すれば）: `page: top` / `page: about` / `page: career` / `page: member` / `page: service`
   - **優先度ラベル**: `priority: high` / `priority: medium` / `priority: low`（明示されていなければ `priority: medium`）
   - **状態ラベル**（必要なら）: `status: ready` / `status: waiting-content`

2. Issueタイトルを作成する:
   - 短く具体的に（日本語）
   - プレフィックス例: `feat:` / `refact:` / `perf:` / `fix:` / `chore:`
   - 何をするかが一目でわかること

3. Issue本文を作成する:
   - `## やりたいこと` — ユーザーの意図を整理して書く
   - `## 背景` — なぜ必要か（説明文から読み取れれば）
   - `## 想定スコープ` — 対象ファイルや作業内容（わかる範囲で）
   - 不明な部分は無理に埋めない

4. Milestoneを選択する:
   - `gh api repos/ShotaGhoona/starup-hp/milestones --jq '.[].title'` で一覧を取得
   - 内容から最も適切なMilestoneを1つ選ぶ（該当がなければ省略可）

5. AskUserQuestion で確認する:
   - タイトル、ラベル（type/page/priority）、Milestone、本文のプレビューを提示
   - OKなら作成、修正があれば反映

6. 確認後、**1回のBash呼び出し**で Issue作成 → Project追加 → Status=Todo 設定をすべて実行する:

   ```bash
   ISSUE_URL=$(gh issue create --repo ShotaGhoona/starup-hp \
     --title "{タイトル}" \
     --milestone "{Milestone名}" \
     --assignee ShotaGhoona \
     --label "{typeラベル}" --label "{priorityラベル}" --label "{pageラベル}" \
     --body "$(cat <<'BODY'
   {本文}
   BODY
   )") && \
   ITEM_ID=$(gh project item-add 1 --owner ShotaGhoona --url "$ISSUE_URL" --format json --jq '.id') && \
   gh project item-edit --project-id PVT_kwHOC-n7rs4BTLoM --id "$ITEM_ID" --field-id PVTSSF_lAHOC-n7rs4BTLoMzhAf0Bo --single-select-option-id f75ad846 && \
   echo "$ISSUE_URL"
   ```

   - Milestoneが該当しない場合は `--milestone` 引数を省略
   - pageラベルが該当しない場合は `--label "{pageラベル}"` を省略
   - 複数ラベルは `--label` を繰り返して付与

7. 最後に出力されたIssueのURLを返す

## 注意

- 説明文が曖昧な場合は、わかる範囲で書いて「要件の詳細化が必要」と本文に記載する
- 1つの説明文に複数のIssueが含まれる場合は分割して作成する
- 関連するIssueがあれば本文で `#番号` で参照する
- 既存Issueに重複がないか、作成前に `gh issue list --repo ShotaGhoona/starup-hp --state open` で軽く確認すると良い
