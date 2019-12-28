var express = require("express");
var router = express.Router();
var Torta = require("../models/torta");
var middleware = require("../middleware/index");

router.get("/", function(req,res){
    Torta.find({}, function(err, torte) {
        if(err) {
            console.log(err);
        } else {
            res.render("torte/index", {torte: torte});
        }
    })
    
})
router.get("/novo", middleware.jePrijavljen, function(req,res){
    res.render("torte/novo");
})
router.post("/", middleware.jePrijavljen, function(req,res) {
    Torta.create(req.body.torta,function(err, novaTorta){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/torte");
        }
    })
})
router.get("/:id",function(req,res){
    Torta.findById(req.params.id,function(err, torta) {
        if(err){
            console.log(err);
        } else {
            res.render("torte/detalji",{torta: torta});
        }
    })
})
router.delete("/:id", middleware.jePrijavljen, function(req,res){
    Torta.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/torte");
        }
    })
})
router.get("/:id/uredi", middleware.jePrijavljen, function(req,res){
    Torta.findById(req.params.id,function(err,dobivenaTorta){
        if(err){
            console.log(err);
        } else {
            res.render("torte/uredi",{torta: dobivenaTorta});
        }
    })
})
router.put("/:id", middleware.jePrijavljen, function(req,res){
    Torta.findByIdAndUpdate(req.params.id, req.body.torta, function(err, novaTorta){
        if(err) {
            console.log(err);
        } else {
            res.redirect("/torte");
        }
    })
})

module.exports = router;