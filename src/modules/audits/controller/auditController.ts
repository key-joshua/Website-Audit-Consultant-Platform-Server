import StatusCodes from 'http-status-codes';
import responseUtils from '../../../utils/responseUtils';
import auditRepository from '../repository/auditRepository';
import { launchBrowser } from '../../../services/globalServices';
import { analyzePages, discoverWebsitePagesUrls } from '../../../services/crawler';
import { collectAuditIssues, collectAuditReports } from '../../../utils/globalUtils';

const getWebsiteAuditVersions = async (req, res) => {
  try {
    const auditVersions = await auditRepository.findAuditVersions(req.params.domain);
    responseUtils.handleSuccess(StatusCodes.OK, 'Audit versions found successfully.', auditVersions);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const getWebsiteAuditVersion = async (req, res) => {
  try {
    const auditVersion = await auditRepository.findAuditByPk(req.params.id);
    responseUtils.handleSuccess(StatusCodes.OK, 'Audit version found successfully.', auditVersion);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
};

const auditWebsite = async (req, res) => {
  const browser = await launchBrowser();
  const ctx = await browser.newContext();
  const page = await ctx.newPage();

  try {
    const { websitePagesUrls, auditPagesUrls } = await discoverWebsitePagesUrls(page, req.body.url);
    await auditRepository.updateWebsiteByPk(req.body.id, { website_urls: websitePagesUrls });
    const audit = await auditRepository.createAudit(req.body);
    const analyzedPages = [];

    for (const pageUrl of auditPagesUrls) {
        const analyzedPage = await analyzePages(page, pageUrl);
        const collectedAuditIssues = await collectAuditIssues(analyzedPage);
        const auditPage = await auditRepository.createAuditPages(audit.id, analyzedPage);

        for (const issue of collectedAuditIssues) {
            await auditRepository.createAuditPagesIssues(auditPage.id, issue);
        }

        analyzedPages.push(analyzedPage);
    }

    const collectedAuditReport = await collectAuditReports(websitePagesUrls, analyzedPages, (Date.now() - audit.created_at) + 5000);
    await auditRepository.createAuditReports(audit.id, collectedAuditReport);
    await auditRepository.updateAuditByPk(audit.id, { status: 'COMPLETED' });
    const websiteAudit = await auditRepository.findAuditByPk(audit.id);
    
    responseUtils.handleSuccess(StatusCodes.OK, 'Website audited successfully.', websiteAudit);
    return responseUtils.response(res);
  } catch (error: any) {
    responseUtils.handleError(StatusCodes.INTERNAL_SERVER_ERROR, error.message || 'Internal Server Error');
    return responseUtils.response(res);
  }
  finally {
    await page.close();
    console.log("🛑 WINDOW PAGE CLOSED");
    await ctx.close();
    console.log("🛑 WINDOW PAGE CTX CLOSED");
    await browser.close();
    console.log("🛑 BROWSER CLOSED");
  }
};

export default {
  getWebsiteAuditVersions,
  getWebsiteAuditVersion,
  auditWebsite
};
