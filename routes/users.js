var express = require('express');
var router = express.Router();
var csrf = require('csurf');


var users = require('../controllers/users');

/* REGISTER */
router.get('/register',csrf( {cookie: true }), function(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  }
  res.render('register', { title: 'Register', csrfToken: req.csrfToken()});
});

router.post('/register', csrf( {cookie: true }), users.createUser);

/* USER PAGE */
router.get('/:username', users.userPage);

module.exports = router;
