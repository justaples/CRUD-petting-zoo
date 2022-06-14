const express = require('express');
const router = express.Router();
const passport = require('passport')

//reference https://www.youtube.com/watch?v=Q0a0594tOrc

const isLoggedIn = (req, res, next)=>{
    req.user ? next() : res.status(401);
}

router.get('/', isLoggedIn, function(req, res) {
    
    // console.log(req.user)
    res.redirect('/animals');
});

router.get('/auth/google', passport.authenticate(
    'google',
    { scope: ['profile', 'email']}
  ));
  
  router.get('/oauth2callback', passport.authenticate(
    'google',
    {
      successRedirect:'/animals',
      failureRedirect: '/auth/google'
    }
  ));
  
  router.get('/logout', function(req,res){
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    res.redirect('/');
  });
  

  module.exports = router;