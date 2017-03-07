const grammarModel = require('../models/treeGrammar');

const objectPrototype = Object.prototype.toString.call;

function validateObject(object, validationCriteria) {
  const objectAttributesValidity = [];

  // look for expected attributes
  // iterate over known valid attributes
  Object.keys(validationCriteria).forEach((criteriaKey) => {
    const criteria = validationCriteria[criteriaKey];
    const objectAttrValidity = {
      validity: undefined,
      reason: 'Expected attribute',
      key: criteriaKey,
      value: undefined,
      dataTypes: { expected: criteria.dataType, found: undefined },
    };

    // iterate over input object attributes
    Object.keys(object).forEach((objectKey) => {
      const objectAttribute = object[objectKey];

      if (criteriaKey === objectKey) {
        objectAttrValidity.value = objectAttribute;
        objectAttrValidity.dataTypes.found = objectPrototype(objectAttribute);
        objectAttrValidity.validity = (objectAttrValidity.dataTypes.found === criteria.dataType);

        if ('minLength' in criteria) {
          objectAttrValidity.minLength = criteria.minLength;
          if (objectAttribute.length < criteria.minLength) {
            objectAttrValidity.validity = false;
          }
        }

        if ('unionTypes' in criteria) {
          let unionIsValid = true;
          objectAttrValidity.dataTypes.union = { expected: criteria.unionTypes, found: [] };
          for (const value of objectAttribute) {
            let dataTypeIsValid = false;
            objectAttrValidity.dataTypes.union.found.push(objectPrototype(value));
            for (const dataType of criteria.unionTypes) {
              dataTypeIsValid = (dataType === objectPrototype(value)) ? true : dataTypeIsValid;
            }
            unionIsValid = dataTypeIsValid ? unionIsValid : false;
          }
          if (!unionIsValid) {
            objectAttrValidity.validity = false;
          }
        }
      }
    });
    if (objectAttrValidity.validity === undefined) {
      objectAttrValidity.validity = !(criteria.mandatory);
    }

    objectAttributesValidity.push(objectAttrValidity);
  });

  // look for unexpected attributes
  // iterate over input object attributes
  Object.keys(object).forEach((objectKey) => {
    const objectAttribute = object[objectKey];
    const objectAttrValidity = {
      validity: false,
      reason: 'Unexpected attribute',
      key: objectKey,
      value: objectAttribute,
      dataType: objectPrototype(objectAttribute),
    };
    let unexpectedAttributeFound = true;

    // iterate over known valid attributes
    Object.keys(validationCriteria).forEach((criteriaKey) => {
      unexpectedAttributeFound = (objectKey === criteriaKey ? false : unexpectedAttributeFound);
    });

    if (unexpectedAttributeFound) {
      objectAttributesValidity.push(objectAttrValidity);
    }
  });
  return objectAttributesValidity;
}

function selectValidNodeFromInput(inputNode) {
  if ('target' in inputNode) {
    return grammarModel.pointerNode;
  } else if ('instruction' in inputNode || 'question' in inputNode || 'answerPossibilities' in inputNode || 'answerConsequences' in inputNode) {
    return grammarModel.procedureNode;
  }
  return grammarModel.abstractNode;
}

function validateNodeObject(nodeObject, level = 0) {
  return new Promise((fulfill, reject) => {
    const validNode = selectValidNodeFromInput(nodeObject);
    const nodeAttrsValidity = validateObject(nodeObject, validNode);

    for (const nodeAttrValidity of nodeAttrsValidity) {
      if (!nodeAttrValidity.validity) {
        nodeObject.validationError = nodeAttrValidity;
        return reject();
      }
    }
    if ('branches' in nodeObject) {
      validateNodesObject(nodeObject.branches, fulfill, reject, level);
      return undefined;
    }
    return fulfill();
  });
}

function validateNodesObject(nodesObject, fulfill, reject, level = 0, i = 0) {
  const node = nodesObject[i];

  if (i === nodesObject.length) {
    return fulfill();
  }
  validateNodeObject(node, level + 1).then(() => {
    validateNodesObject(nodesObject, fulfill, reject, level, i + 1);
  }).catch(() => reject());
  return undefined;
}

function validateTreeObject(inputTree) {
  return new Promise((fulfill, reject) => {
    const treeAttrsValidity = validateObject(inputTree, grammarModel.tree);

    for (const key in treeAttrsValidity) {
      const treeAttrValidity = treeAttrsValidity[key];
      if (!treeAttrValidity.validity) {
        inputTree.validationError = treeAttrValidity;
        return reject();
      }
    }
    return fulfill();
  });
}

function validateTree(inputTree) {
  return new Promise((fulfill, reject) => {
    validateTreeObject(inputTree).then(() => {
      validateNodesObject(inputTree.root, fulfill, reject);
    }).catch((error) => reject(error));
  });
}

// tree validation reader

function retrieveNodeValidationError(node, path) {
  if ('validationError' in node) {
    node.validationError.path = `${path}/${node.validationError.key}`;
    return node.validationError;
  }
  const validationError = retrieveNodesValidationError(node.branches, path);
  if (validationError !== undefined) {
    return validationError;
  }
  return undefined;
}

function retrieveNodesValidationError(nodes, path) {
  for (const nodeKey in nodes) {
    const node = nodes[nodeKey];
    const currentPath = ('name' in node && (!('validationError' in node) || node.validationError.key !== 'name')) ? `${path}/${node.name}` : `${path}/${nodeKey}`;
    const validationError = retrieveNodeValidationError(node, currentPath);
    if (validationError !== undefined) {
      return validationError;
    }
  }
  return undefined;
}

function retrieveTreeValidationError(tree) {
  const currentPath = '/';

  if ('validationError' in tree) {
    tree.validationError.path = currentPath;
    return tree.validationError;
  }
  return retrieveNodesValidationError(tree.root, `${currentPath}root`);
}

function validateTreeAndRetrieveErrors(tree) {
  return new Promise((fulfill, reject) => {
    validateTree(tree).then(() => {
      fulfill(tree);
    }).catch((error) => {
      if (error !== undefined) {
        reject(error);
      }
      const treeError = retrieveTreeValidationError(tree);
      // if (error.dataTypes.union) {
      //   console.log('union:', error.dataTypes.union);
      // }
      if ('reason' in treeError && 'key' in treeError && 'dataType' in treeError && 'value' in treeError && 'path' in treeError) {
        reject(`${treeError.reason} '${treeError.key}' of type '${treeError.dataType}' with value '${treeError.value}' at '${treeError.path}'`);
      } else if ('reason' in treeError && 'key' in treeError && 'dataTypes' in treeError && 'expected' in treeError.dataTypes && 'path' in treeError) {
        reject(`${treeError.reason} '${treeError.key}' of type '${treeError.dataTypes.expected}' at '${treeError.path}'`);
      } else {
        reject(JSON.stringify(treeError));
      }
    });
  });
}

module.exports.validate = validateTreeAndRetrieveErrors;
