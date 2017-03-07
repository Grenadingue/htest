const sioClients = require('../managers/sioClients');
const fileUploader = require('../managers/fileUploader');
const treeFamilies = require('../managers/treeFamilies');
const trees = require('../managers/trees');

module.exports.retrieveAvailableTrees = treeFamilies.retrieveAvailableTrees;
module.exports.retrieveTreesFromRootId = treeFamilies.retrieveTreesFromRootId;
module.exports.retrieveTreeFromId = trees.retrieveTreeFromId;
module.exports.deleteTreesFromRootId = treeFamilies.deleteTreesFromRootId;
module.exports.deleteTreeFromId = trees.deleteTreeFromId;
module.exports.validateNewTreeFamilyName = treeFamilies.validateNewTreeFamilyName;
module.exports.validateNewTreeData = treeFamilies.validateNewTreeData;
module.exports.processNewTreeSubmission = treeFamilies.processNewTreeSubmission;
module.exports.validateNewTreeVersionData = treeFamilies.validateNewTreeVersionData;
module.exports.processNewTreeVersionSubmission = treeFamilies.processNewTreeVersionSubmission;
module.exports.serveTreeAsFile = trees.serveTreeAsFile;
module.exports.onFileUploadSuccess = treeFamilies.onFileUploadSuccess;
module.exports.onFileUploadFailure = treeFamilies.onFileUploadFailure;
module.exports.register = sioClients.register;

module.exports.unregister = (clientId) => {
  sioClients.unregister(clientId);
  fileUploader.clearClientUploads(clientId);
};
