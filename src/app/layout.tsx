import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "지출 관리 앱",
  description: "간단한 지출 관리 애플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={roboto.className}>
      <body className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
        {children}
      </body>
    </html>
  );
}
