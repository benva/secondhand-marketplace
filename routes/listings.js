var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'public/images/' });
var csrf = require('csurf')
var listings = require('../controllers/listings');

/* CREATE */
router.get('/create', csrf( {cookie: true }), function(req, res, next) {
  if(req.user) {
    return res.render('components/create', { data: {csrfToken: req.csrfToken()},
    vue:{
      head:{
        title: 'Create a Listing'
      }
    }
  });
  }
  var error = 'You need to login before creating a listing';
  res.render('components/login', { data: { error: error, csrfToken: req.csrfToken() },
    vue:{
      head:{
        title: 'Login'
      }
    }});
});

router.post('/create', upload.array('photos', 7), csrf( {cookie: true }), listings.createListing);

/* EDIT */
router.get('/:id/edit', csrf( {cookie: true }), listings.editListing);
router.put('/:id/edit', csrf( {cookie: true }), listings.editPost);

/* DELETE */
router.delete('/:id/delete', listings.delete);

/* BUMP */
router.post('/:id/bump', listings.bump);

// SEARCH RESULTS
// router.get('/', listings.search)



/* LISTING PAGE MUST BE THE LAST ROUTE */
router.get('/:id', listings.listingPage);


module.exports = router;
