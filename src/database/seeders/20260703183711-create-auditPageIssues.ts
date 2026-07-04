import { QueryInterface } from 'sequelize';

const issueOne = {
  id: '6f7a2b11-1111-4d6f-a111-111111111111',
  audit_page_id: 'c1a1f2d3-1111-4a11-9a11-aaaa11111111',
  issue_type: 'Missing Image Alt Text',
  severity: 'WARNING',
  message: '2 images are missing alt attributes.',
  created_at: new Date(),
  updated_at: new Date(),
};

const issueTwo = {
  id: '6f7a2b11-2222-4d6f-a222-222222222222',
  audit_page_id: 'c1a1f2d3-3333-4a33-9a33-cccc33333333',
  issue_type: 'Missing Meta Description',
  severity: 'ERROR',
  message: 'This page does not contain a meta description.',
  created_at: new Date(),
  updated_at: new Date(),
};

const issueThree = {
  id: '6f7a2b11-3333-4d6f-a333-333333333333',
  audit_page_id: 'c1a1f2d3-3333-4a33-9a33-cccc33333333',
  issue_type: 'Missing H1',
  severity: 'ERROR',
  message: 'No H1 heading was found on this page.',
  created_at: new Date(),
  updated_at: new Date(),
};

const issueFour = {
  id: '6f7a2b11-4444-4d6f-a444-444444444444',
  audit_page_id: 'c1a1f2d3-3333-4a33-9a33-cccc33333333',
  issue_type: 'Images Missing Alt Text',
  severity: 'WARNING',
  message: '4 images are missing alt attributes.',
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  async up(queryInterface: QueryInterface) { await queryInterface.bulkInsert('AuditPageIssues', [ issueOne, issueTwo, issueThree, issueFour ]); },
  async down(queryInterface: QueryInterface) { await queryInterface.bulkDelete('AuditPageIssues', {}); },
};