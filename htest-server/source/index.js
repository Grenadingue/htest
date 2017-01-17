#!/usr/bin/env node

const config = require('./config/base.config');
const app = require('./libraries/express')();
const socketIo = require('./libraries/socket.io');
const router = require('./routes');
const models = require('./models');

console.log('Initializing htest server...');
models.init().then(() => {
  console.log('Database model(s) successfuly initialized');
  router.initHttpRoutes(app);
  const server = app.listen(config.webServer.port, () => {
    console.log(`Web server listening on port ${config.webServer.port}`);
    router.initSocketIoEvents(socketIo(server));
  });
}).catch((error) => {
  console.log('Fatal error during databas model(s) initialization');
  console.log(error);
  console.log('Exiting process...');
  process.exit(1);
});
