import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vector Search Demo",
  description: "ベクトル検索のデモアプリケーション",
  keywords: ["vector search", "ベクトル検索", "Next.js", "デモ"],
  authors: [{ name: "Vector Search Demo Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Vector Search Demo",
    description: "ベクトル検索のデモ",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
