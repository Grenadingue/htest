const downloadDirectory = require('../config/base.config').fileSystem.downloadDirectory;
const jsonFile = require('../libraries/jsonFile');
const Tree = require('../models/Tree').Model;
const treeGrammarModels = require('../models/treeGrammar');
const path = require('path');
const fs = require('fs');

const abstractNodeGrammar = treeGrammarModels.abstractNode;
const pointerNodeGrammar = treeGrammarModels.pointerNode;
const procedureNodeGrammar = treeGrammarModels.procedureNode;

function removeUndesiredMongooseElements(object) {
  if ('__v' in object) {
    delete object.__v;
  }
  if ('_type' in object) {
    delete object._type;
  }
}

function removeEmptyElementsInNode(node, nodeGrammar) {
  // remove any empty array found (which is available in the nodeGrammar)
  for (const nodeKey in node) {
    for (const referenceKey in nodeGrammar) {
      if (nodeKey === referenceKey) {
        const reference = nodeGrammar[referenceKey];
        if (reference.dataType === Object.prototype.toString.call(Array()) && node[nodeKey].length === 0) { // eslint-disable-line no-array-constructor
          delete node[nodeKey];
        }
        break;
      }
    }
  }
}

function removeUnusedElementsInAbstractNode(node) {
  removeEmptyElementsInNode(node, abstractNodeGrammar);
}

function removeUnusedElementsInPointerNode(node) {
  removeEmptyElementsInNode(node, pointerNodeGrammar);
  // branches are present in PointerNode from AbstractNode inheritence but are never used in PointerNode
  if ('branches' in node && node.branches.length === 0) {
    delete node.branches;
  }
}

function removeUnusedElementsInProcedureNode(node) {
  removeEmptyElementsInNode(node, procedureNodeGrammar);
  // convert answerConsequences from an Array of AnswerConsequence to an Array of Boolean/String
  if ('answerConsequences' in node) {
    const answerConsequences = [];
    node.answerConsequences.forEach((answerConsequence) => {
      if ('answerValidity' in answerConsequence) {
        answerConsequences.push(answerConsequence.answerValidity);
      } else {
        answerConsequences.push(answerConsequence.answerConsequence);
      }
    });
    node.answerConsequences = answerConsequences;
  }
}

const removeUnusedElementsFrom = {
  abstractNode: removeUnusedElementsInAbstractNode,
  pointerNode: removeUnusedElementsInPointerNode,
  procedureNode: removeUnusedElementsInProcedureNode,
};

function removeUnusedElementsInNode(node) {
  if ('_type' in node) {
    removeUnusedElementsFrom[node._type](node);
  } else {
    removeUnusedElementsFrom.abstractNode(node);
  }
  removeUndesiredMongooseElements(node);
  if ('branches' in node) {
    node.branches.forEach((branch) => {
      removeUnusedElementsInNode(branch);
    });
  }
}

function removeUnusedElements(tree) {
  removeUndesiredMongooseElements(tree);
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
