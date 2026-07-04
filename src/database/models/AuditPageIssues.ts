import { Sequelize, Model, DataTypes } from 'sequelize';

export interface AuditIssueInterface {
  id?: string;
  audit_page_id: string;
  issue_type: string;
  severity: 'WARNING' | 'ERROR';
  message: string;
  created_at?: Date;
  updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class AuditPageIssues extends Model<AuditIssueInterface> implements AuditIssueInterface {
    declare id: string;
    declare audit_page_id: string;
    declare issue_type: string;
    declare severity: 'WARNING' | 'ERROR';
    declare message: string;
    declare created_at: Date;
    declare updated_at: Date;

    static associate(models: any) {
      AuditPageIssues.belongsTo(models.AuditPages, { foreignKey: 'audit_page_id', as: 'AuditPages', onDelete: 'CASCADE' });
    }
  }

  AuditPageIssues.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true },
      audit_page_id: { field: 'audit_page_id', type: dataTypes.UUID, allowNull: false },
      issue_type: { type: dataTypes.STRING(255), allowNull: false },
      severity: { type: dataTypes.ENUM('WARNING', 'ERROR'), allowNull: false },
      message: { type: dataTypes.STRING(1000), allowNull: false },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
    },
    { sequelize, modelName: 'AuditPageIssues', tableName: 'AuditPageIssues', timestamps: true, underscored: true }
  );

  return AuditPageIssues;
};
