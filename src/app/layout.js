import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "정원을 가꾸며 만드는 습관, 원해빗",
  description: "일상의 한 점을 공유하고, 목표를 달성하며 식물을 키워보세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
