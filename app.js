const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const db = require("./models");
const createRecipes = require("./creator");
const clearDB = require("./clearDB");
const passport = require("passport");
const path = require("path");
const LocalStrategy = require("passport-local");
const nodemailer = require("nodemailer");

//APP CONFIG
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'The molecule is a nuke',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(db.User.authenticate()));

passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


//CREATE ALL ROUTE VAR
app.use(function(req, res, next){	
	res.locals.currentUser = req.user;
	next();
});	

//DB SEEDING
clearDB;
createRecipes;

//ROUTES
app.get('/', function(req, res){
    res.render('home');
});

app.get('/recipes', function(req, res){
    db.Recipe.find({}, function(err, foundRecipes){
        if(err){
            console.log(err);
        } else {
            res.render('recipes', {recipes: foundRecipes});
        }
    });
});

app.get('/recipes/:id', function(req, res){
    db.Recipe.findById(req.params.id, function(err, foundRecipe){
        if(err){
            console.log(err);
        } else {
            res.render('show', {recipe: foundRecipe});
        }
    });
});

app.get('/subscribe', function(req, res) {
   res.render('subscribe'); 
});

app.post('/subscribe', function(req, res){
    var newUser = new db.User({username: req.body.username});
    db.User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('subscribe');
        } else {
            passport.authenticate('local')(req, res, function(){
                const output = `
                <p>Welcome to Alf's Kitchen!</p>
                <h3>${req.body.username}</h3>
                <a href='http://www.alfskitchen.com'>Alf's Kitchen</a>
                `;
                    // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: "in-v3.mailjet.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: 'a0e4d38ff00bb9f1a0c916773f566895', // generated ethereal user
                      pass: 'fb9bb29c0a1193340ac8a6a9bc3ac5ad' // generated ethereal password
                    }
                });
                
                // setup email data with unicode symbols
                let mailOptions = {
                    from: '"Alfs Kitchen" <admin@alfskitchen.com>', // sender address
                    to: req.body.username, // list of receivers
                    subject: "Welcome to Alfs Kitchen!", // Subject line
                    text: "Hello world?", // plain text body
                    html: output // html body
                };
                
                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info){
                    if(error) {
                        return console.log(error);
                    }
                        console.log("Message sent: %s", info.messageId);
                // Preview only available when sending through an Ethereal account
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                        res.send('email has been sent');
                  });
                  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                res.redirect('/');
            });
        }
    });
});

app.get('/login', function(req, res) {
   res.render('login'); 
});

app.post("/login", passport.authenticate("local", {
        successRedirect: "/recipes",
        failureRedirect: "/login"
    }), function(req, res){
    }
);

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/create', function(req, res) {
    res.render('create');
});

app.post('/recipes', function(req, res) {
    var title = req.body.title,
        image = req.body.image,
        serves = req.body.serves,
        desc = req.body.desc,
        author = req.body.author,
        tags = req.body.tags.split(', '),
        parts = req.body.parts;
    var newRecipe = {
        title: title,
        image: image,
        serves: serves,
        desc: desc,
        author: author,
        tags: tags,
        parts: parts
    };
    db.Recipe.create(newRecipe)
        .then(function(){
            console.log('Added recipes to the database');
        })
        .catch(function(err){
            console.log('Error: ' + err);
        });
    res.redirect('/recipes');
});

//SERVER CONFIG
app.listen(port, function(){
    console.log('Alfs kitchen server has started on port ' + port);
})