import { Separator } from "@/components/ui/separator";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

export default function Menu() {
  const menuItems = [
    {
      title: "GRAM KÜLÇE ALTIN",
      href: "/kulce-altin",
    },
    {
      title: "ZİYNET ALTIN",
      href: "/",
    },
    {
      title: "HESABA ALTIN HAVALE",
      href: "/",
    },
    {
      title: "HESAPTAN FİZİKİ ALTINA",
      href: "/",
    },
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
            <Link href={item.href}>
              <h1 className="text-white font-sans text-xl p-4 hover:bg-blue-900 transition-colors">
                {item.title}
              </h1>
            </Link>
            <div className="px-4">
              <Separator className="bg-blue-400 h-0.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
