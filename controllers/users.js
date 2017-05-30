var UserModel = require('../models/user');
var ListingModel = require('../models/listing');

// User profile page
exports.userPage = function(req, res, next) {
  var username = req.params.username;

  // If username exists, show page
  UserModel.findOne({ username: username }, function(err, user) {
    if(user === null) {
      // Send to 404 page
      return res.render('error', { error: error });
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

