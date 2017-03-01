const mongodbUrl = require('../config/base.config').dataBase;
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUrl);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

function mongoosePromisifyFind(MongooseModel, findRequest) {
  return new Promise((fulfill, reject) => {
    MongooseModel.find(findRequest, (error, results) => {
      if (error) {
        return reject(error);
      }
      return fulfill(results);
    });
  });
}

function mongoosePromisifyFindOne(MongooseModel, findRequest) {
  return new Promise((fulfill, reject) => {
    MongooseModel.findOne(findRequest, (error, results) => {
      if (error) {
        return reject(error);
      }
      return fulfill(results);
    });
  });
}

function mongoosePromisifySave(MongooseModel) {
  return new Promise((fulfill, reject) => {
    MongooseModel.save((error, results) => {
      if (error) {
        return reject(error);
      }
      return fulfill(results);
    });
  });
}

if (mongoose.find !== undefined || mongoose.findOne !== undefined || mongoose.save !== undefined) {
  console.log('To register it\'s own methods \'libs/mongoose.js\' usually overrides:');
  console.log('\t\'mongoose.find\'');
  console.log('\t\'mongoose.findOne\'');
  console.log('\t\'mongoose.save\'');
  console.log('Today the original \'mongoose\' object already has one of these methods registred');
  console.log('This may be due to a mongoose version update');
  console.log('\'libs/mongoose.js\' automatically rejects this error, please review it manually');
  console.log('Exiting process...');
  process.exit(1);
}

module.exports = mongoose;
module.exports.find = mongoosePromisifyFind;
module.exports.findOne = mongoosePromisifyFindOne;
module.exports.save = mongoosePromisifySave;
