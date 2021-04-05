const googlePassport = require('../config/googlePpConfig')
const router = require('express').Router()

router.get('/google', googlePassport.authenticate('google', { scope: ['profile'] }))
router.get(
    '/google/callback', 
    googlePassport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        // Successful authentication, redirect home
        res.redirect('/')
    }
)
module.exports = router