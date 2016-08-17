var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();
//var app = module.exports = express.createServer();
//created express server



//line below allows anything that is in this folder to be accessed via the internet
//inside the public folder the css file and any images can be stored
app.use(express.static(__dirname + '/public'));

//bodyParser will allow any post data to appear as a nice object 
//and can be referenced by req.body
app.use(bodyParser.urlencoded({
	extended: false
}));



app.get('/', function(req, res){
  res.render('index.handlebars');
});

app.get('/donator', function(req, res){
  res.render('donator.handlebars');
});

app.get('/customer', function(req, res){
  res.render('customer.handlebars');
});
app.get('/', function(req, res){
  res.render('donator.handlebars');
});

app.get('/coats', function(req, res){
  res.render('coats.handlebars');
});




app.engine('handlebars', handlebars({defaultLayout: 'main'}));
//will be the skeleton of every webpage

app.set('view engine', 'handlebars');

var port = process.env.Port || 3000;
app.listen(port, function(){
	console.log('connected to', port);
});

//=========================================================
//routes to be put in a seperate  controller folder 
//one file for HTML or new page routes
//another for same page processing or API routes
//=========================================================

//homepage or root (html)
app.get('/', function(req,res){
	res.render('index');
});

//donator page (html)
app.get('/donator', function(req,res){
	res.render('donator');
});