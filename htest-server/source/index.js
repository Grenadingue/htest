#!/usr/bin/env node

const config = require('./config/base.config');
const app = require('./libraries/express')();
const server = require('http').createServer(app);
const io = require('./libraries/socket.io')(server);
const sioUploader = require('./libraries/socketio-file-upload');
const router = require('./routes');
const models = require('./models');

console.log('Initializing htest server...');
models.init().then(() => {
  console.log('Database model(s) successfuly initialized');
  console.log(`Initializing http server on port ${config.webServer.port}...`);
  sioUploader.init(app);
  router.init(app, io);
  server.listen(config.webServer.port, () => {
    console.log('Http server successfuly initialized\n');
  });
}).catch((error) => {
  console.log('Fatal error during server initialization');
  console.log(error);
  console.log('Exiting process...');
  process.exit(1);
});
