const TestModel = require('./testModel');

module.exports.init = () => new Promise((fulfill, reject) => {
  TestModel.sync().then(() => {
    fulfill();
  }).catch((error) => {
    reject(error);
  });
});
