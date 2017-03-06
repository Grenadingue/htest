const uploadedFiles = {};

module.exports.onSaved = (event) => {
  const clientId = event.file.meta.clientId;

  uploadedFiles[clientId] = (uploadedFiles[clientId] === undefined ? [] : uploadedFiles[clientId]);
  uploadedFiles[clientId].push(event.file);

  console.log('new file with id', event.file.id, '; received from client id', event.file.meta.clientId, ';', event.file.name, ';', event.file.pathName);
};

module.exports.onError = (event) => {
  console.log('Error from uploader', event);
};

module.exports.getLastUploadFromClientId = (clientId) => {
  const lastUpload = uploadedFiles[clientId];
  return lastUpload === undefined ? lastUpload : lastUpload[lastUpload.length - 1];
};
