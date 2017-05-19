var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

// Schema for a user
var UserSchema = new Schema({
  username : { type : String, required : true, unique : true },
  password : { type : String, required : true },
  rating : Number,
  sales : Number,
  locations : [
    {
      latitude : Number,
      longitude : Number
    }
  ]
});

UserSchema.plugin(timestamps);

module.exports = mongoose.model('user', UserSchema);
