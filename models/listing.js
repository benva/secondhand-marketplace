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
  designer : String,
  title : String,

  search : {type: String, index: true},
  lev: {type: Number, default: 0},

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
