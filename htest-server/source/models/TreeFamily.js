const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const TreeFamilySchema = new Schema({
  trees: [{ type: Schema.ObjectId, ref: 'tree' }],
});

function autoPopulateFamily(next) {
  this.populate({ path: 'trees' });
  next();
}

TreeFamilySchema.pre('findOne', autoPopulateFamily);
TreeFamilySchema.statics.findAll = () => mongoose.find(this, {});
TreeFamilySchema.statics.findById = (_id) => mongoose.findOne(this, { _id });
TreeFamilySchema.statics.save = () => mongoose.save(this);

const TreeFamily = mongoose.model('treeFamily', TreeFamilySchema);

module.exports.Schema = TreeFamilySchema;
module.exports.Model = TreeFamily;
