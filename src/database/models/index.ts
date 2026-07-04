import Sequelize from 'sequelize';
import sequelize from '../../configs/configSequelize';

import AuditsModel from './Audits';
import WebsitesModel from './Websites';
import AuditPagesModel from './AuditPages';
import AuditReportsModel from './AuditReports';
import AuditPageIssuesModel from './AuditPageIssues';

const Audits = AuditsModel(sequelize, Sequelize.DataTypes);
const Websites = WebsitesModel(sequelize, Sequelize.DataTypes);
const AuditPages = AuditPagesModel(sequelize, Sequelize.DataTypes);
const AuditReports = AuditReportsModel(sequelize, Sequelize.DataTypes);
const AuditPageIssues = AuditPageIssuesModel(sequelize, Sequelize.DataTypes);

const db = {
  Sequelize,
  sequelize,

  Audits,
  Websites,
  AuditPages,
  AuditReports,
  AuditPageIssues,
};

Object.values(db).forEach((model: any) => {
  if (model?.associate) model.associate(db);
});

export default db;