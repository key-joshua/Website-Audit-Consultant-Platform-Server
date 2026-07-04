import models from '../../../database/models';
import { getAuditVersion } from '../../../utils/globalUtils';
const { Websites, Audits, AuditPages, AuditPageIssues, AuditReports } = models;

const findAuditVersions = async (domain: string): Promise<any> => {
  return await Websites.findAll({
    where: { domain },
    include: [
      {
        order: [['created_at', 'DESC']],
        model: Audits,
        as: 'Audits',
        include: [
          {
            model: AuditPages,
            as: 'AuditPages',
            include: [
              {
                model: AuditPageIssues,
                as: 'AuditPageIssues',
              },
            ],
          },
          {
            model: AuditReports,
            as: 'AuditReports',
          },
        ],
      },
    ],
  });
};

const findAuditByPk = async (id: string) => {
  const auditVersion = await Audits.findByPk(id);
  return await Websites.findAll({
    where: { id: auditVersion.website_id },
    include: [
      {
        order: [['created_at', 'DESC']],
        model: Audits,
        as: 'Audits',
        include: [
          {
            model: AuditPages,
            as: 'AuditPages',
            include: [
              {
                model: AuditPageIssues,
                as: 'AuditPageIssues',
              },
            ],
          },
          {
            model: AuditReports,
            as: 'AuditReports',
          },
        ],
      },
    ],

  });
};

const createWebsite = async (body) => {
  await Websites.create(body);
  return await findAuditVersions(body.domain);
};

const createAudit = async (body): Promise<any> => {
  const data = { website_id: body.id, version: getAuditVersion(body.Audits), status: 'RUNNING' as const };
  return await Audits.create(data);
};

const createAuditPages = async (AuditId, body) => {
  const data = { audit_id: AuditId, status_code: body.statusCode, page: body.page, page_url: body.pageUrl, title: body.title, h1_count: body.h1, h2_count: body.h2, cta_count: body.ctaCount, internal_links_count: body.internalLinksCount, external_links_count: body.externalLinksCount, images_count: body.images, meta_desc: body.metaDescription, images_missing_alt_count: body.imagesWithoutAlt };
  return await AuditPages.create(data);
};

const createAuditPagesIssues = async (AuditPageId, body) => {
  const data = { audit_page_id: AuditPageId, issue_type: body.issue_type, severity: body.severity, message: body.message };
  return await AuditPageIssues.create(data);
};

const createAuditReports = async (AuditId, body) => {
  return await AuditReports.create({audit_id: AuditId, ...body});
};

const updateWebsiteByPk = async (id, update) => {
  await Websites.update(update, { where: { id } });
  return await Websites.findByPk(id);
};

const updateAuditByPk = async (id, update) => {
  await Audits.update(update, { where: { id } });
  return await Audits.findByPk(id);
};

export default {
  findAuditByPk,
  createWebsite,
  findAuditVersions,
  updateWebsiteByPk,
  createAudit,
  createAuditPages,
  updateAuditByPk,
  createAuditReports,
  createAuditPagesIssues
};
