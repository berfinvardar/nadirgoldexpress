// Bu dosya artık bir Server Component olacak
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import Price from "@/models/Price";
import UrunDetayClient from "./UrunDetayClient"; // Client Component'i import et

// Sunucu tarafında ürün verisini al
async function getProductData(urunAdi) {
  await dbConnect();
  const searchName = decodeURIComponent(urunAdi).replace(/-/g, ' ');

  const [product, priceDoc] = await Promise.all([
    Product.findOne({
      name: new RegExp('^' + searchName + '$', 'i')
    }),
    Price.findOne({})
  ]);

  if (!product || !priceDoc) {
    return null;
  }

  const productData = JSON.parse(JSON.stringify(product));
  const calculatedPrice = (priceDoc.price * productData.weight).toFixed(2);

  return {
    ...productData,
    calculatedPrice
  };
}

export default async function UrunDetay({ params }) {
  const product = await getProductData(params.urunAdi);

  if (!product) {
    return <div className="container mx-auto p-4 text-center">Ürün bulunamadı veya yüklenirken bir hata oluştu.</div>;
  }

  // Client Component'e ürün verisini prop olarak geç
  return <UrunDetayClient product={product} />;
}
