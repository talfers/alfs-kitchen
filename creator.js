var mongoose = require("mongoose");
var db = require('./models');
const seedDB = require("./seedDB");

var newRecipe = db.Recipe.create(seedDB)
.then(function(){
    console.log('Added recipes to the database');
})
.catch(function(err){
    console.log('Error: ' + err);
});

module.exports = newRecipe;
