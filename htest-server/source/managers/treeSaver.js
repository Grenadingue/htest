const mongoose = require('../libraries/mongoose');
const AbstractNode = require('../models/AbstractNode').Model;
const AnswerConsequence = require('../models/AnswerConsequence').Model;
const ProcedureNode = require('../models/ProcedureNode').Model;
const PointerNode = require('../models/PointerNode').Model;
const Tree = require('../models/Tree').Model;

function createAndPopulateAnswerConsequences(inputAnswerConsequences, treePieces) {
  const answerConsequences = [];

  inputAnswerConsequences.forEach((inputAnswerConsequence) => {
    const answerConsequence = new AnswerConsequence();
    if (Object.prototype.toString.call(inputAnswerConsequence) === Object.prototype.toString.call(Boolean())) {
      answerConsequence.answerValidity = inputAnswerConsequence;
    } else {
      answerConsequence.answerConsequence = inputAnswerConsequence;
    }
    answerConsequences.push(answerConsequence);
    treePieces.push(answerConsequence);
  });
  return answerConsequences;
}

function selectValidNodeModel(inputNode) {
  if ('target' in inputNode) {
    return PointerNode;
  } else if ('instruction' in inputNode || 'question' in inputNode || 'answerPossibilities' in inputNode || 'answerConsequences' in inputNode) {
    return ProcedureNode;
  }
  return AbstractNode;
}

function createAndPopulateNode(inputNode, treePieces) {
  if ('_id' in inputNode) {
    return mongoose.Types.ObjectId(inputNode._id);
  }

  const NodeType = selectValidNodeModel(inputNode);
  const node = new NodeType();

  for (const key in inputNode) {
    const nodeAttr = inputNode[key];
    if (key === 'answerConsequences') {
      const answerConsequences = createAndPopulateAnswerConsequences(nodeAttr, treePieces);
      answerConsequences.forEach((answerConsequence) => {
        node[key].push(answerConsequence);
      });
    } else if (key !== 'branches') {
      node[key] = nodeAttr;
    }
  }
  if (inputNode.branches) {
    inputNode.branches.forEach((inputBranchNode) => {
      const branchNode = createAndPopulateNode(inputBranchNode, treePieces);
      node.branches.push(branchNode);
      treePieces.push(branchNode);
    });
  }
  return node;
}

function saveTreePieces(treePieces, fulfill, reject, i = 0) {
  if (i !== treePieces.length) {
    const treePiece = treePieces[i];

    if (Object.prototype.toString.call(treePiece) === Object.prototype.toString.call(new mongoose.Types.ObjectId())) {
      saveTreePieces(treePieces, fulfill, reject, i + 1);
    } else {
      treePiece.save().then(() => {
        saveTreePieces(treePieces, fulfill, reject, i + 1);
      }).catch((error) => {
        reject(error);
      });
    }

  } else {
    fulfill(treePieces[0]); // `Tree` from saveTree()
  }
}

function saveTree(inputTree) {
  return new Promise((fulfill, reject) => {
    const tree = new Tree();
    const treePieces = [];

    treePieces.push(tree);
    for (const key in inputTree) {
      const treeAttr = inputTree[key];
      if (key !== 'root') {
        tree[key] = treeAttr;
      }
    }
    inputTree.root.forEach((rootNode) => {
      const node = createAndPopulateNode(rootNode, treePieces);
      tree.root.push(node);
      treePieces.push(node);
    });
    saveTreePieces(treePieces, fulfill, reject);
  });
}

module.exports.save = saveTree;
