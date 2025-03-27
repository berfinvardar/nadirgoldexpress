"use client";
import Link from "next/link";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import logo from "@/public/logo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
export default function Navbar() {
  const [position, setPosition] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const duyuruMetni =
    "Türkiye'nin En Hızlı Altın Alışveriş Sitesi - nadirgoldexpress.com | 1 saat içinde kapıya özel kurye | Şimdi Sipariş Verin..";

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev <= -100 ? 100 : prev - 0.5));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <div className="fixed top-0 w-full bg-blue-900 overflow-hidden py-1 z-50">
        <div
          className="text-white text-sm font-medium tracking-wide whitespace-nowrap px-4"
          style={{
            transform: `translateX(${position}%)`,
            willChange: "transform",
            textRendering: "optimizeLegibility",
          }}
        >
          {duyuruMetni}
        </div>
      </div>

      <div className="sticky top-0 bg-white z-40">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-4">
            <Link href="/menu">
              <Menu className="text-blue-900 cursor-pointer" />
            </Link>
            <Search className="text-blue-900 mr-4" />
          </div>

          <div className="flex items-center justify-center">
            <Link href="/">
              <Image src={logo} alt="logo" width={100} height={100} />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <User
                className="text-blue-900 cursor-pointer"
                onClick={toggleProfile}
              />
            </div>
            <ShoppingCart className="text-blue-900 ml-4" />
          </div>
        </div>

        {isProfileOpen && (
          <div className="absolute right-0 left-0 mt-2 bg-white shadow-lg z-50 ">
            <div className="flex flex-col py-2 container mx-auto px-4">
              <Link
                href="/hesap/giris"
                className="px-4 py-2 hover:bg-gray-100 text-blue-900 font-medium"
                onClick={() => setIsProfileOpen(false)}
              >
                Giriş Yap
              </Link>
              <Separator />
              <Link
                href="/hesap/uye-ol"
                className="px-4 py-2 hover:bg-gray-100 text-blue-900 font-medium"
                onClick={() => setIsProfileOpen(false)}
              >
                Üye Ol
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
