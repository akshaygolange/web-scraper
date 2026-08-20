import express from "express";
import Product from "../models/product.model.js";
import {
  scrapeSingleProduct,
  scrapeAllProducts,
} from "../services/productScraping.service.js";

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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.author) {
      filter.author = {
        $regex: req.query.author,
        $options: "i",
      };
    }
    if (req.query.search) {
      filter.$or = [
        {
          title: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          author: {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ];
    }

    const { minPrice, maxPrice } = req.query;

    // Validate minPrice
    if (minPrice !== undefined && isNaN(Number(minPrice))) {
      return res.status(400).json({
        success: false,
        message: "minPrice must be a valid number",
      });
    }

    // Validate maxPrice
    if (maxPrice !== undefined && isNaN(Number(maxPrice))) {
      return res.status(400).json({
        success: false,
        message: "maxPrice must be a valid number",
      });
    }

    // Validate negative values
    if (minPrice !== undefined && Number(minPrice) < 0) {
      return res.status(400).json({
        success: false,
        message: "minPrice cannot be negative",
      });
    }

    if (maxPrice !== undefined && Number(maxPrice) < 0) {
      return res.status(400).json({
        success: false,
        message: "maxPrice cannot be negative",
      });
    }

    // Validate range
    if (
      minPrice !== undefined &&
      maxPrice !== undefined &&
      Number(minPrice) > Number(maxPrice)
    ) {
      return res.status(400).json({
        success: false,
        message: "minPrice cannot be greater than maxPrice",
      });
    }

    // Build price filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};

      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const sort = {};

    if (req.query.sort) {
      if (req.query.sort === "price") {
        sort.price = 1;
      } else if (req.query.sort === "-price") {
        sort.price = -1;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid sort value. Use price or -price.",
        });
      }
    }
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
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


router.post("/scrape-all", (req, res) => {
  // Start scraping in the background
  scrapeAllProducts()
    .then((summary) => {
      console.log("All products scraped:", summary);
    })
    .catch((error) => {
      console.error("Scrape all failed:", error.message);
    });

  // Respond immediately
  res.json({
    success: true,
    message: "Scraping started",
  });
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
