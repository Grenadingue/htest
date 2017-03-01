#!/usr/bin/env node

const config = require('./config/base.config');
const app = require('./libraries/express')();
const server = require('http').createServer(app);
const io = require('./libraries/socket.io')(server);
const router = require('./routes');

console.log(`Initializing http server on port ${config.webServer.port}...`);
router.init(app, io);
server.listen(config.webServer.port, () => {
  console.log('Http server successfuly initialized\n');
});
