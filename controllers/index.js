var passport = require('passport');

var ListingModel = require('../models/listing');

// Search form
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Home page
exports.home = function(req, res, next) {

  if (req.query.search) {
     var regex = new RegExp(escapeRegex(req.query.search), 'gi');
     ListingModel.find({ "title": regex }).sort([['lastBumped', 'desc']]).exec(function(err, listings) {

         if(err) {
            console.log(err);
         } else {
            //will return empty array not undefined, if not found
            console.log(listings)
            res.render("index", {title: "Listings for: " + req.query.search , listings: listings });
         }
     });
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
