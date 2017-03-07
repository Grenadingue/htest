const downloadDirectory = require('../config/base.config').fileSystem.downloadDirectory;
const jsonFile = require('jsonfile');
const mkdirp = require('mkdirp');
const fs = require('fs');

jsonFile.spaces = 2;

if (!fs.existsSync(downloadDirectory) && !mkdirp.sync(downloadDirectory)) {
  console.log(`Unable to find and create download directory '${downloadDirectory}'`);
  console.log('Exiting process...');
  process.exit(1);
}

function write(jsonObject, filePath) {
  return new Promise((fulfill, reject) => {
    jsonFile.writeFile(filePath, jsonObject, (error) => {
      if (error) {
        return reject(error);
      }
      return fulfill(filePath);
    });
  });
}

module.exports.write = write;
