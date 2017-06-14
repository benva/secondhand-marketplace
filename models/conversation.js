var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var ListingModel = require('./listing');
var MessageModel = require('./message');

var ConversationSchema = new Schema({
  _id : { type : String, ref : 'listing' },
  seller : String,
  buyer : String,
  messages : [{ type : Schema.Types.ObjectId, ref : 'message' }],
  unread : Boolean
});

ConversationSchema.plugin(timestamps);

module.exports = mongoose.model('conversation', ConversationSchema);