var express = require("express");
var router = express.Router();
var Kolac = require("../models/kolac");
var middleware = require("../middleware/index");


router.get("/", function(req,res){
    Kolac.find({}, function(err, kolaci) {
        if(err) {
            console.log(err);
        } else {
            res.render("kolaci/index", {kolaci: kolaci});
        }
    })
    
})
router.get("/novo", middleware.jePrijavljen, function(req,res){
    res.render("kolaci/novo");
})
router.post("/kolaci", middleware.jePrijavljen, function(req,res) {
    Kolac.create(req.body.kolac,function(err, noviKolac){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/kolaci");
        }
    })
})


router.get("/:id",function(req,res){
    Kolac.findById(req.params.id,function(err, kolac) {
        if(err){
            console.log(err);
        } else {
            res.render("kolaci/detalji",{kolac: kolac});
        }
    })
})
router.delete("/:id", middleware.jePrijavljen, function(req,res){
    Kolac.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/kolaci");
        }
    })
})


router.get("/:id/uredi", middleware.jePrijavljen, function(req,res){
    Kolac.findById(req.params.id,function(err,dobivenKolac){
        if(err){
            console.log(err);
        } else {
            res.render("kolaci/uredi",{kolac: dobivenKolac});
        }
    })
})
router.put("/:id", middleware.jePrijavljen, function(req,res){
    Kolac.findByIdAndUpdate(req.params.id, req.body.kolac, function(err, noviKolac){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/kolaci");
        }
    })
})

module.exports = router;