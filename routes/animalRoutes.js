const express = require('express');
const router = express.Router();
const animalCtrl = require('../controller/animalController');
const passport = require('passport')



router.get('/', animalCtrl.getAllAnimals)
router.get('/new', animalCtrl.newAnimal)
// router.get('/auth/google', animalCtrl.login)
// router.post('/auth/google', animalCtrl.loginPost)
router.post('/', animalCtrl.createAnimal)
router.get('/:animalId', animalCtrl.showAnimal)
router.get('/:animalId/edit', animalCtrl.editAnimal)
router.put('/:animalId', animalCtrl.updateAnimal)
router.delete('/:animalId', animalCtrl.deleteAnimal) 

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email']}
  ));
  
  router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect:'/',
      failureRedirect: '/'
    }
  ));
  
  router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });
  

module.exports = router

