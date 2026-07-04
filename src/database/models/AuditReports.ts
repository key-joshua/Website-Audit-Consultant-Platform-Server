import { Sequelize, Model, DataTypes } from 'sequelize';

export interface AuditReportInterface {
  id?: string;
  audit_id: string;
  total_website_pages: number;
  total_audited_pages: number;
  successful_audited_pages: number;
  failed_audited_pages: number;
  pages_missing_title: number;
  pages_missing_meta_desc: number;
  pages_missing_h1: number;
  pages_missing_h2: number;
  total_images_missing_alt: number;
  total_cta: number;
  audit_score: number;
  audit_duration_seconds: number;
  created_at?: Date;
  updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class AuditReports extends Model<AuditReportInterface> implements AuditReportInterface {
    declare id: string;
    declare audit_id: string;
    declare total_website_pages: number;
    declare total_audited_pages: number;
    declare successful_audited_pages: number;
    declare failed_audited_pages: number;
    declare pages_missing_title: number;
    declare pages_missing_meta_desc: number;
    declare pages_missing_h1: number;
    declare pages_missing_h2: number;
    declare total_images_missing_alt: number;
    declare total_cta: number;
    declare audit_score: number;
    declare audit_duration_seconds: number;
    declare created_at: Date;
    declare updated_at: Date;

    static associate(models: any) {
      AuditReports.belongsTo(models.Audits, { foreignKey: 'audit_id', as: 'Audits', onDelete: 'CASCADE' });
    }
  }

  AuditReports.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true, },
      audit_id: { type: dataTypes.UUID, allowNull: false, },
      total_website_pages: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      total_audited_pages: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      successful_audited_pages: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      failed_audited_pages: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      pages_missing_title: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      pages_missing_meta_desc: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      pages_missing_h1: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      pages_missing_h2: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      total_images_missing_alt: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      total_cta: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      audit_score: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      audit_duration_seconds: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0, },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW, },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW, },
    },
    { sequelize, modelName: 'AuditReports', tableName: 'AuditReports', timestamps: true, underscored: true, }
  );

  return AuditReports;
};
