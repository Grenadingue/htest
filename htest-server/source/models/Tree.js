const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  id: String,
  familyId: String,
  name: String,
  root: [{ type: Schema.ObjectId, ref: 'abstractNode' }],
});

function autoPopulateRoot(next) {
  this.populate({ path: 'root' });
  next();
}

TreeSchema.pre('findOne', autoPopulateRoot);
TreeSchema.statics.findAll = () => mongoose.find(this, {});
TreeSchema.statics.findById = (_id) => mongoose.findOne(this, { _id });
TreeSchema.statics.save = () => mongoose.save(this);

const Tree = mongoose.model('tree', TreeSchema);

module.exports.Schema = TreeSchema;
module.exports.Model = Tree;
