const fileUploader = require('../managers/fileUploader');

module.exports.addNewTree = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\taddNewTree()');
  console.log(parameters);
  if (parameters) {
    fulfill({ data: 'fake success' });
  } else {
    reject({ data: 'fake error' });
  }
});

module.exports.retrieveAvailableTrees = () => new Promise((fulfill) => {
  console.log('testTreesLibrary controller:\tretrieveAvailableTrees()');
  fulfill({ trees: [
    { id: 0, name: 'Foo tree', version: 1.0 },
    { id: 1, name: 'Foo tree', version: 1.1 },
    { id: 2, name: 'Foo tree', version: 2.0 },
  ] });
});

module.exports.retrieveTreeFromId = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tretrieveTreeFromId()');
  console.log(parameters);
  if (parameters && parameters.id) {
    fulfill({ tree: { id: parameters.id, name: 'foo tree', version: 1.0, raw: '<xml>raw tree data</xml>' } });
  } else {
    reject({ error: 'invalid input parameters' });
  }
});

module.exports.deleteTreesFromIds = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tdeleteTreesFromIds()');
  console.log(parameters);
  if (parameters) {
    fulfill({ data: 'fake success' });
  } else {
    reject({ data: 'fake error' });
  }
});

module.exports.onFileUploadSuccess = fileUploader.onSaved;

module.exports.onFileUploadFailure = fileUploader.onError;
