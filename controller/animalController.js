const Animal = require('../models/animals')
const multer = require('multer')
const path = require('path');


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
 
const storage = multer.diskStorage({
    destination:'./public',
    filename: function(req, file, cb){
        console.log(file.originalname)
        cb(null, file.originalname + Date.now())
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    }).single('img')

//https://www.youtube.com/watch?v=sUUgbcHm_3c
const createAnimal = (req,res) =>{
    upload(req,res,(err)=>{
        if(err){
            res.status(400).json(err)
            return
        }
        let newAnimal = new Animal({
            name: req.body.name,
            age: req.body.age,
            img: req.file.filename,
        })
        try {
            newAnimal.save(() => res.redirect('/animals'))
            console.log(newAnimal)
        } catch(err){
            console.log(err)
        }
    })
}

//this code below works without adding picture
// const createAnimal = async (req,res) =>{
//     upload(req,res,(err)=>{
//         if(err){
//             res.status(400).json(err)
//             return
//         }
//         let newAnimal = new Animal({
//             name: req.body.name,
//             age: req.body.age,
//             img: req.file.filename,
//         })
//         try {
//             newAnimal.save(() => res.redirect('/animals'))
//             console.log(newAnimal)
//         } catch(err){
//             console.log(err)
//         }
//     })
// }

const showAnimal = (req,res) =>{
    Animal.findById(req.params.animalId).then((a)=>{
        res.render('animals/showAnimal', {a})
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
    upload,
    // uploadPic,
    showAnimal,
    editAnimal,
    updateAnimal,
    deleteAnimal
}