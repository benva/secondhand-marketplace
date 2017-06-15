var fs = require('fs');
var validator = require('validator');

var ListingModel = require('../models/listing');

// Listing page
exports.listingPage = function(req, res, next) {
  var id = req.params.id;
  var ownListing = false;

  // If listing exists, show page
  ListingModel.findOne({ _id: id }, function(err, listing) {
    if (listing === undefined || listing === null) {
      return res.render('error', { error: '404 not found' });
    } else {
      // Set flag to true if user's own listing
      if (req.user !== undefined && listing.seller === req.user.username){
        ownListing = true;
      }

      res.render('components/listing', {
        data: {
          listing: listing,
          own: ownListing,
          bump: canBump(listing)
        },
        vue:{
          head:{
            title: listing.designer + ' - ' + listing.title
          }
        }
      });
    }
  });
};

// Checks that data submitted by user is valid, returns what errors occured
function validListing(req) {
  // Valid values for category and size
  var categories = ['outerwear', 'tops', 'bottoms', 'footwear', 'accessories'];
  var sizes = [['xs', 's', 'm', 'l', 'xl'],
    ['26', '28', '30', '32', '34'],
    ['6', '7', '8', '9', '10', '11', '12', '13']];

  var designer = req.body.designer;
  var title = req.body.title;

  var category = req.body.category;
  var size = req.body.size;
  var price = req.body.price;
  var description = req.body.description;
  var filenames = [];
  var errors = '';

  if(validator.isEmpty(designer)) {
    errors += 'Choose a designer\n';
  }

  if(validator.isEmpty(title)) {
    errors += 'Give your listing a title\n';
  }

  if(category === 'Category') {
    errors += 'Choose a category\n';
  }
  // This would only happen if someone were editing the values
  else if(!validator.isIn(category, categories)) {
    errors += 'Choose a valid category\n';
  }

  if(size === 'Size') {
    errors += 'Choose a size\n';
  }
  // This would only happen if someone were editing the values
  else if((category === 'outerwear' || category === 'tops') && !validator.isIn(size, sizes[0])) {
    errors += 'Choose a valid size for that category\n';
  }
  else if(category === 'bottoms' && !validator.isIn(size, sizes[1])) {
    errors += 'Choose a valid size for that category\n';
  }
  else if(category === 'footwear' && !validator.isIn(size, sizes[2])) {
    errors += 'Choose a valid size for that category\n';
  }
  else if(category === 'accessories' && size !== '100') {  //quick fix, changed value of size to 100 in the jquery for consistency,
    errors += 'Choose a valid size for that category\n';
  }

  if(validator.isEmpty(price)) {
    errors += 'Choose a price\n';
  }
  else if(!validator.isNumeric(price)) {
    errors += 'The price must be numeric\n';
  }

  if(validator.isEmpty(description)) {
    errors += 'Give your listing a description\n';
  }

  // Make sure all photo files are valid
  if(req.files) {
    for(var i = 0; i < req.files.length; i++) {
      filenames[i] = req.files[i].originalname;
    }
    if(filenames.length === 0) {
      errors += 'Include at least one photo for the listing\n';
    }
    var regex = /\.(jpg|jpeg|png|gif|bmp)$/;
    for(i = 0; i < filenames.length; i++) {
      if(!filenames[i].match(regex)) {
        errors += 'Photos must be JPG, JPEG, PNG, GIF, or BMP\n';
        break;
      }
    }
  }

  return errors;
}

// Create new listing and redirect to listing page
exports.createListing = function(req, res, next) {
  console.log(req.body.size);
  // If listing info is invalid, reload listing page with given errors
  var errors = validListing(req);
  if(errors) {
    return res.render('components/create', {
      data:{
        error: errors,
        designer: req.body.designer,
        listTitle: req.body.title,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price,
        description: req.body.description,
        csrfToken: req.csrfToken()
      }
    });
  }

  // Add uploaded photos' filenames into array
  var photos = [];
  for(var i = 0; i < req.files.length; i++) {
    photos[i] = req.files[i].filename;
  }

  var newListing = new ListingModel({
    search: req.body.designer + " " + req.body.title,
    seller: req.user.username,
    designer: req.body.designer,
    title: req.body.title,
    category: req.body.category,
    size: req.body.size,
    conversion: req.body.conversion,
    price: req.body.price,
    description: req.body.description,
    lastBumped: new Date(),
    photos: photos
  });
  console.log(req.body);
  newListing.save(function(err) {
    if(err) {
      return next(err);
    }
    res.redirect('./' + newListing._id);
  });
};

// Returns whether the listing can be bumped
// If not, how many hours and minutes are left until next bump
function canBump(listing) {
  var bump = {
    flag: false,
    hours: 0,
    mins: 0
  };

  // Find time in milliseconds since listing was bumped
  var currentDate = new Date();
  var oldDate = listing.lastBumped;
  var timeSinceBump = currentDate - oldDate;

  // Determine whether the listing can be bumped or not
  // 43200000 is 12 hours in milliseconds
  if (timeSinceBump >= 43200000) {
    bump.flag = true;
  } else {
    var nextBump = 43200000 - timeSinceBump;
    bump.hours = Math.floor(nextBump / (60 * 60 * 1000));
    bump.mins = Math.floor(nextBump / (60 * 1000) % 60);
  }

  return bump;
}

// Listing edit page
exports.editListing = function(req, res, next) {
  var id = req.params.id;

  // Find listing to edit
  ListingModel.findOne({ _id: id }, function(err, listing) {
    if (listing === undefined || listing === null) {
      return res.render('error', {
        error: '404 not found'
      });
    }
    // If current user owns listing, go to edit page
    if (req.user !== undefined && listing.seller === req.user.username) {
      ListingModel.findOne({ _id: id }, function(err, listing) {
        if (listing === undefined || listing === null) {
          return res.render('error', {
            error: '404 not found'
          });
        }

        return res.render('components/edit', {
          data: {
            id: listing._id,
            designer: listing.designer,
            listTitle: listing.title,
            category: listing.category,
            size: listing.size,
            price: listing.price,
            description: listing.description,
            csrfToken: req.csrfToken()
          },
          vue:{
            head:{
              title: 'Editing: ' + listing.designer + ' | ' + listing.title
            }
          }
        });
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

  // If listing info is invalid, reload edit page with given errors
  var errors = validListing(req);
  if(errors) {
    return res.render('edit', {
      title: 'Edit Listing',
      error: errors,
      id: id,
      designer: req.body.designer,
      listTitle: req.body.title,
      category: req.body.category,
      size: req.body.size,
      price: req.body.price,
      description: req.body.description,
      csrfToken: req.csrfToken()
    });
  }

  // Update listing, redirect back to listing page
  ListingModel.update({ _id: id }, {
    $set: {
      search: req.body.designer + " " + req.body.title,

      designer: req.body.designer,
      title: req.body.title,
      category: req.body.category,
      size: req.body.size,
      conversion: req.body.conversion,
      price: req.body.price,
      description: req.body.description
    }
  }, function(err, listing) {
    if (listing === undefined || listing === null) {
      return res.render('error', {
        error: '404 not found'
      });
    }
  });

  res.redirect('/listings/' + id);
};

// Delete photos from file system
function deleteFiles(files, callback) {
  var i = files.length;
  files.forEach(function(filepath) {
    fs.unlink(filepath, function(err) {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}

// Listing delete post
exports.delete = function(req, res, next) {
  var id = req.params.id;

  // Delete listing photos
  ListingModel.findOne({ _id: id }, function(err, listing) {
    if (err) {
      throw next(err);
    }
    var photosArray = listing.photos.map(function(hash) {
      return "public/images/" + hash;
    });

    deleteFiles(photosArray, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('all files removed');
      }
    });

    // Remove listing from database
    ListingModel.remove({
      _id: id
    }, function(err) {
      if (err) {
        return next(err);
      }
    });

    res.redirect('/');
  });
};


// Bump listing to the top of the list
exports.bump = function(req, res, next) {
  var id = req.params.id;

  // Update lastBumped to the current timestamp
  ListingModel.update({ _id: id }, { $currentDate: { lastBumped: true }}, function(err, listing) {
    if (listing === undefined || listing === null) {
      return res.render('error', {
        error: '404 not found'
      });
    }
  });

  res.redirect('/listings/' + id);
};
