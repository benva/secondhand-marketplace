var express = require('express');
var router = express.Router();
var passport = require('passport');

var index = require('../controllers/index');

/* GET home page */
router.get('/', index.home);

/* GET login page */
router.get('/login', function(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  }
  res.render('login', { title: 'Login' });
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
  } 
  res.render('register', { title: 'Register' });
});

/* GET listing creation page */
router.get('/create', function(req, res, next) {
  if(req.user) {
    return res.render('create', { title: 'New Listing' });
  } 
  res.redirect('./login');
});

/* POST login user */
router.post('/login', index.login);

/* POST add new user */
router.post('/register', index.createUser);

/* POST add new listing */
router.post('/create', index.createListing);

module.exports = router;
