module.exports.addNewTree = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\taddNewTree()');
  console.log(parameters);
  if (parameters) {
    fulfill({ data: 'fake success' });
  } else {
    reject({ data: 'fake error' });
  }
});

module.exports.retrieveAvailableTrees = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tretrieveAvailableTrees()');
  console.log(parameters);
  if (parameters) {
    fulfill({ data: 'fake success' });
  } else {
    reject({ data: 'fake error' });
  }
});

module.exports.retrieveTreeFromId = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tretrieveTreeFromId()');
  console.log(parameters);
  if (parameters) {
    fulfill({ data: 'fake success' });
  } else {
    reject({ data: 'fake error' });
  }
});

module.exports.deleteTreesFromIds = (parameters) => new Promise((fulfill, reject) => {
  console.log('testTreesLibrary controller:\tdeleteTreesFromIds()');
  console.log(parameters);
  if (parameters) {
    fulfill({ data: 'fake success' });
  } else {
    reject({ data: 'fake error' });
  }
});
