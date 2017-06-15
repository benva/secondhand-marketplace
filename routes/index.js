var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var index = require('../controllers/index');

router.get('/', index.home);

// Finder
router.get('/finder', index.home);

/* LOGIN */
router.get('/login',csrf( {cookie: true }), function(req, res, next) {
  if(req.user) {
    return res.redirect('/');
  }
  res.render('login', { title: 'Login', csrfToken: req.csrfToken()});
});
router.post('/login', index.login);

/* LOGOUT */
router.get('/logout', function(req, res, next) {
  // req.logout();
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});

/* MESSAGES */
router.get('/messages', index.messages);

module.exports = router;
