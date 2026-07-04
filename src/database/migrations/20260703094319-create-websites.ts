import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('Websites', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      url: { type: DataTypes.STRING(2048), allowNull: false },
      domain: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      website_urls: { type: DataTypes.ARRAY(DataTypes.STRING(5000)), allowNull: true },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex('Websites', ['domain'], { name: 'idx_websites_domain' });
  },

  async down(queryInterface: QueryInterface) { await queryInterface.dropTable('Websites'); },
};
