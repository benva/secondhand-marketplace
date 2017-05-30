var ListingModel = require('../models/listing');

// ListingModel page
exports.listingPage = function(req, res, next) {
  var id = req.params.id;
  var ownListing = false;

  // If listing exists, show page
  ListingModel.findOne({ _id: id }, function(err, listing) {
    if(listing === null) {
      // Send to 404 page

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

  var newListing = new ListingModel({
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
      throw err;
    } else {
      res.redirect('./listings/' + newListing._id);
    }
  });
};

// ListingModel edit page
exports.editListing = function(req, res, next) {
  var id = req.params.id;  

  // Find listing to edit
  ListingModel.findOne({ _id: id }, function(err, listing) {
    if(listing === null) {
      // Send to 404 page

    } else {
      // If current user owns listing, go to edit page
      if(req.user != null &&  listing.seller.localeCompare(req.user.username) == 0) {
        ListingModel.findOne({ _id: id }, function(err, listing) {
          if(listing === null) {
            // Send to 404 page

          } else {
            res.render('edit', { listing: listing });
          }
        });
      } else {
        // Redirect if current user does not own listing
        res.redirect('/listings/' + id);
      }
    }
  });
};

// ListingModel edit post
exports.editPost = function(req, res, next) {
  var id = req.params.id;
  var designer = req.body.designer;
  var title = req.body.title;

  // Update listing, redirect back to listing page
  ListingModel.update({ _id: id }, {$set: { designer: designer, title: title }}, function(err, listing) {
    if(listing === null) {
      // Send to 404 page

    } else {
      res.redirect('./');
    }
  })
};

// ListingModel deletion page
exports.deleteListing = function(req, res, next) {
  var id = req.params.id;

  ListingModel.findOne({ _id: id }, function(err, listing) {
    if(listing === null) {
      // Send to 404 page

    } else {
      // If user owns listing, confirm deletion
      if(req.user != null &&  listing.seller.localeCompare(req.user.username) == 0) {
        res.render('delete', { title: 'Delete ListingModel', listing: listing });
      } else {
        // Redirect if they do not own listing
        res.redirect('/listings/' + id);
      }
    }
  });
};

// ListingModel delete post
exports.deletePost = function(req, res, next) {
  var id = req.params.id;

  // Remove listing
  ListingModel.remove({ _id: id }, function(err) {
    if(err) {
      throw err;
    } else {
      res.redirect('/');
    }
  });
};
