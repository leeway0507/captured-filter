import "./globals.css";
import type { Metadata } from "next";
import { Monda, Fugaz_One } from "next/font/google";
import GoogleAnalytics from "@/app/components/ga4/google-analytics-4";
import Script from "next/script";

const monda = Monda({ weight: ["400", "700"], subsets: ["latin"] });
const FugazeOne = Fugaz_One({ weight: ["400"], subsets: ["latin"], variable: "--test" });

export const metadata: Metadata = {
    title: "캡쳐드",
    description: "전세계 숨은 재고를 검거하는 캡쳐드! 내가 원하는 그 제품, 캡쳐드에서 먼저 찾아보세요.",
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "캡쳐드",
    alternateName: "CAPTURED",
    url: "https://we-captured.kr/",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr">
            <GoogleAnalytics GA_TRACKING_ID={process.env.GA_TRACKING_ID!} />
            <Script
                id="initID+JSON"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <body className={`${monda.className} ${FugazeOne.variable}`}>
            <main className="min-h-screen flex flex-col">
                {/* <div className="sticky top-0 z-50">
                    <NavMain />
                </div> */}
                <div className="flex flex-col h-full grow tb:pt-[60px] justify-between" id="main-body">
                    {children}
                </div>

            </main>
            </body>
        </html>
    );
}
