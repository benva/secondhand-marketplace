var fs = require('fs');

var ListingModel = require('../models/listing');

// Listing page
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

      res.render('listing', { title: listing.designer + ' ' + listing.title, listing: listing, own: ownListing });
    }
  });
};

// Listing edit page
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

        // Find time in milliseconds since listing was bumped
        var currentDate = new Date();
        var oldDate = listing.lastBumped;
        var timeSinceBump = currentDate - oldDate;

        // Determine whether the listing can be bumped or not
        // 43200000 is 12 hours in milliseconds
        if(timeSinceBump >= 43200000) {
          bump.flag = true;
        } else {
          var nextBump = 43200000 - timeSinceBump;
          bump.hours = Math.floor(nextBump / (60 * 60 * 1000));
          bump.mins = Math.floor(nextBump / (60 * 1000) % 60);
        }

        return res.render('edit', { title: 'Edit - ' + listing.designer + ' ' + listing.title, listing: listing, bump: bump });
      });
    // Redirect if current user does not own listing
    } else {
      return res.redirect('/listings/' + id);
    }
  });
};

// Listing edit post
exports.editPost = function(req, res, next) {
  var id = req.params.id;
  var designer = req.body.designer;
  var title = req.body.title;
  var category = req.body.category;
  var size = req.body.size;
  var conversion = req.body.conversion;
  var price = req.body.price;
  var description = req.body.description;

  // Update listing, redirect back to listing page
  ListingModel.update({ _id: id }, { $set: {
    designer: designer,
    title: title,
    category: category,
    size: size,
    conversion: conversion,
    price: price,
    description: description
  }}, function(err, listing) {
    if(listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' });
    }
  });

  res.redirect('/listings/' + id);
};

// Listing delete post
exports.delete = function(req, res, next) {
  var id = req.params.id;

  // Delete listing photos
  ListingModel.findOne({ _id: id }, function(err, listing) {
    if(err) {
      throw next(err);
    }
    // This works but sometimes throws an error because JS is asynchronous
    // Make this whole function synchronous in the future
    try {
      for(var i = 0; i < listing.photos.length; i++) {
        fs.unlinkSync('public/images/' + listing.photos[i]);
      }
    } catch(TypeError) {
      console.log('asynchronous');
    }
  });

  // Remove listing from database
  ListingModel.remove({ _id: id }, function(err) {
    if(err) {
      return next(err);
    }
  });

  res.redirect('/');
};

// Bump listing to the top of the list
exports.bump = function(req, res, next) {
  var id = req.params.id;

  // Update lastBumped to the current timestamp
  ListingModel.update({ _id: id }, { $currentDate: { lastBumped: true }}, function(err, listing) {
    if(listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' });
    }
  });

  res.redirect('/listings/' + id);
};
