var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;


var SearchSchema = new Schema({
    search: String,
});

SearchSchema.plugin(timestamps);

module.exports = mongoose.model('search', SearchSchema);
