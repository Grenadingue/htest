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

function createAndPopulateNode(inputNode, treePieces, existingPieces) {
  if ('_id' in inputNode) {
    return existingPieces.map[inputNode._id];
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
      const branchNode = createAndPopulateNode(inputBranchNode, treePieces, existingPieces);
      node.branches.push(branchNode);
      treePieces.push(branchNode);
    });
  }
  return node;
}

function saveTreePieces(treePieces, existingPieces, fulfill, reject, i = 0) {
  if (i !== treePieces.length) {
    const treePiece = treePieces[i];

    treePiece.save().then(() => {
      saveTreePieces(treePieces, existingPieces, fulfill, reject, i + 1);
    }).catch((error) => {
      reject(error);
    });
  } else {
    fulfill({ tree: treePieces[0], references: existingPieces.array }); // `Tree` from saveTree()
  }
}

function findAndRetrieveExistingNodes(inputNode, existingPiecesIds) {
  if ('_id' in inputNode) {
    existingPiecesIds.push(inputNode._id);
  } else if ('branches' in inputNode) {
    inputNode.branches.forEach((inputBranchNode) => {
      findAndRetrieveExistingNodes(inputBranchNode, existingPiecesIds);
    });
  }
}

function findAndRetrieveExistingPieces(tree) {
  return new Promise((fulfill, reject) => {
    let existingPiecesIds = [];
    const existingPieces = {};

    tree.root.forEach((rootNode) => {
      findAndRetrieveExistingNodes(rootNode, existingPiecesIds);
    });
    existingPiecesIds = Array.from(new Set(existingPiecesIds)); // remove duplicates
    if (existingPiecesIds.length !== 0) {
      for (const key in existingPiecesIds) {
        AbstractNode.findById(existingPiecesIds[key]).then((existingPiece) => {
          if (!existingPiece) {
            reject(`ObjectId ${existingPiecesIds[key]} not found`);
          } else {
            existingPieces[existingPiecesIds[key]] = existingPiece;
            existingPiecesIds[key] = existingPiece;
            if (Number(key) === existingPiecesIds.length - 1) {
              fulfill({ map: existingPieces, array: existingPiecesIds });
            }
          }
        }).catch((error) => {
          reject(error);
        });
      }
    } else {
      fulfill({ map: existingPieces, array: existingPiecesIds });
    }
  });
}

function saveTree(inputTree) {
  return new Promise((fulfill, reject) => {
    findAndRetrieveExistingPieces(inputTree).then((existingPieces) => {
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
        const node = createAndPopulateNode(rootNode, treePieces, existingPieces);
        tree.root.push(node);
        treePieces.push(node);
      });
      saveTreePieces(treePieces, existingPieces, fulfill, reject);
    }).catch((error) => {
      reject(error);
    });
  });
}

module.exports.save = saveTree;
