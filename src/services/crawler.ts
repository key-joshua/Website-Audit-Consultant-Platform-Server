import { load, CheerioAPI } from 'cheerio';
import { getPageContent, extractPageUrls } from './globalServices';
import { filterInternalLinks, normalizeUrls, countTitles, countMetaDescriptions, countHeadings, countImagesWithoutAlt, countImages, countCTAs, countExternalLinks, countInternalLinks, getPageName } from '../utils/globalUtils';

export const discoverWebsitePagesUrls = async(page, websiteUrl: string): Promise<{ websitePagesUrls: string[], auditPagesUrls: string[] }> => {
     try {
        const { HTMLContentPage } = await getPageContent(page, websiteUrl);
        const websitePageUrls = await extractPageUrls(HTMLContentPage);
        if(websitePageUrls.length === 0) { throw new Error('No other pages found on the website.'); }

        const normalizedUrls = await normalizeUrls(websitePageUrls, websiteUrl);
        const { websitePagesUrls, auditPagesUrls } = await filterInternalLinks(normalizedUrls, websiteUrl);
        if(auditPagesUrls.length === 0) { throw new Error('No other pages found on the website.'); }

        return { websitePagesUrls, auditPagesUrls };
    }
    catch (error: any) {
        if ( error.message.includes('ERR_CONNECTION_TIMED_OUT') || error.message.includes('ERR_NAME_NOT_RESOLVED') || error.message.includes('ERR_CONNECTION_REFUSED') ) throw new Error('Website URL does not exist or cannot be reached.');
        throw new Error(error.message || error || 'Failed to audit website.');
    }
};

export const analyzePages = async(page, websiteUrl: string): Promise<{ statusCode: number; page: string; pageUrl: string; title: number; metaDescription: number; h1: number; h2: number; h3?: number; ctaCount: number; internalLinksCount: number; externalLinksCount: number; images: number; imagesWithoutAlt: number; }> => {
     try {
        const { HTMLContentPage, statusCode } = await getPageContent(page, websiteUrl);
        const websitePageUrls = await extractPageUrls(HTMLContentPage);
        const normalizedUrls = await normalizeUrls(websitePageUrls, websiteUrl);
        const $: CheerioAPI = load(HTMLContentPage);
        
        return {
            statusCode,
            pageUrl: websiteUrl,
            title: countTitles($),
            images: countImages($),
            ctaCount: countCTAs($),
            h1: countHeadings($, 'h1'),
            h2: countHeadings($, 'h2'),
            page: getPageName(websiteUrl),
            metaDescription: countMetaDescriptions($),
            imagesWithoutAlt: countImagesWithoutAlt($),
            internalLinksCount: countInternalLinks(normalizedUrls, websiteUrl),
            externalLinksCount: countExternalLinks(normalizedUrls, websiteUrl),
        };
    }
    catch (error: any) {
        if ( error.message.includes('ERR_CONNECTION_TIMED_OUT') || error.message.includes('ERR_NAME_NOT_RESOLVED') || error.message.includes('ERR_CONNECTION_REFUSED') ) throw new Error('Website URL does not exist or cannot be reached.');
        throw new Error(error.message || error || 'Failed to audit website.');
    }
};
