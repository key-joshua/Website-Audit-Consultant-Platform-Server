import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    logging: false as boolean,
    dialect: 'postgres' as Dialect,
    port: process.env.DEVELOPMENT_DB_POSTGRESQL_PORT as string,
    host: process.env.DEVELOPMENT_DB_POSTGRESQL_HOST as string,
    database: process.env.DEVELOPMENT_DB_POSTGRESQL_DATABASE as string,
    username: process.env.DEVELOPMENT_DB_POSTGRESQL_USERNAME as string,
    password: process.env.DEVELOPMENT_DB_POSTGRESQL_PASSWORD as string,
  },

  production: {
    logging: false as boolean,
    dialect: 'postgres' as Dialect,
    port: process.env.PRODUCTION_DB_POSTGRESQL_PORT as string,
    host: process.env.PRODUCTION_DB_POSTGRESQL_HOST as string,
    database: process.env.PRODUCTION_DB_POSTGRESQL_DATABASE as string,
    username: process.env.PRODUCTION_DB_POSTGRESQL_USERNAME as string,
    password: process.env.PRODUCTION_DB_POSTGRESQL_PASSWORD as string,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        ca: process.env.PRODUCTION_DB_POSTGRESQL_CERTIFICATE as string,
      }
    }
  },
};

module.exports = config;