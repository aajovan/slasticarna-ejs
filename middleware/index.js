var middlewareObj = {};

middlewareObj.jePrijavljen= function(req,res,next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/prijava");
}

module.exports= middlewareObj;