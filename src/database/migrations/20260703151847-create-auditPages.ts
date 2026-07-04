import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('AuditPages', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      audit_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Audits', key: 'id' }, onDelete: 'CASCADE' },
      page: { type: DataTypes.STRING(255), allowNull: false },
      page_url: { type: DataTypes.STRING(2048), allowNull: false },
      status_code: { type: DataTypes.INTEGER, allowNull: false },
      title: { type: DataTypes.STRING(500), allowNull: true },
      meta_desc: { type: DataTypes.STRING(1000), allowNull: true },
      h1_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      h2_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      cta_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      internal_links_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      external_links_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      images_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      images_missing_alt_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex('AuditPages', ['audit_id'], { name: 'idx_audit_pages_audit_id' });
  },

  async down(queryInterface: QueryInterface) { await queryInterface.dropTable('AuditPages');},
};