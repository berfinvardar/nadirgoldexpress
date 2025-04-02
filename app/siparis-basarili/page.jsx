"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// SearchParams'ı kullanan bileşen
function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // Burada sipariş detaylarını getiren bir API çağrısı yapılabilir
      setLoading(false);
    }
  }, [orderId]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border mt-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Siparişiniz Alındı!</h1>
        <p className="text-gray-600">
          Siparişiniz başarıyla oluşturuldu. Ödemeniz onaylandıktan sonra işleme alınacaktır.
        </p>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <p className="text-center text-gray-700">
          <span className="font-medium">Sipariş Numaranız:</span> <span className="font-bold">{orderId}</span>
        </p>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-6">
          Siparişinizle ilgili güncellemeler için e-posta adresinizi kontrol edebilirsiniz.
        </p>
        <Link href="/" className="inline-block bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
          Alışverişe Devam Et
        </Link>
      </div>
    </div>
  );
}

// Yükleme durumu için fallback bileşeni
function LoadingFallback() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border mt-10 text-center">
      <div className="animate-pulse">
        <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-6"></div>
        
        <div className="h-12 bg-gray-200 rounded mb-6"></div>
        
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </div>
    </div>
  );
}

// Ana sayfa bileşeni
export default function SiparisBasarili() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Suspense fallback={<LoadingFallback />}>
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
} 