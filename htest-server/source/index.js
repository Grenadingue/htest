#!/usr/bin/env node

const config = require('./config');
const app = require('./libraries/express')();
const router = require('./routes');

router.init(app);
const server = app.listen(config.webServer.port, () => {
  console.log(`Web server listening on port ${config.webServer.port}`);
});
