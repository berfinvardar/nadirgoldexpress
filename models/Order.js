import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  deliveryCity: String,
  deliveryDistrict: String,
  deliveryAddress: String,
  products: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      purl: String
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "Ödeme Bekleniyor"
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema); 