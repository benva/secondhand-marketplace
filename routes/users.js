var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');

/* GET user list page */
router.get('/', usersController.userList);

/* GET user page. */
router.get('/:username', usersController.userPage);

module.exports = router;
