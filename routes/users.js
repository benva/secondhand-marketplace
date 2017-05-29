var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');

/* GET user page. */
router.get('/:username', usersController.userPage);

module.exports = router;
