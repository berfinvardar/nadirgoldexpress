import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/ui/navbar-wrapper";
import FooterWrapper from "@/components/ui/footer-wrapper";
import { CartProvider } from '@/context/CartContext';
import Image from "next/image";
import ChatwootWidget from "@/components/ui/ChatwootWidget";

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
          <div className="md:hidden">
            <NavbarWrapper />
            {children}
            <FooterWrapper />
            <ChatwootWidget />
          </div>
          <div className="hidden md:flex bg-blue-950 items-center justify-center h-screen">
            <div className="text-center flex flex-col items-center justify-center">
              <Image src="/logo.svg" alt="Nadir Gold Express" width={200} height={200} />
              <h1 className="text-3xl text-orange-300 font-bold mb-4">Şimdilik sadece mobil cihazlarda hizmet vermekteyiz.</h1>
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
