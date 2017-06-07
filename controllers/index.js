var passport = require('passport');

var ListingModel = require('../models/listing');

// Home page
exports.home = function(req, res, next) {
  // Find all listings
  // Change query to more reasonable values
  ListingModel.find({}).sort([['lastBumped' , 'desc']]).exec(function(err, listings) {
    if(err) {
      return next(err);
    }
    res.render('index', { title: 'Covenant', user: req.user, listings: listings });
  });
};

// Login post
exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err) {
      return next(err);
    }
    // If login fails send error message
    if(!user) {
      var error = 'Invalid username or password';
      return res.render('login', { 
        title: 'Login', 
        error: error,
        username: req.body.username,
        csrfToken: req.csrfToken() 
      });
    }
    // Login and redirect to home page
    req.logIn(user, function(err) {
      if(err) {
        return next(err);
      }
      res.redirect('/');
    });
  })(req, res, next);
};
