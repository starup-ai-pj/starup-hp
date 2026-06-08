// ルートレイアウトは pass-through。<html>/<body> は [locale]/layout.tsx が持つ
// (next-intl の as-needed プレフィックス構成のため)。
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
