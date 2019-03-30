var     mongoose = require("mongoose"),
        reqdString = {
            type: String,
            required: 'This cannot be blank!'
        },
        reqdArray = {
            type: Array,
            required: 'This cannot be blank!'
        };

var recipeSchema = new mongoose.Schema({
    title: reqdString,
    image: reqdString,
    created_date: {
        type: Date,
        default: Date.now
    },
    serves: Number,
    desc: reqdString,
    recipe: {
        parts: [{
            name: String,
            ingredients: Array,
            directions: Array
        }]
    },
    author: String,
    tags: Array
});

var Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;