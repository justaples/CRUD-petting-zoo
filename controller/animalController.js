const Animal = require('../models/animals')
const multer = require('multer')
const path = require('path');
const passport = require('passport')

/*=======================================================================
Function created to display all animals on main page
=======================================================================*/
const getAllAnimals = (req,res) =>{
    Animal.find({}, (err, a)=>{
        if(err){
            res.status(400).json(err)
            return
        }
        res.render('animals/allAnimals', {a, title: "Forrest & Friends Petting Zoo"})
    })
}

/*=======================================================================
Function created to display the form to add a new animal into database
=======================================================================*/
const newAnimal = (req,res) =>{
    Animal.find({}, (err, a)=>{
        if(err){
            res.status(400).json(err)
            return
        }
        res.render('animals/newAnimal', {a, title: "Forrest & Friends Petting Zoo"})
    })
}

/*=======================================================================
Multer references:
https://www.youtube.com/watch?v=9Qzmri1WaaE
https://www.youtube.com/watch?v=sUUgbcHm_3c
https://www.youtube.com/watch?v=nvSVZW2x8BQ&t=876s
https://www.youtube.com/watch?v=nvSVZW2x8BQ
=======================================================================*/ 
const storage = multer.diskStorage({
    destination:'./public',
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
});

/*=======================================================================
Handling the upload of files into the app: Max Size, File type
=======================================================================*/ 
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
}).single('img')

/*=======================================================================
Function to allow only images to be uploaded
=======================================================================*/ 
function checkFileType(file, cb){
    const fileTypes = /jpeg|jpg|png|gif|webp/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    
    if (mimeType && extName){
        return cb(null, true)
    } else {
        cb('Error: Images only')
    }
}

/*=======================================================================
Following function adds the new animal into database
Multer adapted into the function 
Error message was added in case no file is selected
=======================================================================*/ 
const createAnimal = (req,res) =>{
    upload(req,res,(err)=>{
        Animal.find({}, (e,a)=>{
            if(err){
                res.render('animals/newAnimal', 
                {msg:err, a, title: "Forrest & Friends Petting Zoo"})
            }else{
                if(req.file == undefined){
                    res.render('animals/newAnimal', 
                    {msg: 'Please select a picture!', a, title: "Forrest & Friends Petting Zoo"})
                }
            }
            try{
                let newAnimal = new Animal({
                    name: req.body.name,
                    age: req.body.age,
                    description: req.body.description,
                    img: req.file.filename,
                })
                newAnimal.save(() => res.redirect('/animals'), {title: "Forrest & Friends Petting Zoo"})
            } catch (err){
                console.log(err)
            }
        })
    })
}

/*=======================================================================
Following function displays the selected animal on screen by its ID
=======================================================================*/ 
const showAnimal = (req,res) =>{
    Animal.findById(req.params.animalId).then((animal)=>{
        /*=======================================================================
        Animal.find was added below so the header can display all animals on the dropdown
        =======================================================================*/ 
        Animal.find({},(err, a) =>{
            res.render('animals/showAnimal', {a, animal, id:req.params.animalId, title: "Forrest & Friends Petting Zoo"})
        })
    })
}

/*=======================================================================
Following function updates animal information entered into the edit form
=======================================================================*/ 
const updateAnimal = (req,res) =>{
    Animal.findByIdAndUpdate(req.params.animalId, req.body, {new:true}).then((a)=>{
        res.redirect(`/animals/${req.params.animalId}`)
    })
}

/*=======================================================================
Following function deletes animal from database
=======================================================================*/ 
const deleteAnimal = (req,res) =>{
    Animal.findByIdAndDelete(req.params.animalId, (err, a)=>{
        if (err){
            res.status(400).json(err)
            return
        }
        res.redirect('/animals')
    })
}


/*=======================================================================
Exporting all functions
=======================================================================*/ 
module.exports = {
    getAllAnimals,
    newAnimal,
    createAnimal,
    showAnimal,
    updateAnimal,
    deleteAnimal
}