const express = require('express');
const router = express.Router();
const animalCtrl = require('../controller/animalController');


router.get('/', isLoggedIn, animalCtrl.getAllAnimals)
router.get('/new', animalCtrl.newAnimal)
router.post('/', animalCtrl.createAnimal)
router.get('/:animalId', animalCtrl.showAnimal)
// router.get('/:animalId/edit', animalCtrl.editAnimal) --->> THIS WILL PROBABLY BE DELETED
router.put('/:animalId', animalCtrl.updateAnimal)
router.delete('/:animalId', animalCtrl.deleteAnimal) 

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/home');
  }

module.exports = router

