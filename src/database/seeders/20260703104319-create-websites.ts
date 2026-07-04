import { QueryInterface } from 'sequelize';

const websiteOne = {
  id: '2d7a8a7f-b5b4-4f93-a61c-1b1b2c3d4e5f',
  url: 'https://blissagency.it',
  domain: 'blissagency.it',
  website_urls: [
    'https://blissagency.it/',
    'https://blissagency.it/about',
  ],
  created_at: new Date('2026-07-01T09:00:00Z'),
  updated_at: new Date('2026-07-01T09:00:00Z'),
};

const websiteTwo = {
  id: '8c0b1d34-6b62-4f2b-a97c-7d8e9f0a1b2c',
  url: 'https://openai.com',
  domain: 'openai.com',
  website_urls: [
    'https://openai.com/',
    'https://openai.com/about',
  ],
  created_at: new Date('2026-07-02T10:30:00Z'),
  updated_at: new Date('2026-07-02T10:30:00Z'),
};

const websiteThree = {
  id: '5fa6b812-91e7-45fb-b2d4-3c4d5e6f7a8b',
  url: 'https://github.com',
  domain: 'github.com',
  website_urls: [
    'https://github.com/',
    'https://github.com/about',
  ],
  created_at: new Date('2026-07-03T08:15:00Z'),
  updated_at: new Date('2026-07-03T08:15:00Z'),
};

module.exports = {
  async up(queryInterface: QueryInterface) { await queryInterface.bulkInsert('Websites', [ websiteOne, websiteTwo, websiteThree ]); },
  async down(queryInterface: QueryInterface) { await queryInterface.bulkDelete('Websites', {}); },
};