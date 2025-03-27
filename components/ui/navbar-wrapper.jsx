"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const showNavbar = pathname !== "/menu";

  if (!showNavbar) return null;

  return <Navbar />;
}
