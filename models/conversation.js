var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var ConversationSchema = new Schema({
  listing : {
    type : String,
    ref : 'listing'
  },
  seller : String,
  buyer : String,
  messages : [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref : 'message'
  }],
  buyerUnread : {
    type : Boolean,
    default : false
  },
  sellerUnread : {
    type : Boolean,
    default : true
  }
});

ConversationSchema.plugin(timestamps);

module.exports = mongoose.model('conversation', ConversationSchema);