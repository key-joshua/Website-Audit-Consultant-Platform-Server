import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Audits', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      website_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Websites', key: 'id' }, onDelete: 'CASCADE' },
      version: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      status: { type: DataTypes.ENUM('RUNNING', 'COMPLETED', 'FAILED'), allowNull: false, defaultValue: 'RUNNING' },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex('Audits', ['website_id'], { name: 'idx_audits_website_id' });
  },

  async down(queryInterface: QueryInterface) { await queryInterface.dropTable('Audits'); },
};