var mongoose = require("mongoose");

var kolacSchema = new mongoose.Schema({
   naziv: String,
   slika: String,
   cijena: String
});

module.exports = mongoose.model("Kolac", kolacSchema);