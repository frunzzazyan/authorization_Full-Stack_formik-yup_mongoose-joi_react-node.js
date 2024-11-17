var express = require('express');
var router = express.Router();

const passport = require("passport")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("index")
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get("/success", (req,res)=>{
  console.log(req.session);
  
  res.send("ok")
})
  
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  });

module.exports = router;
