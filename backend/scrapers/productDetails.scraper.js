import { chromium } from "playwright";

import { updateProductDetails } from "../services/productDetails.service.js";
export const scrapeProductDetails = async (url) => {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const heading = await page.locator("h1").textContent();

  console.log("Heading:", heading);

  const [title, author] = heading.split(" by ");

  console.log("Title:", title);
  console.log("Author:", author);


  
  

  const price = await page.locator("text=/£\\d+\\.\\d+/").first().textContent();

  console.log("Price:", price);
  const numericPrice = Number(price.replace("£", ""));


  const productDetails = {
    title,
    author,
    price: numericPrice,
    sourceUrl: url,
  };

  console.log(productDetails);

  await updateProductDetails(productDetails);

  console.log("Product details updated");

  

  await browser.close();
};
