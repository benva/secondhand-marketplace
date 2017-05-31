var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var MessageModel = require('./message');

var CoversationSchema = new Schema({
  seller : String,
  buyer : String,
  listing : ObjectID,
  messages : [MessageModel],
  unread : Boolean
});

ConversationSchema.plugin(timestamps);

module.exports = mongoose.model('conversation', ConversationSchema);