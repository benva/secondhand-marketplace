var Listing = require('../models/listing');

// Listing page
exports.listingPage = function(req, res, next) {
  var id = req.params.id;
  var ownListing = false;

  // If listing exists, show page
  Listing.findOne({ _id: id }, function(err, listing) {
    if(listing === null) {
      res.status(404).send('This listing does not exist!');
    } else {
      // Set flag to true if user's own listing
      if(req.user != null && listing.seller.localeCompare(req.user.username) == 0) { 
        ownListing = true; 
      }

      res.render('listing', { listing: listing, own: ownListing });
    }
  });
};

// Create new listing
exports.createListing = function(req, res, next) {

  var newListing = new Listing({
    seller: req.user.username,
    designer: req.body.designer,
    title: req.body.title,
    // category: req.body.category,
    // price: req.body.price,
    // size: req.body.size,
    // description: req.body.description,
    sold: false
  });

  newListing.save(function(err) {
    if(err) {
      res.render('error', { 'error': err });
    } else {
      res.redirect('./listings/' + newListing._id);
    }
  });
};

// Listing edit page
exports.editListing = function(req, res, next) {
  var id = req.params.id;  

  // If user owns listing, go to the edit page
  Listing.findOne({ _id: id }, function(err, listing) {
    if(listing === null) {
      res.status(404).send('This listing does not exist!');
    } else {
      if(req.user != null &&  listing.seller.localeCompare(req.user.username) == 0) {
        Listing.findOne({ _id: id }, function(err, listing) {
          if(listing === null) {
            res.status(404).send('This listing does not exist!');
          } else {
            res.render('edit', { listing: listing });
          }
        });
      } else {
        // Redirect if they do not own listing
        res.redirect('/listings/' + id);
      }
    }
  });
  
  
};

// Listing edit post
exports.editPost = function(req, res, next) {
  var id = req.params.id;
  var designer = req.body.designer;
  var title = req.body.title;

  // Update listing, redirect back to listing page
  Listing.update({ _id: id }, {$set: { designer: designer, title: title }}, function(err, listing) {
    if(listing === null) {
      res.status(404).send('This listing does not exist!');
    } else {
      res.redirect('./');
    }
  })
}

exports.deleteListing = function(req, res, next) {

};
