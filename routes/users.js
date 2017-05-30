var express = require('express');
var router = express.Router();

var users = require('../controllers/users');

/* USER PAGE */
router.get('/:username', users.userPage);

module.exports = router;
