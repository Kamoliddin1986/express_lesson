module.exports = function(req, res, next) {
    console.log('middle');
    if(!req.session.isAuthenticated){
        res.redirect('/login')
        return
    }
    next()
}