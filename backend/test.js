import "dotenv/config";

// import { scrapeHomePage } from "./scrapers/worldofbooks.scraper.js";
import connectDB from './config/db.js';
await connectDB()
// scrapeHomePage();

// import Product from "./models/product.model.js";

// console.log(Product.modelName);

// import { scrapeProducts } from "./scrapers/product.scraper.js";
import { scrapeSingleProduct } from "./services/productScraping.service.js";

await scrapeSingleProduct(
  "daisy-chain-flower-shop-book-laurie-gilmore-9780008761479"
);

// await scrapeProducts();