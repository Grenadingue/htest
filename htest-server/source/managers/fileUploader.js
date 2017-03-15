const fs = require('fs');

const uploadedFiles = {};

module.exports.onSaved = (event) => {
  if (event.file.success) {
    const clientId = event.file.meta.clientId;

    uploadedFiles[clientId] = (uploadedFiles[clientId] === undefined ? [] : uploadedFiles[clientId]);
    uploadedFiles[clientId].push(event.file);
    console.log('new file with id', event.file.id, '; received from client id', event.file.meta.clientId, ';', event.file.name, ';', event.file.pathName);
  }
};

module.exports.onError = (event) => {
  const clientId = event.file.meta.clientId;

  uploadedFiles[clientId] = (uploadedFiles[clientId] === undefined ? [] : uploadedFiles[clientId]);
  uploadedFiles[clientId].push(event.file);
  console.log('File upload error: file id', event.file.id, '; received from client id', event.file.meta.clientId, ';', event.file.name, ';', event.file.pathName);
};

function retrieveLastUploadFromClientId(clientId) {
  const lastUpload = uploadedFiles[clientId];
  return lastUpload === undefined ? lastUpload : lastUpload[lastUpload.length - 1];
}

module.exports.getLastUploadFromClientId = (clientId) => new Promise((fulfill, reject) => {
  const file = retrieveLastUploadFromClientId(clientId);

  if (file !== undefined && file.success === true) {
    fulfill(file);
  } else {
    reject(`'${file.name}': upload error (info: max upload size 16 MB)`);
  }
});

module.exports.clearClientUploads = (clientId) => {
  if (uploadedFiles[clientId] !== undefined) {
    uploadedFiles[clientId].forEach((uploadedFile) => {
      fs.unlink(uploadedFile.pathName, () => {
        console.log(`Removed '${uploadedFile.pathName}' associated with client id '${clientId}'`);
      });
    });
  }
  uploadedFiles[clientId] = undefined;
};
