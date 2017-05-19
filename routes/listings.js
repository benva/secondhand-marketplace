var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/covenant');
var Listing = require('../models/listing');

/* GET list of listings */
router.get('/', function(req, res, next) {
  Listing.find({}, function(err, listings) {
    if(err) {
      res.render('error', { 'error': err })
    } else {
      res.render('listings', { 'listings': listings });
    }
  });
});

/* GET listing page */
router.get('/:id', function(req, res, next) {
  var id = req.params.id;

  // If listing exists, show page
  Listing.findOne({ _id: id }, function(err, listing) {
    if(listing == null) {
      res.render('This listing does not exist!')
    } else {
      res.render('listing', { 'listing': listing })
    }
  });
});

module.exports = router;
