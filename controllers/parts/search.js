var SearchModel = require('../../models/search');
var ListingModel = require('../../models/listing');

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g);
}

exports.search = function(req,res,next){

  //req.query because it is a get request, and req.body is a post
  var searchQuery = {};

  //category search
  if (req.query.category){
    searchQuery.category = req.query.category;
  }

  //size search
  if (req.query.size){
    searchQuery.size = req.query.size;
  }

  //designer search
  if (req.query.designerSearch){
      var designerSearch = new RegExp("\\b" + escapeRegex(req.query.designerSearch), 'gi'); //a little less fuzzy, only matches first letters, Ow in Owens
      searchQuery.designer = designerSearch;
  }

  //title search
  if (req.query.titleSearch){
      var titleSearch = new RegExp("\\b" + escapeRegex(req.query.titleSearch), 'gi'); // still fuzzy
      searchQuery.title = titleSearch;
  }

  // min price
  if (req.query.minPrice){
      searchQuery.price = {$gte:0};
      searchQuery.price.$gte = parseInt(req.query.minPrice);
  }

  // max price
  if (req.query.maxPrice){
      searchQuery.price = {$gte:0};
      searchQuery.price.$lte = parseInt(req.query.maxPrice);
  }


   console.log(searchQuery, " this is my query");
   ListingModel.find(searchQuery).sort([['lastBumped', 'desc']]).exec(function(err, listings) {
       if(err) {
          return console.log(err);
       } else {
          //will return empty array not undefined, if not found, renders it in index
          res.render("index", {title: "Listings" , listings: listings });
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
