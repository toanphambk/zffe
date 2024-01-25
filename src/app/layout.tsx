"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body  suppressHydrationWarning={true} >
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
