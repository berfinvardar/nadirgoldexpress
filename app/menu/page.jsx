import { Separator } from "@/components/ui/separator";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function Menu() {
  const menuItems = [
    "GRAM KÜLÇE ALTIN",
    "ZİYNET ALTIN",
    "HESABA ALTIN HAVALE",
    "HESAPTAN FİZİKİ ALTINA",
  ];

  return (
    <div className="h-screen w-full bg-blue-950 flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <Link href="/">
          <Image
            src={Logo}
            alt="logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </Link>
        <Link href="/">
          <X
            strokeWidth={1}
            className="text-white cursor-pointer mr-4 h-8 w-8"
          />
        </Link>
      </div>

      <div className="flex flex-col mt-16">
        {menuItems.map((item, index) => (
          <div key={index}>
            <button className="w-full text-left">
              <h1 className="text-white font-sans text-xl p-4 hover:bg-blue-900 transition-colors">
                {item}
              </h1>
            </button>
            <div className="px-4">
              <Separator className="bg-blue-400 h-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
