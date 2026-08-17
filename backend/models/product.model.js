import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },

    author: {
      type: String,
    },

    price: {
      type: Number,
    },

    currency: {
      type: String,
      default: "GBP",
    },

    imageUrl: {
      type: String,
    },

    sourceUrl: {
      type: String,
      required: true,
      unique: true,
    },

    sourceId: {
      type: String,
      unique: true,
      sparse: true,
    },

    categorySlug: {
      type: String,
      required: true,
    },

    lastScrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
