var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user');
var Listing = require('../models/listing');

/* GET home page */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Covenant', user: req.user });
});

/* GET login page */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET logout page */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
})

/* GET registration page */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

/* GET listing creation page */
router.get('/create', function(req, res, next) {
  // Must be logged in
  res.render('create', { title: 'New Listing' });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.redirect('/');
});

/* POST add new user */
router.post('/register', function(req, res, next) {

  var newUser = new User({
    username: req.body.username,
    email: req.body.email,
    rating: 0.0,
    sales: 0
  });
  var password = req.body.password;

  User.register(newUser, password, function(err, account) {
    if(err) {
      res.render('error', { 'error': err });
    } else {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
    }
  });
});

/* POST add new listing */
router.post('/create', function(req, res, next) {

  var newListing = new Listing({
    seller: req.user.username,
    designer: req.body.designer,
    title: req.body.title,
    // category: req.body.category,
    // price: req.body.price,
    // size: req.body.size,
    // description: req.body.description,
    sold: false
  });

  newListing.save(function(err) {
    if(err) {
      res.render('error', { 'error': err });
    } else {
      res.redirect('./listings/' + newListing._id);
    }
  });
});

module.exports = router;
