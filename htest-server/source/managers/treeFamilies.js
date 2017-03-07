const fileUploader = require('../managers/fileUploader');
const TreeFamily = require('../models/TreeFamily').Model;
const trees = require('./trees');

module.exports.retrieveAvailableTrees = () => new Promise((fulfill, reject) => { // retrieve tree families
  const response = { trees: [] };

  console.log('testTreesLibrary controller:\tretrieveAvailableTrees()');
  TreeFamily.findAll().then((treeFamilies) => {
    treeFamilies.forEach((treeFamily) => {
      response.trees.push({ rootId: treeFamily._id, name: treeFamily.name });
    });
    fulfill(response);
  }).catch((error) => {
    reject({ message: error });
  });
});

module.exports.retrieveTreesFromRootId = (parameters) => new Promise((fulfill, reject) => { // retrieve tree family
  const response = { rootId: undefined, trees: [] };

  console.log('testTreesLibrary controller:\tretrieveTreesFromRootId()');
  console.log(parameters);
  if (parameters && parameters.id) {
    TreeFamily.findById(parameters.id).then((treeFamily) => {
      response.rootId = treeFamily._id;
      treeFamily.trees.forEach((tree) => {
        response.trees.push({ id: tree._id, name: tree.name, version: tree.version });
      });
      if (response.trees.length !== 0) {
        fulfill(response);
      } else {
        reject({ error: 'unavailable tree(s) requested' });
      }
    }).catch((error) => {
      reject(error);
    });
  } else {
    reject({ error: 'invalid input parameters' });
  }
});

module.exports.deleteTreesFromRootId = (parameters) => new Promise((fulfill, reject) => { // delete tree family
  console.log('testTreesLibrary controller:\tdeleteTreesFromRootId()');
  console.log(parameters);
//   if (parameters) {
//     fulfill({ message: 'fake success' });
//   } else {
//     reject({ message: 'fake error' });
//   }
  reject({ message: 'fake error' });
});

module.exports.validateNewTreeFamilyName = (parameters) => new Promise((fulfill, reject) => { // create tree family (with initial tree)
  console.log('testTreesLibrary controller:\tvalidateNewTreeFamilyName()');
  console.log(parameters);
  if (parameters && 'name' in parameters && typeof parameters.name === 'string') {
    TreeFamily.findByName(parameters.name).then((treeFamily) => {
      if (treeFamily) {
        reject({ message: 'a tree family already exists with this name' });
      } else {
        fulfill({ message: 'this family name is free' });
      }
    }).catch(() => {
      reject({ message: 'internal server error' });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

module.exports.validateNewTreeData = (parameters) => new Promise((fulfill, reject) => { // validate creating tree family (with initial tree)
  console.log('testTreesLibrary controller:\tvalidateNewTreeData()');
  console.log(parameters);
  if (parameters && 'clientId' in parameters) {
    const file = fileUploader.getLastUploadFromClientId(parameters.clientId);
    trees.validateNewTree(file.pathName).then(() => {
      fulfill({ message: `'${file.name}': success` });
    }).catch((error) => {
      console.log(error);
      reject({ message: `'${file.name}': ${error}` });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

function saveNewTreeFamily(inputFile, familyName) {
  return new Promise((fulfill, reject) => {
    trees.validateNewTree(inputFile).then((rawTree) => {
      rawTree.version = 1;
      trees.saveNewTree(rawTree).then((tree) => {
        const family = new TreeFamily();
        family.name = familyName;
        family.trees.push(tree);
        family.save().then(() => {
          fulfill();
        }).catch((error) => {
          reject({ message: error });
        });
      }).catch((error) => {
        console.log(error);
        reject({ message: error });
      });
    }).catch((error) => {
      console.log(error);
      reject({ message: error });
    });
  });
}

module.exports.processNewTreeSubmission = (parameters) => new Promise((fulfill, reject) => { // create tree family (with initial tree)
  console.log('testTreesLibrary controller:\tprocessNewTreeSubmission()');
  console.log(parameters);
  if (parameters && 'clientId' in parameters && 'familyName' in parameters && typeof parameters.familyName === 'string') {
    const inputFile = fileUploader.getLastUploadFromClientId(parameters.clientId).pathName;
    saveNewTreeFamily(inputFile, parameters.familyName).then(() => {
      fulfill();
    }).catch((error) => {
      reject(error);
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

module.exports.validateNewTreeVersionData = (parameters) => new Promise((fulfill, reject) => { // validate adding tree to existing family
  console.log('testTreesLibrary controller:\tvalidateNewTreeVersionData()');
  console.log(parameters);
  // if (parameters) {
  //   fulfill({ message: 'fake success' });
  // } else {
  //   reject({ message: 'fake error' });
  // }
  reject({ message: 'fake error' });
});

module.exports.processNewTreeVersionSubmission = (parameters) => new Promise((fulfill, reject) => { // add tree to existing family
  console.log('testTreesLibrary controller:\tprocessNewTreeVersionSubmission()');
  console.log(parameters);
  // if (parameters) {
  //   fulfill({ message: 'fake success', rootId: lolDatabase.trees[0].rootId });
  // } else {
  //   reject({ message: 'fake error' });
  // }
  reject({ message: 'fake error' });
});

module.exports.onFileUploadSuccess = fileUploader.onSaved;

module.exports.onFileUploadFailure = fileUploader.onError;
