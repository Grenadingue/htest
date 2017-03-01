const mongoose = require('../libraries/mongoose');

const Schema = mongoose.Schema;

const AnswerConsequenceSchema = new Schema({
  answerValidity: Boolean,
  answerConsequence: String,
});

const AnswerConsequence = mongoose.model('answerConsequence', AnswerConsequenceSchema);

module.exports.Schema = AnswerConsequenceSchema;
module.exports.Model = AnswerConsequence;
