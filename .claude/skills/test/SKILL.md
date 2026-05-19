---
name: test
description: Playwright MCPでブラウザテストを実行する
allowed-tools: Bash(curl *), Read, Glob, Grep, mcp__playwright__*
---

Playwright MCPを使ってブラウザ上で手動テスト相当の確認を行う。

## 引数

`$ARGUMENTS` にテスト指示書のパス、またはテスト内容の説明が渡される。

- パスが渡された場合: そのファイルを読んで指示に従う
- テスト内容が渡された場合: その内容に基づいてテストする

## 手順

1. **テスト指示の確認**
   - 指示書がある場合はファイルを読む
   - テスト対象URL、期待結果、確認ポイントを把握する

2. **dev serverの確認**
   - `curl -s -o /dev/null -w "%{http_code}" http://localhost:8080` で起動確認
   - 起動していない場合はユーザーに `npm run dev` の実行を促す

3. **認証（必要な場合）**
   - ページがauth画面にリダイレクトされた場合、ユーザーに認証情報を聞く
   - `browser_fill_form` でログインフォームを入力し、ログインボタンをクリック

4. **テスト実行**
   - `browser_navigate` で対象ページに移動
   - `browser_snapshot` でページ構造を確認（スクリーンショットより優先）
   - UIの操作は `browser_click`, `browser_fill_form` 等を使う
   - 視覚的な確認が必要な場合のみ `browser_take_screenshot` を使う
     - filenameは必ず指定する（例: `test-login.png`）
     - filenameにはディレクトリパスを含めない（`--output-dir` で `.playwright-mcp/` に保存される）

5. **結果報告**
   - テスト結果を表形式でまとめる（項目 / 結果 / 備考）
   - 問題があった場合は原因の推測と修正箇所を提示する

## テストのコツ

- `browser_snapshot` はDOMのアクセシビリティツリーを返す。要素のrefを使ってクリック等の操作ができる
- スナップショットが大きい場合は `depth` パラメータで階層を制限する
- テーブルの特定行を探す場合は `browser_evaluate` でJSを実行して探すと効率的
- ページ遷移後は必ずスナップショットを再取得する（古いrefは無効になる）

## 注意

- テスト中にコードの修正は行わない。問題を報告するだけ
- 認証情報をハードコードしない。毎回ユーザーに確認する
