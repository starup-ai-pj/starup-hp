# パフォーマンス計測

改善の前後で「どれだけ軽くなったか」を同じ条件で比べるための手順。

## 1. 自動計測（`npm run perf`）

本番ビルドを手元で立てて、そこに対して測る。

```bash
npm run build
npx next start -p 3100
```

別のターミナルで:

```bash
npm run perf -- --label before
```

結果は `docs/perf/<label>/` に JSON で保存される。改善後に同じことをして、比べる。

```bash
npm run perf -- --label after
npm run perf:compare -- before after
```

比較表は標準出力と `docs/perf/compare-before-vs-after.md` に出る。

### オプション

| オプション | 既定 | 内容 |
|---|---|---|
| `--label` | 今日の日付 | 保存先フォルダ名 |
| `--base` | `http://localhost:3100` | 計測先（Vercel のプレビュー URL も可） |
| `--runs` | `3` | 各ページ・各端末で何回測るか（中央値を使う） |
| `--pages` | `/,/about,/service,/recruit` | 測るページ（カンマ区切り） |
| `--only` | なし | `lighthouse` か `runtime` の片方だけ測る |

### 何を測っているか

**Lighthouse（読み込みの速さ）** — モバイル（Lighthouse 標準の低速端末想定）とデスクトップ

- スコア、LCP（一番大きい要素が出るまで）、TBT（操作できない時間の合計）、CLS（ガタつき）
- 転送量（全体 / JS）、リクエスト数

**Runtime（開いた後の重さ）** — モバイル 390×844 とデスクトップ 1440×900

Lighthouse は「読み込みが終わるまで」しか見ないので、背景 3D のように**表示した後もずっと動き続けるもの**の重さは分からない。そこで実際にページを開いて次の 3 場面の CPU 使用率と FPS を測る。

| 場面 | 内容 |
|---|---|
| 表示中 | 一番上で 5 秒放置 |
| スクロール中 | 8 秒かけて一番下までスクロール |
| 下までスクロール後 | 一番下で 5 秒放置（上の方の 3D がちゃんと止まっているか） |

CPU はブラウザの全プロセス（ページ・GPU など）の合計で、100% = CPU 1 コアを使い切っている状態。

### 注意

- ヘッドレス Chrome は GPU を使わずソフトウェアで WebGL を描くので、CPU の数字は実機より大きく出る。**非力な端末で見たときの重さ**に近い。絶対値より、同じ条件での前後比較に使う。
- 同じマシンで、他に重い作業をしていないときに測る。
- `/recruit` は Notion から毎回データを取るので、読み込みの数字がぶれやすい。

## 2. 手で確かめる（Chrome DevTools）

実機の GPU で体感を確かめたいときはこちら。

1. 本番ビルド（`npx next start -p 3100`）をシークレットウィンドウで開く
2. DevTools → **Performance** パネル → 右上の歯車で `CPU: 4x slowdown` にする（スマホ相当）
3. ⌘⇧P →「Show frames per second (FPS) meter」で FPS メーターを出す
4. ● で記録を始め、一番上で 5 秒 → ゆっくり一番下までスクロール → 5 秒待って止める
5. 見るところ
   - **Main** に長い黄色（Scripting）や紫（Rendering）が並び続けていないか
   - 一番下までスクロールした後も **GPU** の行が埋まり続けていないか（止まっていない証拠）
   - FPS メーターが 60 近くを保っているか
6. DevTools → **More tools → Performance monitor** で `CPU usage` を見ながらスクロールするのも分かりやすい
