// Requiring external modules
var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
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
//app.set('views', app.path() + 'views');

app.locals.FACEBOOK_APP_ID = "1527212264216404"
app.locals.FACEBOOK_APP_SECRET = "faeb420f661329463996b06b42281f21";

passport.serializeUser(function (user, done) {
    done(null, user.displayName);
});

passport.deserializeUser(function (displayName, done) {
    done(null, displayName);
});

// App middlewares
app.use(express.static( app.path() + 'public'));
app.use(logger);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'My Session', resave:false }));
app.use(passport.initialize());
app.use(passport.session());

// App Routes
app.get('/', function (req, res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/users', function (req, res) { 
    DataAccess.Users(res);
});

app.get('/error', function (req, res) {

  res.send("Error logging in.");
});

app.post('/signin', function (req, res){
    DataAccess.Signin(req.body.username, req.body.password, res);
});

app.post('/signup', function (req, res) {
    DataAccess.Signup(req.body.username, req.body.password, res);
});

app.get('/signedin', function (req, res) {
    res.send(req.user);
});

app.get('/logout', function (req, res) {
    req.session.destroy(function (err) { 
        //do something about it
    });
    res.redirect('/');
});

// Passport specifics
passport.use(new FacebookStrategy({
        clientID: app.locals.FACEBOOK_APP_ID,
        clientSecret: app.locals.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, done) {
    	return done(null, profile);
    }
));

passport.use(new GoogleStrategy({
	returnURL:'http://localhost:3000/',
	realm:'http://localhost:3000/'
},
	function (identifier,profile,done){
    //User.findOrCreate({openId:identifier},function(err,user){
        console.log(profile);
		done(null ,profile);
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
    failureRedirect: '/error',
    successRedirect: '/'
    })
);

// Server Listener
app.listen(port, function () { 
    console.log("Express server started on port:" + port);
});