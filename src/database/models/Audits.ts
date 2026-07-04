import { Sequelize, Model, DataTypes } from 'sequelize';

export interface AuditInterface {
  id?: string;
  website_id: string;
  version: number;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED';
  created_at?: Date;
  updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Audits extends Model<AuditInterface> implements AuditInterface {
    declare id: string;
    declare website_id: string;
    declare version: number;
    declare status: 'RUNNING' | 'COMPLETED' | 'FAILED';
    declare created_at: Date;
    declare updated_at: Date;

    static associate(models: any) {
      Audits.belongsTo(models.Websites, { foreignKey: 'website_id', as: 'Website', onDelete: 'CASCADE' });
      Audits.hasMany(models.AuditPages, { foreignKey: 'audit_id', as: 'AuditPages', onDelete: 'CASCADE' });
      Audits.hasOne(models.AuditReports, { foreignKey: 'audit_id', as: 'AuditReports', onDelete: 'CASCADE' });
    }
  }

  Audits.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true },
      website_id: { field: 'website_id', type: dataTypes.UUID, allowNull: false },
      version: { type: dataTypes.INTEGER, allowNull: false, defaultValue: 1 },
      status: { type: dataTypes.ENUM('RUNNING', 'COMPLETED', 'FAILED'), allowNull: false, defaultValue: 'RUNNING' },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
    },
    { sequelize, modelName: 'Audits', tableName: 'Audits', timestamps: true, underscored: true }
  );

  return Audits;
};
