import express from "express";
import Product from "../models/product.model.js";
import { scrapeSingleProduct } from "../services/productScraping.service.js";

console.log("product.routes.js loaded");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Product route works",
  });
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/check", async (req, res) => {
  const product = await Product.findOne();

  console.log(product);

  res.json(product);
});



// Get product by slug
router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


router.post("/:slug/scrape", async (req, res) => {
  try {
    await scrapeSingleProduct(req.params.slug);

    res.json({
      success: true,
      message: "Product scraped successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;