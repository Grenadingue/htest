const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const TreeFamilySchema = new Schema({
  name: String,
  trees: [{ type: Schema.ObjectId, ref: 'tree' }],
});

function autoPopulateFamily(next) {
  this.populate({ path: 'trees' });
  next();
}

TreeFamilySchema.pre('findOne', autoPopulateFamily);
TreeFamilySchema.statics.findAll = mongoose.promises.findAll;
TreeFamilySchema.statics.findById = mongoose.promises.findById;
TreeFamilySchema.statics.findByName = mongoose.promises.findByName;
TreeFamilySchema.statics.save = mongoose.promises.save;

const TreeFamily = mongoose.model('treeFamily', TreeFamilySchema);

module.exports.Schema = TreeFamilySchema;
module.exports.Model = TreeFamily;
