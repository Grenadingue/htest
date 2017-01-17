const config = require('../config/base.config').dataBase;

module.exports = function initSequelize(Sequelize) {
  return new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options);
};
