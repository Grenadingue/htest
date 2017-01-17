const path = require('path');

module.exports.init = function (express, app) {
  app.use(express.static(path.resolve(__dirname, '../views')));
};
