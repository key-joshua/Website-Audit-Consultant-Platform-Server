import { QueryInterface } from 'sequelize';

const reportOne = {
  id: 'fa1d8d6d-5e5d-4ef0-a8f7-111111111111',
  audit_id: 'b5b6d3c5-f2cb-4fd5-87b4-0fdab2a9f111',
  total_website_pages: 3,
  total_audited_pages: 3,
  successful_audited_pages: 3,
  failed_audited_pages: 0,
  pages_missing_title: 0,
  pages_missing_meta_desc: 1,
  pages_missing_h1: 1,
  pages_missing_h2: 0,
  total_images_missing_alt: 7,
  total_cta: 6,
  audit_score: 88,
  audit_duration_seconds: 13425,
  created_at: new Date(),
  updated_at: new Date(),
};

const reportTwo = {
  id: 'fa1d8d6d-5e5d-4ef0-a8f7-222222222222',
  audit_id: 'f2bc45d8-3d14-4dc6-8dc0-92f71a9b2222',
  total_website_pages: 1,
  total_audited_pages: 1,
  successful_audited_pages: 1,
  failed_audited_pages: 0,
  pages_missing_title: 0,
  pages_missing_meta_desc: 0,
  pages_missing_h1: 0,
  pages_missing_h2: 0,
  total_images_missing_alt: 0,
  total_cta: 1,
  audit_score: 96,
  audit_duration_seconds: 7850,
  created_at: new Date(),
  updated_at: new Date(),
};

const reportThree = {
  id: 'fa1d8d6d-5e5d-4ef0-a8f7-333333333333',
  audit_id: '1fdb69a7-1a83-48dd-9872-cd2e7fa93333',
  total_website_pages: 1,
  total_audited_pages: 1,
  successful_audited_pages: 1,
  failed_audited_pages: 0,
  pages_missing_title: 1,
  pages_missing_meta_desc: 1,
  pages_missing_h1: 1,
  pages_missing_h2: 0,
  total_images_missing_alt: 6,
  total_cta: 2,
  audit_score: 61,
  audit_duration_seconds: 20154,
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  async up(queryInterface: QueryInterface) { await queryInterface.bulkInsert('AuditReports', [ reportOne, reportTwo, reportThree ]); },
  async down(queryInterface: QueryInterface) { await queryInterface.bulkDelete('AuditReports', {}); },
};