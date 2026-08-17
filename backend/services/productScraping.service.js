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

export const scrapeAllProducts = async () => {
  const products = await Product.find();

  console.log(`Total products: ${products.length}`);

  const results = [];

  for (const product of products) {
    try {
      console.log(`Scraping: ${product.title}`);

      await scrapeProductDetails(product.sourceUrl);

      results.push({
        title: product.title,
        success: true,
      });
    } catch (error) {
      console.log(`Failed: ${product.title}`);
      console.log(error.message);

      results.push({
        title: product.title,
        success: false,
        error: error.message,
      });
    }
  }

  return results;
};