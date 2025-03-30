import dbConnect from "@/lib/dbConnect";
import Price from "@/models/Price";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const price = await Price.findOne({}).sort({ timestamp: -1 });
    
    if (!price) {
      return NextResponse.json({ error: "Fiyat bulunamadı" }, { status: 404 });
    }

    return NextResponse.json({ price: price.price });
  } catch (error) {
    console.error("Fiyat getirme hatası:", error);
    return NextResponse.json({ error: "Sunucu hatası" }, { status: 500 });
  }
}