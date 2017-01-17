const path = require('path');

module.exports.initHttpRoutes = function (express, app) {
  app.use(express.static(path.resolve(__dirname, '../views')));
};

module.exports.initSocketIoEvents = function (socket) {
  socket.on('testTreesLibrary', (data) => {
    console.log('Socket.io event received from `testTreesLibrary` web page');
  });

  socket.on('testProceduresLibrary', (data) => {
    console.log('Socket.io event received from `testProceduresLibrary` web page');
  });

  socket.on('machinesTests', (data) => {
    console.log('Socket.io event received from `machinesTests` web page');
  });

  socket.on('disconnect', (data) => {
    console.log('oh a socket.io client is disconnected');
  });
};
