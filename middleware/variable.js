module.exports = function(req, res, next){

    res.locals.isAuth = req.session.isAuthenticated
    if(req.session.isAuthenticated == 'admin'){
        res.locals.isAdmin = true
    }
    next()
}