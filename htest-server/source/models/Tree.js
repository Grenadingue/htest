const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  familyId: String,
  name: String,
  version: Number,
  root: [{ type: Schema.ObjectId, ref: 'abstractNode' }],
});

function autoPopulateRoot(next) {
  this.populate({ path: 'root' });
  next();
}

TreeSchema.pre('findOne', autoPopulateRoot);
TreeSchema.statics.findAll = mongoose.promises.findAll;
TreeSchema.statics.findById = mongoose.promises.findById;
TreeSchema.statics.save = mongoose.promises.save;
TreeSchema.statics.remove = mongoose.promises.remove;

const Tree = mongoose.model('tree', TreeSchema);

module.exports.Schema = TreeSchema;
module.exports.Model = Tree;
