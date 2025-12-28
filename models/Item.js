import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  embedding: [Number],
});

export default mongoose.model("Item", itemSchema);
