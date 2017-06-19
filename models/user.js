var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username : { type : String, required : true, unique : true },
  email : { type : String, required : true, unique : true},
  password : String,
  rating : Number,
  sales : Number,
  inbox : [{
    type : String,
    ref : 'conversation'
  }]
});

UserSchema.plugin(timestamps);
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', UserSchema);