const db = require('../libraries/mongoose').connection;

module.exports.init = () => new Promise((fulfill, reject) => {
  db.once('error', () => {
    reject();
  });
  db.once('open', () => {
    fulfill();
  });
});
