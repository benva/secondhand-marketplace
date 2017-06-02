var passport = require('passport');

var UserModel = require('../models/user');
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
      return res.render('login', { title: 'Login', error: error });
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
    // Send any errors to register page
    if(err) {
      if(err.name == 'MongoError') {
        // bad practice to change existing variable like this
        err.message = 'User already exists with email address ' + newUser.email;
      }
      return res.render('register', { title: 'Register', error: err.message });
    }
    // Login newly created user
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Create new listing and redirect to listing page
exports.createListing = function(req, res, next) {
  // Add uploaded photos' filenames into array
  var photos = [];
  for(var i = 0; i < req.files.length; i++) {
    photos[i] = req.files[i].filename;
  }

  var newListing = new ListingModel({
    seller: req.user.username,
    designer: req.body.designer,
    title: req.body.title,
    category: req.body.category,
    size: req.body.size,
    conversion: req.body.conversion,
    price: req.body.price,
    description: req.body.description,
    lastBumped: new Date(),
    photos: photos
  });

  newListing.save(function(err) {
    if(err) {
      return next(err);
    }

    res.redirect('./listings/' + newListing._id);
  });
};
