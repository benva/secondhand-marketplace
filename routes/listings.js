var express = require('express');
var router = express.Router();

var listings = require('../controllers/listings');

/* LISTING PAGE */
router.get('/:id', listings.listingPage);

/* EDIT */
router.get('/:id/edit', listings.editListing);
router.put('/:id/edit', listings.editPost);

/* DELETE */
router.delete('/:id/delete', listings.delete);

/* BUMP */
router.post('/:id/bump', listings.bump);

module.exports = router;
