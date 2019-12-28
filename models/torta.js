var mongoose = require("mongoose");

var tortaSchema = new mongoose.Schema({
   naziv: String,
   slika: String,
   cijena: String
});

module.exports = mongoose.model("Torta", tortaSchema);