import { URL } from 'url';
import { CheerioAPI } from 'cheerio';

export const safeNumber = (v: any) => (typeof v === 'number' ? v : 0);
const ctaTexts = [ 'contact', 'contact us', 'book', 'book now', 'buy', 'buy now', 'get started', 'learn more', 'request', 'schedule', 'sign up', 'register', 'join', 'sign in', 'login', 'subscribe', 'download', 'try', 'call now', 'inquire' ];

export const extractDomain = (req: any): string => {
  try {
    const raw = req.body?.url || req.query?.url || req.params.domain || req.params.id;
    if (typeof raw !== "string") return "unknown";
    return new URL(raw).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "unknown";
  }
};

export const normalizeUrls = async (urls: string[], baseUrl: string): Promise<string[]> => {
    const normalized = new Set<string>();

    for (const url of urls) {
        const trimmed = url.trim();
        if(trimmed.startsWith('mailto:') || trimmed.startsWith('tel:') || trimmed.startsWith('javascript:') || trimmed.startsWith('#')) continue;
        const absoluteUrl = new URL(trimmed, baseUrl).href;
        
        if (!absoluteUrl.startsWith('http')) continue;
        const urlWithoutHash = absoluteUrl.split('#')[0];
        const finalUrl = urlWithoutHash.endsWith('/') && urlWithoutHash !== baseUrl.replace(/\/$/, '') ? urlWithoutHash.slice(0, -1) : urlWithoutHash;

        normalized.add(finalUrl);
    }

  return [...normalized];
};

export const filterInternalLinks = async (urls: string[], baseUrl: string): Promise<{ websitePagesUrls: string[], auditPagesUrls: string[] }> => {
    const priorityPaths = [ '/', '/about', '/contact', '/career', '/amenities', '/performance' ];
    const baseHost = new URL(baseUrl).hostname;

    const internalLinks = [...new Set(
      urls.filter(link => {
        try {
            return new URL(link).hostname === baseHost;
        } catch {
            return false;
        }
      })
    )];

    const selected = new Set<string>();

    for (const path of priorityPaths) {
        const match = internalLinks.find(link => {
          const pathname = new URL(link).pathname.replace(/\/$/, '') || '/';
          return pathname === path;
        });

        if (match) selected.add(match);
        if (selected.size >= 5) break;
    }

    for (const link of internalLinks) {
      if (selected.size >= 5) break;
      selected.add(link);
    }

    return { websitePagesUrls: internalLinks, auditPagesUrls: [...selected] };
};

export const getAuditVersion = (audits: any[]): number => {
  if(audits.length === 0) return 1;
  const latestAudit = audits.reduce((prev, current) => (prev.createdAt > current.createdAt) ? prev : current);
  return latestAudit.version + 1;
};

export const getPageName = (pageUrl: string): string => {
    const pathname = new URL(pageUrl).pathname;

    if (pathname === '/' || pathname === '') return 'Home';
    return pathname .split('/') .filter(Boolean) .join(' / ');
};

export const countTitles = ($: CheerioAPI): number => {
  return $('title').text().trim().length > 0 ? 1 : 0;
};

export const countMetaDescriptions = ($: CheerioAPI): number => {
  const description =
    $('meta[name="description"]').attr('content') ||
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="twitter:description"]').attr('content') ||
    '';

  return description.trim().length > 0 ? 1 : 0;
};

export const countHeadings = ($: CheerioAPI, headingLevel: 'h1' | 'h2' | 'h3'): number => {
    return $(headingLevel).length;
};

export const countImages = ($: CheerioAPI): number => {
    return $('img').length;
};

export const countImagesWithoutAlt = ($: CheerioAPI): number => {
    const count = $('img').filter((_, img) => { const alt = $(img).attr('alt'); return !alt || alt.trim() === ''; }).length;
    return count || 0;
};

export const countCTAs = ($: CheerioAPI): number => {
    let count = 0;

    $('a, button').each((_, element) => {
        const text = $(element).text().trim().toLowerCase();
        if (ctaTexts.some(cta => text.includes(cta))) count++;
    });

    return count;
};

export const countInternalLinks = (urls: string[], baseUrl: string): number => {
  const host = new URL(baseUrl).hostname;
  return urls.filter(url => { try { return new URL(url).hostname === host; } catch { return false; } }).length || 0;
};

export const countExternalLinks = (urls: string[], baseUrl: string): number => {
    const host = new URL(baseUrl).hostname;
    return urls.filter(url => { try { return new URL(url).hostname !== host; } catch { return false; } }).length || 0;
};

export const collectAuditIssues = (analyzedPage: { title: number; metaDescription: number; h1: number; h2: number; imagesWithoutAlt: number; statusCode: number; ctaCount: number, images: number } ): { issue_type: string; severity: 'WARNING' | 'ERROR'; message: string; }[] => {
    const issues: { issue_type: string; severity: 'WARNING' | 'ERROR'; message: string; }[] = [];

    if (analyzedPage.statusCode >= 500) issues.push({ issue_type: 'SERVER_ERROR', severity: 'ERROR', message: `Page returned HTTP ${analyzedPage.statusCode}.` });
    else if (analyzedPage.statusCode >= 400) issues.push({ issue_type: 'BROKEN_PAGE', severity: 'ERROR', message: `Page returned HTTP ${analyzedPage.statusCode}.` });
    else if (analyzedPage.statusCode >= 300) issues.push({ issue_type: 'REDIRECT_PAGE', severity: 'WARNING', message: `Page returned HTTP ${analyzedPage.statusCode}.` });

    if (analyzedPage.title === 0) issues.push({ issue_type: 'MISSING_TITLE', severity: 'ERROR', message: 'The page does not contain a title tag.' });
    else if (analyzedPage.title < 20) issues.push({ issue_type: 'SHORT_TITLE', severity: 'WARNING', message: `Title is only ${analyzedPage.title} characters long.` });
    else if (analyzedPage.title > 60) issues.push({ issue_type: 'LONG_TITLE', severity: 'WARNING', message: `Title is ${analyzedPage.title} characters long.` });

    if (analyzedPage.metaDescription === 0)  issues.push({ issue_type: 'MISSING_META_DESCRIPTION', severity: 'ERROR', message: 'The page does not contain a meta description.' });
    else if (analyzedPage.metaDescription > 160) issues.push({ issue_type: 'LONG_META_DESCRIPTION', severity: 'WARNING', message: `Meta description is ${analyzedPage.metaDescription} characters.` });
    else if (analyzedPage.metaDescription < 120) issues.push({ issue_type: 'SHORT_META_DESCRIPTION', severity: 'WARNING', message: `Meta description is only ${analyzedPage.metaDescription} characters.` });
    
    if (analyzedPage.h1 === 0) issues.push({ issue_type: 'MISSING_H1', severity: 'ERROR', message: 'No H1 heading found.' });
    else if (analyzedPage.h1 > 1) issues.push({ issue_type: 'MULTIPLE_H1', severity: 'WARNING', message: `Found ${analyzedPage.h1} H1 headings.` });

    if (analyzedPage.h2 === 0) issues.push({ issue_type: 'MISSING_H2', severity: 'ERROR', message: 'No H2 heading found.' });
    else if (analyzedPage.h2 > 1) issues.push({ issue_type: 'MULTIPLE_H2', severity: 'WARNING', message: `Found ${analyzedPage.h2} H2 headings.` });

    if (analyzedPage.ctaCount === 0) issues.push({ issue_type: 'NO_CALL_TO_ACTION', severity: 'WARNING', message: 'No call-to-action found on this page.' });

    if (analyzedPage.imagesWithoutAlt > 0) issues.push({ issue_type: 'IMAGES_MISSING_ALT_TEXT', severity: 'WARNING', message: `${analyzedPage.imagesWithoutAlt} image(s) are missing alt text.` });
    if (analyzedPage.images < 1) issues.push({ issue_type: 'IMAGES_MISSING', severity: 'WARNING', message: `${analyzedPage.images} image(s). Page missing image(s).` });

    return issues;
};

export const calculateAuditScore = (pages: any[]): number => {
  let score = 100;

  for (const page of pages) {
    const metaDescription = safeNumber(page.metaDescription);
    const statusCode = safeNumber(page.statusCode);
    const title = safeNumber(page.title);
    const h1 = safeNumber(page.h1);
    const h2 = safeNumber(page.h2);
    const imagesWithoutAlt = safeNumber(page.imagesWithoutAlt);

    if (metaDescription === 0) score -= 8;
    if (statusCode >= 400) score -= 20;
    if (title === 0) score -= 10;
    if (h1 === 0) score -= 10;
    if (h2 === 0) score -= 4;

    score -= imagesWithoutAlt;
  }

  return Math.max(0, Math.round(score));
};

export const collectAuditReports = (totalWebsitePages: string[], analyzedPages: any[], auditDurationMs: number) => {
  const totalPages = totalWebsitePages.length;
  const totalAuditedPages = analyzedPages.length;
  const successfulAuditedPages = analyzedPages.filter(page => safeNumber(page.statusCode) < 400).length;
  const failedAuditedPages = totalPages - successfulAuditedPages;
  const pagesMissingTitle = analyzedPages.filter(page => safeNumber(page.title) === 0).length;
  const pagesMissingMeta = analyzedPages.filter(page => safeNumber(page.metaDescription) === 0).length;
  const pagesMissingH1 = analyzedPages.filter(page => safeNumber(page.h1) === 0).length;
  const pagesMissingH2 = analyzedPages.filter(page => safeNumber(page.h2) === 0).length;
  const totalImagesMissingAlt = analyzedPages.reduce((sum, page) => sum + safeNumber(page.imagesWithoutAlt), 0);
  const totalCTA = analyzedPages.reduce((sum, page) => sum + safeNumber(page.ctaCount), 0);
  const auditScore = calculateAuditScore(analyzedPages);
  const auditDurationSeconds = Math.round(auditDurationMs / 1000);

  return {
    total_website_pages: totalPages,
    total_audited_pages: totalAuditedPages,
    successful_audited_pages: successfulAuditedPages,
    failed_audited_pages: failedAuditedPages,
    pages_missing_title: pagesMissingTitle,
    pages_missing_meta_desc: pagesMissingMeta,
    pages_missing_h1: pagesMissingH1,
    pages_missing_h2: pagesMissingH2,
    total_images_missing_alt: totalImagesMissingAlt,
    total_cta: totalCTA,
    audit_score: auditScore,
    audit_duration_seconds: auditDurationSeconds
  };
};
