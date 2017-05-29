var express = require('express');
var router = express.Router();

var listingsController = require('../controllers/listingsController');

/* GET listing page */
router.get('/:id', listingsController.listingPage);

router.get('/:id/edit', listingsController.editListing);

router.post('/:id/edit', listingsController.editPost);

router.get('/:id/delete', listingsController.deleteListing);

module.exports = router;
