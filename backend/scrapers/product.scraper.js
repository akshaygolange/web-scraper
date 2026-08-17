import { chromium } from "playwright";
import Product from "../models/product.model.js";

export const scrapeProducts = async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(
    "https://www.worldofbooks.com/en-gb/pages/romance-books",
    {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    }
  );

  const products = await page.locator("img[alt]").evaluateAll((imgs) =>
    imgs.slice(1, 21).map((img) => ({
      title: img.alt,
      imageUrl: img.src,
      sourceUrl: img.closest("a")?.href,
      slug: img.closest("a")?.href.split("/").pop(),
    }))
  );

  console.log(products[0].length);
  console.log(products[0]);

  // Save products to MongoDB
  for (const product of products) {
    await Product.updateOne(
      { sourceUrl: product.sourceUrl },
      { $set: product },
      { upsert: true }
    );
  }

  console.log("Products saved successfully");

  await browser.close();
};