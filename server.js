var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var models = require('./models')
//var inventory = require('./models')['inventory'];
//var transaction = require('./models')['transaction'];


models.sequelize.sync({force:true});

var app = express();

//line below allows anything that is in this folder to be accessed via the internet
//inside the public folder the css file and any images can be stored
app.use(express.static(__dirname + '/public'));

//bodyParser will allow any post data to appear as a nice object 
//and can be referenced by req.body
app.use(bodyParser.urlencoded({
	extended: false
}));

app.engine('handlebars',handlebars({
	defaultLayout: 'main'
}));

app.set('view engine','handlebars');

var port = process.env.Port || 3000;
app.listen(port, function(){
	console.log('connected to', port);
});

//=========================================================
//routes to be put in a seperate controller folder 
//one file for HTML or new page routes
//another for same page processing or API routes
//=========================================================

//homepage or root (html)
app.get('/', function(req,res){
	res.render('index');
});

//coats page(html)
app.get('/coats', function(req,res){
	res.render('coats');
});



//adding a new coat to item table(api)
app.post("/new-coat", function(req,res){
    console.log("I am about to create an item")
    models.item.create({
        category:req.body.category,
        title: req.body.title,
        type: req.body.type,
        size: req.body.size,
        condition: req.body.condition,
        donatorId: 1//,
        //image: body.image
    }).then (function(data){
        console.log(data);
    });
});

//donator page (html)
app.get('/donator', function(req,res){
	res.render('donator');
});
