import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
export default function Footer() {
  return (
    <div className="bg-blue-950 text-orange-200 py-8 flex-row">
      <div className="container mx-auto px-4">
        {/* Logo - En üstte ve ortada */}
        <div className="flex justify-center mb-8">
          <Image src={logo} alt="logo" width={200} height={200} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
          {/* Birinci Sütun - Şirket Bilgileri */}
          <div className="text-pretty">
            <p>Nmr Elektronik Tic. ve Bil. Hiz. A.Ş.</p>
            <p>Mollafenari Mah.</p>
            <p>Şerefefendi Sokak No: 35</p>
            <p>Kat: 5 Fatih - İstanbul</p>
            <p>Vergi No: 631 716 71 36</p>
            <p>Sicil no: 870005</p>
          </div>

          {/* İkinci Sütun - Kategoriler */}
          <div className="space-y-2">
            <h2 className="font-bold mb-4">KATEGORİLER</h2>
            <Link
              href="/gram-kulce-altin"
              className="block hover:text-orange-300"
            >
              Gram Külçe Altın
            </Link>
            <Link
              href="/gram-kulce-gumus"
              className="block hover:text-orange-300"
            >
              Gram Külçe Gümüş
            </Link>
            <Link href="/ziynet-altin" className="block hover:text-orange-300">
              Ziynet Altın
            </Link>
            <Link
              href="/hesaba-altin-havale"
              className="block hover:text-orange-300"
            >
              Hesaba Altın Havale
            </Link>
            <Link
              href="/hesaptan-fiziki-altina"
              className="block hover:text-orange-300"
            >
              Hesaptan Fiziki Altına
            </Link>
          </div>

          {/* Üçüncü Sütun - Müşteri Hizmetleri */}
          <div className="space-y-2">
            <h2 className="font-bold mb-4">MÜŞTERİ HİZMETLERİ</h2>
            <p>Online Mağaza</p>
            <p>0 212 527 94 99</p>
            <p>destek@nadirgold.com</p>
          </div>

          {/* Dördüncü Sütun - Hesabım */}
          <div className="space-y-2">
            <h2 className="font-bold mb-4">HESABIM</h2>
            <Link
              href="/uyelik-bilgilerim"
              className="block hover:text-orange-300"
            >
              Üyelik Bilgilerim
            </Link>
            <Link href="/siparislerim" className="block hover:text-orange-300">
              Siparişlerim
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
