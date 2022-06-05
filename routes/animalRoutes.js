const express = require('express');
const router = express.Router();
const animalCtrl = require('../controller/animalController');

// Index: GET /animals 
router.get('/', animalCtrl.getAllAnimals)

// New: GET /animals/new 
router.get('/new', animalCtrl.newAnimal)

// Create: POST /animals 
router.post('/', animalCtrl.createAnimal)

// Show: GET /animals/:id 
// router.get('/:animalId', animalCtrl.showAnimal)

// Edit: GET /animals/:id/edit 
// router.get('/:animalId/edit', animalCtrl.editAnimal)

// Update: PUT /animals/:id 
// router.put('/:animalId', animalCtrl.updateAnimal)

// Destroy: DELETE /animals/:id
// router.delete('/:animalId', animalCtrl.deleteAnimal) 

module.exports = router