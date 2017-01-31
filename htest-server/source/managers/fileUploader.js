module.exports.onSaved = (event) => {
  console.log('new file with id', event.file.id, '; received from client id', event.file.meta.clientId, ';', event.file.name, ';', event.file.pathName);
};

module.exports.onError = (event) => {
  console.log('Error from uploader', event);
};
