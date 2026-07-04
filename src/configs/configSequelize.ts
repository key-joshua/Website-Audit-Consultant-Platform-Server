import { Sequelize } from 'sequelize';
import config = require('./config');

const env = process.env.NODE_ENV || 'development';
const configs = config[env];

const sequelize = new Sequelize(configs.database, configs.username, configs.password, configs);

export default sequelize;