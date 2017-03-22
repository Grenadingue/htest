const fileUploader = require('../managers/fileUploader');
const TreeFamily = require('../models/TreeFamily').Model;
const removeTreeFamilyFromId = require('../managers/treeFamilyRemover').removeFromId;
const trees = require('./trees');

module.exports.retrieveAvailableTrees = () => new Promise((fulfill, reject) => { // retrieve tree families
  const response = { trees: [] };

  console.log('testTreesLibrary controller:\tretrieveAvailableTrees()');
  TreeFamily.findAll().then((treeFamilies) => {
    treeFamilies.forEach((treeFamily) => {
      response.trees.push({ familyId: treeFamily._id, name: treeFamily.name });
    });
    fulfill(response);
  }).catch((error) => {
    reject({ message: error });
  });
});

module.exports.retrieveTreesFromFamilyId = (parameters) => new Promise((fulfill, reject) => { // retrieve tree family
  const response = { familyId: undefined, trees: [] };

  console.log('testTreesLibrary controller:\tretrieveTreesFromFamilyId()');
  console.log(parameters);
  if (parameters && parameters.id) {
    TreeFamily.findById(parameters.id).then((treeFamily) => {
      response.familyId = treeFamily._id;
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

module.exports.deleteTreesFromFamilyId = (parameters) => new Promise((fulfill, reject) => { // delete tree family
  console.log('testTreesLibrary controller:\tdeleteTreesFromFamilyId()');
  console.log(parameters);
  if (parameters && 'familyId' in parameters) {
    // before removal we are supposed to check if a tree is used from the machines tests library
    // do this missing check right here
    removeTreeFamilyFromId(parameters.familyId).then(() => {
      fulfill();
    }).catch((error) => {
      console.log(error);
      reject({ message: error });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
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
    fileUploader.getLastUploadFromClientId(parameters.clientId).then((file) => {
      trees.validate(file.pathName, false).then(() => {
        fulfill({ message: `'${file.name}': success` });
      }).catch((error) => {
        console.log(error);
        reject({ message: `'${file.name}': ${error}` });
      });
    }).catch((error) => {
      reject({ message: error });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

function createNewTreeFamily(inputFile, familyName) {
  return new Promise((fulfill, reject) => {
    trees.validate(inputFile).then((rawTree) => {
      rawTree.version = 1;
      trees.save(rawTree).then((treeObject) => {
        const family = new TreeFamily();
        family.name = familyName;
        family.trees.push(treeObject.tree);
        family.references.push([]);
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
    fileUploader.getLastUploadFromClientId(parameters.clientId).then((file) => {
      createNewTreeFamily(file.pathName, parameters.familyName).then(() => {
        fulfill();
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject({ message: error });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

module.exports.validateNewTreeVersionData = (parameters) => new Promise((fulfill, reject) => { // validate adding tree to existing family
  console.log('testTreesLibrary controller:\tvalidateNewTreeVersionData()');
  console.log(parameters);
  if (parameters && 'clientId' in parameters && 'familyId' in parameters && typeof parameters.familyId === 'string') {
    fileUploader.getLastUploadFromClientId(parameters.clientId).then((file) => {
      trees.validate(file.pathName, true).then(() => {
        fulfill({ message: `'${file.name}': success` });
      }).catch((error) => {
        console.log(error);
        reject({ message: `'${file.name}': ${error}` });
      });
    }).catch((error) => {
      console.log(error);
      reject({ message: error });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

function addTreeToFamily(inputFile, familyId) {
  return new Promise((fulfill, reject) => {
    TreeFamily.findById(familyId).then((family) => {
      trees.validate(inputFile, true).then((rawTree) => {
        rawTree.version = 42;
        trees.save(rawTree).then((treeObject) => {
          family.trees.push(treeObject.tree);
          family.references.push(treeObject.references);
          family.save().then(() => {
            fulfill(family);
          }).catch((error) => {
            console.log(error);
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
    }).catch(() => {
      reject({ message: 'tree family not found' });
    });
  });
}

module.exports.processNewTreeVersionSubmission = (parameters) => new Promise((fulfill, reject) => { // add tree to existing family
  console.log('testTreesLibrary controller:\tprocessNewTreeVersionSubmission()');
  console.log(parameters);
  if (parameters && 'clientId' in parameters && 'familyId' in parameters && typeof parameters.familyId === 'string') {
    fileUploader.getLastUploadFromClientId(parameters.clientId).then((file) => {
      addTreeToFamily(file.pathName, parameters.familyId).then((family) => {
        fulfill({ familyId: family._id });
      }).catch((error) => {
        reject(error);
      });
    }).catch((error) => {
      reject({ message: error });
    });
  } else {
    reject({ message: 'invalid input parameters' });
  }
});

module.exports.onFileUploadSuccess = fileUploader.onSaved;

module.exports.onFileUploadFailure = fileUploader.onError;
