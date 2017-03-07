const Tree = require('../models/Tree').Model;
const jsonLoader = require('./jsonLoader');
const treeGrammar = require('./treeGrammar');
const treeSaver = require('./treeSaver');
const treeExtractor = require('./treeExtractor');

// const lolDatabase = {
//   trees: [
//     { id: 0, rootId: 'a1', name: 'Foo tree', version: 1, raw: '<xml>raw tree data</xml>' },
//     { id: 1, rootId: 'a1', name: 'Foo tree', version: 2, raw: '<xml>raw tree data</xml>' },
//     { id: 2, rootId: 'b2', name: 'Bar tree', version: 1, raw: '<xml>raw tree data</xml>' },
//     { id: 3, rootId: 'a1', name: 'Foo tree', version: 3, raw: '<xml>raw tree data</xml>' },
//     { id: 4, rootId: 'c3', name: 'Baz tree', version: 1, raw: '<xml>raw tree data</xml>' },
//     { id: 5, rootId: 'b2', name: 'Bar tree', version: 2, raw: '<xml>raw tree data</xml>' },
//   ],
// };

module.exports.retrieveTreeFromId = (parameters) => new Promise((fulfill, reject) => { // retrieve tree version
  console.log('testTreesLibrary controller:\tretrieveTreeFromId()');
  console.log(parameters);
  if (parameters && ('id' in parameters)) {
    Tree.findById(parameters.id).then((tree) => {
      fulfill({ tree });
    }).catch(() => {
      reject({ error: 'unavailable tree requested' });
    });
  } else {
    reject({ error: 'invalid input parameters' });
  }
});

module.exports.deleteTreeFromId = (parameters) => new Promise((fulfill, reject) => { // delete tree version
  console.log('testTreesLibrary controller:\tdeleteTreeFromId()');
  console.log(parameters);
  if (parameters) {
    fulfill({ message: 'fake success' });
  } else {
    reject({ message: 'fake error' });
  }
});

module.exports.serveTreeAsFile = (parameters) => new Promise((fulfill, reject) => { // download tree from id
  console.log('testTreesLibrary controller:\tserveTreeAsFile()');
  console.log(parameters);
  if (parameters && 'id' in parameters) {
    treeExtractor.extractFromId(parameters.id).then((outputFile) => {
      fulfill(outputFile);
    }).catch((error) => {
      reject(error);
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

module.exports.validateNewTree = (filePath) => new Promise((fulfill, reject) => { // validate new tree
  jsonLoader(filePath).then((rawTree) => {
    treeGrammar.validate(rawTree).then((validatedTree) => {
      fulfill(validatedTree);
    }).catch((error) => {
      reject(error);
    });
  }).catch((error) => {
    reject(error);
  });
});

module.exports.saveNewTree = (rawTree) => treeSaver.save(rawTree);
