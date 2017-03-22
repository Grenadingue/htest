const util = require('util');

const TreeFamily = require('../models/TreeFamily').Model;
const Tree = require('../models/Tree').Model;

function findAnswerConsequencesPieces(node, treeFamilyPieces) {
  if ('answerConsequences' in node && node.answerConsequences.length !== 0) {
    node.answerConsequences.forEach((answerConsequence) => {
      treeFamilyPieces.push(answerConsequence);
    });
  }
}

function findWholeNodesPieces(node, treeFamilyPieces, crossReferences) {
  if (crossReferences.indexOf(String(node._id)) !== -1) {
    return;
  }
  console.log(String(node._id), 'passed');
  treeFamilyPieces.push(node);
  findAnswerConsequencesPieces(node, treeFamilyPieces);
  if ('branches' in node) {
    node.branches.forEach((branchNode) => {
      findWholeNodesPieces(branchNode, treeFamilyPieces, crossReferences);
    });
  }
}

function findWholeTreePieces(tree, treeFamilyPieces, crossReferences) {
  treeFamilyPieces.push(tree);
  tree.root.forEach((rootNode) => {
    findWholeNodesPieces(rootNode, treeFamilyPieces, crossReferences);
  });
}

function removeAllTreePieces(treePieces) {
  return new Promise((fulfill, reject) => {
    for (const index in treePieces) {
      const piece = treePieces[index];

      piece.remove().then(() => {
        if (Number(index) === treePieces.length - 1) {
          fulfill();
        }
      }).catch((error) => {
        reject(error);
      });
    }
  });
}

function retrieveWholeFamily(id) {
  return new Promise((fulfill, reject) => {
    TreeFamily.findById(id).then((treeFamily) => {
      if (!treeFamily) {
        reject(`Tree family id ${id} not found`);
      }
      fulfill(treeFamily);
    }).catch((error) => {
      reject(error);
    });
  });
}

function removeTree(id) {
  return new Promise((fulfill, reject) => {
    Tree.findById(id).then((tree) => {
      if (!tree) {
        reject(`Tree id ${id} not found`);
      }
      console.log(util.format('%s', util.inspect(tree, { depth: Infinity })));
      console.log();
      retrieveWholeFamily(tree.familyId).then((family) => {
        const allReferences = [];
        const treePiecesToDelete = [];
        let treeIndex = 0;
        for (; treeIndex !== family.trees.length; treeIndex += 1) {
          if (String(family.trees[treeIndex]._id) === id) {
            break;
          }
        }
        if (treeIndex >= family.trees.length || String(family.trees[treeIndex]._id) !== id) {
          reject(`Tree id ${id} not found inside family id ${family._id}`);
        }
        family.references.forEach((treeReferences) => {
          allReferences.push(...treeReferences);
        });
        for (let i = 0; i !== allReferences.length; i += 1) {
          allReferences[i] = String(allReferences[i]);
        }
        findWholeTreePieces(tree, treePiecesToDelete, allReferences);
        console.log(allReferences);
        console.log();
        console.log(treePiecesToDelete);
        console.log();
        removeAllTreePieces(treePiecesToDelete).then(() => {
          family.trees.splice(treeIndex, 1);
          family.references.splice(treeIndex, 1);
          family.save().then(() => {
            fulfill();
          }).catch((error) => {
            console.log(error);
            reject(error);
          });
        }).catch((error) => {
          console.log(error);
          reject(error);
        });
      }).catch((error) => {
        console.log(error);
        reject(error);
      });
      fulfill();
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  });
}

module.exports.removeFromId = removeTree;
