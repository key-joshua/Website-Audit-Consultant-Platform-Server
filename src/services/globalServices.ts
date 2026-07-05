import { load, CheerioAPI } from 'cheerio';
import { chromium } from 'playwright';

let pageCounter = 0;
pageCounter++;

export const launchBrowser = async () => {
  console.log("🚀 BROWSER LAUNCHED");
  return chromium.launch({ headless: true });
};

export const getPageContent = async (page, websiteUrl: string) => {
  pageCounter++;
  console.log(`📄 Visiting page ${pageCounter}: ${websiteUrl}`);
  const response = await page.goto(websiteUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
  return { HTMLContentPage: await page.content(), statusCode: response?.status() ?? 0 };
};

export const extractPageUrls = async (html: string): Promise<string[]> => {
    const $: CheerioAPI = load(html);
    return $('a').map((_, element) => $(element).attr('href')).get().filter(Boolean);
};
