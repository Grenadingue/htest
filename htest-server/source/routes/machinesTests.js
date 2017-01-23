const guiRoutes = require('./graphicalInterface').routes;

module.exports.init = (socket) => {
  socket.on(guiRoutes.machinesTests, () => {
    console.log(`machinesTests router:\t\tclient connected to '${guiRoutes.machinesTests}' web page`);

    socket.on('disconnect', () => {
      console.log(`machinesTests router:\t\tclient disconnected from '${guiRoutes.machinesTests}' web page\n`);
    });
  });
};
