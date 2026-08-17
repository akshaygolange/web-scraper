import mongoose from "mongoose";

const navigationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    lastScrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Navigation = mongoose.model("Navigation", navigationSchema);

export default Navigation;