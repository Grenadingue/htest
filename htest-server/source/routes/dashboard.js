const guiRoutes = require('./graphicalInterface').routes;

module.exports.init = (socket) => {
  socket.on(guiRoutes.dashboard, () => {
    console.log(`dashboard router:\t\tclient connected to '${guiRoutes.dashboard}' web page`);

    socket.on('disconnect', () => {
      console.log(`dashboard router:\t\tclient disconnected from '${guiRoutes.dashboard}' web page\n`);
    });
  });
};
