module.exports.onSaved = (event) => {
  console.log(event.file);
};

module.exports.onError = (event) => {
  console.log('Error from uploader', event);
};
