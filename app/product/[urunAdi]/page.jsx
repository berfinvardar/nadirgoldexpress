import { notFound } from "next/navigation";
import Image from "next/image";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import Price from "@/models/Price";

async function getProduct(urunAdi) {
  try {
    await dbConnect();
    // URL decode edip tireleri boşluğa çevirelim
    const searchName = decodeURIComponent(urunAdi).replace(/-/g, ' ');
    console.log("Aranan ürün adı:", searchName);
    
    // Tüm ürünleri kontrol edelim
    const allProducts = await Product.find({});
    console.log("Veritabanındaki tüm ürünler:", allProducts.map(p => p.name));
    
    // Case-insensitive arama için RegExp kullanıyoruz
    const [product, priceDoc] = await Promise.all([
      Product.findOne({ 
        name: new RegExp('^' + searchName + '$', 'i') 
      }),
      Price.findOne({})  // Fiyat bilgisini al
    ]);
    
    if (!product || !priceDoc) return null;
    
    const productData = JSON.parse(JSON.stringify(product));
    const calculatedPrice = (priceDoc.price * productData.weight).toFixed(2);
    
    return {
      ...productData,
      calculatedPrice
    };
  } catch (error) {
    console.error("Ürün getirme hatası:", error);
    return null;
  }
}

export default async function UrunDetay({ params }) {
  const product = await getProduct(params.urunAdi);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg ">
        <div className="mb-8 relative w-full h-[400px]">
          <Image
            src={`/images/${product.purl}`}
            alt={product.name}
            fill
            className="object-contain rounded-lg"
            priority
          />
        </div>
        
        <h1 className="text-2xl text-blue-900 font-medium mb-8 -mt-4">{product.name}</h1>
        
        <div>
          <span className="text-blue-900 text-xl">
            <span className="font-normal">Anlık Fiyatı:</span> <span className="font-bold">{parseFloat(product.calculatedPrice).toLocaleString('tr-TR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} TL</span>
          </span>
        </div>
        
        <div className="flex gap-2 mt-4">
          <input
            type="number"
            min="1"
            max="99"
            defaultValue="1"
            className="w-20 p-1 border-2 border-gray-300 rounded-sm text-center"
          />
          <button className="bg-blue-900 text-white p-2 flex-1 rounded-md">
            Sepete Ekle
          </button>
        </div>
        <div>
          <p className="mt-8 text-gray-700">
            <br />* Nadir Metal Rafineri'sinin ürettiği gram altını tüm Türkiye'de sarraf, kuyumcu ve döviz bürolarından istediğiniz an nakit paraya çevirebilirsiniz.
            <br />
            <br />* Altın fiyatları dünya altın borsasındaki değişikliklere göre güncellenmektedir. Bu nedenle altın siparişleri kesin sipariştir, herhangi bir nedenden dolayı iptal veya iade edilemez. Ürün ile ilgili üretim kusuru olması durumunda yenisi ile değiştirilecektir. Sipariş veren kişi bu şartları kabul etmiş sayılır.
            <br /><br />* Ürünlerin değer kaybına uğramaması ve uzun süre sağlıklı saklanabilmesi için sertifikasından (paketinden) çıkarılmaması önerilir.
            <br /><br />* Satın aldığınız ürünler özel anlaşmalı ve sigortalı gönderi şirketi ile güvenle gönderilmektedir. <strong>Siparişiniz, siz teslim alana kadar NadirGoldExpress güvencesi altındadır.</strong>
            <br /><br />* Hafta içi saat 19:00'a kadar verilen siparişler, aynı gün sigortalı kurye şirketine teslim edilir. Resmi tatil, ve hafta sonları da dahil olmak üzere aynı gün teslimat garantisi vermekteyiz. Teslimat süreleri bulunduğunuz il ve ilçeye göre 2 veya 3 saat olarak değişiklik gösterebilir.
          </p>
        </div>
      </div>
    </div>
  );
}
