const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    typeOfCare: { type: String, required: true},
    entry: { type: String, required: true}
},{
    timestamps: true
})

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