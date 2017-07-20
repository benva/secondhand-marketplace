var express = require('express');
var router = express.Router();
var csrf = require('csurf');

var messages = require('../controllers/messages');

/* MESSAGES LANDING PAGE */
router.get('/', csrf({
  cookie: true
}), messages.messages);

router.post('/:id/reply', csrf({
  cookie: true
}), messages.reply);
router.get('/:id', csrf({
  cookie: true
}), messages.conversation);

module.exports = router;