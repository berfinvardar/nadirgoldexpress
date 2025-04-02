"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react"; // Çöp kutusu ikonu
import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react"; // Modal kapatma ikonu için

export default function SepetSayfasi() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderStep, setOrderStep] = useState(1); // 1: Teslimat Bilgileri, 2: Ödeme Bilgileri
  const [orderData, setOrderData] = useState({
    customerName: "",
    customerPhone: "",
    deliveryCity: "",
    deliveryDistrict: "",
    deliveryAddress: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Ara Toplam Hesaplama
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Form değişikliklerini izleme
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value
    });
  };

  // Sipariş oluşturma
  const createOrder = async () => {
    setIsLoading(true);
    try {
      const orderPayload = {
        ...orderData,
        products: cart.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          purl: item.purl
        })),
        totalAmount: subtotal,
        status: "Ödeme Bekleniyor"
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();
      
      if (result.success) {
        setOrderId(result.order._id);
        setOrderStep(2); // Ödeme adımına geç
      } else {
        alert("Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Sipariş oluşturma hatası:", error);
      alert("Sipariş oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  // Ödeme tamamlandı işlemi
  const handlePaymentComplete = () => {
    clearCart();
    setIsModalOpen(false);
    setOrderStep(1);
    router.push(`/siparis-basarili?id=${orderId}`);
  };

  // İptal işlemi
  const handleCancel = () => {
    if (confirm("Siparişinizi iptal etmek istediğinize emin misiniz?")) {
      setIsModalOpen(false);
      setOrderStep(1);
    }
  };

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
                <span>Kurye Ücreti:</span>
                <span className="font-medium">Ücretsiz</span>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-900">Genel Toplam:</span>
              <span className="text-lg font-bold text-blue-900">{subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
            </div>
            <button 
              className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Ödemeye Geç
            </button>
          </div>
        </div>
      )}

      {/* Ödeme Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-blue-900">
                {orderStep === 1 ? "Teslimat Bilgileri" : "Ödeme Bilgileri"}
              </h2>
              <button 
                onClick={() => {
                  if (orderStep === 1) {
                    setIsModalOpen(false);
                  } else if (confirm("Bu ekranı kapatmak siparişinizi iptal edecektir. Emin misiniz?")) {
                    setIsModalOpen(false);
                    setOrderStep(1);
                  }
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {orderStep === 1 ? (
                /* Teslimat Bilgileri Formu */
                <form onSubmit={(e) => {
                  e.preventDefault();
                  createOrder();
                }} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Adı Soyadı</label>
                    <input
                      type="text"
                      name="customerName"
                      value={orderData.customerName}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded-md"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Cep Telefonu</label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={orderData.customerPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2 border rounded-md"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">İl</label>
                      <input
                        type="text"
                        name="deliveryCity"
                        value={orderData.deliveryCity}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="İl"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">İlçe</label>
                      <input
                        type="text"
                        name="deliveryDistrict"
                        value={orderData.deliveryDistrict}
                        onChange={handleInputChange}
                        required
                        className="w-full p-2 border rounded-md"
                        placeholder="İlçe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Açık Adres</label>
                    <textarea
                      name="deliveryAddress"
                      value={orderData.deliveryAddress}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full p-2 border rounded-md"
                      placeholder="Mahalle, sokak, bina no, daire no vb."
                    ></textarea>
                  </div>
                  
                  <div className="pt-4 border-t mt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-400"
                    >
                      {isLoading ? "İşleniyor..." : "Siparişi Onayla"}
                    </button>
                  </div>
                </form>
              ) : (
                /* Ödeme Bilgileri */
                <div className="space-y-6">
                  <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200 text-center">
                    <p className="text-yellow-800 font-bold mb-2">Bu ekranı lütfen kapatmayın!</p>
                    <p className="text-yellow-700">Ödemenizi tamamladıktan sonra "Ödemeyi Tamamladım" butonuna tıklayınız.</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold text-lg mb-4 text-blue-900">Sipariş Özeti</h3>
                    
                    <div className="space-y-2 mb-4">
                      {cart.map(item => (
                        <div key={item._id} className="flex justify-between text-sm">
                          <span>{item.name} x {item.quantity}</span>
                          <span>{(item.price * item.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Toplam Tutar:</span>
                      <span>{subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                    <h3 className="font-semibold text-lg mb-2 text-blue-900">Ödeme Bilgileri</h3>
                    <p className="mb-2"><span className="font-medium">Banka:</span> Türkiye İş Bankası</p>
                    <p className="mb-2"><span className="font-medium">Hesap Sahibi:</span> Şirket Adı</p>
                    <p className="mb-2 font-medium">IBAN:</p>
                    <p className="bg-white p-2 border rounded-md select-all mb-4">TR12 3456 7890 1234 5678 9012 34</p>
                    <p className="text-sm text-gray-600">
                      * Herhangi bir gecikme olmaması için lütfen dekontunuzu kaydediniz.
                    </p>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handlePaymentComplete}
                      className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-semibold"
                    >
                      Ödemeyi Tamamladım
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors font-semibold"
                    >
                      İşlemi İptal Et
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}