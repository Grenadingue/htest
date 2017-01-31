const guiRoutes = require('./graphicalInterface').routes;
const controller = require('../controllers/testTreesLibrary');
const sioUploader = require('../libraries/socketio-file-upload');

const eventsAndFunctions = [
  { eventName: 'add-new-tree', controllerFct: controller.addNewTree },
  { eventName: 'retrieve-available-trees', controllerFct: controller.retrieveAvailableTrees },
  { eventName: 'retrieve-tree-from-id', controllerFct: controller.retrieveTreeFromId },
  { eventName: 'retrieve-trees-from-root-id', controllerFct: controller.retrieveTreesFromRootId },
  { eventName: 'delete-trees-from-ids', controllerFct: controller.deleteTreesFromIds },
  { eventName: 'validate-new-tree-family-name', controllerFct: controller.validateNewTreeFamilyName },
  { eventName: 'validate-new-tree-data', controllerFct: controller.validateNewTreeData },
  { eventName: 'submit-new-tree', controllerFct: controller.processNewTreeSubmission },
];

function bindEventToControllerFct(socket, inputEvent, controllerFct) {
  const outputEvent = `${inputEvent}-response`;
  socket.on(inputEvent, (inputParameters) => {
    console.log(`testTreesLibrary router:\t'${inputEvent}' event received`);
    controllerFct(inputParameters).then((output) => {
      output.status = 'success';
      socket.emit(outputEvent, output);
    }).catch((output) => {
      output.status = 'failure';
      socket.emit(outputEvent, output);
    });
  });
}

module.exports.init = (socket) => {
  socket.on(guiRoutes.testTreesLibrary, () => {
    const fileUploader = sioUploader.bind(socket);
    const clientId = controller.register(socket);

    console.log(`testTreesLibrary router:\tclient connected to '${guiRoutes.testTreesLibrary}' web page`);

    socket.emit(`${guiRoutes.testTreesLibrary}-response`, { status: 'success', clientId });
    eventsAndFunctions.forEach((item) => {
      bindEventToControllerFct(socket, item.eventName, item.controllerFct);
    });

    fileUploader.on('saved', controller.onFileUploadSuccess);
    fileUploader.on('error', controller.onFileUploadFailure);

    socket.on('disconnect', () => {
      console.log(`testTreesLibrary router:\tclient disconnected from '${guiRoutes.testTreesLibrary}' web page\n`);
      controller.unregister(clientId);
    });
  });
};
