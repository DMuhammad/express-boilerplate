const { Sequelize } = require("sequelize");
const config = require("./index");
const { logger } = require("../utils/logger");

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "postgres",
    logging: (msg) => logger.debug(msg),
  }
);

module.exports = sequelize;
