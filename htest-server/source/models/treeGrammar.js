const objectPrototype = Object.prototype.toString.call;

const validTargetPlatform = [String];
const validAnswerPossibilities = [String];
const validAnswerConsequences = [String, Boolean];

const validTree = {
  id: { mandatory: false, dataType: String },
  familyId: { mandatory: false, dataType: String },
  name: { mandatory: true, dataType: String },
  root: { mandatory: true, dataType: Array, minLength: 1 },
};

const validAbstractNode = {
  id: { mandatory: false, dataType: String },
  name: { mandatory: true, dataType: String },
  exec: { mandatory: false, dataType: String },
  targetPlatforms: { mandatory: false, dataType: Array, unionTypes: validTargetPlatform, minLength: 1 },
  branches: { mandatory: false, dataType: Array, minLength: 0 },
};

const validProcedureNode = {
  id: { mandatory: false, dataType: String },
  name: { mandatory: true, dataType: String },
  exec: { mandatory: false, dataType: String },
  targetPlatforms: { mandatory: false, dataType: Array, unionTypes: validTargetPlatform, minLength: 1 },
  instruction: { mandatory: true, dataType: String },
  question: { mandatory: true, dataType: String },
  answerPossibilities: { mandatory: true, dataType: Array, unionTypes: validAnswerPossibilities, minLength: 1 },
  answerConsequences: { mandatory: true, dataType: Array, unionTypes: validAnswerConsequences, minLength: 1 },
  branches: { mandatory: false, dataType: Array, minLength: 0 },
};

const validPointerNode = {
  id: { mandatory: false, dataType: String },
  name: { mandatory: true, dataType: String },
  targetPlatforms: { mandatory: false, dataType: Array, unionTypes: validTargetPlatform, minLength: 1 },
  target: { mandatory: true, dataType: String },
};

const validationSets = {
  objects: [
    validTree,
    validAbstractNode,
    validProcedureNode,
    validPointerNode,
  ],
  unions: [
    validTargetPlatform,
    validAnswerPossibilities,
    validAnswerConsequences,
  ],
};

function convertValidationObjectDataTypes(validationObject) {
  for (const criteriaKey in validationObject) {
    const validationCriteria = validationObject[criteriaKey];
    validationCriteria.dataType = objectPrototype(validationCriteria.dataType());
  }
}

function convertValidationUnionsyDataTypes(validationUnion) {
  for (const criteriaKey in validationUnion) {
    validationUnion[criteriaKey] = objectPrototype(validationUnion[criteriaKey]());
  }
}

function convertValidationObjectsDataTypes() {
  for (const validationObject of validationSets.objects) {
    convertValidationObjectDataTypes(validationObject);
  }
  for (const validationUnion of validationSets.unions) {
    convertValidationUnionsyDataTypes(validationUnion);
  }
}

convertValidationObjectsDataTypes();

module.exports.tree = validTree;
module.exports.abstractNode = validAbstractNode;
module.exports.procedureNode = validProcedureNode;
module.exports.pointerNode = validPointerNode;
