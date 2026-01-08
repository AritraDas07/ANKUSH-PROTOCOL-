import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "ANKUSH | Protocol Command Center",
  description: "Advanced AI Payment Protocol Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-obsidian text-white`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
