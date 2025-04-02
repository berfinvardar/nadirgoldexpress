import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import Link from "next/link";
export default function FizikiAltin() {
    return(
        <>
        <div className="flex justify-center p-5">
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="font-bold" href="/">
                Ana Sayfa
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link className="font-bold" href="/fiziki-altin">
                Fiziki Altına Çevir
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      </div>
        <div className="h-screen flex justify-center p-5">

            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Fiziki Altın Dönüşüm İşlemleri</h1>
                <p className="text-gray-600 mb-6">Altın hesabınızdan anlık transfer ile fiziki altın dönüşümü için lütfen bizimle iletişime geçiniz.</p>
                <p className="text-gray-600 font-thin mb-6">*Güncel Kampanyamız 1'e 1 tam dönüşümdür.</p>
            </div>
            </div>
            </>)
            }
