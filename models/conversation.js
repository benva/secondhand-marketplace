var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;
var Message = mongoose.model('message').schema;

var ConversationSchema = new Schema({
  _id : String,
  seller : String,
  buyer : String,
  messages : [Message],
  sellerUnread : { type : Boolean, default : true },
  buyerUnread : { type : Boolean, default : false }
});

ConversationSchema.plugin(timestamps);

module.exports = mongoose.model('conversation', ConversationSchema);