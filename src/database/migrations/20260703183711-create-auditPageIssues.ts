import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('AuditPageIssues', {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false, primaryKey: true },
      audit_page_id: { type: DataTypes.UUID, allowNull: false, references: { model: 'AuditPages', key: 'id' }, onDelete: 'CASCADE' },
      issue_type: { type: DataTypes.STRING(255), allowNull: false },
      severity: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.STRING(1000), allowNull: false },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    });

    await queryInterface.addIndex('AuditPageIssues', ['audit_page_id'], { name: 'idx_audit_issues_audit_page_id' });

  },

  async down(queryInterface: QueryInterface) { await queryInterface.dropTable('AuditPageIssues'); },
};