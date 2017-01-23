const uploadDirectory = require('../config/base.config').uploadDirectory;
const Siofu = require('socketio-file-upload');
const mkdirp = require('mkdirp');
const fs = require('fs');

let siofuIsBindedWithExpress = false;

if (!fs.existsSync(uploadDirectory) && !mkdirp.sync(uploadDirectory)) {
  console.log(`Unable to find and create upload directory '${uploadDirectory}'`);
  console.log('Exiting process...');
  process.exit(1);
}

module.exports = (app) => {
  const uploader = new Siofu();

  if (!siofuIsBindedWithExpress) {
    app.use(Siofu.router);
    siofuIsBindedWithExpress = true;
  }

  uploader.dir = uploadDirectory;
  return uploader;
};
