var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// Schema for a listing
var ListingSchema = new Schema({
  seller : String,
  designer : String,
  title : String,
  category : String,
  price : Number,
  oldPrices : [Number],
  size : Schema.Types.Mixed,
  description : String,
  photos : [String],
  sold : Boolean,
  feedback : {
    rating : Number,
    comment : String
  },
  buyer : String
});

ListingSchema.plugin(timestamps);

module.exports = mongoose.model('listing', ListingSchema);
