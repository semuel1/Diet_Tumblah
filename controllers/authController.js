const googlePassport = require('../config/googlePpConfig')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

router.get('/google', googlePassport.authenticate('google', { scope: ['profile'] }))
router.get('/google/callback', 
    googlePassport.authenticate('google', { failureRedirect: '/auth/google', session: false }),
    (req, res) => {
        // Successful authentication
        console.log(req.user)

        const payload = {
            provider: req.user.provider,
            provider_id: req.user.id,
            displayName: req.user.displayName,
            name: {
                familyName: req.user.name.familyName,
                givenName: req.user.name.givenName,
                middleName: req.user.name.middleName
            },
            photos: req.user.photos
        }
        // console.log(payload)
        const token = jwt.sign(payload, 'A VERY SECRET SECRET', { expiresIn: 3600 })

        res.redirect(`${process.env.CLIENT_URL}/saveToken?token=${token}`)
    }
)
module.exports = router