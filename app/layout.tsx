import type { Metadata } from "next";
import { Chakra_Petch, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "신림신기.gg — 소환사 전적 검색",
  description: "리그 오브 레전드 소환사 전적을 분석하고 승리를 설계하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      data-theme="dark"
      className={`${chakraPetch.variable} ${jakartaSans.variable} h-full`}
    >
      {/* FOUC 방지: 렌더 전에 localStorage 테마를 즉시 적용 */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
