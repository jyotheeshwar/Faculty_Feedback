var express = require('express');

var port = process.env.port || 1337;
var app = express();
var logger = require('./modules/logger.js');

var ratings = {
  1:{
    name: 'Rooney',
    rating: 'Stunner'
  },
  2:{
    name: 'Macheda',
    rating: 'Machedaaaaaaaaaaaaaaa'
  },
  3:{
    name: 'Mata',
    rating: 'In the end, it doesnt even Mataaaaaaaaaaa'
  },
  4:{
  	name: 'Ronaldo',
  	rating: 'Stunner! ABSOLUTE STUNNER'
  },
  5:{
  	name: 'di Maria',
  	rating: 'Oh Maria, oh maria, oh maria oh maria'
  }
};
app.use(logger);    // Use a log file? (providers generally log everything)

app.use(express.static('public'));

app.use(function (req, res, next) {
    console.log("Date.now().toString()");
    next();
});

app.get('/', function (req, res) {
    res.redirect('/public/index.html');
});
app.get('/data',function(req,res){
	res.json(ratings);
});

app.listen(port);