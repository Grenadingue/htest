const sioUploader = require('../libraries/socketio-file-upload');
const graphicalInterface = require('./graphicalInterface');
const dashboard = require('./dashboard');
const testTreesLibrary = require('./testTreesLibrary');
const machinesTests = require('./machinesTests');

module.exports.init = (app, io) => {
  // init http routes
  graphicalInterface.init(app);
  testTreesLibrary.initHttp(app);

  // init socket.io events
  sioUploader.init(app);
  io.on('connection', (socket) => {
    dashboard.init(socket);
    testTreesLibrary.initSocketIo(socket);
    machinesTests.init(socket);
  });
};
