import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  price: Number,
  usdt: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Price || mongoose.model("Price", priceSchema); 