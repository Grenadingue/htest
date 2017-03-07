const downloadDirectory = require('../config/base.config').fileSystem.downloadDirectory;
const jsonFile = require('../libraries/jsonFile');
const Tree = require('../models/Tree').Model;
const path = require('path');
const fs = require('fs');

// remove empty elements and some mongodb internal keys
function removeUnusedElements(tree) {
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
        const cleanedTree = removeUnusedElements(tree);
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
