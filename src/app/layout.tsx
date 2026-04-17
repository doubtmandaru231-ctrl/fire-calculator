import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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
      <body className="min-h-full bg-gray-50 text-gray-800">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BC1L8RTG9E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BC1L8RTG9E');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
