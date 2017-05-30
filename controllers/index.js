var UserModel = require('../models/user');
var ListingModel = require('../models/listing');

exports.home = function(req, res, next) {
  ListingModel.find({}).sort([['updatedAt' , 'desc']]).exec(function(err, listings) {
    if(err) {
      throw err;
    } else {
      res.render('index', { title: 'Covenant', user: req.user, listings: listings });
    }
  });
};