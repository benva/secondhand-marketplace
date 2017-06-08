var passport = require('passport');

var SearchModel = require('../models/search');
var ListingModel = require('../models/listing');
var search = require('./parts/search');

// Search form
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Home page
exports.home = function(req, res, next) {

  //search Query made on the index mage
  if (req.query.category || req.query.size || req.query.titleSearch || req.query.designerSearch) {

    //from the parts folder
    search.search(req,res,next);

  }

  else{
    // Find all listings
    // Change query to more reasonable values
    ListingModel.find({}).sort([['lastBumped' , 'desc']]).exec(function(err, listings) {
      if(err) {
        return next(err);
      }
      res.render('index', { title: 'Covenant', user: req.user, listings: listings });
    });
  }
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
