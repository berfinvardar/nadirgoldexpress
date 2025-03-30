"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ZiynetAltin() {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, priceResponse] = await Promise.all([
          fetch("/api/products?category=ziynet"),
          fetch("/api/price")
        ]);

        const productsData = await productsResponse.json();
        const priceData = await priceResponse.json();

        setProducts(productsData);
        setPrice(priceData.price);
      } catch (error) {
        console.error("Veri yüklenirken hata oluştu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 mt-4">
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
              <Link className="font-bold" href="/ziynet">
                Ziynet Altın
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-0 mt-6">
        {products.map((product) => (
          <div key={product._id} className="rounded-lg p-4 text-center">
            <Link
              href={`/product/${product.name.toLowerCase().replace(/ /g, "-")}`}
            >
              <div className="relative h-40 md:h-48 lg:h-56 w-full mb-4 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                <Image
                  src={`/images/${product.purl}`}
                  alt={product.name}
                  fill
                  style={{ borderRadius: "0.75rem" }}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-blue-900 font-bold mb-2 text-xl mt-4">
                {price ? `${(price * product.weight).toLocaleString('tr-TR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} TL` : 'Yükleniyor...'}
              </p>
            </Link>
            <Link
              href={`/product/${product.name.toLowerCase().replace(/ /g, "-")}`}
            >
              <button className="bg-white text-blue-900 border-gray-300 p-1 border-2 w-full rounded-sm hover:bg-blue-50 transition-colors">
                Sepete Ekle
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
