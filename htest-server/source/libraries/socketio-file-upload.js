const uploadDirectory = require('../config/base.config').fileSystem.uploadDirectory;
const Siofu = require('socketio-file-upload');
const mkdirp = require('mkdirp');
const fs = require('fs');

const defaultFileMode = '0600';
const maximumFileSize = 16384; // 16384 B = 16 MB

if (!fs.existsSync(uploadDirectory) && !mkdirp.sync(uploadDirectory)) {
  console.log(`Unable to find and create upload directory '${uploadDirectory}'`);
  console.log('Exiting process...');
  process.exit(1);
}

module.exports.init = (app) => {
  app.use(Siofu.router);
};

module.exports.bind = (socket) => {
  const sioUploader = new Siofu();

  sioUploader.dir = uploadDirectory;
  sioUploader.mode = defaultFileMode;
  sioUploader.maxFileSize = maximumFileSize;
  sioUploader.listen(socket);
  return sioUploader;
};
