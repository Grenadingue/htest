const path = require('path');

function loadAndValidate(filePath) {
  return new Promise((fulfill, reject) => {
    const extension = path.extname(filePath);
    const extensionReference = '.json';

    if (extension !== extensionReference) {
      return reject(`Invalid file format: expected '${extensionReference}', found '${extension}'`);
    }

    try {
      const tree = require(filePath); // eslint-disable-line global-require, import/no-dynamic-require
      return fulfill(tree);
    } catch (error) {
      let errorMessage = error;
      if (error instanceof SyntaxError) {
        errorMessage = error.message.split(':')[1].substr(1);
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      return reject(errorMessage);
    }
  });
}

module.exports = loadAndValidate;
