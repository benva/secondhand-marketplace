var passport = require('passport');

var UserModel = require('../models/user');
var ListingModel = require('../models/listing');

// User profile page
exports.userPage = function(req, res, next) {
  var username = req.params.username;

  // If username exists, show page
  UserModel.findOne({ username: username }, function(err, user) {
    if(user === null) {
      // Send to 404 page

    }
    // Find listings by this user
    ListingModel.find({ seller: username }).sort([['updatedAt', 'desc']]).exec(function(err, listings) {
      if(err) {
        return next(err);
      }
      
      res.render('user', { title: user.username, user: user, listings: listings });
    });
  });
};

// Create new user
exports.createUser = function(req, res, next) {

  var newUser = new UserModel({
    username: req.body.username,
    email: req.body.email,
    rating: 0.0,
    sales: 0
  });
  var password = req.body.password;

  UserModel.register(newUser, password, function(err, account) {
    if(err) {
      // Send any errors to register page
      if(err.name == 'MongoError') {
        // bad practice to change existing variable like this
        err.message = 'User already exists with email address ' + newUser.email;
      }
      
      return res.render('register', { title: 'Register', error: err.message });
    }
    // Log in user
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};
