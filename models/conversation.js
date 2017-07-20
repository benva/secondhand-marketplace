var mongoose = require('mongoose');
var shortid = require('shortid');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var Listing = mongoose.model('listing').schema;
var Message = mongoose.model('message').schema;

// Schema for a conversation
var ConversationSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  listing: Listing,
  from: String,
  to: String,
  messages: [Message],
  fromUnread: {
    type: Boolean,
    default: false
  },
  toUnread: {
    type: Boolean,
    default: true
  }
});

ConversationSchema.plugin(timestamps);

module.exports = mongoose.model('conversation', ConversationSchema);