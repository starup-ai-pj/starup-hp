import Link from "next/link";

// ルートレイアウトは <html> を描画しないため、locale セグメントに
// マッチしないパスの 404 はここで最小限の <html>/<body> を描画する。
export default function RootNotFound() {
  return (
    <html lang="ja">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "sans-serif",
          background: "#f9fafb",
          color: "#374151",
        }}
      >
        <h1 style={{ fontSize: "4rem", margin: 0, color: "#d1d5db" }}>404</h1>
        <p style={{ fontSize: "1.25rem", margin: 0 }}>Page Not Found</p>
        <Link href="/" style={{ color: "#2563eb", textDecoration: "underline" }}>
          Back to Home
        </Link>
      </body>
    </html>
  );
}
