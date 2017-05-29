var Listing = require('../models/listing');

// Listing page
exports.listingPage = function(req, res, next) {
  var id = req.params.id;

  // If listing exists, show page
  Listing.findOne({ _id: id }, function(err, listing) {
    if(listing === null) {
      res.status(404).send('This user does not exist!');
    } else {
      res.render('listing', { 'listing': listing });
    }
  });
};
