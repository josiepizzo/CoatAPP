var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');
var session = require('express-session');
var cloudinary = require('cloudinary');
//The following code builds a URL of the local cloudinary_cors.html file:
//var cloudinary_cors = "http://" + request.headers.host + "/cloudinary_cors.html";


 

var app = express();

app.use(session({
  secret: 'keyboard cat',
  cookie: {  }
}));


//var app = module.exports = express.createServer();
//created express server
var models = require('./models')
//var inventory = require('./models')['inventory'];
//var transaction = require('./models')['transaction'];


models.sequelize.sync({force:true});


//line below allows anything that is in this folder to be accessed via the internet
//inside the public folder the css file and any images can be stored
app.use(express.static(__dirname + '/public'));

//bodyParser will allow any post data to appear as a nice object 
//and can be referenced by req.body
app.use(bodyParser.urlencoded({
	extended: false
}));






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
//another for same page processing ornod API routes
//=========================================================

app.get('/login', function(req, res){
  res.render('login_page.handlebars');
});
//homepage or root (html)
app.get('/', function(req,res){
	res.render('index.handlebars');
});

//coats page(html)
app.get('/coats', function(req,res){
	res.render('coats.handlebars');
});

//inventory page (html)
app.get('/inventory', function(req,res){
  
    models.item.findAll({
      include:[models.user]
    }).then(function(results) {
      console.log("ITEM TABLE ", results);
      res.render('inventory.handlebars', {
      items: results
    });
    });



    
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
        zipcode: req.session.user.zipcode,
        image: req.body.coaturl,
        donatorId: req.session.user.id
    }).then (function(data){
        console.log('data');
        res.redirect('/inventory');
    });
});

//about page (html)
app.get('/about', function(req,res){
	res.render('about.handlebars');
});

app.get('/dashboard', function(req, res) {
  console.log('THIS IS REQ.SESSION.USER', req.session.user);
  if (!req.session.user) {
    res.redirect('/');
  } else {
    res.render('dashboard.handlebars');  
  }
  
});



app.post('/login', function(req, res){
    console.log(req.body.uid);
    models.user.findOne({
        where: {uid: req.body.uid} 
      }).then (function(data){
        console.log(data);
        req.session.user = data;
        res.end();
    });
})

app.post('/create-user', function(req, res){
    models.user.create({
        uid: req.body.uid,
        name: req.body.name,
        zipcode: req.body.zipCode,
        email: req.body.email,
      }).then (function(data){
        console.log(data);
        req.session.user = data;
        res.end();
    });
});