var express = require('express');

var port = process.env.port || 1337;
var app = express();
var logger = require('./modules/logger.js');

app.use(logger);    // Use a log file? (providers generally log everything)

app.use(express.static('public'));

app.use(function (req, res, next) {
    console.log("Date.now().toString()");
    next();
});

app.get('/', function (req, res) {
    res.redirect('/public/index.html');
});

app.listen(port);