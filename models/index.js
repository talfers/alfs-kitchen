var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.set('debug', true);
/*mongoose.connect('mongodb://localhost/todo-api', { useNewUrlParser: true });*/
mongoose.connect('mongodb://localhost/alfs-kitchen', { useNewUrlParser: true });

mongoose.Promise = Promise;

module.exports.Recipe = require('./recipe');
module.exports.User = require('./user');