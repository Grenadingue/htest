#!/usr/bin/env node

const config = require('./config/base.config');
const app = require('./libraries/express')();
const router = require('./routes');
const models = require('./models');

models.init().then(() => {
  console.log('Database model(s) successfuly initialized');
  router.init(app);
  const server = app.listen(config.webServer.port, () => {
    console.log(`Web server listening on port ${config.webServer.port}`);
  });
}).catch((error) => {
  console.log('Fatal error during databas model(s) initialization');
  console.log(error);
  console.log('Exiting process...');
  process.exit(1);
});
