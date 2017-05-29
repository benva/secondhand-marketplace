var User = require('../models/user');
var Listing = require('../models/listing');

// User profile page
exports.userPage = function(req, res, next) {
  var username = req.params.username;

  // If username exists, show page
  User.findOne({ username: username }, function(err, user) {
    if(user === null) {
      res.status(404).send('This user does not exist!');
    } else {
      // Find listings by this username
      Listing.find({ seller: username }).sort([['updatedAt', 'desc']]).exec(function(err, listings) {
        if(err) {
          res.render('error', { 'error': err });
        } else {
          res.render('user', { title: user.username, user: user, listings: listings });
        }
      });
    }
  });
};

// Create new user
exports.createUser = function(req, res, next) {

  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    rating: 0.0,
    sales: 0
  });
  var password = req.body.password;

  User.register(newUser, password, function(err, account) {
    if(err) {
      res.render('error', { 'error': err });
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  });
};
