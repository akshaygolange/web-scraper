import { chromium } from "playwright";

export const createBrowser = async () => {
  const browser = await chromium.launch({
    headless: false,
  });

  return browser;
};