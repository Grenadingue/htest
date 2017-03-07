const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const AbstractNode = require('./AbstractNode').Model;

const ProcedureNodeSchema = new Schema({ // extends AbstractNodeSchema
  instruction: String,
  question: String,
  answerPossibilities: [String],
  answerConsequences: [{ type: Schema.ObjectId, ref: 'answerConsequence' }],
});

ProcedureNodeSchema.statics.save = mongoose.promises.save;

const ProcedureNode = AbstractNode.discriminator('procedureNode', ProcedureNodeSchema);

module.exports.Schema = ProcedureNodeSchema;
module.exports.Model = ProcedureNode;
