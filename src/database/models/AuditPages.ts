import { Sequelize, Model, DataTypes } from 'sequelize';

export interface AuditPagesInterface {
  id?: string;
  audit_id: string;
  page: string;
  page_url: string;
  status_code: number;
  title?: string;
  meta_desc?: string;
  h1_count: number;
  h2_count: number;
  cta_count: number;
  internal_links_count: number;
  external_links_count: number;
  images_count: number;
  images_missing_alt_count: number;
  created_at?: Date;
  updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class AuditPages extends Model<AuditPagesInterface> implements AuditPagesInterface {
    declare id: string;
    declare audit_id: string;
    declare page: string;
    declare page_url: string;
    declare status_code: number;
    declare title: string;
    declare meta_desc: string;
    declare h1_count: number;
    declare h2_count: number;
    declare cta_count: number;
    declare internal_links_count: number;
    declare external_links_count: number;
    declare images_count: number;
    declare images_missing_alt_count: number;
    declare created_at: Date;
    declare updated_at: Date;

    static associate(models: any) {
      AuditPages.belongsTo(models.Audits, { foreignKey: 'audit_id', as: 'Audits', onDelete: 'CASCADE' });
      AuditPages.hasMany(models.AuditPageIssues, { foreignKey: 'audit_page_id', as: 'AuditPageIssues', onDelete: 'CASCADE' });
    }
  }

  AuditPages.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true },
      audit_id: { type: dataTypes.UUID, allowNull: false },
      page: { type: dataTypes.STRING, allowNull: false },
      page_url: { type: dataTypes.STRING(2048), allowNull: false },
      status_code: { type: dataTypes.INTEGER, allowNull: false },
      title: { type: dataTypes.STRING(500), allowNull: true },
      meta_desc: { type: dataTypes.STRING(1000), allowNull: true },
      h1_count: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      h2_count: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      cta_count: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      internal_links_count: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      external_links_count: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      images_count: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      images_missing_alt_count: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
    },
    { sequelize, modelName: 'AuditPages', tableName: 'AuditPages', timestamps: true, underscored: true }
  );

  return AuditPages;
};
