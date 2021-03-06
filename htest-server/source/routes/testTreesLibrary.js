const guiRoutes = require('./graphicalInterface').routes;
const controller = require('../controllers/testTreesLibrary');
const sioUploader = require('../libraries/socketio-file-upload');

const eventsAndFunctions = [
  // retrieve tree families
  { eventName: 'retrieve-available-trees', controllerFct: controller.retrieveAvailableTrees },
  // create tree family
  { eventName: 'validate-new-tree-family-name', controllerFct: controller.validateNewTreeFamilyName },
  { eventName: 'validate-new-tree-data', controllerFct: controller.validateNewTreeData },
  { eventName: 'submit-new-tree', controllerFct: controller.processNewTreeSubmission },
  // delete tree family
  { eventName: 'delete-trees-from-family-id', controllerFct: controller.deleteTreesFromFamilyId },
  // retrieve tree familiy
  { eventName: 'retrieve-trees-from-family-id', controllerFct: controller.retrieveTreesFromFamilyId },
  // create new tree in family
  { eventName: 'validate-new-tree-version-data', controllerFct: controller.validateNewTreeVersionData },
  { eventName: 'submit-new-tree-version', controllerFct: controller.processNewTreeVersionSubmission },
  // delete tree in family
  { eventName: 'delete-tree-from-id', controllerFct: controller.deleteTreeFromId },
  // retrieve tree
  { eventName: 'retrieve-tree-from-id', controllerFct: controller.retrieveTreeFromId },
];

function bindEventToControllerFct(socket, inputEvent, controllerFct) {
  const outputEvent = `${inputEvent}-response`;
  socket.on(inputEvent, (inputParameters) => {
    console.log(`testTreesLibrary router:\t'${inputEvent}' event received`);
    controllerFct(inputParameters).then((output) => {
      output = output !== undefined ? output : {};
      output.status = 'success';
      socket.emit(outputEvent, output);
    }).catch((output) => {
      output = output !== undefined ? output : {};
      output.status = 'failure';
      socket.emit(outputEvent, output);
    });
  });
}

module.exports.initHttp = (app) => {
  app.get('/download/tree/:id', (req, res) => {
    controller.serveTreeAsFile({ id: req.params.id })
    .then((file) => res.download(file.path, file.name))
    .catch(() => res.status(404).send('File not found'));
  });
};

module.exports.initSocketIo = (socket) => {
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
