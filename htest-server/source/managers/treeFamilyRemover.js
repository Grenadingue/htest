const TreeFamily = require('../models/TreeFamily').Model;
const Tree = require('../models/Tree').Model;

function findAnswerConsequencesPieces(node, treeFamilyPieces) {
  if ('answerConsequences' in node && node.answerConsequences.length !== 0) {
    node.answerConsequences.forEach((answerConsequence) => {
      treeFamilyPieces.push(answerConsequence);
    });
  }
}

function findWholeNodesPieces(node, treeFamilyPieces) {
  treeFamilyPieces.push(node);
  findAnswerConsequencesPieces(node, treeFamilyPieces);
  if ('branches' in node) {
    node.branches.forEach((branchNode) => {
      findWholeNodesPieces(branchNode, treeFamilyPieces);
    });
  }
}

function findWholeTreePieces(inputTree, treeFamilyPieces) {
  return new Promise((fulfill, reject) => {
    treeFamilyPieces.push(inputTree);
    Tree.findById(inputTree._id).then((tree) => {
      if ('root' in tree) {
        let rootIndex = 0;
        tree.root.forEach((rootNode) => {
          if (!rootNode) {
            reject(`Node id ${rootNode._id} not found`);
          }
          findWholeNodesPieces(rootNode, treeFamilyPieces);
          if (rootIndex === tree.root.length - 1) {
            fulfill();
          }
          rootIndex += 1;
        });
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

function removeAllTreeFamilyPieces(treeFamilyPieces) {
  return new Promise((fulfill, reject) => {
    for (const index in treeFamilyPieces) {
      const piece = treeFamilyPieces[index];

      piece.remove().then(() => {
        if (Number(index) === treeFamilyPieces.length - 1) {
          fulfill();
        }
      }).catch((error) => {
        reject(error);
      });
    }
  });
}

function removeTree(trees, fulfill, reject, treeFamilyPieces, treeIndex = 0) {
  if (treeIndex === trees.length) {
    removeAllTreeFamilyPieces(treeFamilyPieces).then(() => {
      fulfill();
    }).catch((error) => {
      reject(error);
    });
  } else {
    const tree = trees[treeIndex];
    findWholeTreePieces(tree, treeFamilyPieces).then(() => {
      removeTree(trees, fulfill, reject, treeFamilyPieces, treeIndex + 1);
    }).catch((error) => {
      reject(error);
    });
  }
}

function removeTreeFamily(id) {
  return new Promise((fulfill, reject) => {
    const treeFamilyPieces = [];

    TreeFamily.findById(id).then((treeFamily) => {
      if (!treeFamily) {
        reject(`Tree family id ${id} not found`);
      }
      treeFamilyPieces.push(treeFamily);
      if ('trees' in treeFamily) {
        removeTree(treeFamily.trees, fulfill, reject, treeFamilyPieces);
      }
    }).catch((error) => {
      reject(error);
    });
  });
}

module.exports.removeFromId = removeTreeFamily;
