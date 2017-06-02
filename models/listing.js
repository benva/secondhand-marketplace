var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// Schema for a listing
var ListingSchema = new Schema({
  seller : String,
  designer : String,
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