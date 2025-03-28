import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    await dbConnect();

    const query = category ? { category } : {};
    const products = await Product.find(query);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Ürün getirme hatası:", error);
    return NextResponse.json(
      { error: "Ürünler yüklenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
