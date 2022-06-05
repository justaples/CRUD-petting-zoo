const express = require('express');
const router = express.Router();
const animalCtrl = require('../controller/animalController');

router.get('/', animalCtrl.getAllAnimals)
router.get('/new', animalCtrl.newAnimal)
router.post('/', animalCtrl.createAnimal)
router.get('/:animalId', animalCtrl.showAnimal)
router.get('/:animalId/edit', animalCtrl.editAnimal)
router.put('/:animalId', animalCtrl.updateAnimal)
router.delete('/:animalId', animalCtrl.deleteAnimal) 

module.exports = router