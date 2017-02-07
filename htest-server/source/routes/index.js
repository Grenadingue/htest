const graphicalInterface = require('./graphicalInterface');
const dashboard = require('./dashboard');
const testTreesLibrary = require('./testTreesLibrary');
const testProceduresLibrary = require('./testProceduresLibrary');
const machinesTests = require('./machinesTests');

module.exports.init = (app, io) => {
  // init http routes
  graphicalInterface.init(app);
  testTreesLibrary.initHttp(app);

  // init socket.io events
  io.on('connection', (socket) => {
    dashboard.init(socket);
    testTreesLibrary.initSocketIo(socket);
    testProceduresLibrary.init(socket);
    machinesTests.init(socket);
  });
};
