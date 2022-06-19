const express = require('express');
const router = express.Router();
const animalCtrl = require('../controller/animalController');

/*=======================================================================
All animal routes connected to the animal controller file
=======================================================================*/
router.get('/', isLoggedIn, animalCtrl.getAllAnimals)
router.get('/new', isLoggedIn, animalCtrl.newAnimal)
router.post('/', animalCtrl.createAnimal)
router.get('/:animalId', isLoggedIn, animalCtrl.showAnimal)
router.put('/:animalId', animalCtrl.updateAnimal)
router.delete('/:animalId', animalCtrl.deleteAnimal) 


/*=======================================================================
Function below controls if user is logged in
if not logged in, user cannot access animal route
=======================================================================*/
function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/home');
  }

module.exports = router

