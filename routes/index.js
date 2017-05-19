var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/covenant');
var User = require('../models/user');
var Listing = require('../models/listing');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

/* GET registration page */
router.get('/registration', function(req, res, next) {
  res.render('registration', { title: 'Create New User' })
});

/* GET listing creation page */
router.get('/create', function(req, res, next) {
  res.render('create', { title: 'Create New Listing' })
});

/* POST add new user */
router.post('/adduser', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  // Finish this!!
  var newUser = new User({
    username: username,
    password: password
  });

  newUser.save(function(err) {
    if(err) {
      res.render('error', { 'error': err })
    } else {
      res.redirect('./users')
    }
  });
});

/* POST add new listing */
router.post('/addlisting', function(req, res, next) {
  var designer = req.body.designer;
  var title = req.body.title;

  // Finish this!!
  var newListing = new Listing({
    designer: designer,
    title: title
  });

  newListing.save(function(err) {
    // console.log(newListing._id)
    if(err) {
      res.render('error', { 'error': err })
    } else {
      res.redirect('./listings')
    }
  });
});

module.exports = router;
