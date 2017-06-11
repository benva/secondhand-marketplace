var SearchModel = require('../../models/search');
var ListingModel = require('../../models/listing');
var lev = require('./levenshtein.js');

function escapeRegex(text) {

  return    text.replace(/^\W*/, '') //removes trailing !@#$ from start
           .replace(/\W*$/, '') //removes trailing !@#$ from end
           .replace(/\W+/g, '|'); //replaces all misc characters with an Or
}

//used to compare for lev function
function levCompare(text){
  return    text.replace(/^\W*/, '') //removes trailing !@#$ from start
           .replace(/\W*$/, '') //removes trailing !@#$ from end
           .replace(/\W+/g, ' '); //replaces all misc characters with an Or
}


exports.search = function(req,res,next){

  //req.query because it is a get request, and req.body is a post
  var searchQuery = {
    price: {$gte: 0}
  };

  //category search
  if (req.query.category){
    searchQuery.category = req.query.category;
  }

  //size search
  if (req.query.size){
    searchQuery.size = req.query.size;
    //works around jquery, regex will match it all
    if(req.query.size === 'Size'){
        searchQuery.size = new RegExp("[\s\S]*",'gi');
    }
  }

  // //designer search
  // if (req.query.designerSearch){
  //     var designerSearch = new RegExp(escapeRegex(req.query.designerSearch), 'gi');
  //     searchQuery.designer = designerSearch;
  // }

  //title search
  if (req.query.titleSearch){
      var titleSearch = new RegExp(escapeRegex(req.query.titleSearch), 'gi');
      searchQuery.title = titleSearch;
  }

  // min price
  if (req.query.minPrice){
      searchQuery.price.$gte = parseInt(req.query.minPrice);
  }

  // max price
  if (req.query.maxPrice){
      searchQuery.price.$lte = parseInt(req.query.maxPrice);
  }

   console.log(levCompare(req.query.titleSearch),  " back to string");
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
