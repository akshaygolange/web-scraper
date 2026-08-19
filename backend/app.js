import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";

import navigationRoutes from "./routes/navigation.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

console.log("CORS CLIENT_URL:", process.env.CLIENT_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/navigation", navigationRoutes);

console.log("Product routes loaded");

app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server Running",
  });
});

export default app;