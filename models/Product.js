import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  category: String,
  purl: String,
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
