var express = require("express"),
    Korisnik = require("./models/korisnik"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");
app = express();

var torteRoutes = require("./routes/torte");
var kolaciRoutes = require("./routes/kolaci");
var indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/slasticarna", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  });

app.use(require("express-session")({
    secret: "Slastičarna",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Korisnik.authenticate()));
passport.serializeUser(Korisnik.serializeUser());
passport.deserializeUser(Korisnik.deserializeUser());

app.use(function(req,res,next){
    res.locals.trenutniKorisnik = req.user;
    next();
})

app.use("/torte",torteRoutes);
app.use("/kolaci",kolaciRoutes);
app.use("/",indexRoutes);


app.listen(3000);