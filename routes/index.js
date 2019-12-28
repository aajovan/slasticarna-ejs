var express = require("express");
var router = express.Router();
var passport = require("passport");
var Korisnik = require("../models/korisnik");



router.get("/",function(req,res){
    res.render("index");
});


router.get("/registracija", function (req,res){
    res.render("registracija");
})
router.post("/registracija", function(req,res){
    var noviKorisnik=new Korisnik({username: req.body.username});
    Korisnik.register(noviKorisnik, req.body.password,function(err, korisnik){
        if(err) {
            return res.render("registracija");
        }
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            });
        
    });
});

router.get("/prijava", function(req,res){
    res.render("prijava");
})
router.post("/prijava", passport.authenticate("local", {successRedirect: "/",
failureRedirect: "/prijava"}), function(req,res){

})

router.get("/odjava",function(req,res){
    req.logout();
    res.redirect("/");

})

module.exports = router;