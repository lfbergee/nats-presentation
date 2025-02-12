import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Question } from "@/lib/components/Question";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digirama slide deck",
  description: "",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dim">
      <body className={`${inter.className} antialiased`}>
        {children}
        <footer className="mx-auto max-w-[1000px] px-3 font-mono absolute bottom-0 left-0 right-0 h-20 flex items-center justify-between bg-base-300 rounded-t-2xl">
          <span>2025-02-13</span>
          <span className="hidden sm:block">Utviklingskonferansen</span>
          <Question />
        </footer>
      </body>
    </html>
  );
}
