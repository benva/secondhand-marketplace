var ListingModel = require('../models/listing');

// ListingModel page
exports.listingPage = function(req, res, next) {
  var id = req.params.id;
  var ownListing = false;

  // If listing exists, show page
  ListingModel.findOne({ _id: id }, function(err, listing) {
    if(listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' });
    } else {
      // Set flag to true if user's own listing
      if(req.user !== undefined && listing.seller.localeCompare(req.user.username) == 0) { 
        ownListing = true; 
      }

      res.render('listing', { listing: listing, own: ownListing });
    }
  });
};

// ListingModel edit page
exports.editListing = function(req, res, next) {
  var id = req.params.id;  

  // Find listing to edit
  ListingModel.findOne({ _id: id }, function(err, listing) {
    if(listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' });
    }
    // If current user owns listing, go to edit page
    if(req.user !== undefined && listing.seller.localeCompare(req.user.username) == 0) {
      ListingModel.findOne({ _id: id }, function(err, listing) {
        if(listing === undefined || listing === null) {
          return res.render('error', { error: '404 not found' });
        }

        return res.render('edit', { listing: listing });
      });
    // Redirect if current user does not own listing
    } else {
      return res.redirect('/listings/' + id);
    }
  });
};

// ListingModel edit post
exports.editPost = function(req, res, next) {
  var id = req.params.id;
  var designer = req.body.designer;
  var title = req.body.title;
  var category = req.body.category;
  var size = req.body.size;
  var description = req.body.description;

  // Update listing, redirect back to listing page
  ListingModel.update({ _id: id }, {$set: { 
    designer: designer, 
    title: title,
    category: category,
    size: size,
    description: description
  }}, function(err, listing) {
    if(listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' }); 
    }

    res.redirect('./');
  })
};

// ListingModel delete post
exports.deletePost = function(req, res, next) {
  var id = req.params.id;

  // Remove listing
  ListingModel.remove({ _id: id }, function(err) {
    if(err) {
      return next(err);
    }

    res.redirect('/');
  });
};
