const guiRoutes = require('./graphicalInterface').routes;

module.exports.init = (socket) => {
  socket.on(guiRoutes.testTreesLibrary, () => {
    console.log(`testTreesLibrary router:\tclient connected to '${guiRoutes.testTreesLibrary}' web page`);

    socket.on('add-new-tree', () => {
      console.log('testTreesLibrary router:\t`add-new-tree` event received');
    });

    socket.on('retrieve-available-trees', () => {
      console.log('testTreesLibrary router:\t`retrieve-available-trees` event received');
    });

    socket.on('retrieve-tree-from-id', () => {
      console.log('testTreesLibrary router:\t`retrieve-tree-from-id` event received');
    });

    socket.on('delete-trees-from-ids', () => {
      console.log('testTreesLibrary router:\t`delete-trees-from-ids` event received');
    });

    socket.on('disconnect', () => {
      console.log(`testTreesLibrary router:\tclient disconnected from '${guiRoutes.testTreesLibrary}' web page\n`);
    });
  });
};
