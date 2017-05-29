var User = require('../models/user');

// User profile page
exports.userPage = function(req, res, next) {
  var username = req.params.username;

  // If username exists, show page
  User.findOne({ username: username }, function(err, user) {
    if(user === null) {
      res.status(404).send('This user does not exist!');
    } else {
      res.render('user', { 'user': user });
    }
  });
};
