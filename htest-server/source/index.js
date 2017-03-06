#!/usr/bin/env node

const config = require('./config/base.config').webServer;
const app = require('./libraries/express')();
const server = require('http').createServer(app);
const io = require('./libraries/socket.io')(server);
const router = require('./routes');
const models = require('./models');

console.log('Initializing database');
models.init().then(() => {
  console.log('Database successfuly initialized');
  console.log(`Initializing http server to listen on ${config.hostname}:${config.port}`);
  router.init(app, io);
  server.listen(config.port, config.hostname, () => {
    console.log('Http server successfuly initialized\n');
  });
}).catch((error) => {
  console.log('Fatal error during server initialization');
  if (error !== undefined && error !== null) {
    console.log(error);
  }
  console.log('Exiting process...');
  process.exit(1);
});
