const downloadDirectory = require('../config/base.config').fileSystem.downloadDirectory;
const jsonFile = require('../libraries/jsonFile');
const Tree = require('../models/Tree').Model;
const treeGrammarModels = require('../models/treeGrammar');
const path = require('path');
const fs = require('fs');

const treeGrammar = treeGrammarModels.tree;
const abstractNodeGrammar = treeGrammarModels.abstractNode;
const pointerNodeGrammar = treeGrammarModels.pointerNode;
const procedureNodeGrammar = treeGrammarModels.procedureNode;

function removeUnusedElementsInAbstractNode(node) {
  for (const nodeKey in node) {
    for (const referenceKey in abstractNodeGrammar) {
      if (nodeKey === referenceKey) {
        const reference = abstractNodeGrammar[referenceKey];
        if (reference.dataType === Object.prototype.toString.call(Array()) && node[nodeKey].length === 0) { // eslint-disable-line no-array-constructor
          delete node[nodeKey];
        }
        break;
      }
    }
  }

  // id: { mandatory: false, dataType: String },
  // name: { mandatory: true, dataType: String },
  // exec: { mandatory: false, dataType: String },
  // targetPlatforms: { mandatory: false, dataType: Array, unionTypes: validTargetPlatform, minLength: 1 },
  // branches: { mandatory: false, dataType: Array, minLength: 0 },
}

function removeUnusedElementsInPointerNode(node) {
}

function removeUnusedElementsInProcedureNode(node) {
}

const removeUnusedElementsInNodeType = {
  abstractNode: removeUnusedElementsInAbstractNode,
  pointerNode: removeUnusedElementsInPointerNode,
  procedureNode: removeUnusedElementsInProcedureNode,
};

function removeUnusedElementsInNode(node) {
  delete node.__v;
  removeUnusedElementsInNodeType.abstractNode(node);
  if ('_type' in node) {
    removeUnusedElementsInNodeType[node._type](node);
  }
  if ('branches' in node) {
    node.branches.forEach((branch) => {
      removeUnusedElementsInNode(branch);
    });
  }
}

function removeUnusedElements(tree) {
  delete tree.__v;
  tree.root.forEach((rootNode) => {
    removeUnusedElementsInNode(rootNode);
  });
  return tree;
}

function extractTreeFromId(id) {
  return new Promise((fulfill, reject) => {
    const fileName = `tree_${id}.json`;
    const filePath = path.join(downloadDirectory, fileName);

    if (fs.existsSync(filePath)) {
      fulfill({ path: filePath, name: fileName });
    } else {
      Tree.findById(id).then((tree) => {
        const cleanedTree = removeUnusedElements(tree.toObject());
        jsonFile.write(cleanedTree, filePath).then(() => {
          fulfill({ path: filePath, name: fileName });
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    }
  });
}

module.exports.extractFromId = extractTreeFromId;
