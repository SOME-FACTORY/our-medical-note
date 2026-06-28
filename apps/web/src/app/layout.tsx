import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "우리의 의료 노트",
  description: "병원 방문 전후의 의료 기록을 관계 기반 그룹과 함께 정리합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
