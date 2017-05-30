var express = require('express');
var router = express.Router();
var passport = require('passport');

var listings = require('../controllers/listings');
var users = require('../controllers/users');
var index = require('../controllers/index');

/* GET home page */
router.get('/', index.home);

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

/* POST login user */
// Login with email/username
router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.redirect('/');
});

/* POST add new user */
router.post('/register', users.createUser);

/* POST add new listing */
router.post('/create', listings.createListing);

module.exports = router;
