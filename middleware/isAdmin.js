module.exports = function(req, res, next) {

    if(req.session.isAuthenticated !='admin'){
        console.log('isAdmin____',req.session.isAuthenticated);
        res.redirect('/cars')
        return
    }
    next()
}