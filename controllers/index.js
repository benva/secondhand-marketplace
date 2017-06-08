var passport = require('passport');

var SearchModel = require('../models/search');
var ListingModel = require('../models/listing');

// Search form
function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// Home page
exports.home = function(req, res, next) {
  console.log(req.query, " this is my query")
  var searchQuery = {};
  //input box text
  if (req.query.textSearch){
      var regex = new RegExp(escapeRegex(req.query.textSearch), 'gi');
      searchQuery.title = regex;
  }
  //search Query made on the index mage
  if (req.query) {
     console.log(searchQuery)
     ListingModel.find(searchQuery).sort([['lastBumped', 'desc']]).exec(function(err, listings) {
         if(err) {
            return console.log(err);
         } else {
            //will return empty array not undefined, if not found, renders it in index
           console.log(req.query)
            res.render("index", {title: "Listings for: " + req.query.textSearch , listings: listings });

         }
     });

     //saving search Results
     var searchSave = new SearchModel({
       search: req.query.search
     });
     searchSave.save(function(err) {
       if(err) {
         return next(err);
       }
       console.log('search saved')
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
