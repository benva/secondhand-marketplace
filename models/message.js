var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  sender : String,
  recipient : String,
  body : String,
});

MessageSchema.plugin(timestamps);

module.exports = mongoose.model('message', MessageSchema);
