var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();

//line below allows anything that is in this folder to be accessed via the internet
//inside the public folder the css file and any images can be stored
app.use(express.static(__dirname + '/public'));
