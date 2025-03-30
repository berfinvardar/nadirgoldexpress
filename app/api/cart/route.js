import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/Cart";
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await dbConnect();
    const cookieStore = cookies();
    let userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      return NextResponse.json({ items: [] });
    }

    const cart = await Cart.findOne({ userId }).populate('items.productId');
    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    console.error("Sepet yükleme hatası:", error);
    return NextResponse.json({ error: "Sepet yüklenirken hata oluştu" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { productId, quantity, price } = await request.json();
    
    const cookieStore = cookies();
    let userId = cookieStore.get('userId')?.value;
    
    if (!userId) {
      userId = uuidv4();
      cookies().set('userId', userId);
    }

    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    cart.updatedAt = new Date();
    await cart.save();

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Ürün ekleme hatası:", error);
    return NextResponse.json({ error: "Ürün sepete eklenirken hata oluştu" }, { status: 500 });
  }
} 