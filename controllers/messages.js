var passport = require('passport');

var ListingModel = require('../models/listing');
var ConversationModel = require('../models/conversation');
var MessageModel = require('../models/message');

exports.messages = function(req, res, next) {
  // Send user to login page if not logged in
  if(!req.user) {
    var string = encodeURIComponent('You need to login before viewing your messages');
    res.redirect('/login/' + '?valid=' + string)
  }

  var inbox = req.user.inbox;

  // Find all conversations in inbox, sorted by most recent
  ConversationModel.find({ _id: { $in: inbox } }).sort([['updatedAt', 'desc']]).exec(function(err, conversations) {
    res.render('messages/messages', {
      data: {
        conversations: conversations,
        csrfToken: req.csrfToken()
      },
      vue: {
        head:{
          title: "My Messages"
        }
      }
    });
  });
};

exports.conversation = function(req, res, next) {
  var id = req.params.id;

  ConversationModel.findOne({ _id: id }, function(err, conversation) {
    // Check if user is a part of this conversation
    if(req.user !== undefined && (conversation.from === req.user.username || conversation.to === req.user.username)) {
      return res.render('messages/conversation', {
        data:{
          conversation: conversation,
          csrfToken: req.csrfToken()
        },
        vue:{
          head:{
            title: 'Conversation with ' + conversation.from + "about " + conversation.listing.title
          }
        }
      });
    // Otherwise send them to login page
    } else {
      return res.redirect('/');
    }
  });
};

// Reply to a conversation
exports.reply = function(req, res, next) {
  var id = req.params.id;
  var from = req.user;
  var newMessage = new MessageModel({
    from: from.username,
    body: req.body.text
  });
  newMessage.save();

  // Add the new message to the conversation and redirect to the conversation
  ConversationModel.findOne({ _id: id }, function(err, conversation) {
    conversation.messages.push(newMessage);
    if(from.username === conversation.listing.seller) {
      conversation.fromUnread = true;
    } else {
      conversation.toUnread = true;
    }
    conversation.save();
    res.redirect('/messages/' + id);
  });
};
