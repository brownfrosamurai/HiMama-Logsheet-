function ensureAuth(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    } else {
        res.redirect('/')
    }
}
function ensureGuest(req, res, next) {
    if(req.isAuthenticated()){
        res.redirect('/dashboard')
    } else {
        return next()
    }
}

module.exports = {
    ensureAuth,
    ensureGuest
}