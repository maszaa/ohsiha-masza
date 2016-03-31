var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Document = new Schema({
  title: {type: String, required: true},
  text: {type: String, required: true},
  category: {type: String, enum: ['Artikkeli', 'Arvostelu', 'Mielipide', 'Kommentti', 'Blogikirjoitus'], required: true},
  user: {type: String, required: true},
  insertDate: {type: Date, default: Date.now},
  modifiedDate: {type: Date, default: Date.now},
  private: {type: Boolean, default: false},
  tags: {type: [String], default: []}
});

module.exports = {Document: mongoose.model('Document', Document)};
