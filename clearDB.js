var mongoose = require('mongoose');
var db = require('./models');

var clearDB = 
    db.Recipe.remove({})
        .then(function(){
            console.log('Database cleared!');
        })
        .catch(function(err){
            console.log('Error: ' + err)
        });

module.exports = clearDB;