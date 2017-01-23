const guiRoutes = require('./graphicalInterface').routes;

module.exports.init = (socket) => {
  socket.on(guiRoutes.testProceduresLibrary, () => {
    console.log(`testProceduresLibrary router:\tclient connected to '${guiRoutes.testProceduresLibrary}' web page`);

    socket.on('disconnect', () => {
      console.log(`testProceduresLibrary router:\tclient disconnected from '${guiRoutes.testProceduresLibrary}' web page\n`);
    });
  });
};
