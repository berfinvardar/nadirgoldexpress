import { NextResponse } from "next/server";
import Order from "@/models/Order";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  try {
    await dbConnect();
    const orderData = await request.json();
    
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    
    return NextResponse.json({ 
      success: true, 
      order: savedOrder 
    }, { status: 201 });
  } catch (error) {
    console.error("Sipariş oluşturma hatası:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Sipariş oluşturulurken bir hata oluştu" 
    }, { status: 500 });
  }
} 