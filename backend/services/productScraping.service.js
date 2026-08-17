import Product from "../models/product.model.js";
import { scrapeProductDetails } from "../scrapers/productDetails.scraper.js";
import { createBrowser } from "../scrapers/browser.js";

export const scrapeSingleProduct = async (slug) => {
  const product = await Product.findOne({ slug });

  if (!product) {
    throw new Error("Product not found");
  }

  const browser = await createBrowser();
  const page = await browser.newPage();

  try {
    await scrapeProductDetails(page, product.sourceUrl);

    return product;
  } finally {
    await browser.close();
  }
};

export const scrapeAllProducts = async () => {
  const products = await Product.find();

  console.log(`Total products: ${products.length}`);

  const browser = await createBrowser();
  const page = await browser.newPage();

  const results = [];

  try {
    for (const product of products) {
      try {
        console.log(`Scraping: ${product.title}`);

        await scrapeProductDetails(page, product.sourceUrl);

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
  } finally {
    await browser.close();
  }
};