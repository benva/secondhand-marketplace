var UserModel = require('../models/user');
var ListingModel = require('../models/listing');

exports.home = function(req, res, next) {
  ListingModel.find({}).sort([['updatedAt' , 'desc']]).exec(function(err, listings) {
    if(err) {
      return next(err);
    } 

    res.render('index', { title: 'Covenant', user: req.user, listings: listings });
  });
};