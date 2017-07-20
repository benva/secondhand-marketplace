var express = require('express');

var expressVue = require('express-vue');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var csrf = require('csurf');
var LocalStrategy = require('passport-local').Strategy;

var MessageModel = require('./models/message');
var ListingModel = require('./models/listing');
var UserModel = require('./models/user');

var index = require('./routes/index');
var users = require('./routes/users');
var listings = require('./routes/listings');
var messages = require('./routes/messages');

var app = express();

// view engine setup
app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//for Delete/Put
app.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
}));

// passport initilization
app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: false
 }));
app.use(passport.initialize());
app.use(passport.session());

// mongoose initilization
// Local
// mongoose.connect('mongodb://localhost:27017/covenant');
// Heroku
mongoose.connect('mongodb://benva:Md5a6zpl@ds049925.mlab.com:49925/heroku_g8ccj06v');

app.use('/', index);
app.use('/users', users);
app.use('/listings', listings);
app.use('/messages', messages);

// passport config
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {data:{error: res.locals.message, status: res.locals.error.status}});
});


module.exports = app;
