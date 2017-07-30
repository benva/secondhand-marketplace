var passport = require('passport');

var SearchModel = require('../models/search');
var ListingModel = require('../models/listing');
var search = require('./parts/search');


// Home page
exports.home = function (req, res, next) {

  //search Query made on the index mage
  if (req.query.category || req.query.size || req.query.minPrice || req.query.maxPrice || req.query.finderSearch) {

    //from the parts folder
    search.search(req, res, next);
  } else {
    // Find all listings
    // Change query to more reasonable values
    ListingModel.find({}).sort([
        ['lastBumped', 'desc']
      ])
      .exec(function (err, listings) {
        var index = {
          data: {
            listings: listings
          },
          vue: {
            head: {
              title: 'Covenant',
            },
            components: ["categorySize"]
          }
        };
        if (err) {
          return next(err);
        }
        if (!req.user) {
          res.render('index', index);
        } else {
          index.data.user = req.user;
          res.render('index', index);
        }

      });
  }
};

// Login post
exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    // If login fails send error message
    if (!user) {
      var error = 'Invalid username or password';
      return res.render('pages/login', {
        data: {
          title: 'Login',
          error: error,
          username: req.body.username,
          csrfToken: req.csrfToken()
        }
      });
    }
    // Login and redirect to home page
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/');
    });
  })(req, res, next);
};