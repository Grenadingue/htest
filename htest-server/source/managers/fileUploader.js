module.exports.onSaved = (event) => {
  console.log('new file received from client id', event.file.meta.clientId, ':', event.file.pathName);
};

module.exports.onError = (event) => {
  console.log('Error from uploader', event);
};
