var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var ListingModel = require('./listing');
var MessageModel = require('./message');

var ConversationSchema = new Schema({
  seller : String,
  buyer : String,
  listing : { type : String, ref : 'listing' },
  messages : [{ type : Schema.Types.ObjectId, ref : 'message' }],
  unread : Boolean
});

ConversationSchema.plugin(timestamps);

module.exports = mongoose.model('conversation', ConversationSchema);