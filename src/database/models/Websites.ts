import { Sequelize, Model, DataTypes } from 'sequelize';

export interface WebsiteInterface {
  id?: string;
  url: string;
  domain: string;
  website_urls?: string[] | null;
  created_at?: Date;
  updated_at?: Date;
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  class Websites extends Model<WebsiteInterface> implements WebsiteInterface {
    declare id: string;
    declare url: string;
    declare domain: string;
    declare website_urls: string[] | null;
    declare created_at: Date;
    declare updated_at: Date;

    static associate(models: any) {
      Websites.hasMany(models.Audits, { foreignKey: 'website_id', as: 'Audits', onDelete: 'CASCADE' });
    }
  }

  Websites.init(
    {
      id: { type: dataTypes.UUID, defaultValue: dataTypes.UUIDV4, allowNull: false, primaryKey: true },
      url: { type: dataTypes.STRING(2048), allowNull: false, unique: true },
      domain: { type: dataTypes.STRING(255), allowNull: false, unique: true },
      website_urls: { type: dataTypes.ARRAY(dataTypes.STRING(5000)), allowNull: true },
      created_at: { field: 'created_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
      updated_at: { field: 'updated_at', type: dataTypes.DATE, allowNull: false, defaultValue: dataTypes.NOW },
    },
    { sequelize, modelName: 'Websites', tableName: 'Websites', timestamps: true, underscored: true }
  );

  return Websites;
};
