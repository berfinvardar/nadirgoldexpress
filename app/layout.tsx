import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/ui/navbar-wrapper";
import FooterWrapper from "@/components/ui/footer-wrapper";
import { CartProvider } from '@/context/CartContext'; // CartProvider'ı import et

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nadir Gold Express",
  description: "Türkiye'deki en hızlı ve güvenli altın teslimatı",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
        <NavbarWrapper />
        {children}
        <FooterWrapper />
        </CartProvider>
      </body>
    </html>
  );
}
