var express = require('express');
var bodyParser = require('body-parser');

var DataAccess = require('./modules/DataAccess.js');
var logger = require('./modules/logger.js');


var port = process.env.port || 1337;
var app = express();

app.use(logger);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.redirect('/public/index.html');
});

app.get('/users', function (req, res) { 
    DataAccess.Users(res);
});

app.post('/signin', function (req, res){
    DataAccess.Signin(req.body.username, req.body.password, res);
});

app.post('/signup', function (req, res) {
    DataAccess.Signup(req.body.username, req.body.password, res);
});

app.listen(port);