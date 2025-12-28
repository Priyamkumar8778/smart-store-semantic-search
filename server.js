import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import Item from "./models/Item.js";
import { getEmbedding } from "./utils/embedding.js";
import { cosineSimilarity } from "./utils/similarity.js";
import { extractPrice } from "./utils/priceExtractor.js";
import { extractCategory } from "./utils/categoryExtractor.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

// add items
app.post("/items", async (req, res) => {
  const { name, category, price } = req.body;

  if (!name || !category || !price) {
    return res.status(400).json({ error: "All fields required" });
  }

  const text = `${name} ${category} price ${price} rupees`;
  const embedding = await getEmbedding(text);

  const item = await Item.create({
    name,
    category,
    price,
    embedding,
  });

  res.json({ message: "Item added", item });
});

// search items
app.post("/search", async (req, res) => {
  const { query } = req.body;

  const queryEmbedding = await getEmbedding(query);
  const priceLimit = extractPrice(query);
  const categoryFilter = extractCategory(query);

  const items = await Item.find();

  const results = items
    .filter(
      (item) =>
        (!priceLimit || item.price <= priceLimit) &&
        (!categoryFilter ||
          item.category.toLowerCase() === categoryFilter.toLowerCase())
    )
    .map((item) => ({
      name: item.name,
      category: item.category,
      price: item.price,
      score: cosineSimilarity(queryEmbedding, item.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  res.json({ results });
});

// start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
