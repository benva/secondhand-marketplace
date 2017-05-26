var User = require('../models/user');

// User list page, to be taken out
exports.userList = function(req, res, next) {
  User.find({}, function(err, users) {
    if(err) {
      res.render('error', { 'error': err });
    } else {
      res.render('users', { 'users': users });
    }
  });
};

// User profile page
exports.userPage = function(req, res, next) {
  var username = req.params.username;

  // If username exists, show page
  User.findOne({ username: username }, function(err, user) {
    if(user === null) {
      res.render('This user does not exist!');
    } else {
      // If your own page, show edit button
      // Otherwise show page as normal
      res.render('user', { 'user': user });
    }
  });
};
