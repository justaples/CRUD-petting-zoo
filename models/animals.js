const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*=======================================================================
Following schema handles the logs on Show page
=======================================================================*/
const logSchema = new Schema({
    typeOfCare: { type: String, required: true},
    entry: { type: String, required: true}
},{
    timestamps: true
})

/*=======================================================================
Following schema handles all the animals
logSchema is embedded in animalSchema
=======================================================================*/
const animalSchema = new Schema({
    name: { type: String, required: true},
    age: Number,
    description: String,
    img: String,
    logs: [logSchema]
},{
    timestamps: true
})

module.exports = mongoose.model('Animal', animalSchema)