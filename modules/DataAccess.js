var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("Connection Opened");
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String
});

var User = mongoose.model('User', userSchema);
    
var Signup = function (username, password, res) {
    
    var user = new User({
        username: username, password: password
    });
    user.save(function () {
        res.send("user created successfully");
    });
}

var Signin = function (username, password, res) {
    User.findOne({ username: username, password: password }, {username: 1}, function (err, data) {
        if (data)
            res.send("Succesfully logged in as: " + data.username);
        else
            res.send("Invalid credentials. Please try again.");
    });
}

var Users = function (res) {
    User.find({}, {}, function (err, data) { 
        //if (data.length > 0)
        res.json(data);
    });
}

module.exports.Users = Users;
module.exports.Signup = Signup;
module.exports.Signin = Signin;