var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var Listing = mongoose.model('listing').schema;
var Message = mongoose.model('message').schema;

var ConversationSchema = new Schema({
  listing : Listing,
  seller : String,
  buyer : String,
  messages : [Message],
  unread : Boolean
});

ConversationSchema.plugin(timestamps);

module.exports = mongoose.model('conversation', ConversationSchema);