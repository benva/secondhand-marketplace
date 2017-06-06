var express = require('express');
var router = express.Router();

var index = require('../controllers/index');

router.get('/', index.home);

/* LOGIN */
router.get('/login', function(req, res, next) {
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

module.exports = router;
