const express = require('express');
const router = express.Router();
const passport = require('passport')

//reference https://www.youtube.com/watch?v=Q0a0594tOrc

router.get('/home', (req,res)=>{
  
  res.render('animals/home')
  // res.redirect('/home')
})

// const isLoggedIn = (req, res, next)=>{
//   req.user ? next() : res.sendStatus(401);
// }


router.get('/', function(req, res) {
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
  req.session = null;
  req.logout(function(err){
    if(err){
      return err;
    }
  });
  // req.logout();
  res.redirect('/');
});
    

module.exports = router;
