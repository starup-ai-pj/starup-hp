# Notion画像処理の違い

## サンプルコード（動作している方）の実装

### NotionRenderer.tsx (L298-328)
```typescript
function renderImage(block: NotionBlock): ReactNode {
  if (block.type !== 'image') return null;
  const { id, image } = block;

  // ★重要: URLを直接使用（プロキシなし）
  const url =
    image.type === 'file'
      ? image.file.url          // ← NotionのS3署名付きURLをそのまま使用
      : image.type === 'external'
        ? image.external.url
        : '';

  return (
    <Image
      src={url}                  // ← 直接URLを使用
      alt={...}
      width={NOTION_IMAGE_MAX_WIDTH}
      height={NOTION_IMAGE_MAX_HEIGHT}
      className="..."
    />
  );
}
```

**ポイント:**
- `image.file.url` を直接使用
- プロキシを通さない
- Next.jsの`Image`コンポーネントで直接レンダリング

---

## 現在の実装（動かない）

### src/lib/notion/extractors.ts (L58-72)
```typescript
files: (page, propertyName) => {
  const files = page.properties[propertyName]?.files
  if (!files || files.length === 0) {
    return ''
  }

  const file = files[0]
  if (file.type === 'file' && file.file) {
    return file.file.url      // ← 署名付きURL
  } else if (file.type === 'external' && file.external) {
    return file.external.url
  }

  return ''
}
```

### src/lib/news.ts & recruit.ts
```typescript
function getImageUrl(imageUrl: string): string {
  const url = imageUrl || DEFAULT_IMAGE
  return getProxiedImageUrl(url)  // ← プロキシ経由に変換
}
```

### src/lib/utils/image-url.ts
```typescript
export function getProxiedImageUrl(notionUrl: string): string {
  if (notionUrl.startsWith('/')) {
    return notionUrl
  }

  // NotionのS3 URLの場合、プロキシ経由にする
  if (notionUrl.includes('prod-files-secure.s3') || notionUrl.includes('amazonaws.com')) {
    return `/api/notion-image?url=${encodeURIComponent(notionUrl)}`  // ← プロキシURL
  }

  return notionUrl
}
```

---

## 根本的な違い

### 1. **画像の種類が違う**

| 箇所 | 画像の取得元 |
|------|-------------|
| サンプル | **ページ本文内のImageブロック** (`block.type === 'image'`) |
| 現在の実装 | **データベースプロパティのFilesフィールド** (`page.properties.Thumbnail`) |

### 2. **URLの扱いが違う**

| 箇所 | URL処理 |
|------|---------|
| サンプル | `image.file.url` を**そのまま使用** |
| 現在の実装 | `file.file.url` を**プロキシ経由に変換** |

### 3. **なぜサンプルは動くのか？**

サンプルコードは**ページ本文（blocks）内の画像**を扱っており、以下の特徴があります：

1. **リアルタイムレンダリング**: ページ表示時にNotionから取得
2. **SSR/ISR**: サーバーサイドで毎回新しいURLを取得できる
3. **署名付きURLの有効期限**: 表示直前に取得するため、期限内

一方、現在の実装は：

1. **ビルド時/ISR時に取得**: データベースプロパティから取得
2. **キャッシュされる**: 1時間キャッシュされるが、URLは1時間で期限切れ
3. **プロキシで対処**: 期限切れ問題を回避しようとしている

---

## 解決策の選択肢

### オプションA: サンプルと同じ方法（直接使用）

**メリット:**
- シンプル
- プロキシ不要

**デメリット:**
- ISRの場合、URLが期限切れになる可能性
- ビルド時に取得したURLは使えない

**適用できる条件:**
- SSR（動的レンダリング）の場合のみ
- 現在のISR設定では不可

### オプションB: プロキシを使う（現在の実装）

**メリット:**
- URLの有効期限問題を解決
- ISR/SSGでも動作

**デメリット:**
- 複雑
- サーバー負荷が増える

**現在の問題:**
- プロキシAPIが正しく動作していない可能性

### オプションC: 画像をダウンロードして保存

**メリット:**
- 完全に自己管理
- 高速

**デメリット:**
- ビルド時に時間がかかる
- ストレージが必要

---

## 推奨アクション

現在の実装（プロキシ）を修正して動作させるか、
SSRに切り替えて署名付きURLを直接使用するか、
どちらを選択しますか？
