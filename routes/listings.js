var express = require('express');
var router = express.Router();

var listings = require('../controllers/listings');

/* GET listing page */
router.get('/:id', listings.listingPage);

router.get('/:id/edit', listings.editListing);

router.post('/:id/edit', listings.editPost);

router.get('/:id/delete', listings.deleteListing);

router.post('/:id/delete', listings.deletePost);

module.exports = router;
