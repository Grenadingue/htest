const Sequelize = require('sequelize');
const sequelize = require('../libraries/sequelize')(Sequelize);

const testModel = sequelize.define('testModel', {
  foo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  bar: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  freezeTableName: true,
});

module.exports = testModel;
