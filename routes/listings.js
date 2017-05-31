var express = require('express');
var router = express.Router();

var listings = require('../controllers/listings');

/* LISTING PAGE */
router.get('/:id', listings.listingPage);

/* EDIT */
router.get('/:id/edit', listings.editListing);
router.post('/:id/edit', listings.editPost);

/* DELETE */
router.post('/:id/delete', listings.delete);

/* DROP PRICE */
router.post('/:id/bump', listings.bump);

module.exports = router;
