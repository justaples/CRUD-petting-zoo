const res = require('express/lib/response')
const Animal = require('../models/animals')

const getAllAnimals = (req,res) =>{
    Animal.find({}, (err, animals)=>{
        if(err){
            res.status(400).json(err)
            return
        }
        res.render('animals/allAnimals', {animals})
    })
}

const newAnimal = (req,res) =>{
    res.render('animals/newAnimal')
}
 
const createAnimal = (req,res) =>{
    let newAnimal = new Animal(req.body)
    newAnimal.save(() => res.redirect('/animals'))
    
}

const showAnimal = (req,res) =>{

}

const editAnimal = (req,res) =>{

}

const updateAnimal = (req,res) =>{

}

const deleteAnimal = (req,res) =>{

}



module.exports = {
    getAllAnimals,
    newAnimal,
    createAnimal,
    // showAnimal,
    // editAnimal,
    // updateAnimal,
    // deleteAnimal
}