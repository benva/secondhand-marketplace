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
  var bump = {
    flag: false,
    hours: 0,
    mins: 0
  };
   

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

        var currentDate = new Date();
        var oldDate = listing.lastBumped;
        var timeSinceBump = currentDate - oldDate;
        
        if(timeSinceBump >= 43200000) {
          bump.flag = true;
        } else {
          var nextBump = 43200000 - timeSinceBump;
          bump.hours = Math.floor(nextBump / (60 * 60 * 1000));
          bump.mins = Math.floor(nextBump / (60 * 1000) % 60);
        }

        return res.render('edit', { listing: listing, bump: bump });
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
  var price = req.body.price;
  var description = req.body.description;

  // Update listing, redirect back to listing page
  ListingModel.update({ _id: id }, { $set: { 
    designer: designer, 
    title: title,
    category: category,
    size: size,
    price: price,
    description: description
  }}, function(err, listing) {
    if(listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' }); 
    }
  });

  res.redirect('/listings/' + id);
};

// ListingModel delete post
exports.delete = function(req, res, next) {
  var id = req.params.id;

  // Remove listing
  ListingModel.remove({ _id: id }, function(err) {
    if(listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' }); 
    }
  });

  res.redirect('/');
};

exports.bump = function(req, res, next) {
  var id = req.params.id;

  // Make this update to an integer
  ListingModel.update({ _id: id }, { $currentDate: { lastBumped: true }}, function(err, listing) {
    if(listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' }); 
    }
  });

  res.redirect('/listings/' + id);
};