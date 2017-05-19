var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/covenant');
var User = require('../models/user');

/* GET user list page */
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
    if(err) {
      res.render('error', { 'error': err })
    } else {
      res.render('users', { 'users': users });
    }
  });
});

/* GET user page. */
router.get('/:username', function(req, res, next) {
  var username = req.params.username;

  // If username exists, show page
  User.findOne({ username: username }, function(err, user) {
    if(user == null) {
      res.render('This user does not exist!')
    } else {
      res.render('user', { 'user': user })
    }
  });
});

module.exports = router;
