var mongoose = require('mongoose');
var Schema = mongoose.Schema

var testSchema = new Schema({
  title: String,
  text: String },
  {collection: 'tests'}
);

var Test = mongoose.model('Test', testSchema);

module.exports = {Test: Test};
