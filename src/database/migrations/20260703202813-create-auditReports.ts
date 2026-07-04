import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('AuditReports', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      audit_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'Audits', key: 'id' }, onDelete: 'CASCADE' },
      total_website_pages: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      total_audited_pages: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      successful_audited_pages: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      failed_audited_pages: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      pages_missing_title: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      pages_missing_meta_desc: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      pages_missing_h1: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      pages_missing_h2: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      total_images_missing_alt: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      total_cta: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      audit_score: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      audit_duration_seconds: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex('AuditReports', ['audit_id'], { unique: true, name: 'idx_audit_reports_audit_id' });
  },

  async down(queryInterface: QueryInterface) { await queryInterface.dropTable('AuditReports'); },
};