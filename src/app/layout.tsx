import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FIRE計算機 - 経済的自立・早期退職シミュレーター",
  description: "毎月の積立額・運用利回りからFIRE達成までの年数を計算できます",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
