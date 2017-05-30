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
    return res.redirect('/');
  } else {
    return res.render('login', { title: 'Login' });
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
    return res.redirect('/');
  } else {
    return res.render('register', { title: 'Register' });
  }
});

/* GET listing creation page */
router.get('/create', function(req, res, next) {
  if(req.user) {
    return res.render('create', { title: 'New Listing' });
  } else {
    return res.redirect('./login');
  }
});

/* POST login user */
// Login with email/username
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if(err) { 
      return next(err);
    }
    if(!user) { 
      var message = 'Invalid username or password'; 
      return res.render('login', { title: 'Login', error: message }); 
    }
    req.logIn(user, function(err) {
      if(err) { 
        return next(err); 
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

/* POST add new user */
router.post('/register', users.createUser);

/* POST add new listing */
router.post('/create', listings.createListing);

module.exports = router;
