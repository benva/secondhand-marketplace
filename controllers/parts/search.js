var SearchModel = require('../../models/search');
var ListingModel = require('../../models/listing');

exports.search = function(req,res,next){

  function escapeRegex(text){
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  //req.query because it is a get request, and req.body is a post
  var searchQuery = {
    price: {$gte:0}
  };

  //category search
  if (req.query.category){
    searchQuery.category = req.query.category;
  }

  //size search
  if (req.query.size){
    searchQuery.size = req.query.size;
  }

  //title search
  if (req.query.titleSearch){
      var titleSearch = new RegExp(escapeRegex(req.query.titleSearch), 'gi');
      searchQuery.title = titleSearch;
  }

  //designer search
  if (req.query.designerSearch){
      var designerSearch = new RegExp(escapeRegex(req.query.designerSearch), 'gi');
      searchQuery.designer = designerSearch;
  }
  // min price
  if (req.query.minPrice){
      searchQuery.price.$gte = parseInt(req.query.minPrice);
  }

  // max price
  if (req.query.maxPrice){
      searchQuery.price.$lte = parseInt(req.query.maxPrice);
  }


   console.log(searchQuery, " this is my query");
   ListingModel.find(searchQuery).sort([['lastBumped', 'desc']]).exec(function(err, listings) {
       if(err) {
          return console.log(err);
       } else {
          //will return empty array not undefined, if not found, renders it in index
          res.render("index", {title: "Listings for: " + searchQuery , listings: listings });
       }
   });

   //saving search Results
   var searchSave = new SearchModel({
     search: req.query.search
   });
   searchSave.save(function(err) {
     if(err) {
       return next(err);
     }
     console.log('search saved');
   });

};
