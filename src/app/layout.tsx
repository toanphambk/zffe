"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/redux/provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} >
        <main>
          <AntdRegistry>
            <Providers>
              {children}
            </Providers>
          </AntdRegistry>
        </main>
      </body>
    </html>
  );
}
