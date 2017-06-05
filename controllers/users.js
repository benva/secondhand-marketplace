var passport = require('passport');

var UserModel = require('../models/user');
var ListingModel = require('../models/listing');

// User profile page
exports.userPage = function(req, res, next) {
  var username = req.params.username;

  // If username exists, show page
  UserModel.findOne({ username: username }, function(err, user) {
    if(user === null) {
      return res.render('error', { error: '404 not found' });
    }
    // Find listings by this user
    ListingModel.find({ seller: username }).sort([['lastBumped', 'desc']]).exec(function(err, listings) {
      if(err) {
        return next(err);
      }

      res.render('user', { title: user.username, user: user, listings: listings });
    });
  });
};

// Create new user
exports.createUser = function(req, res, next) {
  var newUser = UserModel({
    username: req.body.username,
    email: req.body.email,
    rating: 0.0,
    sales: 0
  });
  var password = req.body.password;

  UserModel.register(newUser, password, function(err, account) {
    // Send any errors to register page
    if(err) {
      var msg;
      // This might need to be changed when input is checked
      if(err.name === 'MongoError') {
        msg = 'User already exists with email address ' + newUser.email;
      } else {
        msg = err.message;
      }
      return res.render('register', { title: 'Register', error: msg });
    }
    // Login newly created user
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};
