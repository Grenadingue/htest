module.exports.init = function () {
  return new Promise((fulfill, reject) => {
    require('./testModel').sync().then(() => {
      fulfill();
    }).catch((error) => {
      reject(error);
    });
  });
}
