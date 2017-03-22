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

function mongoosePromisifyRemove(MongooseModel, findRequest) {
  return new Promise((fulfill, reject) => {
    MongooseModel.remove(findRequest, (error, results) => {
      if (error) {
        return reject(error);
      }
      return fulfill(results);
    });
  });
}

function findAll() {
  return mongoosePromisifyFind(this, {});
}

function findById(_id) {
  return mongoosePromisifyFindOne(this, { _id });
}

function findByName(name) {
  return mongoosePromisifyFindOne(this, { name });
}

function save() {
  return mongoosePromisifySave(this);
}

function remove() {
  return mongoosePromisifyRemove(this, { _id: this._id });
}

if (mongoose.promises !== undefined) {
  console.log('To register it\'s own methods \'libraries/mongoose.js\' usually overrides \'mongoose.promises\'');
  console.log('Today the original \'mongoose\' object already has the \'promises\' key registred');
  console.log('This may be due to a mongoose version update');
  console.log('\'libraries/mongoose.js\' automatically rejects this error, please review it manually');
  console.log('Exiting process...');
  process.exit(1);
}

module.exports = mongoose;
module.exports.promises = {
  findAll,
  findById,
  findByName,
  save,
  remove,
};
