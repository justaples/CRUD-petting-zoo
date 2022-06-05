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
    Animal.findById(req.params.animalId).then((a)=>{
        res.render('animals/showAnimal', {a})
        // console.log(a.img)
    })
}

const editAnimal = (req,res) =>{
    Animal.findById(req.params.animalId, (err, a)=>{
        if(err){
            res.status(400).json(err)
            return
        }
        res.render('animals/editAnimal', {a: a, id:req.params.animalId})
    })
}

const updateAnimal = (req,res) =>{
    Animal.findByIdAndUpdate(req.params.animalId, req.body, {new:true}).then((a)=>{
        res.redirect(`/animals/${req.params.animalId}`)
    })
}

const deleteAnimal = (req,res) =>{
    Animal.findByIdAndDelete(req.params.animalId, (err, a)=>{
        if (err){
            res.status(400).json(err)
            return
        }
        res.redirect('/animals')
    })
}



module.exports = {
    getAllAnimals,
    newAnimal,
    createAnimal,
    showAnimal,
    editAnimal,
    updateAnimal,
    deleteAnimal
}