const googlePassport = require('../config/googlePpConfig')
const githubPassport = require('../config/githubPpConfig')
const router = require('express').Router()
const jwt = require('jsonwebtoken')

// Google Oauth
router.get('/google', googlePassport.authenticate('google', { scope: ['profile'] }))
router.get('/google/callback',
    googlePassport.authenticate('google', { failureRedirect: '/auth/google', session: false }),
    function(req, res) {
        // Successful authentication
        // console.log("The user data!", req.user)// The user data we get from google!

        const payload = {
            provider: req.user.provider,
            provider_id: req.user.id,
            displayName: req.user.displayName,
            name: {
                familyName: req.user.name.familyName,
                givenName: req.user.name.givenName,
            },
            photos: req.user.photos
        }
        console.log('the payload', payload)
        const token = jwt.sign(payload, 'A VERY SECRET SECRET', { expiresIn: 3600 })

        res.redirect(`${process.env.CLIENT_URL}/saveToken?token=${token}`)
    }
)

// Github Oauth
// https://docs.github.com/en/developers/apps/scopes-for-oauth-apps
router.get('/github', githubPassport.authenticate('github', { scope: ['read:user'] }))
router.get('/github/callback',
    githubPassport.authenticate('github', { failureRedirect: '/auth/github', session: false }),
    function (req, res) {
        // Successful authentication
        console.log("The user data!", req.user) // The user data we get from github!
        const payload = {
            provider: req.user.provider,
            provider_id: req.user.provider_id,
            displayName: req.user.displayName,
            name: {
                familyName: req.user.name.familyName,
                givenName: req.user.name.givenName,
                middleName: req.user.name.middleName
            },
            photos: req.user.photos
        }
        console.log(payload)
        const token = jwt.sign(payload, 'A VERY SECRET SECRET', { expiresIn: 3600 })

        res.redirect(`${process.env.CLIENT_URL}/saveToken?token=${token}`);
    });
module.exports = router