const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const AbstractNode = require('./AbstractNode').Model;

const PointerNodeSchema = new Schema({ // extends AbstractNodeSchema
  target: String,
});

PointerNodeSchema.statics.save = mongoose.promises.save;
PointerNodeSchema.statics.remove = mongoose.promises.remove;

const PointerNode = AbstractNode.discriminator('pointerNode', PointerNodeSchema);

module.exports.Schema = PointerNodeSchema;
module.exports.Model = PointerNode;
