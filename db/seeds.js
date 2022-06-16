require('./connection');

const Animal = require('../models/animals');
const animalSeeds =  require('./seeds.json')

Animal.deleteMany({}) 
.then(()=>{
    return Animal.insertMany(animalSeeds) 
    .then((animals)=>{
        console.log(animals)
    })
}).finally(()=>{
    process.exit()
})