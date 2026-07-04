import { QueryInterface } from 'sequelize';

const auditOne = {
  id: 'b5b6d3c5-f2cb-4fd5-87b4-0fdab2a9f111',
  website_id: '2d7a8a7f-b5b4-4f93-a61c-1b1b2c3d4e5f',
  version: 1,
  status: 'COMPLETED',
  created_at: new Date('2026-07-01T09:15:00Z'),
  updated_at: new Date('2026-07-01T09:15:00Z'),
};

const auditTwo = {
  id: 'f2bc45d8-3d14-4dc6-8dc0-92f71a9b2222',
  website_id: '8c0b1d34-6b62-4f2b-a97c-7d8e9f0a1b2c',
  version: 1,
  status: 'RUNNING',
  created_at: new Date('2026-07-02T10:45:00Z'),
  updated_at: new Date('2026-07-02T10:45:00Z'),
};

const auditThree = {
  id: '1fdb69a7-1a83-48dd-9872-cd2e7fa93333',
  website_id: '5fa6b812-91e7-45fb-b2d4-3c4d5e6f7a8b',
  version: 2,
  status: 'FAILED',
  created_at: new Date('2026-07-03T08:30:00Z'),
  updated_at: new Date('2026-07-03T08:30:00Z'),
};

module.exports = {
  async up(queryInterface: QueryInterface) { await queryInterface.bulkInsert('Audits', [ auditOne, auditTwo, auditThree ]); },
  async down(queryInterface: QueryInterface) { await queryInterface.bulkDelete('Audits', {}); },
};