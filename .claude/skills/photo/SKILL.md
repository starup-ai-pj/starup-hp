---
name: photo
description: 画像の差し替え。メンバー写真（プロフィール画像 / インタビューhero画像）や、各ページのヒーロー画像をDownloads等から移動・リネームし、対応するコード参照も更新する。プロフィール画像のバストショット／ウエストアップへのクロップにも対応。
allowed-tools: Read, Edit, Bash, Glob, Grep, AskUserQuestion
---

# 画像差し替え

メンバー写真やページのヒーロー画像など、サイト上の画像差し替え作業を一括で行う。

## 対応ケース

### A. メンバー写真

メンバー一覧・詳細ページで使う写真。1人につき最大2枚:

- **プロフィール画像**: 一覧カード・詳細のサイドバー・他メンバー候補に表示 → `Member.image`
- **ヒーロー画像**: 詳細ページの大きなヒーロー枠に表示 → `Member.heroImage`

ファイル配置: `public/images/member/`
命名規則: `<lastname>-<firstname>.jpg`（プロフィール）/ `<lastname>-<firstname>-hero.jpg`（ヒーロー）
データソース: `src/data/member/member.ts`（`memberData` 配列内の各エントリ）

### B. ページのヒーロー画像

ページ最上部のフルブリードヒーロー画像（例: `/recruit/culture` の `What We Believe In` 上の写真）。

既知のヒーロー画像:

| ページ | コンポーネント | 現在のsrc |
| --- | --- | --- |
| `/recruit/culture` | `src/components/sections/culture/CulturePage.tsx` | `/images/culture/culture-hero.jpg` |

ヒーローを持たないページ（`/recruit`, `/member` など）はテキストのみのHero。新規に画像を入れる場合は別途レイアウト変更が必要なので、対応外として扱う。

ファイル配置: `public/images/<section>/`
命名規則: `<section>-hero.jpg` または既存ファイル名を踏襲

### C. プロフィール画像のクロップ

スタジオ／ロケで撮ったメンバー写真は 2732×4096（2:3 縦長）の全身ショットで届くことが多い。そのままだとメンバー一覧（`MemberListSection.tsx`）で `object-cover` 切り抜きが起きてバランスが悪いので、人物に寄せたクロップを行う。

**前提（必ず守る）:**

- **正方形（1:1）にしない**（過去にNG確定）
- **アスペクト比は 3:4 縦長**で固定（デスクトップが `aspect-[3/4]`、モバイルが `aspect-[4/3]`。3:4 にしておけばモバイルでは object-cover で上下が切れるだけで顔は残る）
- **バストショット（頭〜胸元）より少し引いた "ウエストアップ"** が好み。胸元で切るとキツすぎる
- 元画像は `git checkout HEAD -- <path>` で戻せる前提で破壊的に上書きする。試行錯誤するときは戻してからやり直す
- ImageMagick は無いので **Python3 + PIL** を使う（`python3 -c "from PIL import Image"` で確認）

**推奨クロップ設定（2732×4096 ソース基準）:**

- サイズ: `2000 × 2667`（3:4 縦長）
- 顔の縦位置: クロップの上から **約 25%**（`crop_y = face_y - 667`）
- 顔の横位置: 中心（`crop_x = face_center_x - 1000`）
- 結果: 頭頂部に少し背景の余裕 → 頭〜腰元（ウエストアップ）まで入る

**バストショットが欲しい場合**（よりタイト）:
- サイズ: `1500 × 2000`
- `crop_y = face_y - 500`、`crop_x = face_center_x - 750`

**手順:**

1. 対象画像を1枚ずつ `Read` ツールで表示してビジュアル確認
2. 表示画像内で **顔の中心 Y**（目のあたり）と **被写体の横中心 X** を見積もる。`Read` の表示はソースの 1/4 スケール（683×1024）で出る — 4倍するとソース座標
3. 各画像の `(crop_x, crop_y)` を計算し、Python スクリプトで一括クロップ
4. クロップ後、再度 `Read` で結果確認。顔が高すぎ／低すぎ／オフセンターなら座標を微調整して再実行（元画像は `git checkout HEAD -- <files>` で戻す）

**Pythonスクリプトのテンプレ:**

```python
from PIL import Image
import os

# (filename, crop_x, crop_y)
crops = [
    ("chikusa-namiki.jpg", 400, 613),
    # ...
]
W, H = 2000, 2667  # 3:4 ウエストアップ
base = "/Users/.../public/images/member"

for name, x, y in crops:
    path = os.path.join(base, name)
    img = Image.open(path)
    iw, ih = img.size
    x = max(0, min(x, iw - W))
    y = max(0, min(y, ih - H))
    img.crop((x, y, x + W, y + H)).save(path, quality=92)
```

## 手順

1. **意図を分解**: ユーザーリクエストから対象（誰の写真 / どのページ）と種別（プロフィール / ヒーロー）を読み取る。曖昧な場合のみ `AskUserQuestion` で確認。
2. **元ファイルを確認**: 提示されたパス（通常 `~/Downloads/<name>.jpg`）を `ls -la` で存在確認。複数枚渡された場合はどれがプロフィール用でどれがヒーロー用か必ず確認する。
3. **配置先・ファイル名を決定**: 上記の命名規則に従う。既存ファイルがある場合は上書きでOK（ユーザーが置換を求めているので）。
4. **計画を提示して承認を取る**: `AskUserQuestion` で移動先パスとコード変更内容を提示してYES/NO確認。
5. **実行**:
   - `mv` で移動（**`cp` ではなく `mv`**。ユーザーは複製ではなく移動を望む）
   - `Edit` でコード参照を追加・更新
   - `image` / `heroImage` 既存値がある場合は src を差し替えるだけ。ない場合は `socialLinks` の前に追記する
6. **旧画像のクリーンアップ**: 差し替え対象だった「古い方の画像ファイル」を消す。手順:
   - 旧パス（例: 元の `member.image` / 元の Hero `<Image src=...>`）を控える
   - `grep -rn "<旧ファイル名>" src public` で他に参照がないことを確認
   - 参照ゼロなら `rm public/images/.../<旧ファイル名>` で削除
   - **他で使われていれば削除しない**（例: `/images/recruit/office-1.jpg` は HistorySection や home の RecruitSection からも参照されている）
   - 削除前にユーザーへ簡潔に報告（「旧ファイル X を削除します（他参照なし）」）。他参照ありの場合も「旧ファイル X は他から参照されているため残します」と明示。

## 注意事項

- **必ず `mv`**: ユーザーから明示の指示がない限り Downloads 等の元ファイルは残さない（過去に「複製じゃなくて移動」と指示済み）。
- **拡張子はソースに合わせる**: 既存メンバー画像は `.png` 多めだが、新規追加分は `.jpg` でOK。ソースの拡張子をそのまま使う。
- **モノクロCSSは追加しない**: 一覧・詳細ともに grayscale は外し済み（「遺影みたい」とNG確定）。新規Image要素を足す場合も `grayscale` クラスは付けない。
- **画像最適化フラグ**: 既存パターンに合わせる。`CulturePage.tsx` のヒーローは `priority unoptimized`、メンバーは無指定。新規追加時は隣接コードと揃える。
- **Image欠落の検知**: 作業前後で「アクティブメンバーで image 未設定の人」を `grep` で確認しておくと、ユーザーに次の差し替え候補を提示できる。

## メンバーID対応表（参考）

`src/data/member/member.ts` 参照。命名は `id` ではなく姓-名の英語表記（例: `id: "shota-yamashita"` → ファイル名は `yamashita-shota.jpg`）。ID と姓-名が逆になる点に注意。

## 例

### ケース1: 「山下の写真を更新。shota.jpgをプロフィール、shota-2.jpgをインタビューhero用」

1. `~/Downloads/shota.jpg` の存在確認
2. `mv ~/Downloads/shota.jpg public/images/member/yamashita-shota.jpg`
3. `mv ~/Downloads/shota-2.jpg public/images/member/yamashita-shota-hero.jpg`
4. `member.ts` の `shota-yamashita` エントリに `image` と `heroImage` を追加（既存なら値だけ差し替え）

### ケース2: 「cultureのhero写真をIMG_xxx.jpgに」

1. `~/Downloads/IMG_xxx.jpg` の存在確認
2. 旧 src（例: `/images/recruit/office-1.jpg`）を控える
3. `mv ~/Downloads/IMG_xxx.jpg public/images/culture/culture-hero.jpg`（上書き）
4. `CulturePage.tsx` の Hero `<Image src=...>` パスが既に `/images/culture/culture-hero.jpg` ならコード変更不要。違うなら更新。
5. 旧 src を `grep -rn "office-1.jpg" src public` で確認 → 他参照あり（HistorySection等）なので残す

### ケース3: 「全員のプロフ画像をバストショット/ウエストアップにクロップ」

1. `sips -g pixelWidth -g pixelHeight public/images/member/*.jpg` で対象の jpg を洗い出し（2732×4096 のものが全身ショット候補）
2. 各画像を `Read` で表示 → 顔中心 Y・横中心 X を見積もる（表示は1/4スケール）
3. アスペクト比 3:4、サイズ 2000×2667（ウエストアップ）または 1500×2000（バストショット）で `(crop_x, crop_y)` を計算
4. Python+PIL スクリプトで一括クロップ → `Read` で結果確認
5. 寄りすぎ／引きすぎ／オフセンターなら `git checkout HEAD -- <files>` で元画像復元 → 座標調整して再実行
6. 「正方形にしない」「ウエストアップ気味が好み」のフィードバックは過去に確定済み
