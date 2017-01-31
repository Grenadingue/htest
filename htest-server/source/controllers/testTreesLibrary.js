const fileUploader = require('../managers/fileUploader');
const sioClients = require('../managers/sioClients');

const lolDatabase = {
  trees: [
    { id: 0, rootId: 'a1', name: 'Foo tree', version: 1, raw: '<xml>raw tree data</xml>' },
    { id: 1, rootId: 'a1', name: 'Foo tree', version: 2, raw: '<xml>raw tree data</xml>' },
    { id: 2, rootId: 'b2', name: 'Bar tree', version: 1, raw: '<xml>raw tree data</xml>' },
    { id: 3, rootId: 'a1', name: 'Foo tree', version: 3, raw: '<xml>raw tree data</xml>' },
    { id: 4, rootId: 'c3', name: 'Baz tree', version: 1, raw: '<xml>raw tree data</xml>' },
    { id: 5, rootId: 'b2', name: 'Bar tree', version: 2, raw: '<xml>raw tree data</xml>' },
  ],
};

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
  const response = { trees: [] };
  const roots = [];

  lolDatabase.trees.forEach((tree) => {
    if (roots.indexOf(tree.rootId) === -1) {
      roots.push(tree.rootId);
      response.trees.push({ rootId: tree.rootId, name: tree.name });
    }
  });
  fulfill(response);
});

module.exports.retrieveTreesFromRootId = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tretrieveTreesFromRootId()');
  console.log(parameters);
  const response = { rootId: undefined, trees: [] };

  if (parameters && parameters.id) {
    lolDatabase.trees.forEach((tree) => {
      if (parameters.id === tree.rootId) {
        response.rootId = tree.rootId;
        response.trees.push({ id: tree.id, name: tree.name, version: tree.version });
      }
    });

    console.log(response);
    if (response.trees.length !== 0) {
      fulfill(response);
    } else {
      reject({ error: 'unavailable tree(s) requested' });
    }
  } else {
    reject({ error: 'invalid input parameters' });
  }
});

module.exports.retrieveTreeFromId = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tretrieveTreeFromId()');
  console.log(parameters);
  if (parameters && ('id' in parameters)) {
    if (lolDatabase.trees[parameters.id]) {
      fulfill({ tree: lolDatabase.trees[parameters.id] });
    } else {
      reject({ error: 'unavailable tree requested' });
    }
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

module.exports.validateNewTreeFamilyName = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tvalidateNewTreeFamilyName()');
  console.log(parameters);
  if (parameters) {
    fulfill({ message: 'fake success' });
  } else {
    reject({ message: 'fake error' });
  }
});

module.exports.validateNewTreeData = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tvalidateNewTreeData()');
  console.log(parameters);
  if (parameters) {
    fulfill({ message: 'fake success' });
  } else {
    reject({ message: 'fake error' });
  }
});

module.exports.processNewTreeSubmission = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tprocessNewTreeSubmission()');
  console.log(parameters);
  if (parameters) {
    fulfill({ message: 'fake success' });
  } else {
    reject({ message: 'fake error' });
  }
});

module.exports.onFileUploadSuccess = fileUploader.onSaved;

module.exports.onFileUploadFailure = fileUploader.onError;

module.exports.register = sioClients.register;

module.exports.unregister = sioClients.unregister;
