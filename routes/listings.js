var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/images/' });

var listings = require('../controllers/listings');

/* CREATE */
router.get('/create', function(req, res, next) {
  if(req.user) {
    return res.render('create', { title: 'New Listing', csrfToken: req.csrfToken() });
  }
  var error = 'You need to login before creating a listing';
  res.render('login', { title: 'Login', error: error, csrfToken: req.csrfToken() });
});

router.post('/create', upload.array('photos', 7), listings.createListing);

/* EDIT */
router.get('/:id/edit', listings.editListing);
router.put('/:id/edit', listings.editPost);

/* DELETE */
router.delete('/:id/delete', listings.delete);

/* BUMP */
router.post('/:id/bump', listings.bump);

/* LISTING PAGE */
router.get('/:id', listings.listingPage);

module.exports = router;
