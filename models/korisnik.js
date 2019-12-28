var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var korisnikSchema = new mongoose.Schema({
    username: String,
    password: String
});
korisnikSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Korisnik", korisnikSchema);