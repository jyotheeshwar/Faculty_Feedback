var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.port || 1337;
var app = express();
var DataAccess = require('./modules/DataAccess.js');
var logger = require('./modules/logger.js');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = "1522735911308795"
var FACEBOOK_APP_SECRET = "8602dd723617f56c0cf78783508c90c1";

var port = process.env.port || 1337;
app.set('views', path.join(__dirname, 'views'));
var app = express();

app.use(logger);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendfile('./views/index.html');
});


app.get('/users', function (req, res) { 
    DataAccess.Users(res);
});

app.get('/success', function(req, res, next) {
  res.send('Successfully logged in.');
});
 
app.get('/error', function(req, res, next) {
  res.send("Error logging in.");
});

app.post('/signin', function (req, res){
    DataAccess.Signin(req.body.username, req.body.password, res);
});

app.post('/signup', function (req, res) {
    DataAccess.Signup(req.body.username, req.body.password, res);
});

app.listen(port);

app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:1337/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		console.log(profile);
        	return done(null, profile);
	});
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
		  passport.authenticate('facebook', { successRedirect: '/success',
			                                        failureRedirect: '/error' }));

app.get('/success', function(req, res){
	res.send("success logged in");
});

app.get('/error', function(req, res){
	res.send("error logged in");
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port 1337');
});

