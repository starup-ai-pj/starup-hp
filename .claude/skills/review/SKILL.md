---
name: review
description: PRをレビューしてコメントを投稿する
allowed-tools: Bash(gh pr *), Bash(gh api *), Bash(git diff *), Bash(git log *), Read, Glob, Grep
---

PR番号を受け取り、コードレビューを行う。

## 引数

`$ARGUMENTS` にPR番号が渡される（例: `3`）

## 手順

1. **PRの情報を取得する**
   ```
   gh pr view {番号} --repo starup-ai-pj/archaive-flowerium
   gh pr diff {番号} --repo starup-ai-pj/archaive-flowerium
   ```

2. **差分を分析する**
   - 変更されたファイルを一覧で把握
   - 各ファイルの差分を読む
   - 関連する既存コードも読んで文脈を理解

3. **以下の観点でレビューする**

   **正しさ**
   - Issueの要件を満たしているか
   - ロジックにバグがないか
   - エッジケースの考慮漏れはないか

   **品質**
   - 既存のコードスタイル・パターンと一貫しているか
   - 不要なコード・ファイルが含まれていないか
   - 命名は適切か

   **安全性**
   - SQLインジェクション・XSS等のセキュリティリスクはないか
   - RLSポリシーの考慮漏れはないか
   - 機密情報のハードコードはないか

   **影響範囲**
   - 既存機能への回帰リスクはないか
   - DBスキーマ変更がある場合、マイグレーションは正しいか

4. **レビュー結果を投稿する**
   - まず `gh pr view {番号} --json author -q .author.login` でPR作成者を確認する
   - **自分のPRの場合**（GitHubの制約で自分のPRはapproveできない）: `gh pr review {番号} --comment --body "レビューコメント"`
   - 他人のPRで問題がなければ: `gh pr review {番号} --approve --body "レビューコメント"`
   - 修正が必要なら: `gh pr review {番号} --request-changes --body "レビューコメント"`
   - 軽微な指摘のみ: `gh pr review {番号} --comment --body "レビューコメント"`

   レビューコメントの形式:
   ```
   ## レビュー結果

   ### 良い点
   - ...

   ### 指摘事項
   - [ ] **[必須]** 〜を修正してください（ファイル名:行番号）
   - [ ] **[提案]** 〜した方が良いかもしれません

   ### 影響範囲の確認
   - ...
   ```

5. **特定の行にコメントが必要な場合**
   ```
   gh api repos/starup-ai-pj/archaive-flowerium/pulls/{番号}/comments \
     -f body="コメント" -f path="ファイルパス" -F line=行番号 \
     -f commit_id="$(gh pr view {番号} --json headRefOid -q .headRefOid)"
   ```

## 注意

- レビューは建設的に。問題点だけでなく良い点も挙げる
- 些細なスタイルの指摘より、ロジックや設計の問題を優先する
- 修正が必要な指摘と、あれば良い程度の提案を明確に区別する
