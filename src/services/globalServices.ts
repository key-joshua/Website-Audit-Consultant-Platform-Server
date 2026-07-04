import { load, CheerioAPI } from 'cheerio';
import { chromium, Browser } from 'playwright';

export const launchBrowser = async () => {
  return chromium.launch({ headless: true, args: [ '--no-sandbox', '--disable-setuid-sandbox' ] });
};

export const getPageContent = async ( browser: Browser, websiteUrl: string ) => {
    const page = await browser.newPage();
    try {
      const response = await page.goto(websiteUrl, { waitUntil: "domcontentloaded", timeout: 30000 });
      return { HTMLContentPage: await page.content(), statusCode: response?.status() ?? 0 };
    } finally {
      await page.close();
    }

};

export const extractPageUrls = async (html: string): Promise<string[]> => {
    const $: CheerioAPI = load(html);
    return $('a').map((_, element) => $(element).attr('href')).get().filter(Boolean);
};
