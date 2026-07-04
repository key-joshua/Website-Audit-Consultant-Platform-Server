import { load, CheerioAPI } from 'cheerio';
import { chromium, Browser } from 'playwright';

export const launchBrowser = async () => {
    return await chromium.launch({ headless: true });
};

export const getPageContent = async (browser: Browser, websiteUrl: string): Promise<{ HTMLContentPage: string; statusCode: number }> => {
  const page = await browser.newPage();

  const response = await page.goto(websiteUrl, { waitUntil: 'domcontentloaded', timeout: 60000, });
  const HTMLContentPage = await page.content();
  const statusCode = response?.status() ?? 0;

  await page.close();
  return { HTMLContentPage, statusCode };
};

export const extractPageUrls = async (html: string): Promise<string[]> => {
    const $: CheerioAPI = load(html);
    return $('a').map((_, element) => $(element).attr('href')).get().filter(Boolean);
};
