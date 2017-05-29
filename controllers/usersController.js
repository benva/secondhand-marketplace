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
