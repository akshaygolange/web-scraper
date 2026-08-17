import Product from "../models/product.model.js";
import { scrapeProductDetails } from "../scrapers/productDetails.scraper.js";

export const scrapeSingleProduct = async (slug) => {
  const product = await Product.findOne({ slug });

  if (!product) {
    throw new Error("Product not found");
  }

  await scrapeProductDetails(product.sourceUrl);

  return product;
};