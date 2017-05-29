var express = require('express');
var router = express.Router();

var listingsController = require('../controllers/listingsController');

/* GET listing page */
router.get('/:id', listingsController.listingPage);

module.exports = router;
