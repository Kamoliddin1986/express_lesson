module.exports = function(req, res, next) {

    if(req.session.isAuthenticated !='admin'){
        res.redirect('/cars')
        return
    }
    next()
}