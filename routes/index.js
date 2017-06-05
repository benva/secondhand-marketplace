var express = require('express');
var router = express.Router();
var passport = require('passport');

var index = require('../controllers/index');

router.get('/', index.home);

/* REGISTER */
router.get('/register', function(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  }
  res.render('register', { title: 'Register' });
});

router.post('/register', index.createUser);

/* LOGIN */
router.get('/login', function(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  }
  res.render('login', { title: 'Login' });
});

router.post('/login', index.login);


/* LOGOUT */
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});



module.exports = router;
