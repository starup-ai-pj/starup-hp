---
name: dev
description: Issueを指定してブランチを切り、実装を行う
allowed-tools: Bash(git *), Bash(gh issue *), Bash(gh pr *), Read, Edit, Write, Glob, Grep
---

Issue番号を受け取り、ブランチを切って実装を行う。

## 引数

`$ARGUMENTS` にIssue番号が渡される（例: `8`）

## 手順

1. **Issueの内容を取得する**
   ```
   gh issue view {番号} --repo starup-ai-pj/archaive-flowerium
   ```

2. **ブランチを切る**
   - mainから最新を取得: `git fetch origin main`
   - ブランチ名はIssueのラベルと内容から決める:
     - `type:feature` → `feat/issue-{番号}-{短い英語の説明}`
     - `type:bug` → `fix/issue-{番号}-{短い英語の説明}`
     - `type:refactor` → `refact/issue-{番号}-{短い英語の説明}`
     - `type:docs` → `docs/issue-{番号}-{短い英語の説明}`
     - その他 → `chore/issue-{番号}-{短い英語の説明}`
   - ブランチ作成: `git checkout -b {ブランチ名} origin/main --no-track`

3. **関連コードを調査する**
   - Issueの内容から影響範囲を特定
   - 関連するソースファイルを読む
   - `docs/requirements/` で要件を確認

4. **実装する**
   - Issueに書かれた要件を満たすコードを書く
   - 既存のコードスタイル・パターンに従う
   - 不要なファイルを作らない、最小限の変更にする

5. **実装完了を報告する**
   - 何を変更したか簡潔に報告
   - `/co` でコミット、`/pr` でPR作成を促す

## 注意

- 要件が曖昧な場合はユーザーに確認してから実装する
- 大きすぎるIssueの場合は、まず方針を提示して確認を取る
- 別ターミナルで並行実行されることを前提に、コンフリクトしにくい変更を心がける
