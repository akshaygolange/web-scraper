import { chromium } from "playwright";
import Category from "../models/category.model.js";

export const scrapeHomePage = async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://www.worldofbooks.com", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });

 const links = await page.locator("a").evaluateAll((elements) =>
  elements.map((el) => ({
    text: el.textContent?.trim(),
    href: el.href,
  }))
);

const categories = links.filter(
  (item) =>
    item.text &&
    item.href &&
    item.href.includes("/collections/")
);

const uniqueCategories = [
  ...new Map(
    categories.map((item) => [item.href, item])
  ).values(),
];

console.log("Total Categories:", uniqueCategories.length);

console.log(uniqueCategories.slice(0, 20));


const formattedCategories = uniqueCategories.map((item) => ({
  title: item.text,
  slug: item.href.split("/").pop(),
  sourceUrl: item.href,
}));

console.log(formattedCategories.slice(0, 10));

console.log("Before Insert");

const result = await Category.insertMany(formattedCategories, {
  ordered: false,
});

console.log("Inserted:", result.length);

const count = await Category.countDocuments();

console.log("Total in DB:", count);
};
