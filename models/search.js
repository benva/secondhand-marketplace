var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var shortid = require('shortid');

var SearchSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  search: String,
});

SearchSchema.plugin(timestamps);

module.exports = mongoose.model('search', SearchSchema);