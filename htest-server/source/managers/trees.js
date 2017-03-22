const Tree = require('../models/Tree').Model;
const jsonLoader = require('./jsonLoader');
const treeGrammar = require('./treeGrammar');
const treeSaver = require('./treeSaver');
const treeExtractor = require('./treeExtractor');
const treeRemover = require('./treeRemover');

module.exports.retrieveTreeFromId = (parameters) => new Promise((fulfill, reject) => { // retrieve tree version
  console.log('testTreesLibrary controller:\tretrieveTreeFromId()');
  console.log(parameters);
  if (parameters && ('id' in parameters)) {
    Tree.findById(parameters.id).then((tree) => {
      fulfill({ tree });
    }).catch(() => {
      reject({ message: 'unavailable tree requested' });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

module.exports.deleteTreeFromId = (parameters) => new Promise((fulfill, reject) => { // delete tree version
  console.log('testTreesLibrary controller:\tdeleteTreeFromId()');
  console.log(parameters);
  if (parameters && ('id' in parameters)) {
    // before removal we are supposed to check if a tree is used from the machines tests library
    // do this missing check right here
    treeRemover.removeFromId(parameters.id).then(() => {
      fulfill();
    }).catch((error) => {
      reject({ message: error });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

module.exports.serveTreeAsFile = (parameters) => new Promise((fulfill, reject) => { // download tree from id
  console.log('testTreesLibrary controller:\tserveTreeAsFile()');
  console.log(parameters);
  if (parameters && 'id' in parameters) {
    treeExtractor.extractFromId(parameters.id).then((outputFile) => {
      fulfill(outputFile);
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

module.exports.validate = (filePath, allowNodeReferences) => new Promise((fulfill, reject) => { // validate new tree
  jsonLoader(filePath).then((rawTree) => {
    treeGrammar.validate(rawTree, allowNodeReferences).then((validatedTree) => {
      fulfill(validatedTree);
    }).catch((error) => {
      reject(error);
    });
  }).catch((error) => {
    reject(error);
  });
});

module.exports.save = (rawTree) => treeSaver.save(rawTree);
