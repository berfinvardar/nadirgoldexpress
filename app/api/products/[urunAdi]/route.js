import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import Price from '@/models/Price';

// GET isteğini işleyen fonksiyon
export async function GET(request, { params }) {
  try {
    // Veritabanı bağlantısını sağla
    await dbConnect();

    // URL'den ürün adını al (örn: /api/products/1-gram-altin)
    const urunAdi = params.urunAdi;
    // URL'deki formatı (tireli) veritabanındaki formata (boşluklu) çevir
    // ve URL decode et (örn: %20 gibi karakterleri boşluğa çevirir)
    const searchName = decodeURIComponent(urunAdi).replace(/-/g, ' ');

    // Veritabanından ürünü ve genel fiyat bilgisini aynı anda çek
    const [product, priceDoc] = await Promise.all([
      Product.findOne({
        // Büyük/küçük harf duyarsız tam eşleşme için RegExp kullan
        name: new RegExp('^' + searchName + '$', 'i')
      }),
      Price.findOne({}) // Tek fiyat belgesini al
    ]);

    // Ürün veya fiyat bilgisi bulunamazsa 404 hatası döndür
    if (!product || !priceDoc) {
      return NextResponse.json({ message: 'Ürün bulunamadı' }, { status: 404 });
    }

    // Mongoose objesini düz JavaScript objesine çevir
    const productData = JSON.parse(JSON.stringify(product));
    // Ürünün ağırlığına göre fiyatını hesapla
    const calculatedPrice = (priceDoc.price * productData.weight).toFixed(2);

    // Ürün bilgileri ve hesaplanmış fiyatı içeren JSON yanıtı döndür
    return NextResponse.json({
      ...productData,
      calculatedPrice
    });
  } catch (error) {
    // Hata olursa konsola yazdır ve 500 sunucu hatası döndür
    console.error("API Ürün getirme hatası:", error);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
