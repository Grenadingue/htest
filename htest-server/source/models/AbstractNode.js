const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const AbstractNodeSchema = new Schema({
  name: String,
  exec: String,
  targetPlatforms: [String],
  branches: [{ type: Schema.ObjectId, ref: 'abstractNode' }],
}, {
  collection: 'nodes',
  discriminatorKey: '_type',
});

function autoPopulateBranches(next) {
  this.populate({ path: 'branches answerConsequences' }); // hint: ProcedureNode.answerConsequences
  next();
}

AbstractNodeSchema.pre('find', autoPopulateBranches);
AbstractNodeSchema.statics.save = mongoose.promises.save;
AbstractNodeSchema.statics.remove = mongoose.promises.remove;

const AbstractNode = mongoose.model('abstractNode', AbstractNodeSchema);

module.exports.Schema = AbstractNodeSchema;
module.exports.Model = AbstractNode;
