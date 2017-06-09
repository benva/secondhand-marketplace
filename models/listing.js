var mongoose = require('mongoose');
var shortid = require('shortid');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// Schema for a listing
var ListingSchema = new Schema({
  _id : {
    type : String,
    'default' : shortid.generate
  },
  seller : String,
  designer : {type: String, index: true}, //indexing for designer names, because people will query this the most
  title : String,
  category : String,
  size : Schema.Types.Mixed,
  conversion : String,
  price : Number,
  description : String,
  lastBumped : Date,
  photos : [String],
  sold : Date,
  feedback : {
    rating : Number,
    comment : String
  },
  buyer : String
});

ListingSchema.plugin(timestamps);

module.exports = mongoose.model('listing', ListingSchema);
