var express = require('express');
var router = express.Router();

var users = require('../controllers/users');

/* GET user page. */
router.get('/:username', users.userPage);

module.exports = router;
