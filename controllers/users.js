var passport = require('passport');
var validator = require('validator');

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

// Checks that data submitted by user is valid, returns what errors occured
function validUser(req) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var errors = '';

  if(validator.isEmpty(username)) {
    errors += 'Username is empty\n';
  }
  else if(!validator.isAlphanumeric(username)) {
    errors += 'Username can only contain letters and numbers\n';
  }

  if(validator.isEmpty(password)) {
    errors += 'Password is empty\n';
  }
  else if(!validator.isLength(password, {min: 8, max: 32})) {
    errors += 'Password must be between 8 and 32 characters long\n';
  }

  if(validator.isEmpty(email)) {
    errors += 'Email is empty\n';
  }
  else if(!validator.isEmail(email)) {
    errors += 'Email must be a valid email address\n';
  }

  return errors;
}

// Create new user
exports.createUser = function(req, res, next) {
  // If user info is invalid, reload the page with given errors
  var errors = validUser(req);
  if(errors) {
    return res.render('register', {
      title: 'Register',
      error: errors,
      username: req.body.username,
      email: req.body.email,
      csrfToken: req.csrfToken()
    });
  }

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
      return res.render('register', {
        title: 'Register',
        error: msg,
        username: newUser.username,
        email: newUser.email,
        csrfToken: req.csrfToken()
      });
    }
    // Login newly created user
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};
