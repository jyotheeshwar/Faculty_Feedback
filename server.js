// Requiring external modules
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy
    , GoogleStrategy = require('passport-google').Strategy;

// App Specific modules
var DataAccess = require('./modules/DataAccess.js');
var logger = require('./modules/logger.js');

// App variable configurations
var port = process.env.port || 3000;
var app = express();
app.set('views', app.path() + 'views');

app.locals.FACEBOOK_APP_ID = "1522735911308795"
app.locals.FACEBOOK_APP_SECRET = "8602dd723617f56c0cf78783508c90c1";

// App middlewares
app.use(express.static( app.path() + 'public'));
app.use(logger);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// App Routes
app.get('/', function (req, res){
  res.status(200).sendFile(__dirname + '/views/index.html');
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

// Passport specifics
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
        clientID: app.locals.FACEBOOK_APP_ID,
        clientSecret: app.locals.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
	process.nextTick(function () {
		console.log(profile);
        	return done(null, profile);
	});
    }
));

passport.use(new GoogleStrategy({
	returnURL:'http://localhost:3000/',
	realm:'http://localhost:3000/'
},
	function (identifier,profile,done){
    //User.findOrCreate({openId:identifier},function(err,user){
        console.log(serializeUser(profile));
		done(err,user);
		//});
}));

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/return',
    passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/error'
}));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
    successRedirect: '/success',
    failureRedirect: '/error'
}));

// Server Listener
app.listen(port, function () { 
    console.log("Express server started on port:" + port);
});