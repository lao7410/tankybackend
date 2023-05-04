function auth (req, res, next){
    console.log('auth: ',req.session)
    // if (req.session?.user.name !== 'esani estani' || !req.session?.admin ) {
    if (req.session?.user.name !== 'estani@estani' ) {
        return res.send('No estas autorizado para ver esta página')
    }
    
    return next()
}

module.exports = {
    auth
}
