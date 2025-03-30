"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react"; // Çöp kutusu ikonu

export default function SepetSayfasi() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Ara Toplam Hesaplama
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Miktar Değiştirme Handler'ı
  const handleQuantityChange = (id, newQuantity) => {
    const quantityNum = parseInt(newQuantity, 10);
    if (newQuantity === '' || !isNaN(quantityNum)) {
      updateQuantity(id, quantityNum || 0); // Boşsa 0 olarak günceller
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-semibold text-blue-900 mb-6">Alışveriş Sepetim</h1>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">Sepetiniz şu anda boş.</p>
          <Link href="/" className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors">
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sepet Ürünleri Listesi */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex items-center gap-4">
                  <Link href={`/product/${item.name ? item.name.toLowerCase().replace(/ /g, '-') : 'unknown'}`}>
                    <Image
                      src={`/images/${item.purl}`}
                      alt={item.name || 'Ürün'}
                      width={80}
                      height={80}
                      className="object-contain rounded"
                    />
                  </Link>
                  <div>
                    <Link href={`/product/${item.name ? item.name.toLowerCase().replace(/ /g, '-') : 'unknown'}`} className="text-lg font-medium text-blue-900 hover:underline">
                      {item.name || 'Bilinmeyen Ürün'}
                    </Link>
                    <p className="text-sm text-gray-600">
                      Birim Fiyat: {item.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   {/* Miktar Input */}
                   <input
                    type="number"
                    min="1"
                    max="99" // Gerekirse stok kontrolü eklenebilir
                    defaultValue={item.quantity}
                    onBlur={(e) => handleQuantityChange(item._id, e.target.value)}
                    className="w-16 p-1 border rounded text-center"
                  />
                  {/* Toplam Fiyat */}
                   <p className="text-md font-semibold w-24 text-right">
                    {(item.price * item.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                  </p>
                  {/* Silme Butonu */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Ürünü Sil"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
             {/* Sepeti Boşalt Butonu */}
             <div className="text-right mt-4">
                <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:underline"
                >
                    Sepeti Boşalt
                </button>
            </div>
          </div>

          {/* Sepet Özeti */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm border h-fit sticky top-24"> {/* sticky top eklendi */}
            <h2 className="text-xl font-semibold text-blue-900 mb-4 border-b pb-2">Sipariş Özeti</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Ara Toplam:</span>
                <span className="font-medium">{subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
              {/* Kargo, İndirim vb. eklenebilir */}
              <div className="flex justify-between text-gray-600">
                <span>Kargo:</span>
                <span className="font-medium">Hesaplanacak</span>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-900">Genel Toplam:</span>
              <span className="text-lg font-bold text-blue-900">{subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
            </div>
            <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-semibold">
              Ödemeye Geç
            </button>
          </div>
        </div>
      )}
    </div>
  );
}