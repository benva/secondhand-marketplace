var Listing = require('../models/listing');

// List of listings page, to be taken out
exports.listingsList = function(req, res, next) {
  Listing.find({}, function(err, listings) {
    if(err) {
      res.render('error', { 'error': err });
    } else {
      res.render('listings', { 'listings': listings });
    }
  });
};

// Listing page
exports.listingPage = function(req, res, next) {
  var id = req.params.id;

  // If listing exists, show page
  Listing.findOne({ _id: id }, function(err, listing) {
    if(listing === null) {
      res.render('This listing does not exist!');
    } else {
      res.render('listing', { 'listing': listing });
    }
  });
};
