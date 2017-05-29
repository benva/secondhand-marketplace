var express = require('express');
var router = express.Router();
var passport = require('passport');

var listingsController = require('../controllers/listingsController');
var usersController = require('../controllers/usersController');

// var User = require('../models/user');
var Listing = require('../models/listing');

/* GET home page */
router.get('/', function(req, res, next) {
  // Move this to listingsController.js
  Listing.find({}).sort([['updatedAt' , 'desc']]).exec(function(err, listings) {
    if(err) {
      res.render('error', { 'error': err });
    } else {
      res.render('index', { title: 'Covenant', user: req.user, listings: listings });
    }
  });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  if(req.user) {
    res.redirect('/');
  } else {
    res.render('login', { title: 'Login' });
  }
});

/* GET logout page */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
})

/* GET registration page */
router.get('/register', function(req, res, next) {
  if(req.user) {
    res.redirect('/');
  } else {
    res.render('register', { title: 'Register' });
  }
});

/* GET listing creation page */
router.get('/create', function(req, res, next) {
  if(req.user) {
    res.render('create', { title: 'New Listing' });
  } else {
    res.redirect('./login');
  }
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.redirect('/');
});

/* POST add new user */
router.post('/register', usersController.createUser);

/* POST add new listing */
router.post('/create', listingsController.createListing);

module.exports = router;
