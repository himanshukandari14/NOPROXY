import type { Metadata } from "next";

import "./globals.css";
import { Inter as FontSans } from "next/font/google"


export const metadata: Metadata = {
  title: "Noproxy",
  description: "A Face detection Automated attendance system",
};
import { cn } from "@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-[#000000] text-white font-sans antialiased",
          fontSans.variable
        )}>{children}</body>
    </html>
  );
}
