import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  price: Number,
});

export default mongoose.models.Price || mongoose.model("Price", priceSchema); 